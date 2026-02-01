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
        <h1 className="text-2xl md:text-6xl font-light mb-2 max-w-6xl leading-tight">
          Latest Gadgets for Everyday Innovation
        </h1>
        <p className="text-sm md:text-3xl text-light mb-4 max-w-6xl">
          Explore smartphones, laptops, smartwatches, and accessories from trusted brands.
        </p>
        
        <div className="flex flex-col gap-1 items-center">
          <button 
            className="bg-primary text-secondary text-sm md:text-lg w-32 md:w-40 lg:w-72 py-2 lg:py-3 rounded-xl lg:mb-1.5 hover:bg-primary/80 transition-colors"
          >
            Shop Now
          </button>
          <button className="text-primary p-1 text-md md:text-lg lg:text-xl cursor-pointer hover:underline">
            View Deals
          </button>
        </div>
      </div>
    </section>
  );
}