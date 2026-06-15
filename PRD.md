# Product Requirements Document (PRD)
## CampusCart — College Student Marketplace

**Version:** 1.1
**Stack:** React + Vite, Node.js + Express, MongoDB, Socket.IO, Firebase Auth (Email/Password), Cloudinary
**Audience:** College students (buyers & sellers), College Dean (admin)

---

## 1. Project Overview

CampusCart is a closed, college-restricted marketplace where verified students can buy and sell second-hand items (books, notes, electronics, stationery, hostel goods). Access is gated by college email domain check and manual dean approval. Real-time chat between buyer and seller is provided via Socket.IO. All authentication uses Firebase Auth with email/password — no Google OAuth anywhere.

---

## 2. User Roles

| Role | How They Login | Access |
|---|---|---|
| **Developer** | Runs seed script once | Creates dean credentials in Firebase + MongoDB |
| **Dean (Admin)** | Email + Password (Firebase Auth) — no self-registration | Admin dashboard |
| **Student** | Email + Password (Firebase Auth) — self-registration | Marketplace (after dean approval) |

---

## 3. System Flow Overview

```
Developer seeds dean account (Firebase Auth + MongoDB)
        ↓
Dean logs in → Creates college profile (name + allowed email domain e.g. @mitcollege.edu.in)
  — One dean can only create ONE college. One college belongs to ONE dean.
        ↓
Student self-registers with email + password
  → Email domain must match a registered college's domain
  → Student selects their college, enters name + roll number
  → Status set to "unverified"
        ↓
Dean sees unverified students list → Clicks Approve → Status becomes "verified"
        ↓
Verified student can browse, buy, and sell on the marketplace
```

---

## 4. Authentication — Firebase Auth (Email/Password)

### Everyone uses Firebase Auth with email/password. No Google login anywhere.

### 4.1 Dean Account
- Created by the **developer** using a seed script
- Seed script creates the account in **Firebase Auth** + stores dean record in **MongoDB**
- Dean has `role: "dean"` in MongoDB
- Dean logs in → Firebase returns `idToken` → backend verifies it → returns custom JWT with role
- **Constraint:** A dean can only have one college. If they already created one, the create form is hidden.

**Seed Script (developer runs once per dean):**
```js
// server/scripts/seedDean.js
// Usage: node seedDean.js --email dean@college.edu.in --password secret123 --name "Dr. Sharma"
// What it does:
//   1. Creates Firebase Auth user with given email + password
//   2. Inserts dean record in MongoDB: { firebaseUID, name, email, role: "dean", collegeId: null }
```

### 4.2 Student Registration
- Student visits `/register`
- Fills: Name, Roll Number, Email, Password, College (dropdown)
- Frontend calls `createUserWithEmailAndPassword(email, password)` via Firebase
- Backend checks: does student's email domain match the selected college's `emailDomain`?
  - ✅ Match → create student record in MongoDB with `status: "unverified"`
  - ❌ No match → reject: "Your email does not match the selected college's domain"
- Student is told: "Your account is pending approval from your dean"

### 4.3 Student Login
- Student visits `/login`
- Enters email + password → Firebase Auth → `idToken` sent to backend
- Backend verifies token → checks MongoDB for student record
  - `status: "unverified"` → redirect to `/pending`
  - `status: "verified"` → redirect to `/browse`

### 4.4 Token Flow (Both Roles)
```
Firebase login → get idToken → send in Authorization header → backend verifies with Firebase Admin SDK → proceed
```
Store `idToken` in `localStorage`. Refresh it using Firebase's `onAuthStateChanged`.

---

## 5. Data Models

### 5.1 Dean
```
{
  _id,
  firebaseUID,        // from Firebase Auth
  name,
  email,
  role: "dean",
  collegeId: ObjectId | null   // null until they create their college
}
```

