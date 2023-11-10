'use client';
import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function page() {
 const usernameRef  = useRef<HTMLInputElement | null>(null)
 const passwordRef  = useRef<HTMLInputElement | null>(null)

 const [ErrorMsg, setErrorMsg] = useState("");

 const router = useRouter();
  
  const handleLogin = (e: FormEvent <HTMLFormElement>) => {
    e.preventDefault();
        
    const body = new FormData();
    body.set("username", usernameRef.current?.value ?? "");
    body.set("password", passwordRef.current?.value ?? "");
    
    const url = 'http://localhost:5001/login';

    fetch(url, {
      method: "POST",
      body
    }).then(response => response.json())
    .then(data => {
      setErrorMsg("");
      if(data.error) {
        setErrorMsg(data.msg);
      } else {
        router.push("/dashboard")
      }
    })
  }
  
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-12'>
      <div className='container mx-auto px-8'>
        <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
          <h2 className='text-center font-bold py-4'>Login to dashboard</h2>
          {ErrorMsg == ""  ? null : <div className='text-red-500 text-center'>{ErrorMsg}</div> }
          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
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
