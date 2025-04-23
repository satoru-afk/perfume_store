"use client";
import { useState, useMemo } from "react";
import PerfumeCard from "@/components/PerfumeCard";
import { perfumes } from "@/constants/perfumes";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

type SortOption = "default" | "price-low" | "price-high" | "rating";

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedFamily, setSelectedFamily] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get unique perfume families
  const perfumeFamilies = useMemo(
    () => ["", ...new Set(perfumes.map((p) => p.family))],
    []
  );

  // Filter, sort and paginate products
  const { displayedPerfumes, totalFiltered } = useMemo(() => {
    // Filtering
    const filtered = perfumes.filter((p) => {
      const matchesFamily = !selectedFamily || p.family === selectedFamily;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesFamily && matchesPrice;
    });

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    // Pagination
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginated = sorted.slice(startIdx, startIdx + itemsPerPage);

    return { displayedPerfumes: paginated, totalFiltered: filtered.length };
  }, [selectedFamily, priceRange, sortBy, currentPage]);

  const totalPages = Math.ceil(totalFiltered / itemsPerPage);

  return (
    <div className=" bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
      <div className="mt-20 mb-16 relative  bg-rose-50 md:rounded-full rounded-2xl py-12 flex flex-col items-center justify-center overflow-hidden">
        <Image src='/images/little-prince-silhouette.png' fill alt="bg" className="absolute inset-0 overflow-hidden object-cover z-0 blur-sm" priority
          quality={80}/>
          
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 to-rose-200/30" />
      

      <h1 className="text-4xl font-serif font-light text-rose-900 mb-3 z-10">
            The Perfume Collection
          </h1>
          <p className="text-lg text-rose-800/90 z-10 mb-5 leading-relaxed">
            Discover scents that tell your story
          </p>
      </div>
        {/* Controls Bar */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-sm text-rose-700">{totalFiltered} results</div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Family Filter */}
            <select
              value={selectedFamily}
              onChange={(e) => {
                setSelectedFamily(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-sm bg-white border border-rose-100 text-rose-800 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              {perfumeFamilies.map((family) => (
                <option key={family} className="cursor-pointer" value={family}>
                  {family || "All Categories"}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <div className="relative flex items-center gap-2">
              <span className="text-xs text-rose-700 whitespace-nowrap">
                Price:
              </span>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[0]}
                onChange={(e) => {
                  setPriceRange([Number(e.target.value), priceRange[1]]);
                  setCurrentPage(1);
                }}
                className="w-full h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-rose-700 whitespace-nowrap">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 text-sm bg-white border border-rose-100 text-rose-800 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <option  value="default">
                Sort by
              </option>
              <option  value="price-low">
                Price: Low to High
              </option>
              <option  value="price-high">
                Price: High to Low
              </option>
              <option  value="rating">
                Top Rated
              </option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-rose-700 rounded-lg border border-rose-100 hover:bg-rose-50 disabled:opacity-30 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const pageNum =
                  currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                      currentPage === pageNum
                        ? "bg-rose-600 text-white border-rose-600"
                        : "border-rose-100 text-rose-700 hover:bg-rose-50"
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 text-rose-700 rounded-lg border border-rose-100 hover:bg-rose-50 disabled:opacity-30 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
