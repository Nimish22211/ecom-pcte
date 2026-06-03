export const requireVerified = (req, res, next) => {
  if (!req.user || req.user.status !== 'verified') {
    return res.status(403).json({ message: 'Account not yet approved by dean' });
  }
  next();
};
