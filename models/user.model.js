import mongoose from "mongoose";
// User schema
const userScheme = new  mongoose.Schema({
    // Define properties
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6
    }
}, {timestamps: true});
// New model with user schema
const User = mongoose.model('User', userScheme);

export default User;