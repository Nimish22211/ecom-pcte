# pages/

One file per page/screen. Each page is a React component that renders what the user sees at that URL.

## Files to create

### LandingPage.jsx — Route: `/` (public)
The home screen. Shows the app name "CampusCart", tagline "Buy & sell within your campus", two buttons (Login → `/login`, Register → `/register`), and a small "Dean login →" link at the bottom going to `/admin/login`. Full-height centered layout.

No API calls.

---

### LoginPage.jsx — Route: `/login` (public)
Email + password login form for students. On submit:
1. Call Firebase `signInWithEmailAndPassword(auth, email, password)`
2. Get the token: `result.user.getIdToken()`
3. Call `studentLogin(token)` from `services/api.js`
4. Store result in AuthContext via `login(data.user, data.token)`
5. If `status === "unverified"` → redirect to `/pending`, else → `/browse`

Show an error message if login fails.

---

### RegisterPage.jsx — Route: `/register` (public)
Registration form: Full Name, Roll Number, Email, Password, College (dropdown).

On page load: fetch colleges with `getColleges()` to populate the dropdown.

On submit:
1. Call Firebase `createUserWithEmailAndPassword(auth, email, password)`
2. Get the token from the result
3. Call `studentRegister({ firebaseToken, name, rollNumber, collegeId })`
4. Redirect to `/pending`

Show an error if the email domain doesn't match the college.

---

### PendingPage.jsx — Route: `/pending` (any logged-in user)
Shows a waiting message. Display the user's name and email from `useAuth()`. Has a Logout button. No API calls.

---

### BrowsePage.jsx — Route: `/browse` (verified students only)
Product grid with search bar and category tabs (All, Books, Electronics, Notes, Stationery, Hostel, Other).

On page load: call `getProducts()`. When a category tab is clicked: call `getProducts(category)`. Use `<ProductCard>` for each item. Show `<Loader>` while loading. Show "No listings found" if empty.

---

### ProductDetailPage.jsx — Route: `/product/:id` (verified students only)
Shows full details of one product. Get the `:id` from the URL with `useParams()`.

On page load: call `getProductById(id)`. Shows images, title, price, description, seller name.

Buttons:
- **Add to Cart** → `addToCart(id)`
- **♡ Wishlist** → `addToWishlist(id)` or `removeFromWishlist(id)` (toggle)
- **Chat with Seller** → navigate to `/chat?roomId={currentUser._id}_{productId}`
- If the logged-in user is the seller → show "Mark as Sold" and "Delete" instead

---

### SellPage.jsx — Route: `/sell` (verified students only)
Form to create a new listing: Title, Description, Price, Category dropdown, ImageUploader component (max 3 images).

On submit: call `createListing({ title, description, price, category, images: imageUrls })`. Redirect to `/my-listings` after success.

---

### MyListingsPage.jsx — Route: `/my-listings` (verified students only)
Shows the logged-in user's own product listings.

On page load: call `getMyListings()`. Each card shows image, title, price, status badge, "Mark as Sold" button (if available), and "Delete" button (with a confirm dialog).

---

### CartPage.jsx — Route: `/cart` (verified students only)
Shows items in the cart.

On page load: call `getCart()`. Each row shows thumbnail, title, price, and a "Remove" button that calls `removeFromCart(productId)`. Show total price at the bottom. Add a note: "To complete your purchase, chat with the seller directly."

---

### WishlistPage.jsx — Route: `/wishlist` (verified students only)
Grid of saved products (same card style as BrowsePage).

On page load: call `getWishlist()`. Each card has a filled ♥ that removes it from wishlist when clicked. "View Details" button navigates to the product page.

---

### ChatPage.jsx — Route: `/chat?roomId=...` (verified students only)
Real-time chat between buyer and seller for a specific product.

Get `roomId` from the URL query string: `new URLSearchParams(window.location.search).get('roomId')`.

On page load: call `getChatHistory(roomId)` to load past messages. Then join the Socket.IO room with `socket.emit('join_room', { roomId })`. Listen for new messages with `socket.on('receive_message', ...)`.

Bottom bar: text input + Send button. On send: `socket.emit('send_message', { roomId, senderId: user._id, text })`.

Your messages go on the right (blue). Their messages go on the left (grey). Auto-scroll to bottom when messages arrive.

---

### SoldDashboardPage.jsx — Route: `/sold` (verified students only)
Shows the seller's sold items and total earnings.

On page load: call `getMySoldItems()`. Show a "Total Earned: ₹{sum}" card at the top. List each sold item with image, title, price, and date.

---

## Subfolder

See `admin/README.md` for the three dean-only pages.
