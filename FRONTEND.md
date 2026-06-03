# Frontend Guide — CampusCart
## For: React Teammate (Beginner Friendly)

**Stack:** React + Vite, Axios, Socket.IO Client, Firebase Auth (Email/Password), Firebase Storage, TailwindCSS

> **How to read this:** This file tells you exactly what pages to build, what files to create, what design to use, and how each page connects to the backend API. You do not need to understand the backend. Your job is to build the UI and call the right functions from the right place.

---

## 1. Project Folder Structure

```
client/
└── src/
    ├── assets/                ← Logo, placeholder images
    ├── components/            ← Small reusable pieces used across pages
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── Loader.jsx
    │   ├── ImageUploader.jsx  ← Handles Firebase Storage upload
    │   └── ProtectedRoute.jsx
    ├── pages/
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── PendingPage.jsx
    │   ├── BrowsePage.jsx
    │   ├── ProductDetailPage.jsx
    │   ├── SellPage.jsx
    │   ├── MyListingsPage.jsx
    │   ├── CartPage.jsx
    │   ├── WishlistPage.jsx
    │   ├── ChatPage.jsx
    │   ├── SoldDashboardPage.jsx
    │   └── admin/
    │       ├── DeanLoginPage.jsx
    │       ├── DeanDashboardPage.jsx
    │       └── StudentTablePage.jsx
    ├── context/
    │   └── AuthContext.jsx    ← Stores logged-in user globally
    ├── services/
    │   └── api.js             ← All Axios API calls in one place
    ├── firebase.js            ← Firebase setup (your senior configures this)
    ├── socket.js              ← Socket.IO client (your senior configures this)
    └── App.jsx                ← All routes defined here
```

---

## 2. Routes (App.jsx)

```
/                   → LandingPage        (public)
/login              → LoginPage          (public — student login)
/register           → RegisterPage       (public — student registration)
/pending            → PendingPage        (logged in but not yet approved)
/browse             → BrowsePage         (verified students only)
/product/:id        → ProductDetailPage  (verified students only)
/sell               → SellPage           (verified students only)
/my-listings        → MyListingsPage     (verified students only)
/cart               → CartPage           (verified students only)
/wishlist           → WishlistPage       (verified students only)
/chat               → ChatPage           (verified students only)
/sold               → SoldDashboardPage  (verified students only)

/admin/login        → DeanLoginPage      (public)
/admin/dashboard    → DeanDashboardPage  (dean only)
/admin/students     → StudentTablePage   (dean only)
```

**Protected pages** use a `<ProtectedRoute>` wrapper. Your senior sets this up. You use it like:
```jsx
<Route path="/browse" element={<ProtectedRoute><BrowsePage /></ProtectedRoute>} />
```

---

## 3. How to Call the API

All API functions live in `src/services/api.js`. Never write `fetch()` or `axios.get()` directly inside a page. Just import the function you need.

```js
// services/api.js — your senior writes these, you import them
export const getProducts = (category) => axios.get(`/products${category ? `?category=${category}` : ''}`);
export const addToCart = (productId) => axios.post(`/cart/${productId}`);
export const createListing = (data) => axios.post('/products', data);
```

```jsx
// Inside your page
import { getProducts } from '../services/api';
import { useState, useEffect } from 'react';

const BrowsePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return <div>{products.map(p => <ProductCard key={p._id} product={p} />)}</div>;
};
```

**Rule:** Data you need when the page loads → `useEffect`. Data from a button click → function triggered by `onClick`.

---

## 4. Global User Data (AuthContext)

Any page can access the logged-in user with `useAuth()`:

```jsx
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <span>Hi, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};
```

**`user` object shape for students:**
```js
{
  _id: "abc123",
  name: "Rahul Sharma",
  email: "rahul@mitcollege.edu.in",
  rollNumber: "21CS045",
  status: "verified",       // or "unverified"
  collegeId: "xyz789",
  role: "student"
}
```

**`user` object shape for dean:**
```js
{
  _id: "...",
  name: "Dr. Sharma",
  email: "dean@mitcollege.edu.in",
  role: "dean",
  collegeId: "..." | null   // null if college not yet created
}
```

---

## 5. How Image Upload Works (Firebase Storage)

Images are uploaded directly from the browser to Firebase Storage — the backend never handles the image file, it only receives the final URL.

The `ImageUploader` component handles all of this. You just use it in `SellPage`:

