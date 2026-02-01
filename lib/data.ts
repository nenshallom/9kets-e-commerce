export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    badge?: string;
    createdAt: string; 
    description: string;
}

export const products: Product[] = [
    // PAGE 1 ITEMS
    {
      id: "1",
      name: "Iphone 15 ProMax",
      brand: "Apple",
      price: 1200000,
      image: "/products/iphone2.jpeg",
      images: ["/products/iphone2.jpeg", "/products/iphone3.jpeg"],
      category: "Smartphones",
      rating: 4.9,
      reviews: 2010,
      badge: "Best Seller",
      createdAt: "2024-01-15", 
      description: "The iPhone 15 Pro Max features a strong and lightweight titanium design with a textured matte-glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash, water, and dust resistant."
    },
    {
      id: "2",
      name: "Dell XPS 13 (2023)",
      brand: "Dell",
      price: 950000,
      image: "/products/dellxps.png",
      images: ["/products/dellxps.png", "/products/dell2.jpeg"],
      category: "Laptops",
      rating: 4.5,
      reviews: 876,
      badge: "New",
      createdAt: "2023-12-10",
      description: "Dell XPS 13 is the world's smallest 13-inch laptop, featuring a stunning InfinityEdge display and powerful Intel processors inside a premium aluminum chassis."
    },
    {
      id: "3",
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 320000,
      image: "/products/sony-headphones.png",
      images: ["/products/sony-headphones.png", "/products/sony2.jpeg"],
      category: "Headphones",
      rating: 4.7,
      reviews: 1500,
      badge: "Limited",
      createdAt: "2023-11-20",
      description: "Industry-leading noise cancellation and magnificent sound quality with the integrated V1 processor. Up to 30-hour battery life with quick charging."
    },
    {
      id: "4",
      name: "Samsung Galaxy Watch 6",
      brand: "Samsung",
      price: 280000,
      image: "/products/galaxy-watch.png",
      images: ["/products/galaxy-watch.png", "/products/galaxy-watch-strap.png"],
      category: "Accessories",
      rating: 4.5,
      reviews: 890,
      badge: "Limited",
      createdAt: "2023-11-15",
      description: "Advanced sleep coaching, personalized heart rate zones, and a sleek design make the Galaxy Watch 6 the ultimate health companion."
    },
    {
      id: "5",
      name: "AirPods Pro 2nd Gen",
      brand: "Apple",
      price: 220000,
      image: "/products/airpod.png",
      images: ["/products/airpod.png", "/products/airpod2.jpeg", "/products/airpod3.jpeg"],
      category: "Headphones",
      rating: 4.6,
      reviews: 2345,
      createdAt: "2023-10-05",
      description: "Experience 2x more Active Noise Cancellation and personalized Spatial Audio. The MagSafe Charging Case now includes Precision Finding."
    },
    {
      id: "6",
      name: "Xbox Series X",
      brand: "Microsoft",
      price: 680000,
      image: "/products/xbox.png",
      images: ["/products/xbox.png", "/products/xbox2.png", "/products/xbox3.png", "/products/xbox4.png"],
      category: "Home Tech",
      rating: 4.7,
      reviews: 2800,
      badge: "Limited",
      createdAt: "2023-09-25",
      description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X."
    },
  
    // PAGE 2 ITEMS
    {
      id: "7",
      name: "MacBook Air M2",
      brand: "Apple",
      price: 850000,
      image: "/products/macbook.jpeg", 
      images: ["/products/macbook.jpeg", "/products/macbook2.jpeg", "/products/macbook3.jpeg"],
      category: "Laptops",
      rating: 4.8,
      reviews: 1200,
      createdAt: "2023-09-10",
      description: "Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency."
    },
    {
      id: "8",
      name: "Samsung S24 Ultra",
      brand: "Samsung",
      price: 1350000,
      image: "/products/samsungs24.jpeg", 
      images: ["/products/samsungs24.jpeg", "/products/samsung2.jpeg", "/products/samsung3.jpeg"],
      category: "Smartphones",
      rating: 4.9,
      reviews: 950,
      badge: "Best Seller",
      createdAt: "2023-08-30",
      description: "Meet the Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display."
    },
    {
      id: "9",
      name: "JBL Flip 6",
      brand: "JBL",
      price: 85000,
      image: "/products/flip6.jpeg", 
      images: ["/products/flip6.jpeg", "/products/flip2.jpeg", "/products/flip3.jpeg"],
      category: "Headphones",
      rating: 4.4,
      reviews: 3100,
      createdAt: "2023-08-15",
      description: "The JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity thanks to its 2-way speaker system."
    },
    {
      id: "10",
      name: "iPad Air 5",
      brand: "Apple",
      price: 450000,
      image: "/products/ipad.jpeg", 
      images: ["/products/ipad.jpeg", "/products/ipad2.jpeg", "/products/ipad3.jpeg"],
      category: "Tablets",
      rating: 4.7,
      reviews: 670,
      badge: "Limited",
      createdAt: "2023-07-20",
      description: "With the breakthrough M1 chip, ultra-fast 5G, and a new front camera with Center Stage, iPad Air is a creative powerhouse."
    },
    {
      id: "11",
      name: "Logitech MX Master 3S",
      brand: "Logitech",
      price: 95000,
      image: "/products/logitech.jpeg", 
      images: ["/products/logitech.jpeg", "/products/logitech2.jpeg", "/products/logitech3.jpeg"],
      category: "Accessories",
      rating: 4.9,
      reviews: 5000,
      createdAt: "2023-06-10",
      description: "An iconic mouse remastered. Now with Quiet Clicks and 8K DPI tracking for more feel and performance than ever before."
    },
    {
      id: "12",
      name: "Canon EOS R50",
      brand: "Canon",
      price: 650000,
      image: "/products/cannon.jpeg", 
      images: ["/products/cannon.jpeg", "/products/cannon2.jpeg", "/products/cannon3.jpeg"],
      category: "Cameras",
      rating: 4.6,
      reviews: 320,
      createdAt: "2023-05-05",
      description: "A compact and lightweight mirrorless camera designed for content creators, featuring 4K video and a 24.2MP CMOS sensor."
    },
  
    // PAGE 3 ITEMS
    {
      id: "13",
      name: "PS5 Controller",
      brand: "Sony",
      price: 55000,
      image: "/products/controller.jpeg",
      images: ["/products/controller.jpeg", "/products/controller2.jpeg", "/products/controller3.jpeg"],
      category: "Gaming",
      rating: 4.8,
      reviews: 4100,
      createdAt: "2023-01-15",
      description: "Discover a deeper, highly immersive gaming experience with the innovative new PS5 controller, featuring haptic feedback."
    },
    {
      id: "14",
      name: "Google Pixel 8",
      brand: "Google",
      price: 720000,
      image: "/products/pixel.jpeg",
      images: ["/products/pixel.jpeg", "/products/pixel2.jpeg", "/products/pixel3.jpeg"],
      category: "Smartphones",
      rating: 4.5,
      reviews: 560,
      badge: "New",
      createdAt: "2022-12-20",
      description: "The Google Pixel 8 features the new Google Tensor G3 chip, a stunning Actua display, and an advanced camera for amazing photos."
    },
    {
        id: "15",
        name: "Sony MH-1110XM5",
        brand: "Sony",
        price: 320000,
        image: "/products/sony2.jpeg",
        images: ["/products/sony2.jpeg", "/products/sony3.jpeg"],
        category: "Headphones",
        rating: 4.7,
        reviews: 1500,
        createdAt: "2023-11-20",
        description: "Industry-leading noise cancellation and magnificent sound quality with the integrated V1 processor. Up to 30-hour battery life with quick charging."
      },
];