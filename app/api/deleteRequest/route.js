import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import { connectDb } from '@/helper/db';

export async function POST(request) {
    try {
        await connectDb();

        // Get the current time
        const currentTime = new Date();

        // Fetch all giveRequests
        const allRequests = await GiveRequest.find({});

        // Filter giveRequests that have availability time less than current time
        const overdueRequests = allRequests.filter(request => {
            const availabilityTime = new Date(request.availability);
            //console.log(availabilityTime);

            return availabilityTime < currentTime;
        });

        console.log(overdueRequests);

        // If no overdue requests found, return a message
        if (overdueRequests.length === 0) {
            return NextResponse.json({ message: 'No overdue giveRequests found' }, { status: 200 });
        }

        // Delete overdue giveRequests
        await Promise.all(overdueRequests.map(async (request) => {
            await GiveRequest.findByIdAndDelete(request._id);
        }));

        // Return success response
        return NextResponse.json({ message: 'Overdue giveRequests deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting overdue giveRequests:', error.message);
        // Return error response
        return NextResponse.json({ message: 'Failed to delete overdue giveRequests' }, { status: 500 });
    }
}


        

       


// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import { connectDb } from '@/helper/db';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Get the current time
//         const currentTime = new Date();

//         // Calculate the time that was 2 hours ago
//         const twoHoursAgo = new Date(currentTime.getTime() - (2 * 60 * 60 * 1000));

//         // Find giveRequests that are still open and have availability time more than 2 hours ago
//         const overdueRequests = await GiveRequest.find({
//             status: 'open',
//             availability: { $lt: twoHoursAgo }
//         });

//         // Delete overdue giveRequests
//         await Promise.all(overdueRequests.map(async (request) => {
//             await GiveRequest.findByIdAndDelete(request._id);
//         }));

//         // Return success response
//         return NextResponse.json({ message: 'Overdue giveRequests deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting overdue giveRequests:', error.message);
//         // Return error response
//         return NextResponse.json({ message: 'Failed to delete overdue giveRequests' }, { status: 500 });
//     }
// }
