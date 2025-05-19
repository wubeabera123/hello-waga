"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"

// Mock data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-15",
    total: 129.99,
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-14",
    total: 79.95,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-14",
    total: 249.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-13",
    total: 54.5,
    status: "Completed",
    items: 2,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-05-12",
    total: 199.99,
    status: "Cancelled",
    items: 1,
  },
]

export default function RecentOrdersTable() {
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortField === "total") {
      return sortDirection === "asc" ? a.total - b.total : b.total - a.total
    } else if (sortField === "customer") {
      return sortDirection === "asc" ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer)
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("customer")}
            >
              <div className="flex items-center">
                Customer
                {sortField === "customer" &&
                  (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortField === "date" &&
                  (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                Total
                {sortField === "total" &&
                  (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sky-600">
                <Link href={`/admin/orders/${order.id}`}>{order.id}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">5</span> of <span className="font-medium">42</span> orders
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
