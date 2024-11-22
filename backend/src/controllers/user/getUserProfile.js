import User from '../../models/user.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // `req.user` comes from middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user profile' });
  }
};
