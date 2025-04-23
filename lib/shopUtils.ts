import { Perfume } from "@/constants/perfumes";

export type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

export const sortPerfumes = (perfumes: Perfume[], sortBy: SortOption) => {
  switch (sortBy) {
    case 'price-low':
      return [...perfumes].sort((a, b) => a.price - b.price);
    case 'price-high':
      return [...perfumes].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...perfumes].sort((a, b) => b.rating - a.rating);
    default:
      return perfumes;
  }
};

export const filterPerfumes = (perfumes: Perfume[], filters: {
  family?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return perfumes.filter(perfume => {
    if (filters.family && perfume.family !== filters.family) return false;
    if (filters.minPrice && perfume.price < filters.minPrice) return false;
    if (filters.maxPrice && perfume.price > filters.maxPrice) return false;
    return true;
  });
};

export const paginatePerfumes = (perfumes: Perfume[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  return perfumes.slice(startIndex, startIndex + itemsPerPage);
};