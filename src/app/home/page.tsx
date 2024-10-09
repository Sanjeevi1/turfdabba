"use client";//made into client component
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Turf from "@/models/turfModel";
import { ThreeDCardDemo } from "@/components/CardConatiner";
import { BackgroundBeamsWithCollisionDemo } from "@/components/Poster";

export default function HomePage() {
  const router=useRouter();
  const [list,setList]=React.useState([]);
  const fetchList=async()=>{
    const response=await axios.post(`/api/admin/list`)
    
    if (response.data.success){
      setList(response.data.data)
      console.log(response.data.data)

    }else{
      toast.error("Error")
    }
  }
  React.useEffect(()=>{
    fetchList()
  },[])//empty dependency array means called once while loading
  
  return (
    <>
    <BackgroundBeamsWithCollisionDemo/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-100 p-4">
      {list.map((item,index)=>{
          return(
            <>
            <div key={index}>
              <ThreeDCardDemo item={item}  />

              
            </div>
              
            </>
          )
        })}
    </div>
    </>
  )

}
