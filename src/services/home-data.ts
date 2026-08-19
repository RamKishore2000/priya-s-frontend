import { getBanners, getCategories, getCouponOffers, getProducts, getReviews, getTestimonials } from "@/services/catalog-service";
import { fallbackBanners, fallbackCategories, fallbackProducts, fallbackTestimonials } from "@/services/fallback-catalog";
import type { Review, Testimonial } from "@/types/product";

export async function getHomeData() {
  const [categories, banners, products, couponOffers, testimonials, reviews] = await Promise.all([
    getCategories().catch(() => []),
    getBanners().catch(() => []),
    getProducts().catch(() => []),
    getCouponOffers().catch(() => []),
    getTestimonials().catch(() => []),
    getReviews().catch(() => []),
  ]);
  const customerFeedback = [...reviews.map(reviewToTestimonial), ...testimonials];

  return {
    categories: categories.length ? categories.slice(0, 5) : fallbackCategories,
    banners: banners.length ? banners : fallbackBanners,
    products: products.length ? products.slice(0, 6) : fallbackProducts,
    couponOffers,
    testimonials: customerFeedback.length ? customerFeedback.slice(0, 3) : fallbackTestimonials,
  };
}

function reviewToTestimonial(review: Review): Testimonial {
  return {
    id: `review-${review.id}`,
    name: review.name,
    role: review.role,
    rating: review.rating,
    review: review.message,
    product: "Customer Review",
    avatar: review.name.slice(0, 1).toUpperCase(),
  };
}
