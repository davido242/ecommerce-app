"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation"

export default function page() {
  const router = useRouter();
  // const [userName, setUserName] = useState("");

  // const jwtToken =  cookie;
  
  
  // const url = 'http://localhost:5001/login';
  // fetch(url, {
  //   method: "GET",
  //   headers: {
  //     'x-access-token': jwtToken
  //   }
  // }).then(response => {

  //   const jwtToken = response.headers.get('Authorization').split(' ')[1];
  // })

  useEffect(() => {
    fetch('http://localhost:5001/dashboard', {
      method: "GET",
      headers: {
        'authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(res => res.json())
    .then(data => {
      if(data.name == undefined ){
        alert("Session Expired, Please Login.")
        router.push("/login")
      } else{        
        document.getElementById("name").innerHTML = data.name
      }
    })
  }, []);

  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Welcome to your Dashboard <span id="name"></span></h2>
      </div>
      <div className='text-center mt-9'>
        <Link href='/login' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4'>Logout</Link>
      </div>
    </div>
  </div>
  )
}
