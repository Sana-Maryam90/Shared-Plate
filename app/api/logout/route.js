import { NextResponse } from "next/server";

export async function POST(request){
    const Response = NextResponse.json({message: "Logged out"}, { status: 200 });

    Response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiry date to remove cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

    return Response;
}