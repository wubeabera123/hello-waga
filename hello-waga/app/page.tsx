import { Suspense } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategoriesShowcase from "@/components/home/CategoriesShowcase"
import Newsletter from "@/components/home/Newsletter"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>
      <CategoriesShowcase />
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      <Newsletter />
      <Footer />
    </main>
  )
}
