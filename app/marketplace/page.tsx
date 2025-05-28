"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Fish,
  Search,
  Filter,
  MapPin,
  Calendar,
  TrendingUp,
  ShoppingCart,
  Plus,
  BarChart3,
  Eye,
  Star,
  CheckCircle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState<"farmer" | "investor" | "buyer">("investor")

  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as "farmer" | "investor" | "buyer"
    const storedRole = localStorage.getItem("userRole") as "farmer" | "investor" | "buyer"

    if (roleFromUrl) {
      setUserRole(roleFromUrl)
      localStorage.setItem("userRole", roleFromUrl)
    } else if (storedRole) {
      setUserRole(storedRole)
    }
  }, [searchParams])

  const getPageTitle = () => {
    switch (userRole) {
      case "farmer":
        return {
          title: "Marketplace Analytics",
          subtitle: "Monitor demand and pricing for your fish species",
        }
      case "investor":
        return {
          title: "Investment Marketplace",
          subtitle: "Discover and invest in sustainable fish harvests",
        }
      case "buyer":
        return {
          title: "Quality Fish Marketplace",
          subtitle: "Purchase premium, fresh fish directly from sustainable farms",
        }
    }
  }

  const pageInfo = getPageTitle()

  const tokens = [
    {
      tokenId: "TF-001",
      species: "Atlantic Salmon",
      farmer: "Nordic Aqua Farm",
      location: "Norway",
      quantity: "2,500 kg",
      totalValue: "$25,000",
      pricePerKg: "$10.00",
      minInvestment: "$500",
      harvestDate: "2024-03-15",
      certifications: ["ASC", "BAP 4-Star", "Carbon Neutral"],
      fundingProgress: 75,
      daysLeft: 12,
      expectedROI: "12-15%",
      farmerRating: 4.9,
      qualityGrade: "Premium",
      freshness: "Expected: 24-48h delivery post-harvest",
      trending: true,
    },
    {
      tokenId: "TF-002",
      species: "Rainbow Trout",
      farmer: "Mountain Stream Farms",
      location: "Scotland",
      quantity: "1,800 kg",
      totalValue: "$15,000",
      pricePerKg: "$8.33",
      minInvestment: "$250",
      harvestDate: "2024-02-28",
      certifications: ["ASC", "Organic"],
      fundingProgress: 90,
      daysLeft: 5,
      expectedROI: "10-13%",
      farmerRating: 4.7,
      qualityGrade: "Premium",
      freshness: "Expected: 12-24h delivery post-harvest",
      trending: false,
    },
    {
      tokenId: "TF-003",
      species: "Mediterranean Sea Bass",
      farmer: "Aegean Aquaculture",
      location: "Greece",
      quantity: "3,200 kg",
      totalValue: "$32,000",
      pricePerKg: "$10.00",
      minInvestment: "$1,000",
      harvestDate: "2024-04-20",
      certifications: ["EU Organic", "BAP 4-Star"],
      fundingProgress: 45,
      daysLeft: 28,
      expectedROI: "14-18%",
      farmerRating: 4.8,
      qualityGrade: "Super Premium",
      freshness: "Expected: 24-36h delivery post-harvest",
      trending: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader forceRole={userRole} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageInfo.title}</h1>
            <p className="text-gray-600">{pageInfo.subtitle}</p>
          </div>
          {userRole === "farmer" && (
            <Button asChild>
              <Link href="/tokenize">
                <Plus className="h-4 w-4 mr-2" />
                Create New Token
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by species, farmer, or location..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salmon">Atlantic Salmon</SelectItem>
                <SelectItem value="trout">Rainbow Trout</SelectItem>
                <SelectItem value="seabass">Sea Bass</SelectItem>
                <SelectItem value="seabream">Sea Bream</SelectItem>
              </SelectContent>
            </Select>
            {userRole === "buyer" && (
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Quality Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="super-premium">Super Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5000">$0 - $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000+">$10,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {userRole === "farmer" ? (
          // Farmer View - Restaurant Marketplace
          <Tabs defaultValue="restaurants" className="space-y-6">
            <TabsList>
              <TabsTrigger value="restaurants">Restaurant Partners</TabsTrigger>
              <TabsTrigger value="demand">Market Demand</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Trends</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="restaurants" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Restaurant Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">47</div>
                      <p className="text-sm text-gray-600">Premium restaurants</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Order Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">$2,850</div>
                      <p className="text-sm text-gray-600">Per restaurant order</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Repeat Order Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">89%</div>
                      <p className="text-sm text-gray-600">Customer satisfaction</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Ocean's Table",
                    type: "Fine Dining",
                    location: "New York, NY",
                    rating: 4.8,
                    preferredFish: ["Atlantic Salmon", "Sea Bass", "Tuna"],
                    orderFrequency: "Weekly",
                    avgOrderSize: "150-200 kg",
                    priceRange: "$12-18/kg",
                    specialRequirements: "Super Premium grade only",
                    lastOrder: "3 days ago",
                    totalOrders: 24,
                    preferredDelivery: "Tuesday & Friday",
                    chefRating: "Michelin 2-Star",
                    paymentTerms: "Net 15",
                    status: "Active",
                  },
                  {
                    name: "Nordic Bistro",
                    type: "Casual Fine Dining",
                    location: "Seattle, WA",
                    rating: 4.6,
                    preferredFish: ["Rainbow Trout", "Atlantic Salmon", "Arctic Char"],
                    orderFrequency: "Bi-weekly",
                    avgOrderSize: "80-120 kg",
                    priceRange: "$10-15/kg",
                    specialRequirements: "Organic certified preferred",
                    lastOrder: "1 week ago",
                    totalOrders: 18,
                    preferredDelivery: "Monday & Thursday",
                    chefRating: "James Beard Nominated",
                    paymentTerms: "Net 30",
                    status: "Active",
                  },
                  {
                    name: "Mediterranean Coast",
                    type: "Mediterranean",
                    location: "Los Angeles, CA",
                    rating: 4.7,
                    preferredFish: ["Sea Bass", "Sea Bream", "Dorado"],
                    orderFrequency: "Weekly",
                    avgOrderSize: "100-150 kg",
                    priceRange: "$11-16/kg",
                    specialRequirements: "Mediterranean species focus",
                    lastOrder: "5 days ago",
                    totalOrders: 31,
                    preferredDelivery: "Wednesday & Saturday",
                    chefRating: "AAA Five Diamond",
                    paymentTerms: "Net 15",
                    status: "High Volume",
                  },
                  {
                    name: "Coastal Kitchen",
                    type: "Seafood Specialist",
                    location: "Boston, MA",
                    rating: 4.5,
                    preferredFish: ["Atlantic Salmon", "Cod", "Haddock"],
                    orderFrequency: "2x per week",
                    avgOrderSize: "200-300 kg",
                    priceRange: "$9-14/kg",
                    specialRequirements: "Consistent supply needed",
                    lastOrder: "2 days ago",
                    totalOrders: 42,
                    preferredDelivery: "Monday, Wednesday, Friday",
                    chefRating: "Local Favorite",
                    paymentTerms: "Net 30",
                    status: "High Volume",
                  },
                  {
                    name: "Sakura Sushi",
                    type: "Japanese Fine Dining",
                    location: "San Francisco, CA",
                    rating: 4.9,
                    preferredFish: ["Tuna", "Salmon", "Sea Bass"],
                    orderFrequency: "Daily",
                    avgOrderSize: "50-80 kg",
                    priceRange: "$15-25/kg",
                    specialRequirements: "Sashimi grade only",
                    lastOrder: "Yesterday",
                    totalOrders: 156,
                    preferredDelivery: "Daily except Sunday",
                    chefRating: "Michelin 1-Star",
                    paymentTerms: "Net 7",
                    status: "Premium Partner",
                  },
                  {
                    name: "Farm & Sea",
                    type: "Farm-to-Table",
                    location: "Portland, OR",
                    rating: 4.4,
                    preferredFish: ["Rainbow Trout", "Steelhead", "Pacific Salmon"],
                    orderFrequency: "Weekly",
                    avgOrderSize: "60-100 kg",
                    priceRange: "$8-13/kg",
                    specialRequirements: "Sustainable practices required",
                    lastOrder: "4 days ago",
                    totalOrders: 28,
                    preferredDelivery: "Thursday",
                    chefRating: "Sustainable Dining Award",
                    paymentTerms: "Net 30",
                    status: "Growing",
                  },
                ].map((restaurant, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {restaurant.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            restaurant.status === "Premium Partner"
                              ? "default"
                              : restaurant.status === "High Volume"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            restaurant.status === "Premium Partner"
                              ? "bg-purple-600"
                              : restaurant.status === "High Volume"
                                ? "bg-blue-600"
                                : ""
                          }
                        >
                          {restaurant.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Type</p>
                          <p className="font-medium">{restaurant.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Order Frequency</p>
                          <p className="font-medium">{restaurant.orderFrequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Avg Order Size</p>
                          <p className="font-medium">{restaurant.avgOrderSize}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Preferred Fish Species</p>
                        <div className="flex flex-wrap gap-1">
                          {restaurant.preferredFish.map((fish) => (
                            <Badge key={fish} variant="outline" className="text-xs">
                              {fish}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Business Details</p>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price Range:</span>
                            <span className="font-medium text-green-600">{restaurant.priceRange}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Terms:</span>
                            <span className="font-medium">{restaurant.paymentTerms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Orders:</span>
                            <span className="font-medium">{restaurant.totalOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Order:</span>
                            <span className="font-medium">{restaurant.lastOrder}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Special Requirements</p>
                        <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          {restaurant.specialRequirements}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Chef Recognition</p>
                        <p className="text-xs text-purple-700 bg-purple-50 p-2 rounded">
                          <Star className="h-3 w-3 inline mr-1" />
                          {restaurant.chefRating}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/tokenize?restaurant=${restaurant.name.replace(/\s+/g, "-").toLowerCase()}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Token
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="demand" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">High Demand Species</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Atlantic Salmon</span>
                        <Badge variant="default">Hot</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sea Bass</span>
                        <Badge variant="default">High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rainbow Trout</span>
                        <Badge variant="secondary">Medium</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Funding Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Atlantic Salmon</span>
                        <span className="font-medium">2.1 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sea Bass</span>
                        <span className="font-medium">3.5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rainbow Trout</span>
                        <span className="font-medium">5.2 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Premiums</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Premium Grade</span>
                        <span className="font-medium text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Super Premium</span>
                        <span className="font-medium text-green-600">+25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Organic Certified</span>
                        <span className="font-medium text-green-600">+30%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Market Demand Analysis</CardTitle>
                  <CardDescription>Current buyer and investor interest by species</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Demand analytics chart would display here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Trends</CardTitle>
                  <CardDescription>Historical and current pricing data by species</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <p className="font-medium">Pricing Trends Chart</p>
                      <p className="text-sm text-gray-600">Average price: $9.85/kg (+8.2% YoY)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Price by Species</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Atlantic Salmon</span>
                        <div className="text-right">
                          <span className="font-semibold">$11.20/kg</span>
                          <p className="text-xs text-green-600">+12.5%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sea Bass</span>
                        <div className="text-right">
                          <span className="font-semibold">$10.80/kg</span>
                          <p className="text-xs text-green-600">+8.9%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rainbow Trout</span>
                        <div className="text-right">
                          <span className="font-semibold">$8.50/kg</span>
                          <p className="text-xs text-green-600">+5.2%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <p className="font-medium text-green-800">Premium demand rising</p>
                        <p className="text-sm text-green-700">+25% increase in premium grade requests</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="font-medium text-blue-800">Organic certification premium</p>
                        <p className="text-sm text-blue-700">30% price premium for organic certified fish</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">Ocean's Table - Urgent Need</h4>
                        <p className="text-sm text-green-700 mt-1">Looking for 200kg Atlantic Salmon - Premium grade</p>
                        <p className="text-xs text-green-600 mt-1">Willing to pay $18/kg - 20% above market</p>
                      </div>
                      <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Sakura Sushi - Weekly Contract</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Seeking reliable supplier for daily sashimi-grade fish
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Long-term contract potential - $25/kg premium</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link href="/tokenize?restaurant=oceans-table&species=salmon&grade=premium">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Token for Ocean's Table
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link href="/tokenize?restaurant=sakura-sushi&species=tuna&grade=sashimi">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Sashimi-Grade Token
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View All Restaurant Requests
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        ) : userRole === "buyer" ? (
          // Buyer View - Quality Fish Purchase
          <Tabs defaultValue="available" className="space-y-6">
            <TabsList>
              <TabsTrigger value="available">Available Fish</TabsTrigger>
              <TabsTrigger value="quality">Quality Grades</TabsTrigger>
              <TabsTrigger value="farmers">Trusted Farmers</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens.map((token) => (
                  <Card key={token.tokenId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <Fish className="h-16 w-16 text-blue-600" />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{token.species}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {token.farmer} • {token.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="default"
                          className={
                            token.qualityGrade === "Super Premium"
                              ? "bg-purple-600"
                              : token.qualityGrade === "Premium"
                                ? "bg-blue-600"
                                : "bg-gray-600"
                          }
                        >
                          {token.qualityGrade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Quantity</p>
                          <p className="font-medium">{token.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price per kg</p>
                          <p className="font-medium">{token.pricePerKg}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Harvest Date</p>
                          <p className="font-medium">{token.harvestDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Farmer Rating</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="font-medium">{token.farmerRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Freshness Guarantee</p>
                        <p className="text-xs text-green-700 bg-green-50 p-2 rounded">
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          {token.freshness}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {token.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/token/${token.tokenId}`}>View Details</Link>
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Purchase Fish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Standard Grade</CardTitle>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Standard
                      </Badge>
                    </div>
                    <CardDescription>Good quality farm-raised fish</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Fresh, farm-raised</li>
                      <li>• Basic quality controls</li>
                      <li>• 48-72h delivery window</li>
                      <li>• Competitive pricing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Premium Grade</CardTitle>
                      <Badge variant="default" className="bg-blue-600">
                        Premium
                      </Badge>
                    </div>
                    <CardDescription>High quality with enhanced standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Superior feed quality</li>
                      <li>• Enhanced monitoring</li>
                      <li>• 24-48h delivery window</li>
                      <li>• Certified sustainable practices</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Super Premium</CardTitle>
                      <Badge variant="default" className="bg-purple-600">
                        Super Premium
                      </Badge>
                    </div>
                    <CardDescription>Ultra-high quality, restaurant grade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Premium feed & conditions</li>
                      <li>• Real-time monitoring</li>
                      <li>• 12-24h delivery window</li>
                      <li>• Multiple certifications</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="farmers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trusted Farmers</CardTitle>
                  <CardDescription>Our highest-rated fish farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Nordic Aqua Farm",
                        location: "Norway",
                        rating: 4.9,
                        specialties: ["Atlantic Salmon", "Arctic Char"],
                        totalSales: "15,200 kg",
                        qualityScore: "98%",
                      },
                      {
                        name: "Mountain Stream Farms",
                        location: "Scotland",
                        rating: 4.7,
                        specialties: ["Rainbow Trout", "Brown Trout"],
                        totalSales: "8,900 kg",
                        qualityScore: "96%",
                      },
                      {
                        name: "Aegean Aquaculture",
                        location: "Greece",
                        rating: 4.8,
                        specialties: ["Sea Bass", "Sea Bream"],
                        totalSales: "12,100 kg",
                        qualityScore: "97%",
                      },
                    ].map((farmer, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{farmer.name}</h4>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {farmer.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{farmer.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">Quality: {farmer.qualityScore}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Specialties</p>
                            <p className="font-medium">{farmer.specialties.join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Sales</p>
                            <p className="font-medium">{farmer.totalSales}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-3" size="sm">
                          View Available Fish
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Investor View - Investment Opportunities
          <Tabs defaultValue="available" className="space-y-6">
            <TabsList>
              <TabsTrigger value="available">Investment Opportunities</TabsTrigger>
              <TabsTrigger value="trending">Trending Investments</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens.map((token) => (
                  <Card key={token.tokenId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <Fish className="h-16 w-16 text-blue-600" />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{token.species}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {token.farmer} • {token.location}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {token.tokenId}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Value</p>
                          <p className="font-medium">{token.totalValue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Min Investment</p>
                          <p className="font-medium">{token.minInvestment}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expected ROI</p>
                          <p className="font-medium text-green-600">{token.expectedROI}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days Left</p>
                          <p className="font-medium">{token.daysLeft} days</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>{token.fundingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${token.fundingProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Harvest: {token.harvestDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {token.certifications.slice(0, 2).map((cert) => (
                          <Badge key={cert} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {token.certifications.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{token.certifications.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/token/${token.tokenId}`}>View Details</Link>
                        </Button>
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/invest/${token.tokenId}`}>
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Invest
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Investments</CardTitle>
                  <CardDescription>Most popular tokens this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tokens
                      .filter((token) => token.trending)
                      .map((token, index) => (
                        <div
                          key={token.tokenId}
                          className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-green-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl font-bold text-blue-600">#{index + 1}</div>
                              <div>
                                <h4 className="font-semibold">{token.species}</h4>
                                <p className="text-sm text-gray-600">
                                  {token.farmer} • {token.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="mb-2">
                                🔥 Trending
                              </Badge>
                              <p className="text-sm text-gray-600">Expected ROI: {token.expectedROI}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex space-x-4 text-sm">
                              <span>Funding: {token.fundingProgress}%</span>
                              <span>Days left: {token.daysLeft}</span>
                            </div>
                            <Button size="sm" asChild>
                              <Link href={`/invest/${token.tokenId}`}>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Invest Now
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <p className="font-medium">Investment Trends Chart</p>
                        <p className="text-sm text-gray-600">+25% investment volume this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Species</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Atlantic Salmon</span>
                        <div className="text-right">
                          <span className="font-semibold">45%</span>
                          <p className="text-xs text-green-600">+12% this week</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sea Bass</span>
                        <div className="text-right">
                          <span className="font-semibold">28%</span>
                          <p className="text-xs text-green-600">+8% this week</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rainbow Trout</span>
                        <div className="text-right">
                          <span className="font-semibold">18%</span>
                          <p className="text-xs text-green-600">+3% this week</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
