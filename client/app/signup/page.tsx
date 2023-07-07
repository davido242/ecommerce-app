import React from 'react'

export default function signup() {
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
      <div className='container mx-auto px-8'>
        <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
          <h2 className='text-center font-bold py-4'>New User Signup</h2>
          <form action="" method="" className='flex flex-col gap-6'>
          <input type='text' placeholder='username' className='form-input' />
          <input type='password' placeholder='Password' className='form-input' />
          <input type='password' placeholder='Confirm Password' className='form-input' />
          <input type='textarea' placeholder='Address' className='form-input' />
          <div>
            <input type='submit' value='Register' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4' />
          </div>
          </form>      
        </div>
      </div>
    </div>
  )
}
