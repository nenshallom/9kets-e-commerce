"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CreditCard, Wallet, CheckCircle } from "lucide-react"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Costs (Same logic as Cart Page)
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10000 : 0;
  const vat = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping + vat;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Successful! Order placed.");
      // Here you would typically clear the cart and redirect to a success page
      router.push("/"); 
    }, 2000);
  };

  if (items.length === 0) {
     // Redirect or show empty state if user tries to access checkout without items
     return (
        <div className="container py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link href="/" className="text-primary hover:underline">Return to Shop</Link>
        </div>
     );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Forms */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Shipping Information */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input required type="email" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </section>

            {/* 2. Payment Method */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                
                {/* Credit Card Option */}
                <div 
                  className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    paymentMethod === "credit-card" ? "border-primary bg-orange-50/20" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("credit-card")}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === "credit-card" ? "border-primary" : "border-gray-300"
                    }`}>
                      {paymentMethod === "credit-card" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <span className="font-bold text-gray-900">Credit Card</span>
                    <p className="text-xs text-gray-500 hidden sm:block">Pay with your credit or debit card.</p>
                  </div>
                  <div className="flex gap-2">
                     {/* Mock Card Icons */}
                     <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center text-[6px] text-white">VISA</div>
                     <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center text-[6px] text-white">MC</div>
                  </div>
                </div>

                {/* PayPal Option */}
                <div 
                  className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    paymentMethod === "paypal" ? "border-primary bg-orange-50/20" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === "paypal" ? "border-primary" : "border-gray-300"
                    }`}>
                      {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <span className="font-bold text-gray-900">PayPal</span>
                    <p className="text-xs text-gray-500 hidden sm:block">Pay securely with your PayPal account.</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-xs">P</div>
                </div>

              </div>
            </section>

            {/* 3. Card Details (Conditional) */}
            {paymentMethod === "credit-card" && (
              <section className="animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" placeholder=".... .... .... ...." className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input type="text" placeholder="..." className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-6">Order Summary</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id + item.selectedColor} className="flex gap-4 text-sm">
                    {/* Compact layout for summary */}
                    <div className="flex-1">
                       <p className="font-bold text-gray-900">{item.name}</p>
                       <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100 mb-6" />

              {/* Totals */}
              <div className="space-y-3 text-sm mb-6">
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

              {/* Actions */}
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-secondary font-bold py-3 rounded-full hover:bg-orange-400 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isProcessing ? "Processing..." : "Make Payment"}
              </button>
              
              <div className="text-center">
                <Link href="/cart" className="text-sm text-gray-600 hover:text-primary font-medium">
                  Back to cart
                </Link>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}