### 5.2 College
```
{
  _id,
  name,               // e.g. "MIT College of Engineering"
  emailDomain,        // e.g. "@mitcollege.edu.in"  (must be unique across all colleges)
  city,
  deanId: ObjectId    // one-to-one: only one dean per college, one college per dean
}
```

**Constraints enforced in DB + API:**
- `emailDomain` is unique (indexed)
- `deanId` is unique (indexed)
- A dean cannot create a college if `dean.collegeId !== null`

### 5.3 Student
```
{
  _id,
  firebaseUID,        // from Firebase Auth
  name,
  email,
  rollNumber,
  collegeId: ObjectId,
  status: "unverified" | "verified",
  createdAt
}
```

### 5.4 Product / Listing
```
{
  _id,
  title,
  description,
  price,              // in ₹ (number)
  category,           // "Books" | "Electronics" | "Notes" | "Stationery" | "Hostel" | "Other"
  images: [String],   // Cloudinary secure URLs (max 3)
  sellerId: ObjectId,
  collegeId: ObjectId,
  status: "available" | "sold",
  createdAt
}
```

### 5.5 Message (Chat)
```
{
  _id,
  roomId,             // "{buyerId}_{productId}" — unique per buyer-product pair
  senderId: ObjectId,
  text,
  createdAt
}
```

### 5.6 Wishlist
```
{
  userId: ObjectId,
  productIds: [ObjectId]
}
```

### 5.7 Cart
```
{
  userId: ObjectId,
  items: [{ productId: ObjectId, addedAt }]
}
```

---

## 6. Image Upload — Cloudinary

- Images are uploaded **directly from the frontend** to Cloudinary using an unsigned upload preset
- No image handling on the backend at all
- Frontend uploads → gets back a secure URL → sends that URL to backend when creating a listing
- Max 3 images per listing
- Allowed types: jpg, jpeg, png, webp
- Cloudinary folder: `products/{userId}/`

**Frontend upload flow:**
```js
// 1. Upload to Cloudinary (unsigned upload preset)
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
formData.append("folder", `products/${userId}`);

const res = await fetch(
  `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
  { method: "POST", body: formData }
);
const data = await res.json();
const url = data.secure_url;

// 2. Collect all URLs → send to backend in POST /api/products
{ images: [url1, url2, url3] }
```

**Setup (developer):**
1. Create a free account at cloudinary.com
2. Note the **Cloud Name** from the dashboard
3. Go to Settings → Upload → Add upload preset → set Signing Mode to **Unsigned** → note the preset name

---

## 7. Feature Scope

### 7.1 Dean Admin Panel

| Feature | Details |
|---|---|
| Login | Email + password via Firebase Auth |
| Create College Profile | Name, email domain, city — **once only** |
| View Unverified Students | Table: name, email, roll no, registered date, approve button |
| Approve Student | Sets status to `verified` |
| View All Students | All students belonging to their college |

### 7.2 Student — Marketplace

| Feature | Details |
|---|---|
| Register | Name, roll no, email, password, college selection |
| Login | Email + password via Firebase Auth |
| Pending Screen | Shown if status = unverified after login |
| Browse Listings | Grid of available products from same college only |
| Product Detail | Images, price, description, seller name, add to cart, wishlist, chat |
| Sell an Item | Form: title, description, price, category, upload up to 3 images |
| My Listings | Seller's own active listings with mark-as-sold + delete |
| Mark as Sold | Flips product status to "sold" |
| Cart | Add/remove products, see total |
| Wishlist | Save/unsave products |
| Chat | Real-time buyer ↔ seller chat per product (Socket.IO) |
| Chat History | Messages persisted in MongoDB, loaded on open |
| Sold Dashboard | List of seller's sold items with total earnings |

---

## 8. API Endpoints

### Auth
```
POST   /api/auth/dean/login          → { firebaseToken } → verify + return JWT with role
POST   /api/auth/student/register    → { firebaseToken, name, rollNumber, collegeId } → create student
POST   /api/auth/student/login       → { firebaseToken } → verify + return student info + JWT
```

> Firebase token is always obtained on the frontend first, then sent to backend for verification.

### College
```
POST   /api/college                  → Dean creates their college (one-time)
GET    /api/college                  → List all colleges (public — for registration dropdown)
GET    /api/college/mine             → Dean fetches their own college profile
```

### Dean — Student Management
```
GET    /api/dean/students/unverified → Unverified students of dean's college
GET    /api/dean/students/all        → All students of dean's college
PATCH  /api/dean/students/:id/verify → Approve a student
```

### Products
```
GET    /api/products                 → All available products (same college) — query: ?category=
POST   /api/products                 → Create listing — body: { title, description, price, category, images[] }
GET    /api/products/:id             → Single product detail
PATCH  /api/products/:id/sold        → Mark as sold (seller only)
DELETE /api/products/:id             → Delete listing (seller only)
GET    /api/products/my/listings     → Logged-in seller's active listings
GET    /api/products/my/sold         → Logged-in seller's sold items
```

### Wishlist
```
GET    /api/wishlist                 → Get wishlist
POST   /api/wishlist/:productId      → Add to wishlist
DELETE /api/wishlist/:productId      → Remove from wishlist
```

### Cart
```
GET    /api/cart                     → Get cart items
POST   /api/cart/:productId          → Add to cart
DELETE /api/cart/:productId          → Remove from cart
```

### Chat
```
GET    /api/chat/:roomId             → Load message history for a room
```

---

## 9. Socket.IO — Real-time Chat

### Events
```
Client → Server:
  join_room    { roomId }
  send_message { roomId, senderId, text }

