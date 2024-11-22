import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

    
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    res.status(201).json({ token, user: { ...newUser.toJSON(), password: undefined } }); // Ensure password is not returned
  } catch (error) {
    console.error("Registration error:", error.message); // Log error
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};
