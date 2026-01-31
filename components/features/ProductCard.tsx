import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/data";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className="h-full border border-gray-100 rounded-xl bg-white overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-[220px] flex items-center justify-center p-2">
          {product.badge && (
            <span className="absolute top-4 right-4 bg-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide z-10">
              {product.badge}
            </span>
          )}
          <div className="relative w-full h-full bg-[#F2F2F2] rounded-lg">
             <Image 
               src={product.image} 
               alt={product.name} 
               fill
               className="object-contain mix-blend-multiply group-hover:scale-105 p-5 transition-transform duration-300"
             />
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title highlights on hover */}
          <h3 className="font-medium text-base text-gray-900 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-3">{product.brand}</p>
          
          <p className="text-lg font-bold text-gray-900 mb-3">
            {formatCurrency(product.price)}
          </p>

          <div className="mt-auto flex items-center gap-2">
            <Star className="w-4 h-4 fill-[#F2994A] text-[#F2994A]" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}