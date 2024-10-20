import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import Taker from '@/models/taker';
import User from '@/models/user'; // Import the User model
import { connectDb } from '@/helper/db';
import transporter from '@/helper/nodemailer'; // Import the transporter

export async function POST(request) {
    try {
        await connectDb();

        // Extract the data from the request body
        const { userId, requestId, name, contact, comment, location } = await request.json();

        // Find the give request by requestId to get the giverId
        const giveRequest = await GiveRequest.findById(requestId);

        if (!giveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }

        // Get the giverId from the give request
        const { giverId } = giveRequest;

        // Find the giver in the User collection using the giverId
        const giver = await User.findById(giverId);

        if (!giver) {
            return NextResponse.json({ message: 'Giver not found' }, { status: 404 });
        }

        // Extract the giver's email address
        const giverEmail = giver.email;

        // Check if the user already exists in the taker collection
        let existingTaker = await Taker.findOne({ userId });

        // If the user already exists in the taker collection, update the contact and location
        if (existingTaker) {
            existingTaker.comment = comment;
            existingTaker.contact = contact;
            existingTaker.location = location;
            await existingTaker.save();
        } else {
            // If the user does not exist, create a new taker
            existingTaker = await Taker.create({ userId, name, contact, comment, location });
        }

        // Add the userId of the taker to the requestedBy field in the give request
        giveRequest.requestedBy.push(userId);
        await giveRequest.save();

        // Construct Google Maps link using latitude and longitude
        const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

        // Construct email message

        const commentHTML = comment !== undefined 
                            ? `<li style="margin-bottom: 5px; color: #666666;"><strong>Comment:</strong> ${comment}</li>` 
                            : "";

        const mailOptions = {
          from: process.env.EMAIL, // Sender email address
          to: giverEmail, // Receiver email address (giver's email)
          subject: "New Take Request", // Email subject
          text: `A new user wants to take on your give request. User details: Name - ${name}, Contact - ${contact}, Comment - ${comment}, Location - ${location}`, // Plain text body
          // HTML body can be added if needed
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333333;">New Take Request</h2>
                <hr style="border: 0; border-top: 1px solid #e0e0e0;">
                <p style="color: #666666;">Dear ${giver.name},</p>
                <p style="color: #666666;">A new user is interested in taking on your give request.</p>
                <div style="background-color: #f9f9f9; padding: 10px; margin: 10px 0;">
                    <h3 style="color: #333333; margin-bottom: 10px;">User Details:</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Name:</strong> ${name}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Contact:</strong> ${contact}</li>
                        ${commentHTML}
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Location:</strong> <a href="${mapLink}" style="color: #007bff; text-decoration: none;">View Location on Map</a></li>
                    </ul>
                    <button style="margin-top: 14px; margin-bottom: 14px; color: #f9f9f9; background-color: #149954; padding: 4px 8px;">Accept Request</button>

                </div>
                <p style="color: #666666;">Thank you for your generosity.</p>
                <p style="color: #666666;">Best regards,<br><strong>Team SharedPlate</strong></p>
            </div>
        `,
        };

        // Send email notification to the giver
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email notification sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email notification:', error);
        return NextResponse.json({ message: 'Failed to send email notification' }, { status: 500 });
    }
}


// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import Taker from '@/models/taker';
// import { connectDb } from '@/helper/db';
// import { transporter } from '@/helper/nodemailer';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Extract the data from the request body
//         const { userId, requestId, name, contact, location } = await request.json();

//         // Construct email message
//         const mailOptions = {
//             from: 'your-email@example.com', // Sender email address
//             to: 'giver-email@example.com', // Receiver email address
//             subject: 'New Take Request', // Email subject
//             text: 'A new user wants to take on your give request.', // Plain text body
//             html: '<p>A new user wants to take on your give request.</p>' // HTML body (optional)
//         };

//         // Check if the user already exists in the taker collection
//         const existingTaker = await Taker.findOne({ userId });

//         // If the user already exists in the taker collection, proceed to the next step
//         if (!existingTaker) {
//             // Add the user to the taker collection
//             await Taker.create({ userId, name, contact, location });
//         }

//         //its not working
//         else if(existingTaker){
//             await Taker.findByIdAndUpdate(
//                 userId,
//                 { contact: contact},
//                 {location: location}
//             );
//         }

//             // Send email
//         await transporter.sendMail(mailOptions);

//         return NextResponse.json({ message: 'Email notification sent successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error sending email notification:', error);
//         return NextResponse.json({ message: 'Failed to send email notification' }, { status: 500 });
//     }

//         const giver = await GiveRequest.findById(requestId);

//         // Update the volunteerId field in the giveRequest document with the taker's userId
//         const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
//             requestId,
//             { volunteerId: userId },
//             { new: true }
//         );

//         // If the giveRequest document was not found, return a 404 Not Found response
//         if (!updatedGiveRequest) {
//             return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
//         }

//         // Return a success response
//         return NextResponse.json({ message: `Give request of ${giver.name} is successfully taken by ${name}` }, { status: 200 });
//     } catch (error) {
//         console.error('Error taking give request:', error);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }


// import { connectDb } from "@/helper/db";
// import Taker from "@/models/taker";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import User from "@/models/user";

// export async function POST(request){
//     try {

//         await connectDb();

//         // Extract the giver's data from the request
//         const { userId, requestId, name, contact, location } = await request.json();

//         // Ensure userId is properly formatted as ObjectId
//         const validUserId = new mongoose.Types.ObjectId(userId);

//         const userfound = await User.findById(validUserId);

//         // Create a new taker document
//         const newTaker = new Taker({
//             userId: validUserId,
//             name,
//             contact,
//             location,
//             // Other fields as needed
//         });

//         // Save the taker document to the database
//         await newTaker.save();
//         return NextResponse.json({ message: 'Taker added successfully' }, {status: 201});
//     } catch (error) {
//         console.error('Error adding taker:', error);
//         return NextResponse.json({ message: error.message },{status: 500});
//     }
// }
