'use client'
import { Perfume } from "@/constants/perfumes";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiChevronRight } from "react-icons/fi";
import AddToCartButton from "./AddToCartButton";

export default function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <div className="bg-rose-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-rose-100 border border-gray-100">
      <Link href={`/products/${perfume.id}`} prefetch={false} className="block relative">
        {/* Image container */}
        <div className="relative h-72 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-transparent z-10" />
          <Image 
            src={perfume.imageUrl} 
            alt={perfume.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="/images/perfume-placeholder.jpg"
            priority={false}
          />
        </div>
        
        {/* Floating family tag */}
        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-rose-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm z-20">
          {perfume.family}
        </span>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-serif text-gray-900 group-hover:text-rose-700 line-clamp-1">
            {perfume.name}
          </h3>
          <span className="text-xs bg-rose-100 text-rose-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
            {perfume.size}ml
          </span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mb-3">
          <div className="flex mr-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < perfume.rating
                    ? "text-amber-500 fill-amber-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({perfume.reviews} reviews)
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-medium text-gray-900">
            ${perfume.price.toFixed(2)}
          </span>
          
          <div className="flex space-x-2">
            <Link 
              href={`/shop/${perfume.id}`}
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700"
            >
              View <FiChevronRight className="ml-1 w-3 h-3" />
            </Link>
            <AddToCartButton perfume={perfume} />
          </div>
        </div>
      </div>
    </div>
  );
}