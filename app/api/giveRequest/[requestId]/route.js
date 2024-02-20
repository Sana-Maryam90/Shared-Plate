import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import { connectDb } from '@/helper/db';

export async function GET(request,{params}) {
    try {
        await connectDb();

        //Extract the giveRequest ID from the URL parameters
        const { requestId } = await params;

        // Query the database for the giveRequest with the specified ID
        const giveRequest = await GiveRequest.findById(requestId);

        // If the giveRequest is not found, return a 404 Not Found response
        if (!giveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }

        // Filter out id and giverId fields from the giveRequest object
        const filteredGiveRequest = {
            name: giveRequest.name,
            givingOrg: giveRequest.givingOrg,
            contact: giveRequest.contact,
            foodType: giveRequest.foodType,
            foodServing: giveRequest.foodServing,
            availability: giveRequest.availability,
            landmark: giveRequest.landmark,
            comments: giveRequest.comments,
            location: giveRequest.location,
            status: giveRequest.status,
            createdAt: giveRequest.createdAt,
            closedAt: null,
            volunteerId: null
        };

        // Return the filtered giveRequest in the response
        return NextResponse.json({ giveRequest: filteredGiveRequest }, { status: 200 });
    } catch (error) {
        console.error('Error fetching give request:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import { connectDb } from '@/helper/db';


// export async function GET(request) {
//     try {
//         await connectDb();

//         // Extract the giveRequest ID from the request header
//         const requestId = await request.params;

//         // Query the database for the giveRequest with the specified ID
//         const giveRequest = await GiveRequest.findById(requestId);

//         // If the giveRequest is not found, return a 404 Not Found response
//         if (!giveRequest) {
//             return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
//         }

//         // Filter out id and giverId fields from the giveRequest object
//         const filteredGiveRequest = {
//             name: giveRequest.name,
//             givingOrg: giveRequest.givingOrg,
//             contact: giveRequest.contact,
//             foodType: giveRequest.foodType,
//             foodServing: giveRequest.foodServing,
//             availability: giveRequest.availability,
//             landmark: giveRequest.landmark,
//             comments: giveRequest.comments,
//             location: giveRequest.location,
//             status: giveRequest.status,
//             createdAt: giveRequest.createdAt,
//             closedAt: null,
//             volunteerId: null
//         };

//         // Return the filtered giveRequest in the response
//         return NextResponse.json({ giveRequest: filteredGiveRequest }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching give request:', error);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

