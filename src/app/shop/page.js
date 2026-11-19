import ShopExperience from "@/components/ShopExperience";
import { categories } from "@/data/products";

export const metadata = {
  title: "Shop All Organic Products",
  description: "Browse 82 traditional and natural products with Tamil descriptions from Naadu Nalam.",
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const requestedCategory = typeof params.category === "string" ? params.category : "";
  const initialCategory = categories.some((category) => category.value === requestedCategory)
    ? requestedCategory
    : "all";
  const initialWishlist = params.wishlist === "1";
  const focusSearch = params.focus === "search";
  const pageKey = `${initialCategory}-${initialWishlist}-${focusSearch}`;

  return (
    <ShopExperience
      key={pageKey}
      initialCategory={initialCategory}
      initialWishlist={initialWishlist}
      focusSearch={focusSearch}
    />
  );
}
