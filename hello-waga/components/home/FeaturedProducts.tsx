"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/products/ProductCard"
import type { Product } from "@/types/product"

// Mock data - will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 199.99,
    image: "/products/headphone.jpg",
    category: "Electronics",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this sleek smart watch.",
    price: 249.99,
    image: "/products/watch.webp",
    category: "Electronics",
    inStock: true,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "3",
    name: "Leather Backpack",
    description: "Stylish and durable leather backpack perfect for work or travel.",
    price: 129.99,
    image: "/products/bag.webp",
    category: "Fashion",
    inStock: true,
    rating: 4.9,
    reviews: 75,
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug",
    description: "Handcrafted ceramic coffee mug with minimalist design.",
    price: 24.99,
    image: "/products/mag.jpeg",
    category: "Home",
    inStock: true,
    rating: 4.7,
    reviews: 42,
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // This will be replaced with an API call
    const fetchProducts = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProducts(mockProducts)
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, style, and value.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/products"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              View All Products
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
