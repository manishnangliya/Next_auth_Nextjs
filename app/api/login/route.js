import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
var bcrypt = require('bcryptjs');

export const POST = async (request) => {
    const { email, password } = await request.json();
    try {
        await connectDB();
        const user =await  User.findOne({email});
        console.log(user);
        if (user) {
            const isMatched = await bcrypt.compare(password,user.password);
            if (!isMatched) {
                return NextResponse.json({
                    message: "Password not matched"
                }, { status: 404 })
            } else {
                return NextResponse.json({
                    message: "User Logged in",
                }, { status: 200 })
            }
        }
        else {
            return NextResponse.json({
                message: "Email not registered"
            }, { status: 404 })
        }

    } catch (error) {
        console.log(error);
        return new NextResponse(error,{status:500});
    }
}