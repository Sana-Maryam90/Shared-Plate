import nodemailer from 'nodemailer';

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    //host: 'smtp.example.com', // SMTP server hostname
    //port: 587, // Port for SMTP
    //secure: false, // True for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
    //tls: {
    //    rejectUnauthorized: false // Allow insecure connections (only for development)
    //}
});

export default transporter;

