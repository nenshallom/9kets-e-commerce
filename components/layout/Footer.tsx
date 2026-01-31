import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="bg-secondary  text-white pt-16 pb-8">
      <div className="container flex flex-col md:flex-row justify-between ">
        
        {/* Column 1: Newsletter */}
        <div >
          <h3 className="text-lg font-bold mb-4">Newsletter Signup</h3>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe to our newsletter for updates and promotions.
          </p>
          <div className="flex max-w-2xs">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full px-3 py-2 text-sm text-secondary bg-white rounded-l focus:outline-none"
            />
            <button className="bg-primary px-4 py-2 text-sm font-bold text-black rounded-r hover:bg-orange-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-10 md:mt-0 gap-10">
                    {/* Column 2: Customer Service */}
        <div className="max-w-40">
          <h4 className="font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        {/* Column 3: About Us */}
        <div className="max-w-40">
          <h4 className="font-bold mb-4">About Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/story" className="hover:text-primary">Our Story</Link></li>
            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div className="max-w-40">
          <h4 className="font-bold mb-4">Social Links</h4>
          <div className="flex gap-4">
             <Link href="#" className="hover:text-primary"><Facebook className="w-5 h-5" /></Link>
             <Link href="#" className="hover:text-primary"><Twitter className="w-5 h-5" /></Link>
             <Link href="#" className="hover:text-primary"><Instagram className="w-5 h-5" /></Link>
          </div>
        </div>
        </div>
        </div>


      
      <div className="container mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        © 2024 9kets. All Rights Reserved.
      </div>
    </footer>
  );
}