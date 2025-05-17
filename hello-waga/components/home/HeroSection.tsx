"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover the Latest Trends
          </motion.h1>

          <motion.p
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Shop our curated collection of premium products at unbeatable prices.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/products"
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors duration-300 text-center"
            >
              Explore Categories
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated Shapes */}
      <motion.div
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-sky-600/20 z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-32 -right-8 w-32 h-32 rounded-full bg-sky-400/20 z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  )
}
