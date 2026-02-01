"use client";

import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data"; 
import RelatedProducts from "@/components/features/RelatedProducts";

// Cart Page Component
export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  // Calculate Costs 
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10000 : 0;
  const vat = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping + vat;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  const relatedProducts = products.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="inline-block bg-primary text-secondary px-8 py-3 rounded-full font-bold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 bg-white">
      <h1 className="text-md md:text-xl font-light mb-2 md:mb-4">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-lg mb-4">Your Items ({items.length})</h2>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id + item.selectedColor} className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-6">
                {/* Image */}
                <div className="relative w-full sm:w-32 h-32 bg-gray-50 rounded-md flex items-center justify-center p-4">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-contain mix-blend-multiply" 
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name} – {item.brand}</h3>
                      <p className="text-sm font-bold text-gray-900 mt-1">Price: {formatCurrency(item.price)}</p>
                      <p className="text-sm text-gray-500 mt-1">Color: {item.selectedColor}</p>
                    </div>
                  </div>
                  
                  <p className="font-bold text-sm">Sub-Total: {formatCurrency(item.price * item.quantity)}</p>
                </div>

                {/* Controls  */}
                <div className="flex flex-row sm:flex-col justify-between items-end gap-4">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-primary font-bold hover:bg-gray-50 rounded-l-full"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-primary font-bold hover:bg-gray-50 rounded-r-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee:</span>
                <span className="font-bold">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vat:</span>
                <span className="font-bold">{formatCurrency(vat)}</span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex justify-between text-base">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-xl">{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full text-center bg-primary text-secondary font-bold py-3           rounded-full hover:bg-primary/80 transition-colors mb-3 max-w-[300px]:text-xs">
              Proceed to Check out
          </Link>
            <Link href="/" className="block w-full text-center border border-gray-200 text-gray-600 font-medium py-3 rounded-full hover:bg-primary/20 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* "You might also like" Section */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}