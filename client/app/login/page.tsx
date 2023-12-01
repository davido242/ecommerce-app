"use client"
import { useState, useRef, FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function page() {
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "http://localhost:5001/login";
    
    const body = new FormData();
    body.set('username', usernameRef.current?.value ?? "")
    body.set('password', passwordRef.current?.value ?? "")

    fetch(url, {
      method: "POST",
      body
    }).then(res => res.json())
    .then(data => {      
      if(data.error) {
        setErrorMessage(data.message)
      }else {
        window.localStorage.setItem('token', data.token);
        router.push("/dashboard")
      }
    })
  }
  
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-12'>
      <div className='container mx-auto px-8'>
        <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
          <h2 className='text-center font-bold py-4'>Login to dashboard</h2>
          {errorMessage == "" ? null : <div style={{color: "red"}} className='text-center'>{"**"}{errorMessage}{"**"}</div> }
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='text' ref={usernameRef} name="username" placeholder='username' className='form-input' />
          <input type='password' ref={passwordRef} name="password" placeholder='Password' className='form-input' />
          <div>
            <input type='submit' value='Login' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4' />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}