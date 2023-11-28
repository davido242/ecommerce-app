import Link from 'next/link';
import React from 'react';

export default function header() {
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
              <Link href="/login">              
                Login
              </Link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
