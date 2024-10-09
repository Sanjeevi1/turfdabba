import {connect} from '@/dbconfig/dbconfig'
import Turf from '@/models/turfModel'
import { NextRequest,NextResponse } from 'next/server'
connect()

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json()
    const {name,category,size,location,address,characteristics,rate,slots,image}=reqBody
    console.log(reqBody)
    const newTurf=new Turf({
      name,
      category,
      size,
      location,
      address,
      characteristics,
      rate,
      slots,
      image
    })
    const savedTurf=await newTurf.save()
    console.log(savedTurf)
    return NextResponse.json({
      message:"Turf created successfully",
      success:true,
      savedTurf
    })
    
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({error:error.message},{status:500})
    
  }
}