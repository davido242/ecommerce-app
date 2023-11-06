import React from 'react'

export default function page() {
  const name = 'Daveed Beckam'
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Welcome to your Dashboard { "{ Users-name goes here }" } {name}</h2>
      </div>
    </div>
  </div>
  )
}
