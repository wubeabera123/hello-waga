"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/types/product"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

          {/* Quick action buttons */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-gray-800 p-2 rounded-full"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-gray-800 p-2 rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to wishlist functionality will be implemented later
                }}
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>

          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="font-bold text-sky-600">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
