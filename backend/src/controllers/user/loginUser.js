import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sanitizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    const { password: userPassword, ...safeUser } = user.toJSON();

    // Respond with token and user data
    res.status(200).json({ token, user: safeUser });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};
