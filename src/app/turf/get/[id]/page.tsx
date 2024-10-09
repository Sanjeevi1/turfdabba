"use client"

import axios from "axios"
import React from "react"
import toast from "react-hot-toast"

export default function TurfDetail({params}:any){
  const [turf,setTurf]=React.useState(null)//using this state since variables inside etchTurf cannot be accessed outside
   
  const fetchTurf=async()=>{
    try {
      const response=await axios.post("/api/turf/get",{
        id:params.id
      })
      if (!response){
        console.log("Did not fetch response")
      }
      
      setTurf(response.data.data)
      
      
    } catch (error:any) {
      console.log("fetching turf detail failed",error.message)
      toast.error(error.message)
      
    }
    
    
    

  }
  

  React.useEffect(()=>{
    fetchTurf();
    
    
  },[])
  return (
    <>
    <div>
      <p>Turf Detail Page</p>
    </div>
    
    <div>{params.id}</div>
    {turf ? (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
            <img src={turf.image} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
            
        </div>
        {/* ABOUT */}
        <div className='flex flex-col gap-4 lg:w-2/4'>
            <div>
                <span className=' text-violet-600 font-semibold'>{}{turf.category}</span>
                <h1 className='text-3xl font-bold'>{turf.name}</h1>
                <p>{turf.location}</p>
                <p>{turf.size}</p>
            </div>
            <p className='text-gray-700'>
            {turf.characteristics}
            </p>
            <p className='text-gray-700'>
            {turf.address}
            </p>
            <h6 className='text-2xl font-semibold'>Rs.{turf.rate}/slot</h6>
            <div className='flex flex-row items-center gap-12'>
                
                <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Book Now</button>
            </div>
        </div>
    </div>
      ) : (
        <p>Loading...</p>
      )}
    {/* Display Slots */}
    <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
        {(turf && turf.slots.length) > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {turf.slots.map((slot, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-sm"
              >
                <p className="font-semibold">Date: </p>
                <p>Start Time: {slot.startTime}</p>
                <p>End Time: {slot.endTime}</p>
                <p>Status: {slot.isAvailable ? "Available" : "Booked"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading slots...</p>
        )}
      </div>
    </>
  )
}