import {connect} from '@/dbconfig/dbconfig'
import Turf from '@/models/turfModel'
import { NextRequest,NextResponse } from 'next/server'
connect()

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json()
    const {id}=reqBody
    console.log(reqBody)
    const turf=await Turf.findById(id)
    return NextResponse.json({
      message:"Turfs returned successfully",
      success:true,
      data:turf
    })
    
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({error:error.message},{status:500})
    
  }
}