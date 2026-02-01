"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  User, ReceiptText, MapPin, CreditCard, Bell, 
  TicketPercent, ScrollText, Settings, CircleAlert, LogOut, ChevronDown 
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  { name: "Account Details", href: "#", icon: User }, 
  { name: "My Orders", href: "/profile", icon: ReceiptText },
  { name: "My Addresses", href: "#", icon: MapPin },
  { name: "My Payments", href: "#", icon: CreditCard },
  { name: "Notification Setting", href: "#", icon: Bell },
  { name: "Coupons", href: "#", icon: TicketPercent },
  { name: "My Recipes", href: "#", icon: ScrollText },
  { name: "Account Settings", href: "#", icon: Settings },
  { name: "Help Center", href: "#", icon: CircleAlert },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Find current active page name for the mobile dropdown label
  const activePage = sidebarLinks.find((link) => link.href === pathname) || sidebarLinks[0];

  const handleMobileNav = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="container py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-12">
      
      {/*  MOBILE DROPDOWN (Visible only on Mobile) */}
      <div className="lg:hidden">
        {/* User Info - Compact for Mobile */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative">
             <Image src="/profile/user-avatar.png" alt="User" fill className="object-cover" /> 
          </div>
          <span className="font-bold text-secondary">Ahurika</span>
        </div>

        {/* Dropdown Button */}
        <div className="relative z-10">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-secondary font-medium"
          >
            <div className="flex items-center gap-2">
              <activePage.icon className="w-5 h-5 text-primary" />
              {activePage.name}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <nav className="max-h-80 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleMobileNav(link.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-50 last:border-0 hover:bg-gray-50 ${
                        isActive ? "text-primary font-bold bg-orange-50/50" : "text-gray-600"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-gray-400"}`} />
                      {link.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden lg:block w-64 shrink-0 space-y-8">
        <div className="flex items-center gap-3 px-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary relative">
             <Image src="/profile/user.png" alt="User" fill className="object-cover" /> 
          </div>
          <span className="font-bold text-secondary">Ahurika</span>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-r-full ${
                  isActive 
                    ? "text-primary font-bold border-l-4 border-primary bg-orange-50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 px-4 border-t border-gray-100 mt-auto">
          <button className="flex items-center gap-2 text-red-500 font-bold text-sm hover:text-red-700">
            <LogOut className="w-5 h-5 rotate-180" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-125">
        {children}
      </div>
    </div>
  );
}