import { HeroSection } from "@/components/3d/hero-section";
import { CategoriesSection } from "@/components/product/categories-section";
import { FeaturedProducts } from "@/components/product/featured-products";
import { FlashDeals } from "@/components/product/flash-deals";
import { WhyChooseUs } from "@/components/layout/why-choose-us";
import { DownloadApp } from "@/components/layout/download-app";

export const metadata = {
  title: "QuickMart - Groceries in 10 Minutes",
  description: "Fresh groceries, daily essentials, and your favorite brands delivered in 10 minutes.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FlashDeals />
      <FeaturedProducts />
      <WhyChooseUs />
      <DownloadApp />
    </div>
  );
}
