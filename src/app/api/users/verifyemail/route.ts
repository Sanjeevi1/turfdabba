import {connect} from "@/dbconfig/dbconfig"
import { NextResponse,NextRequest } from "next/server"
import User from "@/models/userModel"

connect();

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json();//coming in url that we sent through mail that hashed token
    const {token}=reqBody;
    console.log(token)
    const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})//gt-greater than
    if(!user){
      return NextResponse.json({error:"Invalid Token"},{status:400})
    }
    console.log(user);
    user.isVerified=true;
    //flush out these
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    await user.save();

    return NextResponse.json({
      message:"Email verified",
      success:true
    })
    
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
  }
}