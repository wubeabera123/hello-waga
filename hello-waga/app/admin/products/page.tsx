"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import ProductsManagement from "@/components/admin/ProductsManagement"
import { useAuth } from "@/context/AuthContext"

export default function AdminProductsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <AdminLayout>
      <ProductsManagement />
    </AdminLayout>
  )
}
