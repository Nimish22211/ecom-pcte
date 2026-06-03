# services/

All API calls live here. **Never write `axios.get()` directly inside a page.** Import the function you need instead.

## Files to create

### api.js
Your senior writes this file. It exports one function per API endpoint.

**You just import and call the function:**

```jsx
import { getProducts, addToCart, getWishlist } from '../services/api';

// In useEffect (runs when page loads):
useEffect(() => {
  getProducts().then(res => setProducts(res.data));
}, []);

// In a button click handler:
const handleAdd = () => {
  addToCart(productId).then(() => alert('Added to cart!'));
};
```

**Available functions (your senior fills these in):**

| Function | What it does |
|---|---|
| `getColleges()` | Get list of all colleges (for register dropdown) |
| `studentRegister(data)` | Register a new student |
| `studentLogin(firebaseToken)` | Login as student |
| `deanLogin(firebaseToken)` | Login as dean |
| `getProducts(category)` | Get all available products (optional category filter) |
| `getProductById(id)` | Get one product by ID |
| `createListing(data)` | Create a new product listing |
| `markProductAsSold(id)` | Mark a product as sold |
| `deleteProduct(id)` | Delete a listing |
| `getMyListings()` | Get logged-in seller's listings |
| `getMySoldItems()` | Get logged-in seller's sold items |
| `getWishlist()` | Get wishlist |
| `addToWishlist(productId)` | Add product to wishlist |
| `removeFromWishlist(productId)` | Remove from wishlist |
| `getCart()` | Get cart items |
| `addToCart(productId)` | Add product to cart |
| `removeFromCart(productId)` | Remove from cart |
| `getChatHistory(roomId)` | Load chat messages for a room |
| `getMyCollege()` | Dean: get their college info |
| `createCollege(data)` | Dean: create college profile |
| `getUnverifiedStudents()` | Dean: get pending students |
| `getAllStudents()` | Dean: get all students |
| `approveStudent(id)` | Dean: approve a student |
