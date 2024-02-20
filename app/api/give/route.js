import { connectDb } from "@/helper/db";
import mongoose from "mongoose";
import Giver from "@/models/giver";
import GiveRequest from "@/models/giveRequest";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(request) {
    try {
        // Query the database for giveRequests with status "open"
        const openGiveRequests = await GiveRequest.find({ status: 'open' }, {giverId: 0});

        // Return the results in the response
        return NextResponse.json({ giveRequests: openGiveRequests }, {status: 200});
    } catch (error) {
        console.error('Error fetching open give requests:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message },{status: 500});
    }
}

export async function POST(request){
    try{   

        await connectDb();
        // Extract the giver's data from the request
        const { userId, name, givingOrg, contact, foodType, foodServing, availability, landmark, comments, location } = await request.json();

        // Check if user already exists
        const existingGiver = await Giver.findOne({ userId });
        if (!existingGiver) {
            await Giver.create({ userId, name, contact });
        }


        // // Create a new Giver document
        // const newGiver = new Giver({
        //     userId,
        //     name,
        //     contact
        // });

        // // Save the Giver document to the database
        // const savedGiver = await newGiver.save();

        // Create a new GiveRequest document referencing the Giver's ID
        const newGiveRequest = new GiveRequest({
            giverId: userId, // Reference to the newly created Giver document
            name,
            givingOrg,
            contact,
            foodType,
            foodServing,
            availability,
            landmark,
            comments,
            location,
            status: "open",
            createdAt: Date.now() ,
        });

        // Save the GiveRequest document to the database
        await newGiveRequest.save();

        return NextResponse.json({message: `Give request from ${name} saved successfully` }, { status: 201});

    }catch (error) {
        console.error('Error saving give request:', error);
        return NextResponse.json({message: error.message }, { status: 500});
    }
}