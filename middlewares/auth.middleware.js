import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';
const authorize  = async (req, res, next) =>{
    try {
        let token;
        // Check for authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // If token not found
        if (!token) return res.status(401).json({ message: 'Unauthorized'});
        // if there is a token, verify it
        const decoded = jwt.verify(token, JWT_SECRET);
        // Check if user exists (from verified token)
        const user = await User.findById(decoded.userId);
        // If user doesn't exist in DB
        if (!user) return res.status(401).json({ message: 'Unauthorized'});
        // If user does exits, attach user to request
        req.user = user;
        // Next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message})
    }
}
export default authorize