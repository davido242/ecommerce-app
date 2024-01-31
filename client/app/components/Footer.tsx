import React from 'react';

export default function footer() {
  return (
    <div className='bg-amber-600 mt-8 md:mt-2'>
      <div className="container mx-auto px-8 py-2 flex justify-between">
        <span>Dev &copy; 2023</span>
        <div>
          <ul className='flex gap-3'>
            <li>Ecommerce</li>
            <li>Ent.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
