import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="/hero-bg.png"
          alt="Gadgets Background" 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="container relative h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
          Latest Gadgets for Everyday Innovation
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Explore smartphones, laptops, smartwatches, and accessories from trusted brands.
        </p>
        
        <div className="flex flex-col gap-2 items-center">
          <Link 
            href="/shop" 
            className="bg-primary text-secondary font-bold px-8 py-3 rounded-md hover:bg-orange-400 transition-colors w-2xs"
          >
            Shop Now
          </Link>
          <button className="text-primary px-8 py-3 text-2xl hover:underline">
            View Deals
          </button>
        </div>
      </div>
    </section>
  );
}