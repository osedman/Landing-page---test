"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Building, MapPin, Search, Plus, Edit, Eye, Trash2, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: "Modern Downtown Apartment",
      type: "apartment",
      address: "123 Main St, San Francisco, CA",
      status: "active",
      bookings: 24,
      revenue: "$7,200",
      rating: 4.8,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Cozy Beach House",
      type: "house",
      address: "456 Ocean Ave, Miami, FL",
      status: "active",
      bookings: 18,
      revenue: "$5,400",
      rating: 4.9,
      createdAt: "2024-02-20",
    },
    {
      id: 3,
      name: "Mountain Cabin Retreat",
      type: "cabin",
      address: "789 Mountain Rd, Aspen, CO",
      status: "inactive",
      bookings: 12,
      revenue: "$3,600",
      rating: 4.7,
      createdAt: "2024-03-10",
    },
    {
      id: 4,
      name: "City Center Studio",
      type: "studio",
      address: "321 Downtown Ave, New York, NY",
      status: "active",
      bookings: 31,
      revenue: "$4,650",
      rating: 4.6,
      createdAt: "2024-01-25",
    },
    {
      id: 5,
      name: "Luxury Villa",
      type: "house",
      address: "555 Beverly Hills, Los Angeles, CA",
      status: "active",
      bookings: 8,
      revenue: "$12,000",
      rating: 5.0,
      createdAt: "2024-04-05",
    },
    {
      id: 6,
      name: "Suburban Family Home",
      type: "house",
      address: "777 Suburban Ln, Austin, TX",
      status: "draft",
      bookings: 0,
      revenue: "$0",
      rating: 0,
      createdAt: "2024-05-01",
    },
  ]

  // Filter and search properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || property.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [properties, searchTerm, statusFilter])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log("Exporting properties to CSV...")
  }

  const handleDeleteProperty = (propertyId: number) => {
    // TODO: Implement property deletion with confirmation
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Deleting property:", propertyId)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      draft: "bg-yellow-100 text-yellow-700",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2E2E3A]">Properties</h1>
          <p className="text-[#2E2E3A]/70">Manage your rental properties</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Link href="/dashboard/properties/create">
            <Button className="flex items-center gap-2 bg-[#66CCFF] text-white hover:bg-[#4ECDC4]">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 border-[#2E2E3A]/20">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2E2E3A]/40" />
              <Input
                placeholder="Search by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-[#2E2E3A]/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#2E2E3A]/40" />
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="border-2 border-[#2E2E3A]/20">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card className="border-2 border-[#2E2E3A]/20">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2E2E3A]/10">
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Property</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E2E3A]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProperties.map((property) => (
                  <tr key={property.id} className="border-b border-[#2E2E3A]/10 hover:bg-[#66CCFF]/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#66CCFF]/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-[#66CCFF]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#2E2E3A]">{property.name}</div>
                          <div className="text-sm text-[#2E2E3A]/70">
                            Added {new Date(property.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="capitalize text-[#2E2E3A]/70">{property.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-[#2E2E3A]/70">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="py-4 px-4 text-[#2E2E3A] font-medium">
                      {property.bookings}
                    </td>
                    <td className="py-4 px-4 text-[#2E2E3A] font-medium">
                      {property.revenue}
                    </td>
                    <td className="py-4 px-4">
                      {property.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-[#2E2E3A]">{property.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      ) : (
                        <span className="text-[#2E2E3A]/40">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/properties/${property.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/properties/${property.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentProperties.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-[#2E2E3A]/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2E2E3A] mb-2">No properties found</h3>
              <p className="text-[#2E2E3A]/70 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first property"}
              </p>
              {(!searchTerm && statusFilter === "all") && (
                <Link href="/dashboard/properties/create">
                  <Button className="bg-[#66CCFF] text-white hover:bg-[#4ECDC4]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Property
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#2E2E3A]/70">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-[#2E2E3A]">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}