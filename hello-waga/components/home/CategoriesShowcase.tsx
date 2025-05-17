"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "/placeholder.svg?height=400&width=600",
    count: 42,
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "/placeholder.svg?height=400&width=600",
    count: 56,
  },
  {
    id: "home",
    name: "Home & Living",
    image: "/placeholder.svg?height=400&width=600",
    count: 38,
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "/placeholder.svg?height=400&width=600",
    count: 24,
  },
]

export default function CategoriesShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of products across various categories to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/categories/${category.id}`} className="block group">
                <div className="relative overflow-hidden rounded-lg h-64">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.count} Products</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
