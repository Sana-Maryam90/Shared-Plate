import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user';

export async function GET(request) {
    try {
    const token = request.cookies.get('token')?.value;
    // console.log(token);

    if (!token) {
        // No token provided
        return NextResponse.json({ isAuthenticated: false, message: 'Unauthorized: No token provided' }, {status: 401});
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user data
    return NextResponse.json({ isAuthenticated: true, userId: decoded.userId, name: decoded.name, email: user.email }, {status: 200});

    } catch (error) {
      // Invalid token or token verification failed
      return NextResponse.json({ isAuthenticated: false, message: error.message }, {status: 401});
            
    }
}
