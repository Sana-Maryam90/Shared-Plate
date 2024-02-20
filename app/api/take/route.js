import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import Taker from '@/models/taker';
import { connectDb } from '@/helper/db';

export async function POST(request) {
    try {
        await connectDb();

        // Extract the data from the request body
        const { userId, requestId, name, contact, location } = await request.json();

        // Check if the user already exists in the taker collection
        const existingTaker = await Taker.findOne({ userId });

        // If the user already exists in the taker collection, proceed to the next step
        if (!existingTaker) {
            // Add the user to the taker collection
            await Taker.create({ userId, name, contact, location });
        }

        const giver = await GiveRequest.findById(requestId);

        // Update the volunteerId field in the giveRequest document with the taker's userId
        const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
            requestId,
            { volunteerId: userId },
            { new: true }
        );

        // If the giveRequest document was not found, return a 404 Not Found response
        if (!updatedGiveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }

        // Return a success response
        return NextResponse.json({ message: `Give request of ${giver.name} is successfully taken by ${name}` }, { status: 200 });
    } catch (error) {
        console.error('Error taking give request:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


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
