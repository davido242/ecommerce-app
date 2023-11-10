"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confPasswordRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);

  const [errMsg, setErrMsg] = useState("");

  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = new FormData();

    body.set('username', usernameRef.current?.value ?? "");
    body.set('password', passwordRef.current?.value ?? "");
    body.set('conpassword', confPasswordRef.current?.value ?? "");
    body.set('address', addressRef.current?.value ?? "");

    fetch('http://localhost:5001/signup', {
      method: 'POST',
      body
    }).then(res => res.json())
    .then(data => {
      setErrMsg("");
      if((data.error)){
        setErrMsg(data.msg);
      }
      else {
        router.push('/login')
      }
    })
  }

  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">
          <h2 className="text-center font-bold py-4">New User Signup</h2>
          {errMsg == "" ? null : <div className='text-red-500 text-center'>{errMsg}</div>}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input type="text" ref={usernameRef} name="username" placeholder="username" className="form-input" required />
            <input type="password" ref={passwordRef} name="password" placeholder="Password" className="form-input" required />
            <input type="password" ref={confPasswordRef} name="conPassword" placeholder="Confirm Password" className="form-input" required />
            <input type="textarea" ref={addressRef} name="address" placeholder="Address" className="form-input" required />
            <div>
              <input type="submit" value="Register" className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
