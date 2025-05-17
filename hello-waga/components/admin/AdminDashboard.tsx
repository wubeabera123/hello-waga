"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Users, DollarSign, TrendingUp, Package, AlertCircle } from "lucide-react"
import RecentOrdersTable from "./RecentOrdersTable"
import SalesChart from "./SalesChart"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Sales",
      value: "$12,345",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-sky-500",
    },
    {
      title: "Customers",
      value: "1,024",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ]

  const lowStockProducts = [
    { id: 1, name: "Wireless Headphones", stock: 5, threshold: 10 },
    { id: 2, name: "Smart Watch", stock: 3, threshold: 10 },
    { id: 3, name: "Bluetooth Speaker", stock: 7, threshold: 15 },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <SalesChart />
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
          </div>

          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-orange-600">{product.stock}</span>
                  <span className="text-gray-500"> / {product.threshold}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
            View All Inventory
          </button>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <RecentOrdersTable />
      </motion.div>
    </div>
  )
}