Server → Client:
  receive_message { senderId, text, createdAt }
```

### Room ID Logic
```
roomId = `${buyerId}_${productId}`
```
Each buyer gets a unique chat thread per product. The seller can have multiple rooms for one product (one per interested buyer). Chat history is loaded from MongoDB on room open.

---

## 10. Authorization Rules

| Action | Who |
|---|---|
| Create college | Dean (only once, only their own) |
| Approve students | Dean (only students of their college) |
| Create listing | Verified student only |
| Mark as sold / Delete | Listing's own seller only |
| View listings | Verified students of same college only |
| Chat | Verified student (buyer) + product's seller |
| View other college's listings | ❌ Blocked |
| Student register without matching domain | ❌ Blocked |

---

## 11. Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campuscart
JWT_SECRET=your_jwt_secret_here

# Firebase Admin SDK (for verifying tokens on backend)
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# Firebase client config (Auth only)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Cloudinary (unsigned upload preset)
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

---

## 12. Project Folder Structure

```
campuscart/
├── client/                        ← React + Vite
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── admin/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── firebase.js            ← Firebase init (Auth only)
│   │   ├── cloudinary.js          ← Cloudinary upload helper
│   │   ├── socket.js              ← Socket.IO client
│   │   └── App.jsx
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/                ← verifyFirebaseToken, requireRole, requireVerified
│   ├── socket/
│   │   └── chatHandler.js
│   ├── scripts/
│   │   └── seedDean.js            ← Developer runs this once per dean
│   └── index.js
│
└── README.md
```

---

## 13. Out of Scope

- Payment gateway
- Push / email notifications
- Analytics
- Multiple deans per college
- Mobile app

---

## 14. Developer Setup Checklist

- [ ] Create Firebase project → enable **Email/Password** sign-in method
- [ ] Download Firebase Admin SDK service account JSON for backend
- [ ] Create a free Cloudinary account → note Cloud Name → create an unsigned upload preset
- [ ] Create MongoDB Atlas cluster (or run local)
- [ ] Run `node server/scripts/seedDean.js` with dean's email + password + name
- [ ] Fill in all `.env` variables for both client and server
- [ ] `npm install` in `/client` and `/server`
- [ ] `npm run dev` in both
