
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
// Attach the JWT (issued by our backend on login) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the JWT is invalid/expired, clear the session and send the user back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const deanLogin = (firebaseToken) => api.post('/auth/dean/login', { firebaseToken });
export const studentRegister = (data) => api.post('/auth/student/register', data);
export const studentLogin = (firebaseToken) => api.post('/auth/student/login', { firebaseToken });

// College
export const getColleges = () => api.get('/college');
export const createCollege = (data) => api.post('/college', data);
export const getMyCollege = () => api.get('/college/mine');

// Dean — student management
export const getUnverifiedStudents = () => api.get('/dean/students/unverified');
export const getAllStudents = () => api.get('/dean/students/all');
export const approveStudent = (id) => api.patch(`/dean/students/${id}/verify`);

// Products
export const getProducts = (category) => api.get('/products', { params: category ? { category } : {} });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createListing = (data) => api.post('/products', data);
export const markProductAsSold = (id) => api.patch(`/products/${id}/sold`);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getMyListings = () => api.get('/products/my/listings');
export const getMySoldItems = () => api.get('/products/my/sold');

// Wishlist
export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (productId) => api.post(`/wishlist/${productId}`);
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId) => api.post(`/cart/${productId}`);
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);

// Chat
export const getChatHistory = (roomId) => api.get(`/chat/${roomId}`);

export default api;
