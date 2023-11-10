import { Html } from 'next/document';
import { useState } from 'react';
import Link from 'next/link';

export default function page() {
  // const [userName, setUserName] = useState("");
  // const body = new <Html>;

  // const url = 'http://localhost:5001/login';
  // fetch(url, {
  //   method: "POST",
  //   body
  // })


  const name = 'Daveed Beckam'
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Welcome to your Dashboard { "{ Users-name goes here }" } {name}</h2>
      </div>
      <div className='text-center mt-9'>
        <Link href='/login' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4'>Logout</Link>
      </div>
    </div>
  </div>
  )
}
