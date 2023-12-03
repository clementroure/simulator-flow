import Page from '@/app/page';
import { useRouter } from 'next/router';
import { useState } from 'react';

type BillingInterval = 'year' | 'month';

export default function Pricing() {

  // const router = useRouter()

  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [isLoading, setIsLoading] = useState(false)

  const [products, setProducts] = useState([
/*     {
      id: '0',
      name: 'Free',
      description: 'Explore the basics of EVM DeFi protocol simulation with our free plan. Ideal for beginners.',
      price: [0, 0] // Free plan
    }, */
    {
      id: '1',
      name: 'Starter',
      description: 'Upgrade to simulate complex scenarios with enhanced features. Includes standard EVM DeFi protocol tools.',
      price: [9900, 108900]
    },
    {
      id: '2',
      name: 'Premium',
      description: 'Access advanced simulation features including GPT-4.5 Turbo for creating dynamic simulation configurations.',
      price: [24900, 273900]
    },
    {
      id: '3',
      name: 'Entreprise',
      description: 'Custom solutions for enterprise needs. Contact us for a tailored plan to suit large-scale EVM DeFi protocol simulation.',
      price: [0, 0] // Custom pricing
    }
  ]);

   const handleCheckout = (price: number, planName: string) => {
    if(planName === 'Enterprise') {
      // Redirect to contact or inquiry form
      // router.push('/contact');
      return;
    }
    setIsLoading(true);
    // Add logic to handle checkout for other plans
  };

  const back = () => {
    // router.push('/')
  }

  return (
    <section className="bg-[#121212] h-screen">
      <div className="max-w-6xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8  mb-4 sm:mb-0">

        <button onClick={back} type="button" className='hidden sm:flex sm:flex-row fixed top-8 left-8'>
          <svg className="w-5 mr-1.5 relative" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          <p className="ml-2 -mt-[0.170rem]">Prev</p>
        </button>

        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
            <button
              onClick={() => setBillingInterval('month')}
              type="button"
              className={`${
                billingInterval === 'month'
                  ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              type="button"
              className={`${
                billingInterval === 'year'
                  ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Yearly billing
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 ">
          {products.map((product:any) => {
            console.log(product)
            // const price = product?.prices?.find(
            //   (price:any) => price.interval === billingInterval
            // );
            const price = billingInterval === 'month' ? product.price[0] : product.price[1];
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'usd',
              minimumFractionDigits: 0
            }).format((price || 0) / 100);
            console.log(price)
            console.log(priceString)
            return (
              <div
                key={product.id}
                className={`rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 ${
                  product.name === 'Premium' ? 'border border-pink-500' : ''
                }`}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-zinc-300 h-28">{product.description}</p>
                  {product.name != "Entreprise" ?
                  <>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold text-white">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /{billingInterval}
                      </span>
                    </p>
                    <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleCheckout(price, product.name)}
                    className="mt-8 block w-full rounded-md py-2.5 text-sm font-semibold text-center cursor-pointer text-zinc-800 bg-zinc-100 border border-zinc-100 hover:text-zinc-100 hover:bg-zinc-800"
                  >
                    {product.name === 'Product Name'
                      ? 'Manage'
                      : 'Subscribe'}
                  </button>
                </>
                :
                <>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold text-transparent">
                        Custom
                      </span>
                    </p>
                    <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleCheckout(price, product.name)}
                    className="mt-8 block w-full rounded-md py-2.5 text-sm font-semibold text-center cursor-pointer text-zinc-800 bg-zinc-100 border border-zinc-100 hover:text-zinc-100 hover:bg-zinc-800"
                    >
                    Contact
                    </button>
                 </>
                  }

                </div>
              </div>
            );
          })}
        </div>
        {/* <div>
          <p className="mt-24 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
            Brought to you by
          </p>
          <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
            <div className="flex items-center justify-start">
              <a href="https://nextjs.org" aria-label="Next.js Link">
                <img
                  src="/nextjs.svg"
                  alt="Next.js Logo"
                  className="h-12 text-white"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://vercel.com" aria-label="Vercel.com Link">
                <img
                  src="/vercel.svg"
                  alt="Vercel.com Logo"
                  className="h-6 text-white"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://stripe.com" aria-label="stripe.com Link">
                <img
                  src="/stripe.svg"
                  alt="stripe.com Logo"
                  className="h-12 text-white"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://supabase.io" aria-label="supabase.io Link">
                <img
                  src="/supabase.svg"
                  alt="supabase.io Logo"
                  className="h-10 text-white"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://github.com" aria-label="github.com Link">
                <img
                  src="/github.svg"
                  alt="github.com Logo"
                  className="h-8 text-white"
                />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
   )
}
