import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { token, user: newUser },
    });
  } catch (error) {
    next(error);
  }
};


export const signIn = async (req, res, next) =>{
// Sign in logic
try {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email });
  // If doesn't exist
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  // If does exist, validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // If not valid
  if (!isPasswordValid) {
    const error = new Error('Invalid Password');
    error.statusCode = 401;
    throw error;
  }
  // If password is valid, generate new token
  const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
  // Response
  res.status(200).json({
    success: true,
    message: 'User signed in successfully',
    data: {
      token,
      user
    }
  })
} catch (error) {
  next(error);
}

}
export const signOut = async (req, res, next) =>{
// Sign out logic
res.send('Sign in logic');

}