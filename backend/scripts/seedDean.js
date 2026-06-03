/**
 * Usage (run from backend/ directory):
 *   node scripts/seedDean.js --email dean@college.edu.in --password secret123 --name "Dr. Sharma"
 *
 * What it does:
 *   1. Creates a Firebase Auth user with the given email + password
 *   2. Inserts a dean record in MongoDB
 *
 * Run this once per dean. If the email already exists in MongoDB, it exits safely.
 */

import 'dotenv/config';
import admin from '../config/firebase.js';
import mongoose from 'mongoose';
import Dean from '../models/Dean.js';

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const email = get('--email');
const password = get('--password');
const name = get('--name');

if (!email || !password || !name) {
  console.error('Usage: node scripts/seedDean.js --email <email> --password <password> --name "<name>"');
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB connected');

const existing = await Dean.findOne({ email });
if (existing) {
  console.log(`Dean with email ${email} already exists. Exiting.`);
  await mongoose.disconnect();
  process.exit(0);
}

const userRecord = await admin.auth().createUser({ email, password, displayName: name });
await Dean.create({ firebaseUID: userRecord.uid, name, email, role: 'dean' });

console.log(`✓ Dean created: ${name} (${email})`);
await mongoose.disconnect();
