import ProductCard from "./ProductCard";
import { Product } from "@/lib/data";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function RelatedProducts({ 
  products, 
  title = "You might also like", 
  subtitle = "Discover more gaming gear and accessories to level up your play" 
}: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
      {subtitle && (
        <p className="text-center text-secondary font-bold text-2xl mb-12">
          {subtitle}
        </p>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}