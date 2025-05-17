"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-6" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold text-sky-600">Hello Waga</h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`${isActive("/") ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-600"} transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`${isActive("/products") ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-600"} transition-colors`}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`${isActive("/categories") ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-600"} transition-colors`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`${isActive("/about") ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-600"} transition-colors`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${isActive("/contact") ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-600"} transition-colors`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-sky-600 transition-colors">
            <Search size={20} />
          </button>

          <Link href="/cart" className="text-gray-700 hover:text-sky-600 transition-colors relative">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-sky-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="text-gray-700 hover:text-sky-600 transition-colors">
                <User size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
                  Profile
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
                  Orders
                </Link>
                {user.isAdmin && (
                  <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-gray-700 hover:text-sky-600 transition-colors">
              <User size={20} />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-sky-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-md"
        >
          <nav className="flex flex-col py-4 px-4">
            <Link
              href="/"
              className={`py-2 ${isActive("/") ? "text-sky-600 font-medium" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`py-2 ${isActive("/products") ? "text-sky-600 font-medium" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={`py-2 ${isActive("/categories") ? "text-sky-600 font-medium" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`py-2 ${isActive("/about") ? "text-sky-600 font-medium" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`py-2 ${isActive("/categories") ? "text-sky-600 font-medium" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
