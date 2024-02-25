import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDb } from '@/helper/db';

export async function GET(request,{params}) {
    try {
        await connectDb();

        //Extract the user ID from the URL parameters
        const { userId } = await params;

        // Query the database for the User with the specified ID
        const user = await User.findById(userId);

        // If the User is not found, return a 404 Not Found response
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Filter out fields from the User object
        const filteredUser = {
            name: user.name,
            email: user.email
        };

        // Return the filtered Userinfo in the response
        return NextResponse.json({ userInfo: filteredUser }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
