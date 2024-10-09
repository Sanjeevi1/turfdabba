import {connect} from '@/dbconfig/dbconfig'
import Turf from '@/models/turfModel'
import { NextRequest,NextResponse } from 'next/server'
connect()

export async function POST(request:NextRequest){
  try {
    const turfs=await Turf.find({})//returns all documents in the collection
    
    return NextResponse.json({
      message:"Turfs returned successfully",
      success:true,
      data:turfs
    })
    
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({error:error.message},{status:500})
    
  }
}