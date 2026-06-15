import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAp_0Qez0u3A9FEGsOmhE_WQYSmvl2A_pU',
  authDomain: 'campus-cart-ecom.firebaseapp.com',
  projectId: 'campus-cart-ecom',
  storageBucket: 'campus-cart-ecom.firebasestorage.app',
  messagingSenderId: '1040983598749',
  appId: '1:1040983598749:web:3b3b47d16bacd35e9ad674',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
