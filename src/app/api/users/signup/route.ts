import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        console.log(reqBody);

    // check if the user already exists
    const user= await User.findOne({email});
    if(user){
        return NextResponse.json({error:"User already exists"},{status:400});
    }
    // hash the password
    const salt = await bcryptjs.genSalt(10);    
    const hashedPassword = await bcryptjs.hash(password,salt);

    // create a new user
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
    const savedUser=await newUser.save();
    console.log(savedUser);


    return NextResponse.json({
        message:"User created successfully",
        success:true,
        savedUser 
    },{status:201});


    }
    catch(error:any){
        return NextResponse.json({error:error.message},
            {status:500}    )
        console.log(error);
    }
}