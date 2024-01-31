"use client"
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function signup() {
  const [errorMsg, setErrorMsg] = useState("");

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const conPasswordRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = new FormData();

    body.set('username', usernameRef.current?.value ?? "");
    body.set('password', passwordRef.current?.value ?? "");
    body.set('conPassword', conPasswordRef.current?.value ?? "");
    body.set('address', addressRef.current?.value ?? "");

    const url = "http://localhost:5001/api/signup";
    
    fetch(url, {
      method: "POST",
      body
    }).then(res => res.json())
    .then(data => {
      if((data.error)) {
        setErrorMsg(data.message);
      }else {
        alert("Registered Successfully");
        router.push("/login");
      }
      
    })
  }

  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-amber-600 mt-32 p-4 rounded max-w-[500px] mx-auto">
          <h2 className="text-center font-bold py-4">New User Signup</h2>
          {errorMsg == "" ? null : <div style={{color: "red"}} className='text-red-500 text-center'>{"**"}{errorMsg}{"**"}</div> }
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input type="text" ref={usernameRef}  name="username" placeholder="username" className="form-input" required />
            <input type="password" ref={passwordRef}  name="password" placeholder="Password" className="form-input" required />
            <input type="password" ref={conPasswordRef} name="conPassword" placeholder="Confirm Password" className="form-input" required />
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