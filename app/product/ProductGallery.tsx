"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Main Large Image */}
      <div className="relative h-100  rounded-lg overflow-hidden  flex items-center justify-center">
        <Image
          src={images[selectedImage]}
          alt="Product Main"
          fill
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md border-2 overflow-hidden ${
              selectedImage === index
                ? "border-primary"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              fill
              className="object-contain p-2 mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  );
}