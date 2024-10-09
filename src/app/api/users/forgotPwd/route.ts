import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'

import { error } from 'console'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request:NextRequest){
  try{
    const reqBody=await request.json()
    const {email}=reqBody
    console.log(reqBody)

    //check if user exists
    const user=await User.findOne({email})
    if (!user){
      return NextResponse.json({error:"User doesn't exist"},{status:400})
    }

    //send verification email
    await sendEmail({email,emailType:"RESET",userId:user._id})

    

    const response=NextResponse.json({
      message:"mail sent",
      success:true,
      user,
      
    })

    
    return response;




  }catch(error:any){
    return NextResponse.json({error:error.message},{status:500})
  }
}