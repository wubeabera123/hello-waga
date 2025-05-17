"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Package, ShoppingBag, Users, BarChart2, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { path: "/admin/customers", label: "Customers", icon: Users },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart2 },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 focus:outline-none">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="ml-4 text-xl font-bold text-sky-600">ShopWave Admin</h1>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-64 h-full bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold text-sky-600">ShopWave Admin</h1>
            </div>

            <nav className="mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-3 ${
                    isActive(item.path) ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  logout()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </motion.div>
      )}

      {/* Desktop Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-sm hidden lg:block transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className={`p-4 border-b flex ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold text-sky-600">ShopWave Admin</h1>
            ) : (
              <span className="text-xl font-bold text-sky-600">SW</span>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none">
              <ChevronDown
                size={20}
                className={`transform transition-transform ${isSidebarOpen ? "rotate-0" : "-rotate-90"}`}
              />
            </button>
          </div>

          <nav className="mt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 ${
                  isActive(item.path) ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:bg-gray-50"
                } ${isSidebarOpen ? "" : "justify-center"}`}
              >
                <item.icon size={20} className={isSidebarOpen ? "mr-3" : ""} />
                {isSidebarOpen && item.label}
              </Link>
            ))}

            <button
              onClick={logout}
              className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 ${
                isSidebarOpen ? "" : "justify-center"
              }`}
            >
              <LogOut size={20} className={isSidebarOpen ? "mr-3" : ""} />
              {isSidebarOpen && "Logout"}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
