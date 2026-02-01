"use client";

import { useState, useEffect, useRef, Suspense } from "react"; 
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/components/home/Hero";
import FilterSidebar from "@/components/home/FilterSidebar";
import ProductCard from "@/components/features/ProductCard";
import Pagination from "@/components/ui/Pagination"; 
import { products } from "@/lib/data";
import { ChevronDown } from "lucide-react";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const productsRef = useRef<HTMLDivElement>(null);
  
  //  Get URL Params
  const searchParam = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const priceParam = searchParams.get("price");
  const pageParam = searchParams.get("page") || "1";
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // FILTERING LOGIC (Category + Price + Search)
  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;
    let matchesPrice = true;
    let matchesSearch = true;

    // Category Filter
    if (categoryParam && categoryParam !== "all") {
      matchesCategory = product.category.toLowerCase() === categoryParam.toLowerCase();
    }

    // Price Filter
    if (priceParam) {
      switch (priceParam) {
        case "under-50k": matchesPrice = product.price < 50000; break;
        case "50k-100k": matchesPrice = product.price >= 50000 && product.price <= 100000; break;
        case "100k-250k": matchesPrice = product.price >= 100000 && product.price <= 250000; break;
        case "above-500k": matchesPrice = product.price > 500000; break;
        default: matchesPrice = true;
      }
    }

    // Search Filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      matchesSearch = 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
    }

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // SORTING LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  //  PAGINATION LOGIC
  const itemsPerPage = 6;
  const currentPage = parseInt(pageParam);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Pagination Handler (Updates URL only)
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  //  SCROLL EFFECT (Handles visual updates)
  useEffect(() => {
    if (categoryParam || priceParam || searchParam || searchParams.get("page")) {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [categoryParam, priceParam, searchParam, pageParam, searchParams]);

  return (
    <main className="bg-white pb-20">
      <Hero />
      
      <div 
        ref={productsRef} 
        className="container py-12 flex flex-col lg:flex-row gap-12 scroll-mt-24"
      >
        {/* Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar className="w-64" />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 relative z-30">
            <p className="text-gray-900 font-medium mb-4 sm:mb-0">
              Showing {sortedProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} Results
              {categoryParam && categoryParam !== "all" && <span className="text-primary font-bold ml-1">in {categoryParam}</span>}
              {searchParam && <span className="text-primary font-bold ml-1">for &quot;{searchParam}&quot;</span>}
            </p>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 relative">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:border-primary bg-white min-w-[140px] justify-between"
                >
                  {sortOrder === 'newest' ? 'Newest' : 'Oldest'} 
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 z-40">
                    <button onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Newest</button>
                    <button onClick={() => { setSortOrder('oldest'); setIsSortOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Oldest</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
               <p className="text-xl font-bold text-gray-500 mb-2">No products found</p>
               <button 
                 onClick={() => router.push("/", { scroll: false })}
                 className="mt-4 text-primary font-bold hover:underline"
               >
                 Clear Filters
               </button>
            </div>
          )}

          {/* Pagination Component */}
          <Pagination 
            currentPage={validPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </main>
  );
}

// Main Home Component with Suspense
export default function Home() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading products...</div>}>
      <HomeContent />
    </Suspense>
  );
}