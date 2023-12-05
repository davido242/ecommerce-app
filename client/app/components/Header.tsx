import Link from 'next/link';
import React, { useContext } from 'react';
import { NameContext } from '../AuthContext/NameContext'

export default function header() {
  const { name }: any = useContext(NameContext);
  
  return (
    <div className='bg-brown-bg fixed w-full'>
      <div className="container mx-auto px-8 py-2 flex justify-between">
        <div className='uppercase text-[#fff] font-bold text-2xl'>
          <Link href="/">Logo</Link>
        </div>
        <div>
          <ul className='flex gap-3'>
            <li>
              <Link href="/signup">
                Register
              </Link>
              </li>
            <li>
              {name == "" ? 
              <Link href="/login">              
                Login
              </Link> :
              `Welcome ${name}`
               }              
              </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
