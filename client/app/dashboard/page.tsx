"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation"

export default function page() {
  const [name, setName] = useState("")
  const router = useRouter();
  useEffect(() => {
    fetch('http://localhost:5001/dashboard', {
      method: "GET",
      headers: {
        'authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(res => res.json())
    .then(data => {      
      if(!window.localStorage.getItem('token')){
        router.push("/login");
      } else if(data.name == undefined ){
        alert("Session Expired, Please Login.")
        router.push("/login")
      } else{
        setName(data.name)
      }
    });
  }, []);

  const handleLogout = () => {
    alert("Are you sure you want to log out?");
    window.localStorage.removeItem('token')
  }
  
  // React context API

  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Welcome to your Dashboard {name}</h2>
      </div>
      <div className='text-center mt-9'>
        <Link href='/login' onClick={handleLogout} className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4'>Logout</Link>
      </div>
    </div>
  </div>
  )
}
