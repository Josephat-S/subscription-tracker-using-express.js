import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER } from './env.js';

// Export account email
export const accountEmail = EMAIL_USER;
// Create transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
});
export default transporter;