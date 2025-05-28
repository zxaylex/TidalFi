"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, Truck, Fish, MapPin, Star } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function BuyerDashboard() {
  const getQualityBadgeColor = (grade: string) => {
    switch (grade) {
      case "Super Premium":
        return "bg-purple-600 text-white"
      case "Premium":
        return "bg-blue-600 text-white"
      case "Standard":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="buyer" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
            <p className="text-gray-600">Manage your fish purchases and deliveries</p>
          </div>
          <Button asChild>
            <Link href="/marketplace">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 ready for delivery</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Purchased</CardTitle>
              <Fish className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450 kg</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Quality Grade</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-xs text-muted-foreground">High quality sourcing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supplier Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">Excellent relationships</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="available">Available Fish</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Orders</CardTitle>
                <CardDescription>Track your fish purchases and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      orderId: "ORD-001",
                      tokenId: "TF-001",
                      species: "Atlantic Salmon",
                      quantity: "500 kg",
                      farmer: "Nordic Aqua Farm",
                      purchaseDate: "2024-01-15",
                      deliveryDate: "2024-03-15",
                      status: "Ready for Delivery",
                      price: "$4,500",
                      qualityGrade: "Premium",
                      location: "Farm A - Sector 3",
                    },
                    {
                      orderId: "ORD-002",
                      tokenId: "TF-002",
                      species: "Rainbow Trout",
                      quantity: "300 kg",
                      farmer: "Mountain Stream Farms",
                      purchaseDate: "2024-01-20",
                      deliveryDate: "2024-02-28",
                      status: "In Transit",
                      price: "$2,700",
                      qualityGrade: "Premium",
                      location: "Farm B - Sector 1",
                    },
                    {
                      orderId: "ORD-003",
                      tokenId: "TF-003",
                      species: "Sea Bass",
                      quantity: "800 kg",
                      farmer: "Mediterranean Aqua",
                      purchaseDate: "2024-02-01",
                      deliveryDate: "2024-04-20",
                      status: "Growing",
                      price: "$7,200",
                      qualityGrade: "Super Premium",
                      location: "Farm C - Sector 5",
                    },
                  ].map((order) => (
                    <div key={order.orderId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Fish className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">{order.species}</h4>
                            <p className="text-sm text-gray-600">{order.farmer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              order.status === "Ready for Delivery"
                                ? "default"
                                : order.status === "In Transit"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Order: {order.orderId}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Quantity</p>
                          <p className="font-medium">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="font-medium">{order.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Purchase Date</p>
                          <p className="font-medium">{order.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Delivery Date</p>
                          <p className="font-medium">{order.deliveryDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Quality Grade</p>
                          <Badge className={getQualityBadgeColor(order.qualityGrade)}>{order.qualityGrade}</Badge>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/token/${order.tokenId}`}>View Token</Link>
                        </Button>
                        {order.status === "Ready for Delivery" && (
                          <Button size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Schedule Delivery
                          </Button>
                        )}
                        {order.status === "In Transit" && (
                          <Button size="sm" variant="outline">
                            <Package className="h-4 w-4 mr-2" />
                            Track Shipment
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Fish Harvests</CardTitle>
                <CardDescription>Browse ready-to-purchase fish tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      tokenId: "TF-004",
                      species: "Organic Salmon",
                      quantity: "1,200 kg",
                      farmer: "Eco Nordic Farms",
                      harvestDate: "2024-03-01",
                      price: "$10,800",
                      pricePerKg: "$9.00",
                      qualityGrade: "Super Premium",
                      certifications: ["ASC", "Organic", "Carbon Neutral"],
                      location: "Norway",
                    },
                    {
                      tokenId: "TF-005",
                      species: "Mediterranean Sea Bream",
                      quantity: "800 kg",
                      farmer: "Aegean Aquaculture",
                      harvestDate: "2024-02-25",
                      price: "$6,400",
                      pricePerKg: "$8.00",
                      qualityGrade: "Premium",
                      certifications: ["BAP 4-Star", "EU Organic"],
                      location: "Greece",
                    },
                  ].map((fish) => (
                    <div key={fish.tokenId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Fish className="h-8 w-8 text-green-600" />
                          <div>
                            <h4 className="font-semibold">{fish.species}</h4>
                            <p className="text-sm text-gray-600">{fish.farmer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default">Available Now</Badge>
                          <p className="text-sm text-gray-600 mt-1">Token: {fish.tokenId}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Quantity</p>
                          <p className="font-medium">{fish.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Price</p>
                          <p className="font-medium">{fish.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price per kg</p>
                          <p className="font-medium">{fish.pricePerKg}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Harvest Date</p>
                          <p className="font-medium">{fish.harvestDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Quality Grade</p>
                          <Badge className={getQualityBadgeColor(fish.qualityGrade)}>{fish.qualityGrade}</Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {fish.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/token/${fish.tokenId}`}>View Details</Link>
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Purchase Tokens
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferred Suppliers</CardTitle>
                <CardDescription>Your trusted fish farming partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Nordic Aqua Farm",
                      location: "Norway",
                      specialties: ["Atlantic Salmon", "Arctic Char"],
                      rating: 4.9,
                      totalPurchases: "5,200 kg",
                      certifications: ["ASC", "BAP 4-Star", "Carbon Neutral"],
                    },
                    {
                      name: "Mediterranean Aqua",
                      location: "Greece",
                      specialties: ["Sea Bass", "Sea Bream", "Dorado"],
                      rating: 4.7,
                      totalPurchases: "3,800 kg",
                      certifications: ["EU Organic", "BAP 4-Star"],
                    },
                    {
                      name: "Mountain Stream Farms",
                      location: "Scotland",
                      specialties: ["Rainbow Trout", "Brown Trout"],
                      rating: 4.8,
                      totalPurchases: "2,450 kg",
                      certifications: ["ASC", "Organic"],
                    },
                  ].map((supplier) => (
                    <div key={supplier.name} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{supplier.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {supplier.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Specialties</p>
                          <p className="font-medium">{supplier.specialties.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Purchases</p>
                          <p className="font-medium">{supplier.totalPurchases}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {supplier.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Contact Supplier</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
