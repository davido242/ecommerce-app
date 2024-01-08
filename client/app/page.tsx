import Image from 'next/image';
import CartBtn from './components/CartBtn';

export default function Home() {
  return (
    <main className="p-8 min-h-screen bg-[#e7e7e7e0] pt-16">
      <div className='container mx-auto'>
        <p className='text-[#675d5dbd] animate-pulse'>Shop at discounted rates</p>
        <h2 className='font-bold text-lg'>Ecommerce Web App with Next Js</h2>
        <div className='flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 md:py-4 mt-4'>
          <h3 className='uppercase tracking-widest py-4 font-bold'>Features</h3>
          <div className='flex flex-col md:flex-row gap-2 justify-between'>
            <div className='sales-title'>
              <h5>Sales</h5>
              <Image src='/assets/images/cart-im1.jpeg' alt='' width='200' height='200' className='my-4 mx-auto' />
              <CartBtn title='Add to Cart' />
            </div>
            <div className='sales-title'>
              <h5>Brokery</h5>
              <Image src='/assets/images/cart-im2.webp' alt='' width='200' height='200' className='my-4 mx-auto' />
              <CartBtn title='Add to Cart' />
            </div>
            <div className='sales-title'>
              <h5>Deliveries</h5>
              <Image src='/assets/images/cart-im1.jpeg' alt='' width='200' height='200' className='my-4 mx-auto' />
              <CartBtn title='Add to Cart' />
            </div>
          </div>
        </div>
        <div className='flex justify-evenly py-2 animate-bounce'>
          <CartBtn title={`Free Shipping using this code <span className='font-bold text-[red]'>COM247</span>`} />
        </div>
      </div>
    </main>
  )
}