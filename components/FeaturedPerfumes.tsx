import PerfumeCard from "./PerfumeCard";
import { perfumes } from "@/constants/perfumes";
import Link from "next/link";
export default function FeaturedPerfumes() {
  return (
    <section className="py-20 bg-white mt-0" id="featured-perfumes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-rose-900 mb-4">
            Our Celestial Collection
          </h2>
          <p className="text-rose-700 max-w-2xl mx-auto">
            Each scent tells a story as unique as the stars in the sky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.filter((perfume) => perfume.isFeatuer).map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center border border-rose-500 text-rose-500 hover:bg-rose-50 px-6 py-2 rounded-full transition-colors"
          >
            View All Scents
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
