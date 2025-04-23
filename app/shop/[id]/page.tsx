import { notFound } from "next/navigation";
import { perfumes } from "@/constants/perfumes";
import Image from "next/image";

import AddToCartButton from "@/components/AddToCartButton";
import { FiChevronRight } from "react-icons/fi";
import Button from "@/components/Button";

// Generate static paths at build time

export async function generateStaticParams() {
  return perfumes.map((perfume) => ({
    id: perfume.id.toString(),
  }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = perfumes.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="pt-16 md:pt-30 min-h-screen flex items-center ">
      <div className="bg-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-rose-50 rounded-xl overflow-hidden">
            <div className="relative h-full w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-rose-900">
                {product.name}
              </h1>
              <div className="flex justify-between items-start mt-1">
                <p className="text-rose-600 text-lg">{product.family}</p>
                <span className="text-sm bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                  {product.size}ml
                </span>
              </div>
            </div>

            {/* Rating (keep your existing rating component) */}

            <p className="text-2xl font-medium text-rose-900">
              ${product.price}
            </p>

            <div className="pt-4 border-t border-rose-200">
              <h2 className="text-lg font-medium text-rose-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="flex space-x-4 pt-2">
              <div className="flex items-center justtify-start">
                <span>Add to Cart </span>
                <FiChevronRight className="ml-1" />
                <AddToCartButton perfume={product} />
              </div>
            </div>
            {product.notes && (
              <div className="pt-4 border-t border-rose-200">
                <h2 className="text-lg font-medium text-rose-900 mb-3">
                  Fragrance Notes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note, index) => (
                    <span
                      key={index}
                      className="text-sm bg-rose-50 text-rose-800 px-3 py-1 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      <div className="flex justify-center mt-8 items-center border-t border-rose-200 pt-6">
        <Button href="/shop" title="Continue Shopping" />
      </div>
      </div>
    </div>
  );
}
