"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import Hero from "@/components/home/Hero";
import FilterSidebar from "@/components/home/FilterSidebar";
import ProductCard from "@/components/features/ProductCard";
import { products } from "@/lib/data";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productsRef = useRef<HTMLDivElement>(null);
  
  // 1. Get Params
  const categoryParam = searchParams.get("category");
  const priceParam = searchParams.get("price");
  const pageParam = searchParams.get("page") || "1";
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // 2. FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;
    let matchesPrice = true;

    useEffect(() => {
      // Only scroll if filter is active
      if (categoryParam || priceParam) {
         productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); 
      }
    }, [categoryParam, priceParam]);

    // Filter by Category
    if (categoryParam && categoryParam !== "all") {
      // check if the product category includes the param (e.g., "Smartphones" matches "Smartphones")
      matchesCategory = product.category.toLowerCase() === categoryParam.toLowerCase();
    }

    // Filter by Price
    if (priceParam) {
      switch (priceParam) {
        case "under-50k": matchesPrice = product.price < 50000; break;
        case "50k-100k": matchesPrice = product.price >= 50000 && product.price <= 100000; break;
        case "100k-250k": matchesPrice = product.price >= 100000 && product.price <= 250000; break;
        case "above-500k": matchesPrice = product.price > 500000; break;
        default: matchesPrice = true;
      }
    }

    return matchesCategory && matchesPrice;
  });

  // 3. SORT LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // 4. PAGINATION LOGIC
  const itemsPerPage = 6;
  const currentPage = parseInt(pageParam);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  // Ensure valid page
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Pagination Handler 
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    
    // Disable default browser scroll
    router.push(`/?${params.toString()}`, { scroll: false });
    
    // Scroll specifically to the products container
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white pb-20">
      <Hero />
      
      <div ref={productsRef} className="container py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="hidden lg:block pr-5 border-r border-secondary">
          <FilterSidebar className="w-64" />
        </div>

        <div className="flex-1">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 relative z-30 mt-20">
            <p className="text-gray-900 text-sm font-medium mb-4 sm:mb-0">
               {/* Show result count based on filter */}
              Showing {sortedProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} Results
              {categoryParam && categoryParam !== "all" && <span className="text-primary font-bold ml-1">in {categoryParam}</span>}
            </p>
            
            <div className="flex items-center gap-3 relative">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:border-primary bg-white min-w-[140px] justify-between"
                >
                  {sortOrder === 'newest' ? 'Newest' : 'Oldest'} 
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
               <p className="text-xl font-bold text-gray-500 mb-2">No products found</p>
               <p className="text-gray-400">Try adjusting your filters</p>
               <button 
                 onClick={() => router.push("/")}
                 className="mt-4 text-primary font-bold hover:underline"
               >
                 Clear Filters
               </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-end items-center select-none">
              <button 
                onClick={() => handlePageChange(validPage - 1)}
                disabled={validPage === 1}
                className="px-4 py-2 border rounded-l-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${
                    validPage === page
                      ? "bg-secondary text-white"
                      : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(validPage + 1)}
                disabled={validPage === totalPages}
                className="px-4 py-2 border rounded-r-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}