```jsx
// ImageUploader.jsx is already built by your senior — you just use it like:
<ImageUploader onUploadComplete={(urls) => setImageUrls(urls)} maxImages={3} />
```

When the user picks files, `ImageUploader`:
1. Uploads each file to Firebase Storage
2. Gets back a public URL for each
3. Calls `onUploadComplete([url1, url2, url3])`

You store those URLs in state and include them when submitting the listing form.

---

## 6. Pages — What to Build

---

### 6.1 LandingPage.jsx
**Route:** `/` | **Auth:** Public

**What to show:**
- App name: **CampusCart** + tagline: "Buy & sell within your campus"
- Two buttons: **"Login"** → `/login` and **"Register"** → `/register`
- Small link at bottom: "Dean login →" → `/admin/login`

**Design:** Full-height centered layout. Background with a subtle pattern or gradient. Big bold heading. Simple and clean.

**No API calls.**

---

### 6.2 LoginPage.jsx
**Route:** `/login` | **Auth:** Public

**What to show:**
- Email input
- Password input
- **"Login"** button
- Link: "Don't have an account? Register"
- Error message area (e.g. "Invalid email or password")

**How it works:**
```jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const handleLogin = async () => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  // send token to backend via api.js function your senior provides
  // backend returns user info → store in AuthContext → redirect
};
```

**After login:**
- If student + `status: "unverified"` → redirect to `/pending`
- If student + `status: "verified"` → redirect to `/browse`
- (Dean has their own login page at `/admin/login`)

---

### 6.3 RegisterPage.jsx
**Route:** `/register` | **Auth:** Public

**What to show:**
- Form fields:
  - Full Name (text)
  - Roll Number (text)
  - Email (email input)
  - Password (password input)
  - College (dropdown — fetched from API)
- **"Register"** button
- Error message if domain doesn't match

**API Calls:**
```js
GET /api/college              → populate college dropdown on page load
POST /api/auth/student/register → submit registration
```

**How registration works:**
1. User fills form and clicks Register
2. Frontend calls Firebase `createUserWithEmailAndPassword(email, password)`
3. Get the `idToken` from Firebase result
4. Send `{ idToken, name, rollNumber, collegeId }` to backend
5. Backend checks domain match → creates student with `status: "unverified"`
6. Redirect to `/pending`

---

### 6.4 PendingPage.jsx
**Route:** `/pending` | **Auth:** Logged in (any status)

**What to show:**
- Icon (clock or hourglass)
- Heading: "Approval Pending"
- Message: "Your account is under review. Your college dean will verify your details shortly."
- Show user's name and email (from AuthContext)
- **"Logout"** button

**No API calls.** Everything comes from `useAuth()`.

---

### 6.5 BrowsePage.jsx
**Route:** `/browse` | **Auth:** Verified student only

**What to show:**
- Search bar (filters by product title — client-side filter is fine)
- Category tabs: **All | Books | Electronics | Notes | Stationery | Hostel | Other**
- Product grid — each item is a `ProductCard`
- Empty state: "No listings found" if list is empty

**API Call:**
```js
GET /api/products              → on page load (all products)
GET /api/products?category=Books → when a category tab is clicked
```

**ProductCard component shows:**
- Product image (first in array, or placeholder if none)
- Title
- Price: **₹{price}**
- Category badge (colored pill)
- **"View Details"** button → navigate to `/product/:id`

---

### 6.6 ProductDetailPage.jsx
**Route:** `/product/:id` | **Auth:** Verified student only

**What to show:**
- Image display — if multiple images, show thumbnails below main image (click to switch)
- Title, price (large, bold), category badge
- Description
- Seller name (just the name, not contact info)
- Buttons:
  - **"Add to Cart"** → calls cart API
  - **"♡ Wishlist"** → calls wishlist API (toggle filled/unfilled heart)
  - **"Chat with Seller"** → navigate to `/chat?roomId={currentUserId}_{productId}`
- If the logged-in user is the seller → show **"Edit / Delete"** instead of the above buttons

**API Calls:**
```js
GET    /api/products/:id             → fetch product on page load
POST   /api/cart/:productId          → add to cart
POST   /api/wishlist/:productId      → add to wishlist
DELETE /api/wishlist/:productId      → remove from wishlist
```

---

### 6.7 SellPage.jsx
**Route:** `/sell` | **Auth:** Verified student only

**What to show:**
A form to create a new product listing:

