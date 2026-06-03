# components/

Small reusable pieces used across multiple pages. Each file is one component.

## Files to create

### Navbar.jsx
The top navigation bar. Changes based on who is logged in:
- **Not logged in** → shows Login and Register links
- **Student (verified)** → shows Browse, Sell, My Listings, Cart, Wishlist links + avatar dropdown with "Sold Dashboard" and "Logout"
- **Dean** → shows Dashboard, Students links + Logout

Get the logged-in user from `useAuth()` (see `context/AuthContext.jsx`).

### ProductCard.jsx
A card that displays a single product in the Browse and Wishlist grids.

Shows: product image (first in the images array, or a placeholder), title, price (₹), category badge, and a "View Details" button that goes to `/product/:id`.

Props it receives: `product` (the full product object from the API).

### Loader.jsx
A simple centered loading spinner. Show this while any page is fetching data from the API.

No props needed.

### ImageUploader.jsx
Handles uploading images to Firebase Storage. Used only in `SellPage.jsx`.

- Lets the user pick up to 3 image files
- Uploads each file to Firebase Storage and gets back a public URL
- Calls `onUploadComplete([url1, url2, ...])` when all uploads finish

Props: `onUploadComplete` (function), `maxImages` (number, default 3).

Your senior has set up Firebase Storage — import `storage` from `../firebase`.

### ProtectedRoute.jsx
A wrapper component that guards pages from being accessed without login.

- If no user is logged in → redirect to `/login`
- If student is `unverified` → redirect to `/pending`
- If a `role` prop is passed and the user's role doesn't match → redirect to `/`

Your senior writes this. You just use it in `App.jsx` like:
```jsx
<Route path="/browse" element={<ProtectedRoute role="student"><BrowsePage /></ProtectedRoute>} />
```
