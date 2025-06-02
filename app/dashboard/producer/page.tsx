"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Fish,
  Plus,
  Thermometer,
  Activity,
  DollarSign,
  Grid3X3,
  List,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function producerDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const harvestTokens = [
    {
      id: "TF-001",
      species: "Atlantic Salmon",
      quantity: "2,500 kg",
      harvestDate: "2024-03-15",
      location: "Farm A - Sector 3",
      progress: 75,
      status: "Growing",
      funded: "$18,750",
      total: "$25,000",
    },
    {
      id: "TF-002",
      species: "Rainbow Trout",
      quantity: "1,800 kg",
      harvestDate: "2024-02-28",
      location: "Farm B - Sector 1",
      progress: 90,
      status: "Ready Soon",
      funded: "$13,500",
      total: "$15,000",
    },
    {
      id: "TF-003",
      species: "Sea Bass",
      quantity: "3,200 kg",
      harvestDate: "2024-04-20",
      location: "Farm A - Sector 5",
      progress: 45,
      status: "Growing",
      funded: "$28,800",
      total: "$32,000",
    },
    {
      id: "TF-004",
      species: "Arctic Char",
      quantity: "1,500 kg",
      harvestDate: "2024-04-10",
      location: "Farm C - Sector 2",
      progress: 65,
      status: "Growing",
      funded: "$11,700",
      total: "$18,000",
    },
  ]

  const renderGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {harvestTokens.map((harvest) => (
        <Card key={harvest.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Fish className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{harvest.species}</CardTitle>
                  <CardDescription>Token {harvest.id}</CardDescription>
                </div>
              </div>
              <Badge variant={harvest.status === "Ready Soon" ? "default" : "secondary"}>{harvest.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-medium">{harvest.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Harvest Date</p>
                <p className="font-medium">{harvest.harvestDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-medium">{harvest.location}</p>
              </div>
              <div>
                <p className="text-gray-600">Funding</p>
                <p className="font-medium">
                  {harvest.funded} / {harvest.total}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Growth Progress</span>
                <span>{harvest.progress}%</span>
              </div>
              <Progress value={harvest.progress} className="h-2" />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/token/${harvest.id}`}>View Details</Link>
              </Button>
              {harvest.status === "Ready Soon" && (
                <Button size="sm" className="flex-1">
                  Initiate Harvest
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-4">
      {harvestTokens.map((harvest) => (
        <Card key={harvest.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Fish className="h-10 w-10 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">{harvest.species}</h3>
                  <p className="text-sm text-gray-600">
                    Token {harvest.id} • {harvest.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{harvest.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-medium">{harvest.progress}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Funding</p>
                  <p className="font-medium">{harvest.funded}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Harvest Date</p>
                  <p className="font-medium">{harvest.harvestDate}</p>
                </div>
                <Badge variant={harvest.status === "Ready Soon" ? "default" : "secondary"}>{harvest.status}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/token/${harvest.id}`}>View</Link>
                  </Button>
                  {harvest.status === "Ready Soon" && <Button size="sm">Harvest</Button>}
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
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Producer Dashboard</h1>
            <p className="text-gray-600">Manage your fish harvests and tokens</p>
          </div>
          <Button className="bg-blue-700 hover:bg-blue-600" asChild>
            <Link href="/tokenize">
              <Plus className="h-4 w-4 mr-2" />
              Create New Token
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tokens</CardTitle>
              <Fish className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Settlements</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 ready for harvest</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="harvests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="harvests">My Harvests</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Token Performance</TabsTrigger>
            <TabsTrigger value="iot">IoT Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="harvests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Harvest Tokens</CardTitle>
                    <CardDescription>Your current tokenized fish harvests</CardDescription>
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

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue trends over the past 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <p className="font-medium">Monthly Revenue Chart</p>
                      <p className="text-sm text-gray-600">$45,231 total this year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Species</CardTitle>
                  <CardDescription>Breakdown of earnings by fish type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Atlantic Salmon</span>
                      </div>
                      <span className="font-semibold">$18,450 (41%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Sea Bass</span>
                      </div>
                      <span className="font-semibold">$15,230 (34%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Rainbow Trout</span>
                      </div>
                      <span className="font-semibold">$8,890 (20%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span>Arctic Char</span>
                      </div>
                      <span className="font-semibold">$2,661 (5%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$45,231</div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xs text-green-600">+20.1% vs last year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">$3,769</div>
                    <p className="text-sm text-gray-600">Avg Monthly</p>
                    <p className="text-xs text-blue-600">+15.3% vs last year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">$9.85</div>
                    <p className="text-sm text-gray-600">Avg Price/kg</p>
                    <p className="text-xs text-purple-600">+8.2% vs last year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">4,590kg</div>
                    <p className="text-sm text-gray-600">Total Volume</p>
                    <p className="text-xs text-orange-600">+11.5% vs last year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Success Rate</CardTitle>
                  <CardDescription>Performance of your tokenized harvests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <p className="font-medium">Success Rate Chart</p>
                      <p className="text-sm text-gray-600">92% success rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Speed Trends</CardTitle>
                  <CardDescription>How quickly your tokens get funded</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                      <p className="font-medium">Funding Speed Chart</p>
                      <p className="text-sm text-gray-600">3.2 days average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Token Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">24/26</div>
                    <p className="text-sm text-gray-600">Successful Harvests</p>
                    <p className="text-xs text-green-600">92% success rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3.2 days</div>
                    <p className="text-sm text-gray-600">Avg Funding Time</p>
                    <p className="text-xs text-blue-600">-0.8 days vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">78%</div>
                    <p className="text-sm text-gray-600">Investor Retention</p>
                    <p className="text-xs text-purple-600">+5% vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12.5%</div>
                    <p className="text-sm text-gray-600">Avg ROI Delivered</p>
                    <p className="text-xs text-orange-600">+1.2% vs target</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investor Satisfaction</CardTitle>
                <CardDescription>Feedback and ratings from your investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                    <p className="font-medium">Investor Satisfaction Chart</p>
                    <p className="text-sm text-gray-600">4.8/5 average rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="iot" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>IoT Monitoring</CardTitle>
                  <CardDescription>Real-time environmental data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Thermometer className="h-5 w-5 text-blue-600" />
                        <span>Water Temperature</span>
                      </div>
                      <span className="font-semibold">18.5°C</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span>Oxygen Level</span>
                      </div>
                      <span className="font-semibold">8.2 mg/L</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span>pH Level</span>
                      </div>
                      <span className="font-semibold">7.1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Equipment and monitoring status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Water Quality Sensors</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Feeding Systems</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Camera Monitoring</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Logging</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