| Field | Type | Notes |
|---|---|---|
| Title | Text input | Required |
| Description | Textarea | Required |
| Price | Number input | In ₹, required |
| Category | Dropdown | Books, Electronics, Notes, Stationery, Hostel, Other |
| Images | `ImageUploader` component | Max 3 images, uploaded to Firebase Storage |

- **"Post Listing"** submit button
- Show a loading spinner while submitting
- Show success message / redirect after success

**How it works:**
```jsx
const [imageUrls, setImageUrls] = useState([]);

// 1. ImageUploader uploads to Firebase, gives back URLs
// 2. On submit:
const handleSubmit = async () => {
  if (imageUrls.length === 0) return alert("Please upload at least one image");
  const data = { title, description, price, category, images: imageUrls };
  await createListing(data);   // from api.js
  navigate('/my-listings');
};
```

**API Call:**
```js
POST /api/products    → body: { title, description, price, category, images: [url1, url2] }
```

---

### 6.8 MyListingsPage.jsx
**Route:** `/my-listings` | **Auth:** Verified student only

**What to show:**
- Page heading: "My Listings"
- Grid or list of the user's own products
- Each card shows:
  - Image, title, price
  - Status badge: **Available** (green) or **Sold** (grey)
  - **"Mark as Sold"** button (only if status is "available")
  - **"Delete"** button (red, with a confirmation prompt)
- Empty state: "You haven't listed anything yet. Sell something!"

**API Calls:**
```js
GET    /api/products/my/listings     → fetch on page load
PATCH  /api/products/:id/sold        → on "Mark as Sold" click
DELETE /api/products/:id             → on "Delete" click (ask "Are you sure?" first)
```

---

### 6.9 CartPage.jsx
**Route:** `/cart` | **Auth:** Verified student only

**What to show:**
- List of products in cart
- Each row: thumbnail, title, price, **"Remove"** button
- Total price at bottom (sum of all item prices)
- Note below total: *"To complete your purchase, chat with the seller directly."*
- Empty state: "Your cart is empty"

**API Calls:**
```js
GET    /api/cart                     → fetch cart on page load
DELETE /api/cart/:productId          → remove item on button click
```

---

### 6.10 WishlistPage.jsx
**Route:** `/wishlist` | **Auth:** Verified student only

**What to show:**
- Grid of saved products (same card style as BrowsePage)
- Each card has a filled ♥ icon — clicking it removes from wishlist
- **"View Details"** button navigates to product detail
- Empty state: "You haven't saved anything yet"

**API Calls:**
```js
GET    /api/wishlist                 → fetch on page load
DELETE /api/wishlist/:productId      → remove on heart click
```

---

### 6.11 ChatPage.jsx
**Route:** `/chat?roomId=abc_xyz` | **Auth:** Verified student only

**What to show:**
- Header: product title (fetch from product detail if you have the productId)
- Message history (scrollable area)
  - Your messages: right-aligned, blue bubble
  - Their messages: left-aligned, grey bubble
  - Timestamp below each message
- Fixed bottom bar: text input + **"Send"** button

**How it works with Socket.IO:**
```jsx
import socket from '../socket';
import { getChatHistory } from '../services/api';

const roomId = new URLSearchParams(window.location.search).get('roomId');

useEffect(() => {
  // Load history from DB
  getChatHistory(roomId).then(res => setMessages(res.data));

  // Join the socket room
  socket.emit('join_room', { roomId });

  // Listen for new messages
  socket.on('receive_message', (msg) => {
    setMessages(prev => [...prev, msg]);
  });

  // Cleanup when leaving the page
  return () => socket.off('receive_message');
}, [roomId]);

const handleSend = () => {
  if (!text.trim()) return;
  socket.emit('send_message', { roomId, senderId: user._id, text });
  setText('');
};
```

**API Call:**
```js
GET /api/chat/:roomId    → load message history on page open
```

**Important:** Auto-scroll to bottom when new messages arrive:
```jsx
const bottomRef = useRef(null);
useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
// Place <div ref={bottomRef} /> at the bottom of the messages list
```

---

### 6.12 SoldDashboardPage.jsx
**Route:** `/sold` | **Auth:** Verified student only

**What to show:**
- Page heading: "Sold Items"
- Summary card at top: **Total Earned: ₹{sum}**
- Table or card list of sold items:
  - Product image thumbnail
  - Title
  - Price
  - Date marked as sold
- Empty state: "You haven't sold anything yet"

**API Call:**
```js
GET /api/products/my/sold    → fetch seller's sold items
```

---

### 6.13 DeanLoginPage.jsx
**Route:** `/admin/login` | **Auth:** Public

