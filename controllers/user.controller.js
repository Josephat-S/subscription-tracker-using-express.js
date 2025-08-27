import User from "../models/user.model.js";
// GET all users
export const getUsers = async (req, res, next) =>{
    try {
        // find all users
        const users = await User.find();
        // Response
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }
}
// GET specific user
export const getUser = async (req, res, next) =>{
    try {
        // find  user
        const user = await User.findById(req.params.id).select('-password');
        // If user not found
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        // Response
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}
