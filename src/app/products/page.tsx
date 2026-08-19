import { SitePage } from "@/components/layout/site-page";
import { ProductListingPage } from "@/components/shop/product-listing-page";
import { getCategories, getProducts } from "@/services/catalog-service";
import { fallbackCategories, fallbackProducts } from "@/services/fallback-catalog";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const params = await searchParams;
  const [apiProducts, apiCategories] = await Promise.all([getProducts().catch(() => []), getCategories().catch(() => [])]);
  const products = apiProducts.length ? apiProducts : fallbackProducts;
  const categories = apiCategories.length ? apiCategories : fallbackCategories;
  const selectedCategory = params.category || "";
  const query = (params.q || "").toLowerCase();

  return (
    <SitePage eyebrow="Shop" title={selectedCategory ? "Selected Products" : "Shop All Products"} description="Explore premium purification, commercial RO systems, electronics and spare parts.">
      <ProductListingPage key={`${selectedCategory}-${query}`} products={products} categories={categories} selectedCategory={selectedCategory} query={query} />
    </SitePage>
  );
}
