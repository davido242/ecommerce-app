import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 min-h-screen bg-[#e7e7e7e0]">
      <div className='container mx-auto'>
        <p className='text-[#675d5dbd]'>Shop at discounted rates</p>
        <h2 className='font-bold text-lg'>Ecommerce Web App with Next Js</h2>
        <div className='flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 md:py-4 mt-4'>
          <h3 className='uppercase tracking-widest py-4'>Features</h3>
          <div className='flex flex-col md:flex-row gap-2 justify-between'>
            <h5 className='sales-title'>Sales</h5>
            <h5 className='sales-title'>Brokery</h5>
            <h5 className='sales-title'>Deliveries</h5>
          </div>
        </div>
        <div>
          <Link href="/string">
            Signup
          </Link>
        </div>
      </div>
    </main>
  )
}
