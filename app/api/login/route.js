import { connectDb } from '@/helper/db';
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function POST(request){
    try {
        await connectDb();
        // extracting data from request
        const { email, password, isRememberMe } = await request.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return NextResponse.json({ message: 'Email not found' }, {status: 401});
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, {status: 401});
        }

        const Response = NextResponse.json({ message: 'Login successful'}, {status: 200});

        // Create JWT token
        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: isRememberMe ? '7d' : '1h', // Token expires in 7 days if remember me is true, otherwise 1 hour
        });

        Response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: isRememberMe ? 604800 : 3600, // Cookie expires in 7 days (604800 seconds) if remember me is true, otherwise 1 hour (3600 seconds)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
          });

        //console.log(token);

        return Response; 
        
    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ message: error.message }, {status: 500});  
    }
}