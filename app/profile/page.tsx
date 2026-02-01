"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Package, Wallet, FileText } from "lucide-react";

// Mock Data representing Order History
const orders = [
  {
    id: "#ORD-10025",
    date: "Sept 2, 2025",
    total: 1430000,
    itemsCount: 2,
    status: "Completed",
    images: ["/products/xbox.png", "/products/iphone15.jpg"],
  },
  {
    id: "#ORD-10023",
    date: "Aug 18, 2025",
    total: 1200000,
    itemsCount: 1,
    status: "In Progress",
    images: ["/products/xbox.png", "/products/airpod.png", "/products/cannon2.jpeg"],
  },
  {
    id: "#ORD-10024",
    date: "Aug 5, 2025",
    total: 950000,
    itemsCount: 1,
    status: "Cancelled",
    images: ["/products/dellxps.png", "/products/xbox.png", "/products/samsungs24.jpeg"],
  },
];

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("All");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  // Filter Logic
  const filteredOrders = activeTab === "All" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  // Status Badge Helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600 border-green-600 bg-green-50";
      case "In Progress": return "text-blue-500 border-blue-500 bg-blue-50";
      case "Cancelled": return "text-red-500 border-red-500 bg-red-50";
      default: return "text-gray-500 border-gray-500";
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold text-secondary mb-8">Order History</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {["All", "In Progress", "Delivered", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab === "Delivered" ? "Completed" : tab)} // Mapping "Delivered" to "Completed"
            className={`flex-1 md:flex-none px-8 py-2 rounded-lg text-sm font-medium border transition-colors ${
              (tab === "Delivered" && activeTab === "Completed") || activeTab === tab
                ? "bg-orange-100 border-primary text-secondary"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            
            {/* Order Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-secondary">{order.id}</h3>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-full border border-gray-200">
                  <Wallet className="w-5 h-5 text-gray-500" />
                </div>
                <span className="font-bold text-secondary">{formatCurrency(order.total)}</span>
              </div>

              {/* Items Count */}
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-gray-50 rounded-full border border-gray-200">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">Items</p>
                  <p className="text-xs text-gray-500">{order.itemsCount}x</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>

            {/* Order Details Link  */}
            <div className="flex justify-end mb-4">
               <button className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors">
                 View Order Details <ExternalLink className="w-4 h-4" />
               </button>
            </div>

            {/* Product Thumbnails Area */}
            <div className="bg-gray-50 rounded-lg p-4 flex gap-4 overflow-x-auto">
              {order.images.map((img, i) => (
                <div key={i} className="w-16 h-16 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
                   <Image src={img} alt="Product" width={50} height={50} className="object-contain" />
                </div>
              ))}
            </div>
            
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No orders found in this category.
          </div>
        )}
      </div>
    </div>
  );
}