import { products } from "@/lib/data";
import ProductGallery from "@/app/product/ProductGallery";
import ProductInfo from "@/app/product/ProductInfo";
import ProductCard from "@/components/features/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">We couldn't find the product you're looking for.</p>
        <Link href="/" className="bg-primary text-secondary px-6 py-2 rounded font-bold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="bg-white pb-20">
      <div className="container py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />          
          <Link 
            href={`/?category=${product.category}`} 
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-50">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-20">
          <ProductGallery images={product.images || [product.image]} />
          <ProductInfo product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <div className=" text-center">
            <h2 className="text-2xs font-bold text-secondary mb-2">you might also like</h2>
            <h2 className="text-2xl font-bold text-secondary mb-8">Discover more {product.category} and accessories to level up your play</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1">
               {relatedProducts.map((p) => (
                 <ProductCard key={p.id} product={p} />
               ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}