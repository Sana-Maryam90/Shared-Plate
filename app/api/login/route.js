const { connectDb } = require("@/helper/db");
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


connectDb();

export async function POST(request){
    try {
        // extracting data from request
        const { email, password, isRememberMe } = await request.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return NextResponse.json({ status: 401, message: 'Email not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ status: 401, message: 'Invalid password' });
        }

        const Response = NextResponse.json({ status: 200, message: 'Login successful'});

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
        return NextResponse.json({ status: 500, message: error.message });  
    }
}