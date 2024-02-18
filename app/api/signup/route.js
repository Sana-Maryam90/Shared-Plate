const { connectDb } = require("@/helper/db");
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcrypt';

connectDb();

export async function POST(request){
    try{
    // extracting data from request
    const { name, email, password } = await request.json();


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists'}, {status: 400});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, {status: 201});

}catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: error.message }, {status: 500});
  }

}