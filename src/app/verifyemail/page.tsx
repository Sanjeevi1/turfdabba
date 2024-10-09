"use client";
import axios from "axios"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage(){
  const [token,setToken]=React.useState("");
  const [isVerified,setIsVerified]=React.useState(false);
  const [error,setError]=React.useState(false);
  
  const verifyUserEmail=async()=>{
    try {
      
      await axios.post('/api/users/verifyemail',{token})
      setIsVerified(true)
      
    } catch (error:any) {
      console.log(error.response.data)
      
    }
  }

  React.useEffect(()=>{
    const urlToken=window.location.search.split('=')[1]
    setToken(urlToken||"")
  },[])
  React.useEffect(()=>{
    if (token.length>0){
      verifyUserEmail();
    }
  },[token])
  return (
    <>
    <h1>Verify email</h1>
    <h2>{token?token:"No token"}</h2>
    {isVerified && (
      <>
      <div>Email verified</div>
      <Link href="/login">Login</Link>
      </>
    )}
    {error && (
      <>
      <div>Email not verified</div>
      
      </>
    )}
    </>
  )
}