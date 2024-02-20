import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import { connectDb } from '@/helper/db';

export async function POST(request) {
    try {
        await connectDb();

        // Extract the requestId from the request body
        const { requestId } = await request.json();

        // Find the giveRequest document by its ID
        const giveRequest = await GiveRequest.findById(requestId);

        // If the giveRequest document was not found, return a 404 Not Found response
        if (!giveRequest) {
            return NextResponse.json({ message: 'Give request not found' }, { status: 404 });
        }

        // Check if the giveRequest has a volunteer assigned (volunteerId is not null)
        if (!giveRequest.volunteerId) {
            return NextResponse.json({ message: 'Cannot close give request without a volunteer assigned' }, { status: 400 });
        }

        // Update the giveRequest status to "closed" and set the closedAt field to the current date
        giveRequest.status = 'closed';
        giveRequest.closedAt = new Date();
        await giveRequest.save();

        // Return a success response
        return NextResponse.json({ message: 'Give request closed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error closing give request:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
