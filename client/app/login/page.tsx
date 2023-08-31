import React from 'react'

export default function page() {
  // console.log(`${process.env.SERVER_PORT}`)
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-12'>
      <div className='container mx-auto px-8'>
        <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
          <h2 className='text-center font-bold py-4'>Login to dashboard</h2>
          <form action="`${process.env.SERVER_PORT}`" method="" className='flex flex-col gap-4'>
          <input type='text' placeholder='username' className='form-input' />
          <input type='password' placeholder='Password' className='form-input' />
          <div>
            <input type='submit' value='Login' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4' />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
