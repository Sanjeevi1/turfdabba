"use client"//decorator
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
export default function ProfilePage(){
  const router=useRouter();
  const [data,setData]=React.useState("nothing")
  const logout=async ()=>{

    try{
      await axios.get("api/users/logout")

      toast.success('Logout successful')
      router.push('/login')

    }catch(error:any){
      console.log("logout failed",error.message)
      toast.error(error.message)
    }
  }
  const getUserDetails=async()=>{
    const res=await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }
  return(
    <div>
      <p>Profile page</p>
      <h2>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={getUserDetails}>Get user details</button>
    </div>
  )
}