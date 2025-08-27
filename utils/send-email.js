import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription}) => {
    if(!to || !type) throw new Error("Missing required parameters");
    // If xeists
    const template = emailTemplates.find((t) => t.label === type);
    // Check if we have it
    if(!template) throw new Error("Invalid email type");
    // Full user info
    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod
    }
    // Message
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    // Mail options
    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
    
}