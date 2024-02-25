import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import Taker from '@/models/taker';
import User from '@/models/user'; 
import { connectDb } from '@/helper/db';
import transporter from '@/helper/nodemailer';

export async function POST(request) {
    try {
        await connectDb();

        // Extract the data from the request body
        const { userId, requestId } = await request.json();

        // Find the giveRequest by requestId
        const giveRequest = await GiveRequest.findById(requestId);

        if (!giveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }

        // Update the volunteerId field in the giveRequest document with the taker's userId
        const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
            requestId,
            { volunteerId: userId, status: 'ongoing' },
            { new: true }
        );
        
        // If the giveRequest document was not found, return a 404 Not Found response
        if (!updatedGiveRequest) {
            return NextResponse.json({ message: 'Give request not updated' }, { status: 404 });
        }

        // Find the taker by userId
        const taker = await Taker.findOne({ userId });

        if (!taker) {
            return NextResponse.json({ message: 'Taker not found' }, { status: 404 });
        }

        // Fetch the email of the taker from the User collection
        const takerUser = await User.findById(userId);

        if (!takerUser) {
            return NextResponse.json({ message: 'Taker not found in User collection' }, { status: 404 });
        }

        const takerEmail = takerUser.email;

        // Construct Google Maps link using latitude and longitude
        const mapLink = `https://www.google.com/maps?q=${giveRequest.location.latitude},${giveRequest.location.longitude}`;

        // Send an email to the taker informing them that their request has been accepted
        const mailOptions = {
            from: process.env.EMAIL,
            to: takerEmail,
            subject: 'Your request has been accepted',
            html: `
            <div>
                <p>Your request has been accepted by ${giveRequest.name}.</p>
                <p>Details of the give request:</p>
                <ul>
                    <li>Name: ${giveRequest.name}</li>
                    <li>Giving Organization: ${giveRequest.givingOrg}</li>
                    <li>Contact: ${giveRequest.contact}</li>
                    <li>Food Type: ${giveRequest.foodType}</li>
                    <li>Food Serving: ${giveRequest.foodServing}</li>
                    <li>Availability: ${giveRequest.availability}</li>
                    <li>Landmark: ${giveRequest.landmark}</li>
                    <li>Comments: ${giveRequest.comments}</li>
                    <li>Location: <a href="${mapLink}" style="color: #007bff; text-decoration: none;">View Location on Map</a></li>
                </ul>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);

        // Return a success response
        return NextResponse.json({ message: `Give request of ${giveRequest.name} is successfully taken by ${taker.name}` }, { status: 200 });
    } catch (error) {
        console.error('Error accepting give request:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import Taker from '@/models/taker';
// import { connectDb } from '@/helper/db';
// import transporter from '@/helper/nodemailer';
// import User from "@/models/user";

// export async function POST(request){
//     try{
//         await connectDb();

//         // Extract the data from the request body
//         const { userId, requestId} = await request.json(); //userId of taker

//         const giver = await GiveRequest.findById(requestId);

//         // Update the volunteerId field in the giveRequest document with the taker's userId
//         const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
//             requestId,
//             { volunteerId: userId , status: 'ongoing' },
//             { new: true }
//         );

//         const taker = await Taker.findOne({userId});
    
//         // If the giveRequest document was not found, return a 404 Not Found response
//         if (!updatedGiveRequest) {
//             return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
//         }

//         // Send an email to the taker informing them that their request has been accepted
//         const takerEmail = taker.email;

//         const takerMailOptions = {
//             from: process.env.EMAIL,
//             to: takerEmail,
//             subject: 'Your request has been accepted',
//             text: 'Your request has been accepted.',
//             html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0;">
//                 <h2 style="color: #333333;">Your request has been accepted</h2>
//                 <hr style="border: 0; border-top: 1px solid #e0e0e0;">
//                 <p style="color: #666666;">Dear ${taker.name},</p>
//                 <p style="color: #666666;">Please view the details below: </p>
//                 <div style="background-color: #f9f9f9; padding: 10px; margin: 10px 0;">
//                     <h3 style="color: #333333; margin-bottom: 10px;">User Details:</h3>
//                     <ul style="list-style: none; padding: 0; margin: 0;">
//                         <li style="margin-bottom: 5px; color: #666666;"><strong>Name:</strong> ${giver.name}</li>
//                         <li style="margin-bottom: 5px; color: #666666;"><strong>Contact:</strong> ${contact}</li>
//                         <li style="margin-bottom: 5px; color: #666666;"><strong>Comment:</strong> ${comment}</li>
//                         <li style="margin-bottom: 5px; color: #666666;"><strong>Location:</strong> <a href="${mapLink}" style="color: #007bff; text-decoration: none;">View Location on Map</a></li>
//                     </ul>
//                     <button id="acceptRequestButton">Accept Request</button>
//                 </div>
//                 <p style="color: #666666;">Thank you for your generosity.</p>
//                 <p style="color: #666666;">Best regards,<br><strong>Team SharedPlate</strong></p>
//             </div>
//         `
//         };

//         await transporter.sendMail(takerMailOptions);
    
//         // Return a success response
//         return NextResponse.json({ message: `Give request of ${giver.name} is successfully taken by ${taker.name}` }, { status: 200 });

//     }catch (error) {
//     console.error('Error taking give request:', error);
//     // Handle errors and return appropriate response
//     return NextResponse.json({ message: error.message }, { status: 500 });
// }
// }