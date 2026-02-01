"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className = "" }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current active filters from URL
  const activeCategory = searchParams.get("category");
  const activePrice = searchParams.get("price");

  // Helper to update URL
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Handle Category "All"
    if (key === "category" && value === "All") {
      params.set("category", "all");
    } 
    else if (key === "price" && value === "all") {
      params.delete("price"); 
    }
    else if (params.get(key) === value) {
      params.delete(key);
      if (key === "category") params.set("category", "all");
    } 
    else {
      params.set(key, value);
    }

    params.set("page", "1");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const categories = [
    "Smartphones", "Laptops", "Accessories (chargers, etc.)", 
    "Home Tech(smart speakers, cameras, etc)", "Headphones & Earbuds", "Gaming", "Cameras", "Tablets"
  ];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₦50,000", value: "under-50k" },
    { label: "₦50,000 – ₦100,000", value: "50k-100k" },
    { label: "₦100,000 – ₦250,000", value: "100k-250k" },
    { label: "Above ₦500,000", value: "above-500k" },
  ];

  return (
    <aside className={`shrink-0 space-y-8 ${className}`}>
      <div className="pb-4 border-b border-gray-400 border-dashed">
        <h3 className="text-xl font-bold text-secondary">Filter Options:</h3>
        {(activeCategory || activePrice) && (
          <button 
            onClick={() => router.push("/", { scroll: false })}
            className="text-xs text-red-500 font-bold mt-2 hover:underline"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div>
        <h4 className="font-medium text-lg mb-4 text-secondary">By Categories</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="cat-all"
              checked={!activeCategory || activeCategory === "all"}
              onChange={() => handleFilterChange("category", "All")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="cat-all" className="text-sm text-gray-600 cursor-pointer hover:text-primary">
              All products
            </label>
          </li>

          {/* Individual Categories */}
          {categories.map((cat) => (
            <li key={cat} className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id={`cat-${cat}`} 
                checked={activeCategory === cat}
                onChange={() => handleFilterChange("category", cat)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`cat-${cat}`} className="text-sm text-gray-600 cursor-pointer hover:text-primary">
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Categories */}
      <div>
        <h4 className="font-medium text-lg mb-4 text-secondary">Price Categories</h4>
        <ul className="space-y-3">
          {priceRanges.map((range) => (
            <li key={range.value} className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id={`price-${range.value}`}
                checked={
                  range.value === "all" 
                    ? !activePrice || activePrice === "all"
                    : activePrice === range.value
                }
                onChange={() => handleFilterChange("price", range.value)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`price-${range.value}`} className="text-sm text-gray-600 cursor-pointer hover:text-primary">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}