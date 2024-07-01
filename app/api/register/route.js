import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
var bcrypt = require('bcryptjs');

export const POST = async (request) => {
    const { username, email, password, confirmPassword } = await request.json();
    console.log(username);
    if (password !== confirmPassword) {
        return NextResponse.json({
            error: "password do not match"
        }, { status: 400 })
    }
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({
            error: "User already Exists"
        }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const newUser =await User.create({
            username,
            email,
            password:hashedPassword
        })
        return new NextResponse("user creted",{status:201})
    } catch (error) {
        return new NextResponse(error,{status:500});
    }
}