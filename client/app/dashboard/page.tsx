"use client";
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { NameContext } from '../AuthContext/NameContext'

export default function page() {
  const {name, setName}: any = useContext(NameContext);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5001/api/dashboard', {
      method: "GET",
      headers: {
        'authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(res => res.json())
    .then(data => {
      if(!localStorage.getItem('token')){
        router.push("/login");
      } else if(data.name == undefined ){
        alert("Session Expired, Please Login.")
        router.push("/login")
      } else{
        setName(data.name)
      }
    });
  }, []);

  // Ask Boss, If to make another fetch API Call to make products availble on this page if user already got product

  
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Here are some products, {name}</h2>
      </div>
      <div className='text-center mt-9 flex justify-evenly'>
        <Link href='/products' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4'>Add More Products</Link>
      </div>
    </div>
  </div>
  )
}
