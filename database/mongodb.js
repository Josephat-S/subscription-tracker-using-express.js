import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js';

// Check if there is a DB URI
if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}
// Connect to DB
const connectToDatabase = async () =>{
    try {
        // connect to DB using mongoose ORM
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode!`);
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
}
export default connectToDatabase;