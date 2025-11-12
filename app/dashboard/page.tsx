import Link from "next/link"
import { Building, Calendar, TrendingUp, Users, DollarSign, Eye, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2 from last month",
      changeType: "positive",
      icon: Building,
    },
    {
      title: "Total Bookings",
      value: "48",
      change: "+12 from last month",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Monthly Revenue",
      value: "$8,450",
      change: "+15% from last month",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      change: "+5% from last month",
      changeType: "positive",
      icon: TrendingUp,
    },
  ]

  const recentProperties = [
    {
      id: 1,
      name: "Modern Downtown Apartment",
      location: "San Francisco, CA",
      status: "active",
      bookings: 8,
      revenue: "$2,400",
    },
    {
      id: 2,
      name: "Cozy Beach House",
      location: "Miami, FL",
      status: "active",
      bookings: 5,
      revenue: "$1,500",
    },
    {
      id: 3,
      name: "Mountain Cabin Retreat",
      location: "Aspen, CO",
      status: "inactive",
      bookings: 3,
      revenue: "$900",
    },
  ]

  const recentBookings = [
    {
      id: 1,
      property: "Modern Downtown Apartment",
      guest: "Sarah Johnson",
      checkIn: "Dec 15, 2024",
      checkOut: "Dec 18, 2024",
      status: "approved",
      amount: "$450",
    },
    {
      id: 2,
      property: "Cozy Beach House",
      guest: "Mike Chen",
      checkIn: "Dec 20, 2024",
      checkOut: "Dec 25, 2024",
      status: "pending",
      amount: "$1,000",
    },
    {
      id: 3,
      property: "Mountain Cabin Retreat",
      guest: "Emma Davis",
      checkIn: "Dec 22, 2024",
      checkOut: "Dec 28, 2024",
      status: "pending",
      amount: "$1,800",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2E2E3A]">Dashboard</h1>
          <p className="text-[#2E2E3A]/70">Welcome back! Here's an overview of your rental business.</p>
        </div>
        <Link href="/dashboard/properties/create">
          <Button className="flex items-center gap-2 bg-[#66CCFF] text-white hover:bg-[#4ECDC4]">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-2 border-[#2E2E3A]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2E2E3A]/70">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#2E2E3A] mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#66CCFF]/10">
                    <Icon className="h-6 w-6 text-[#66CCFF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Properties and Bookings */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card className="border-2 border-[#2E2E3A]/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[#2E2E3A]">Recent Properties</CardTitle>
            <Link href="/dashboard/properties">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 rounded-lg border border-[#2E2E3A]/10">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2E2E3A]">{property.name}</h4>
                    <p className="text-sm text-[#2E2E3A]/70">{property.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#2E2E3A]/60">
                      <span>{property.bookings} bookings</span>
                      <span>{property.revenue} revenue</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {property.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="border-2 border-[#2E2E3A]/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[#2E2E3A]">Recent Bookings</CardTitle>
            <Link href="/dashboard/bookings">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border border-[#2E2E3A]/10">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2E2E3A]">{booking.property}</h4>
                    <p className="text-sm text-[#2E2E3A]/70">{booking.guest}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#2E2E3A]/60">
                      <span>{booking.checkIn}</span>
                      <span>-</span>
                      <span>{booking.checkOut}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#2E2E3A]">{booking.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-2 border-[#2E2E3A]/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#2E2E3A]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/properties/create">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Plus className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Add New Property</div>
                  <div className="text-xs text-[#2E2E3A]/60">List a new rental property</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Calendar className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Manage Bookings</div>
                  <div className="text-xs text-[#2E2E3A]/60">Review booking requests</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/properties">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Building className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">View Properties</div>
                  <div className="text-xs text-[#2E2E3A]/60">Manage your listings</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Users className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Update Profile</div>
                  <div className="text-xs text-[#2E2E3A]/60">Manage your information</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}