**What to show:**
- Heading: "Dean / Admin Login"
- Email input
- Password input
- **"Login"** button
- Error message if wrong credentials

**How it works:** Same Firebase `signInWithEmailAndPassword` flow as student login, but the backend identifies them as a dean based on their MongoDB record and returns `role: "dean"`. After login, redirect to `/admin/dashboard`.

---

### 6.14 DeanDashboardPage.jsx
**Route:** `/admin/dashboard` | **Auth:** Dean only

**What to show:**

**If the dean has NOT yet created a college:**
- Show a form: "Set Up Your College Profile"
  - College Name (text)
  - Email Domain (text, e.g. `@mitcollege.edu.in`)
  - City (text)
  - **"Create College"** button
- After submit → refresh the page to show the dashboard

**If the dean HAS a college already:**
- College info card: name, domain, city (read-only)
- Stats row:
  - Pending Approval: **{count}** (in amber)
  - Verified Students: **{count}** (in green)
- Button: **"Review Pending Students"** → navigate to `/admin/students`

**API Calls:**
```js
GET  /api/college/mine     → get dean's college info (null if not created yet)
POST /api/college          → create college profile
GET  /api/dean/students/unverified  → get count for the stats
GET  /api/dean/students/all         → get count for the stats
```

---

### 6.15 StudentTablePage.jsx
**Route:** `/admin/students` | **Auth:** Dean only

**What to show:**
- Two tabs: **"Pending Approval"** | **"All Students"**
- Table with columns:

| Name | Email | Roll Number | Registered On | Status | Action |
|---|---|---|---|---|---|

- On **Pending tab**: Action = green **"Approve"** button
- On **All Students tab**: Show status badge, no action button needed
- After approving: remove from the pending list immediately (update state)

**API Calls:**
```js
GET   /api/dean/students/unverified      → populate Pending tab
GET   /api/dean/students/all             → populate All Students tab
PATCH /api/dean/students/:id/verify      → on Approve click
```

---

## 7. Navbar Component

The navbar changes based on who is logged in.

**Student (verified):**
```
[Logo] Browse | Sell | My Listings | Cart(badge) | Wishlist | Chat    [Avatar ▼]
                                                              Dropdown: Sold Dashboard | Logout
```

**Dean:**
```
[Logo] Dashboard | Students                                            [Dean Name | Logout]
```

**Not logged in:**
```
[Logo]                                                          Login | Register
```

---

## 8. Design System

### Color Palette
```
Primary Blue:    #1E40AF   ← main buttons, links, accents
Amber Accent:    #F59E0B   ← pending badges, highlights
Background:      #F1F5F9   ← page background
Card Surface:    #FFFFFF   ← cards, modals
Text Dark:       #0F172A   ← headings
Text Muted:      #64748B   ← secondary text, labels
Success Green:   #16A34A   ← verified badge, available status, approve button
Danger Red:      #DC2626   ← delete button, error messages
Border:          #E2E8F0   ← card borders, dividers
```

### Component Styles (Tailwind)

**Card:**
```
bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow
```

**Primary Button:**
```
bg-blue-700 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-800 transition-colors
```

**Danger Button:**
```
bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600
```

**Ghost Button:**
```
border border-blue-700 text-blue-700 rounded-lg px-4 py-2 hover:bg-blue-50
```

**Status Badges:**
```
Available:   bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-semibold
Sold:        bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 text-xs font-semibold
Unverified:  bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-xs font-semibold
Verified:    bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-semibold
```

**Category Badge:**
```
bg-blue-50 text-blue-600 rounded-full px-3 py-0.5 text-xs font-medium
```

### Layout
- Page max width: `max-w-6xl mx-auto px-4`
- Product grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Navbar: `sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm`

---

## 9. Always Handle Loading and Errors

Every page that fetches data must handle these states:

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchSomething()
    .then(res => setData(res.data))
    .catch(() => setError("Failed to load. Please try again."))
    .finally(() => setLoading(false));
}, []);

if (loading) return <Loader />;
if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
```

---

## 10. Pre-submission Checklist for Every Page

- [ ] Data loaded in `useEffect` where needed?
- [ ] Loading and error states handled?
- [ ] All buttons have `onClick` handlers?
- [ ] Correct API function imported from `services/api.js`?
- [ ] Redirects work after actions (submit, approve, delete)?
- [ ] Empty state shown when list is empty?
- [ ] Looks okay on mobile (check by shrinking browser width)?
