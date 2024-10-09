import {connect} from "@/dbconfig/dbconfig"
import { NextResponse,NextRequest } from "next/server"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

connect();

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json();//coming in url that we sent through mail that hashed token
    const {token,newPassword}=reqBody;
    //hash password
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=await bcryptjs.hash(newPassword,salt)
    console.log(token)
    const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})//gt-greater than
    const oldUser=user
    if(!user){
      return NextResponse.json({error:"Invalid Token"},{status:400})
    }
    console.log(user);
    user.password=hashedPassword;
    //flush out these
    user.forgotPasswordToken=undefined;
    user.forgotPasswordTokenExpiry=undefined;
    await user.save();

    return NextResponse.json({
      message:"Password updated",
      success:true,
      oldUser:oldUser,
      updatedUser:user
    })
    
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
  }
}