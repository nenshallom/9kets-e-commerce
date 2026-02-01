"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import FilterSidebar from "../home/FilterSidebar"; 
import { useRouter, useSearchParams } from "next/navigation";


// 1. SEARCH BAR COMPONENT
function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Local state for search input
  const [query, setQuery] = useState(searchParams.get("search") || "");

  // Update local state if URL changes (e.g. back button)
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    // Reset to first page on new search
    params.set("page", "1");
    
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-2xl mx-8 relative">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-accent rounded-l-2xl py-2 pl-4 pr-10 text-sm focus:border-primary focus:outline-none"
      />
      <button 
        type="submit"
        className="bg-gray-100 border border-accent hover:bg-gray-200 px-10 rounded-r-2xl cursor-pointer transition-colors"
      >
        <Search className="h-6 w-6 text-accent hover:text-primary" />
      </button>
    </form>
  );
}


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="container flex h-16 items-center justify-between">
          
          <Link href="/" className="text-2xl font-bold text-secondary">
            9kets
          </Link>

          {/*  Search Bar - Desktop */}
          <Suspense fallback={<div className="flex-1 max-w-2xl mx-8 h-10 bg-gray-100 rounded-2xl animate-pulse" />}>
            <SearchBar />
          </Suspense>

          {/*  Navigation Links (Desktop) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-primary transition-colors">About us</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">Blog</Link>
          </nav>

          {/*  Icons */}
          <div className="flex items-center gap-4 ml-4">
            <button>
              <Search className="h-6 w-6 text-primary hover:text-secondary" />
            </button>
            <Link href="/cart" className="relative text-primary hover:text-secondary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link href="/profile" className=" text-primary hover:text-secondary transition-colors">
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden text-secondary"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 5. Swipeable Secondary Nav (Mobile & Desktop) */}
        <div className="border-gray-100 bg-light">
          <div className="container flex items-center justify-start md:justify-center gap-6 py-3 text-sm text-accent overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              "All products", "Smartphones", "Laptops", "Headphones", 
              "Home Tech", "Cameras", "Tablets", "Gaming"
            ].map((cat) => (
              <Link 
                key={cat} 
                href={cat === "All products" ? "/?category=all" : `/?category=${cat}`}
                scroll={false} // Prevent jump to top on filter change
                className="whitespace-nowrap hover:text-primary transition-colors shrink-0"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* SLIDE-IN MOBILE MENU (DRAWER) */}
      
      {/* Overlay Background */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Drawer Content */}
      <div className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" onClick={closeMenu} className="text-lg font-bold text-secondary">9kets</Link>
            <button 
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4">
            
            {/* Primary Navigation */}
            <nav className="md:hidden flex flex-col gap-4 mb-8">
               <Link href="/about" onClick={closeMenu} className="text-lg font-medium text-gray-700 hover:text-primary">
                 About us
               </Link>
               <Link href="/contact" onClick={closeMenu} className="text-lg font-medium text-gray-700 hover:text-primary">
                 Contact
               </Link>
               <Link href="/blog" onClick={closeMenu} className="text-lg font-medium text-gray-700 hover:text-primary">
                 Blog
               </Link>
               <Link href="/profile" onClick={closeMenu} className="text-lg font-medium text-gray-700 hover:text-primary">
                 My Account
               </Link>
            </nav>

            <hr className="border-gray-100 my-6" />

            {/* Integrated Filters */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Filters</h4>
              <Suspense fallback={<div className="text-sm text-gray-400">Loading filters...</div>}>
                <FilterSidebar className="w-full" />
              </Suspense>
            </div>
          </div>
          
          {/* Drawer Footer */}
          <div className="p-4 border-t bg-gray-50">
             <button className="w-full bg-primary text-secondary font-bold py-3 rounded">
                Log Out
             </button>
          </div>
        </div>
      </div>
    </>
  );
}