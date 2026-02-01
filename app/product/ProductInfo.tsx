"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/data";
import { Star, Minus, Plus, Heart, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const { addToCart, removeFromCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [openAccordion, setOpenAccordion] = useState<string | null>("SPECIFICATIONS");
  
  // these would come from the 'product' prop
  const colors = [
    { 
      name: "Carbon Black", 
      image: gallery[0] // Uses the first image
    },
    { 
      name: "Robot White", 
      // Uses the second image if it exists, otherwise falls back to the first
      image: gallery[1] || gallery[0] 
    }, 
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const isInCart = items.some(
    (item) => item.id === product.id && item.selectedColor === selectedColor.name
  );

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  //  Handler for the Button
  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(product.id);
      toast.error("Removed from cart"); // Red toast
    } else {
      addToCart(product, quantity, selectedColor.name);
      toast.success(`${product.name} added to cart!`); // Green/Success toast
    }
  };
  // Handler for 'Buy Now' Button
  const handleBuyNow = () => {
    if (isInCart) {
      // If item exists, DO NOT add again. Just redirect.
      router.push("/cart");
    } else {
      // If item does NOT exist, add it, then redirect.
      addToCart(product, quantity, selectedColor.name);
      router.push("/cart");
    }
  };

  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-secondary mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center">
             {[...Array(5)].map((_, i) => (
               <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
             ))}
             <span className="ml-2 font-medium text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="font-medium text-gray-600">{product.brand}</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-black">
          {formatCurrency(product.price)}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Description */}
      <div>
        <p className="text-gray-600 text-sm leading-relaxed mb-1">
          {product.description}
        </p>
        <button className="text-primary text-sm font-medium hover:underline">Read more...</button>
      </div>

      {/* Color Selection */}
      <div className="flex gap-10">
        <div>
        <h3 className="font-bold text-secondary mb-2">Colors</h3>
        <p className="text-sm text-gray-500 mb-3">{selectedColor.name}</p>
        </div>
        
        <div className="flex gap-3">
          {colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`relative w-12 h-12 rounded-md border-2 flex items-center justify-center overflow-hidden ${
                selectedColor.name === color.name ? "border-primary" : "border-gray-200"
              }`}
            >
              <Image src={color.image} alt={color.name} width={40} height={40} className="object-cover p-1" />
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/*  Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Counter */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-max">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-primary hover:text-orange-600 font-bold px-2"
          >
            -
          </button>
          <span className="w-8 text-center font-medium text-gray-700">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="text-primary hover:text-orange-600 font-bold px-2"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <button 
          onClick={handleCartAction}
          className={`flex-1 font-bold py-3 px-6 rounded-full transition-colors shadow-lg ${
            isInCart 
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-none" 
              : "bg-primary text-secondary hover:bg-orange-400 shadow-orange-200" 
          }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        
        <button 
          onClick={handleBuyNow}
          className="flex-1 border border-secondary text-center text-secondary font-bold py-3 px-6 rounded-full hover:bg-gray-50 transition-colors"
        >
          Buy now
        </button>
      </div>

      {/*  Trust Signals */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-secondary mt-2   ">
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <Heart className="w-5 h-5" />
          Add to wishlist
        </button>
        <div className="flex items-center gap-2">
           <ShieldCheck className="w-5 h-5 text-primary/70" />
           <span>30 days money back guarantee</span>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="mt-6">
        <div className="flex bg-gray-100 p-1 rounded-full mb-6 w-full md:w-fit">
          {["Details", "Packaging", "Shipping details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none md:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-secondary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {/* Specifications */}
          <div className="border-b border-gray-100 pb-4">
            <button 
              onClick={() => toggleAccordion("SPECIFICATIONS")}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="font-bold text-secondary">SPECIFICATIONS</span>
              {openAccordion === "SPECIFICATIONS" ? (
                <div className="bg-primary rounded-full p-0.5"><Minus className="w-4 h-4 text-white" /></div>
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openAccordion === "SPECIFICATIONS" && (
              <div className="mt-2 space-y-3 text-sm text-gray-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  <p><span className="text-gray-400 block sm:inline w-32">Storage:</span> 1TB SSD</p>
                  <p><span className="text-gray-400 block sm:inline w-32">Resolution:</span> True 4K UHD</p>
                  <p><span className="text-gray-400 block sm:inline w-32">Frame Rate:</span> Up to 120FPS</p>
                  <p><span className="text-gray-400 block sm:inline w-32">Ports:</span> HDMI 2.1, USB-C, Ethernet</p>
                  <p><span className="text-gray-400 block sm:inline w-32">Dimensions:</span> 301mm × 151mm × 151mm</p>
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="border-b border-gray-100 pb-4">
             <button 
              onClick={() => toggleAccordion("REVIEWS")}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="font-bold text-secondary">REVIEWS</span>
              {openAccordion === "REVIEWS" ? (
                <div className="bg-primary rounded-full p-0.5"><Minus className="w-4 h-4 text-white" /></div>
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </button>
             {openAccordion === "REVIEWS" && <p className="text-sm text-gray-500 mt-2">No reviews yet.</p>}
          </div>

          {/* FAQ */}
          <div className="border-b border-gray-100 pb-4">
             <button 
              onClick={() => toggleAccordion("FAQ")}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="font-bold text-secondary">FAQ</span>
              {openAccordion === "FAQ" ? (
                <div className="bg-primary rounded-full p-0.5"><Minus className="w-4 h-4 text-white" /></div>
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 