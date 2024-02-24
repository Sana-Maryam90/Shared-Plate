import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import Taker from '@/models/taker';
import { connectDb } from '@/helper/db';
import User from "@/models/user";

export async function POST(request){
    try{
        await connectDb();

        // Extract the data from the request body
        const { userId, requestId} = await request.json(); //userId of taker

        const giver = await GiveRequest.findById(requestId);

        // Update the volunteerId field in the giveRequest document with the taker's userId
        const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
            requestId,
            { volunteerId: userId },
            { new: true }
        );

        const taker = await Taker.findOne({userId});
    
        // If the giveRequest document was not found, return a 404 Not Found response
        if (!updatedGiveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }
    
        // Return a success response
        return NextResponse.json({ message: `Give request of ${giver.name} is successfully taken by ${taker.name}` }, { status: 200 });

    }catch (error) {
    console.error('Error taking give request:', error);
    // Handle errors and return appropriate response
    return NextResponse.json({ message: error.message }, { status: 500 });
}
}