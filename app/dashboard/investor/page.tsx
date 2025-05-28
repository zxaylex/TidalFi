"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TrendingUp, DollarSign, PieChart, Fish, ArrowUpRight, Grid3X3, List, BarChart3, Users } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function InvestorDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const holdings = [
    {
      tokenId: "TF-001",
      species: "Atlantic Salmon",
      farmer: "Nordic Aqua Farm",
      investment: "$5,000",
      currentValue: "$5,750",
      return: "+15%",
      harvestDate: "2024-03-15",
      progress: 75,
      status: "Growing",
    },
    {
      tokenId: "TF-002",
      species: "Rainbow Trout",
      farmer: "Mountain Stream Farms",
      investment: "$3,500",
      currentValue: "$3,920",
      return: "+12%",
      harvestDate: "2024-02-28",
      progress: 90,
      status: "Ready Soon",
    },
    {
      tokenId: "TF-003",
      species: "Sea Bass",
      farmer: "Mediterranean Aqua",
      investment: "$7,200",
      currentValue: "$7,560",
      return: "+5%",
      harvestDate: "2024-04-20",
      progress: 45,
      status: "Growing",
    },
    {
      tokenId: "TF-004",
      species: "Arctic Char",
      farmer: "Northern Waters Farm",
      investment: "$4,200",
      currentValue: "$4,830",
      return: "+15%",
      harvestDate: "2024-04-10",
      progress: 80,
      status: "Ready Soon",
    },
  ]

  const renderGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {holdings.map((holding) => (
        <Card key={holding.tokenId} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Fish className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{holding.species}</CardTitle>
                  <CardDescription>{holding.farmer}</CardDescription>
                </div>
              </div>
              <Badge variant={holding.status === "Ready Soon" ? "default" : "secondary"}>{holding.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Investment</p>
                <p className="font-medium">{holding.investment}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Value</p>
                <p className="font-medium">{holding.currentValue}</p>
              </div>
              <div>
                <p className="text-gray-600">Return</p>
                <p className="font-medium text-green-600">{holding.return}</p>
              </div>
              <div>
                <p className="text-gray-600">Harvest Date</p>
                <p className="font-medium">{holding.harvestDate}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Growth Progress</span>
                <span>{holding.progress}%</span>
              </div>
              <Progress value={holding.progress} className="h-2" />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/token/${holding.tokenId}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Sell Tokens
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-4">
      {holdings.map((holding) => (
        <Card key={holding.tokenId}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Fish className="h-10 w-10 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">{holding.species}</h3>
                  <p className="text-sm text-gray-600">
                    Token {holding.tokenId} • {holding.farmer}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Investment</p>
                  <p className="font-medium">{holding.investment}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Value</p>
                  <p className="font-medium">{holding.currentValue}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Return</p>
                  <p className="font-medium text-green-600">{holding.return}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-medium">{holding.progress}%</p>
                </div>
                <Badge variant={holding.status === "Ready Soon" ? "default" : "secondary"}>{holding.status}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/token/${holding.tokenId}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Sell
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="investor" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
            <p className="text-gray-600">Track your aquaculture investments</p>
          </div>
          <Button asChild>
            <Link href="/marketplace">
              <TrendingUp className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Link>
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127,450</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Across 8 farms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$23,890</div>
              <p className="text-xs text-muted-foreground">14.2% average ROI</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Fish className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">Successful harvests</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="metrics">Investment Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Holdings</CardTitle>
                    <CardDescription>Your active aquaculture investments</CardDescription>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid3X3 className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardHeader>
              <CardContent>{viewMode === "grid" ? renderGridView() : renderListView()}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Returns</CardTitle>
                <CardDescription>Your portfolio performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p className="font-medium">Investment Returns Chart</p>
                    <p className="text-sm text-gray-600">14.2% average ROI</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                      <p className="font-medium">Monthly Returns Chart</p>
                      <p className="text-sm text-gray-600">+12.5% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Atlantic Salmon</span>
                      </div>
                      <span className="font-semibold">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Sea Bass</span>
                      </div>
                      <span className="font-semibold">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Rainbow Trout</span>
                      </div>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span>Arctic Char</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <p className="font-medium">Investment Analytics Chart</p>
                      <p className="text-sm text-gray-600">Risk vs Return Analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diversification Metrics</CardTitle>
                  <CardDescription>Portfolio risk distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                      <p className="font-medium">Diversification Chart</p>
                      <p className="text-sm text-gray-600">Well-diversified portfolio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Investment Metrics</CardTitle>
                <CardDescription>Performance indicators and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$89,200</div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-xs text-green-600">+15% vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$23,890</div>
                    <p className="text-sm text-gray-600">Realized Gains</p>
                    <p className="text-xs text-blue-600">+22% vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">94%</div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-xs text-purple-600">+2% vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">4.2 mo</div>
                    <p className="text-sm text-gray-600">Avg Hold Time</p>
                    <p className="text-xs text-orange-600">-0.3 mo vs last quarter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Behavior</CardTitle>
                <CardDescription>Your investment patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                    <p className="font-medium">Investment Behavior Chart</p>
                    <p className="text-sm text-gray-600">Consistent monthly investments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
