import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import { connectDb } from '@/helper/db';

export async function POST(request) {
    try {
        await connectDb();

        // Extract the userId from the request body
        const { userId } = await request.json();

        // Find all closed requests where the user acted as a giver
        const giverRequests = await GiveRequest.find({
            giverId: userId,
            status: 'closed'
        });

        // Find all closed requests where the user acted as a taker (volunteer)
        const takerRequests = await GiveRequest.find({
            volunteerId: userId,
            status: 'closed'
        });

        // Find ongoing requests for the user as a giver or taker
        const ongoingRequests = await GiveRequest.find({
            $or: [
                { giverId: userId, status: 'open' },
                { volunteerId: userId, status: 'open' }
            ]
        });

        // Return the requests in the response
        return NextResponse.json({ giverRequests, takerRequests, ongoingRequests }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user requests:', error.message);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}




// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import { connectDb } from '@/helper/db';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Extract the userId from the request body
//         const { userId } = await request.json();

//         // Count how many times the user acted as a giver in closed requests
//         const giverCount = await GiveRequest.countDocuments({
//             giverId: userId,
//             status: 'closed'
//         });

//         // Count how many times the user acted as a taker (volunteer) in closed requests
//         const takerCount = await GiveRequest.countDocuments({
//             volunteerId: userId,
//             status: 'closed'
//         });

//         // Check if there are ongoing requests for the user as a giver or taker
//         const ongoingRequests = await GiveRequest.countDocuments({
//             $or: [
//                 { giverId: userId, status: 'open' },
//                 { volunteerId: userId, status: 'open' }
//             ]
//         });

//         // Return the counts and ongoing requests in the response
//         return NextResponse.json({ giverCount, takerCount, ongoingRequests }, { status: 200 });
//     } catch (error) {
//         console.error('Error counting user actions:', error);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }
