"use client";
import { useContext } from 'react';
import Link from 'next/link';
import { NameContext } from '../AuthContext/NameContext'
import { ProductContext } from '../AuthContext/ProductContext';

export default function page() {
  const { name } = useContext(NameContext);
  const { products } = useContext(ProductContext);
  
  return (
    <div className=' min-h-[calc(100vh-7vh)] pt-2'>
    <div className='container mx-auto px-8'>
      <div className='bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto'>
        <h2 className='text-center font-bold py-4'>Here are some products for you {name}</h2>
        <div>          
          <ul>
            {products.map((product) => ( <li key={product.id}>{product.name}</li>))}
          </ul>
        </div>
      </div>
      <div className='text-center mt-9 flex justify-evenly'>
        <Link href='/products' className='cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4'>Add More Products</Link>
      </div>
    </div>
  </div>
  )
}
