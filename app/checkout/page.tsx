"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/features/OrderSummary";
import Input from "@/components/ui/Input";


export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Costs
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10000 : 0;
  const vat = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping + vat;

  // Handler for Payment Submission
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Successful! Order placed.");
      router.push("/"); 
    }, 2000);
  };

  // If Cart is Empty
  if (items.length === 0) {
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
                  <Input label="First Name" required placeholder="Enter first name" />
                  <Input label="Last Name" required placeholder="Enter last name" />
                </div>

                <Input label="Address" required placeholder="Enter your street address" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input label="City" required placeholder="City" />
                  <Input label="State" required placeholder="State" />
                  <Input label="ZIP Code" required placeholder="000000" />
                </div>

                <Input label="Email Address" required type="email" placeholder="example@email.com" />
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
                    <div>
                      <span className="font-bold text-gray-900 block">Credit Card</span>
                      <span className="text-xs text-gray-500 hidden sm:block">Pay with your credit or debit card.</span>
                    </div>
                  </div>
                  
                  {/* Credit Card Icons */}
                  <div className="flex gap-2">
                     <div className="w-10 h-6 relative">
                       <Image src="/payment/card.png" alt="Visa" fill className="object-contain" />
                     </div>
                     <div className="w-10 h-6 relative">
                       <Image src="/payment/card2.png" alt="Mastercard" fill className="object-contain" />
                     </div>
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
                    <div>
                      <span className="font-bold text-gray-900 block">PayPal</span>
                      <span className="text-xs text-gray-500 hidden sm:block">Pay securely with your PayPal account.</span>
                    </div>
                  </div>
                  
                  {/* PayPal Icon */}
                  <div className="w-6 h-6 relative">
                    <Image src="/payment/paypal.png" alt="PayPal" fill className="object-contain" />
                  </div>
                </div>

              </div>
            </section>

            {/* 3. Card Details (Conditional) */}
            {paymentMethod === "credit-card" && (
              <section className="animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="space-y-6">
                  <Input label="Card Number" placeholder=".... .... .... ...." />
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Expiry Date" placeholder="MM / YY" />
                    <Input label="CVC" placeholder="..." />
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary (Reusing Component) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              
              <OrderSummary 
                subtotal={subtotal} 
                shipping={shipping} 
                vat={vat} 
                total={total} 
                items={items} 
                showItems={true} 
              />

              <div className="mt-6">
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
          </div>

        </form>
      </div>
    </div>
  );
}