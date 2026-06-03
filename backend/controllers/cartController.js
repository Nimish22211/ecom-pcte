import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(cart?.items || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $addToSet: { items: { productId: req.params.productId } } },
      { upsert: true, new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { items: { productId: req.params.productId } } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
