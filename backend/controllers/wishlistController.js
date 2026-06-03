import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate('productIds');
    res.json(wishlist?.productIds || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user._id },
      { $addToSet: { productIds: req.params.productId } },
      { upsert: true, new: true }
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { productIds: req.params.productId } },
      { new: true }
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
