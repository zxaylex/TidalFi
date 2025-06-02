"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Fish,
  Waves,
  Activity,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  Plus,
  MapPin,
  Calendar,
  TrendingUp,
  BarChart3,
  Grid,
  List,
  Droplets,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"

export default function MyPondPage() {
  const [selectedPond, setSelectedPond] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const ponds = [
    {
      id: "pond-a",
      name: "Pond A",
      location: "North Sector",
      size: "2,500 m²",
      capacity: "15,000 kg",
      currentStock: "12,500 kg",
      utilization: 83,
      status: "optimal",
      waterTemp: "18.5°C",
      oxygenLevel: "8.2 mg/L",
      phLevel: "7.1",
      lastFed: "2 hours ago",
      activeTokens: 3,
      totalValue: "$45,000",
    },
    {
      id: "pond-b",
      name: "Pond B",
      location: "East Sector",
      size: "1,800 m²",
      capacity: "10,000 kg",
      currentStock: "8,200 kg",
      utilization: 82,
      status: "good",
      waterTemp: "17.8°C",
      oxygenLevel: "7.9 mg/L",
      phLevel: "7.3",
      lastFed: "1 hour ago",
      activeTokens: 2,
      totalValue: "$28,000",
    },
    {
      id: "pond-c",
      name: "Pond C",
      location: "South Sector",
      size: "3,200 m²",
      capacity: "20,000 kg",
      currentStock: "16,800 kg",
      utilization: 84,
      status: "attention",
      waterTemp: "19.2°C",
      oxygenLevel: "7.5 mg/L",
      phLevel: "6.9",
      lastFed: "30 minutes ago",
      activeTokens: 4,
      totalValue: "$62,000",
    },
  ]

  const tokens = [
    {
      id: "TF-001",
      species: "Atlantic Salmon",
      pond: "pond-a",
      quantity: "2,500 kg",
      harvestDate: "2024-03-15",
      progress: 75,
      status: "Growing",
      funded: "$18,750",
      total: "$25,000",
      daysRemaining: 12,
    },
    {
      id: "TF-002",
      species: "Rainbow Trout",
      pond: "pond-b",
      quantity: "1,800 kg",
      harvestDate: "2024-02-28",
      progress: 90,
      status: "Ready Soon",
      funded: "$13,500",
      total: "$15,000",
      daysRemaining: 5,
    },
    {
      id: "TF-003",
      species: "Sea Bass",
      pond: "pond-c",
      quantity: "3,200 kg",
      harvestDate: "2024-04-20",
      progress: 45,
      status: "Growing",
      funded: "$28,800",
      total: "$32,000",
      daysRemaining: 28,
    },
    {
      id: "TF-004",
      species: "Arctic Char",
      pond: "pond-a",
      quantity: "1,500 kg",
      harvestDate: "2024-04-10",
      progress: 65,
      status: "Growing",
      funded: "$11,700",
      total: "$18,000",
      daysRemaining: 18,
    },
    {
      id: "TF-005",
      species: "Sea Bream",
      pond: "pond-c",
      quantity: "2,100 kg",
      harvestDate: "2024-03-25",
      progress: 80,
      status: "Growing",
      funded: "$16,800",
      total: "$21,000",
      daysRemaining: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4" />
      case "good":
        return <CheckCircle className="h-4 w-4" />
      case "attention":
        return <AlertTriangle className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const filteredTokens = selectedPond === "all" ? tokens : tokens.filter((token) => token.pond === selectedPond)
  const selectedPondData = ponds.find((pond) => pond.id === selectedPond)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Pond</h1>
            <p className="text-gray-600">Monitor and manage your fish ponds and tokens</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/producer">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button asChild>
              <Link href="/tokenize">
                <Plus className="h-4 w-4 mr-2" />
                Create Token
              </Link>
            </Button>
          </div>
        </div>

        {/* Pond Filter */}
        <div className="mb-6">
          <Select value={selectedPond} onValueChange={setSelectedPond}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a pond" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ponds</SelectItem>
              {ponds.map((pond) => (
                <SelectItem key={pond.id} value={pond.id}>
                  {pond.name} - {pond.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Pond Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="tokens">Active Tokens</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Pond Status Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedPond === "all" ? ponds : ponds.filter((pond) => pond.id === selectedPond)).map((pond) => (
                <Card key={pond.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Waves className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{pond.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {pond.location}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(pond.status)}>
                        {getStatusIcon(pond.status)}
                        <span className="ml-1 capitalize">{pond.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Size</p>
                        <p className="font-medium">{pond.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Capacity</p>
                        <p className="font-medium">{pond.capacity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Stock</p>
                        <p className="font-medium">{pond.currentStock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Active Tokens</p>
                        <p className="font-medium">{pond.activeTokens}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span>{pond.utilization}%</span>
                      </div>
                      <Progress value={pond.utilization} className="h-2" />
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-600 mb-2">Quick Stats</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <Thermometer className="h-3 w-3 mx-auto text-blue-600" />
                          <p className="font-medium">{pond.waterTemp}</p>
                        </div>
                        <div className="text-center">
                          <Activity className="h-3 w-3 mx-auto text-green-600" />
                          <p className="font-medium">{pond.oxygenLevel}</p>
                        </div>
                        <div className="text-center">
                          <Fish className="h-3 w-3 mx-auto text-purple-600" />
                          <p className="font-medium">pH {pond.phLevel}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedPond(pond.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Tokens
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Stats */}
            {selectedPond === "all" && (
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Ponds</CardTitle>
                    <Waves className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{ponds.length}</div>
                    <p className="text-xs text-muted-foreground">3 active ponds</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                    <Fish className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,000 kg</div>
                    <p className="text-xs text-muted-foreground">37,500 kg current stock</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tokens</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">9</div>
                    <p className="text-xs text-muted-foreground">Across all ponds</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$135,000</div>
                    <p className="text-xs text-muted-foreground">Token value across ponds</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            {selectedPondData ? (
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedPondData.name} - Live Monitoring</CardTitle>
                    <CardDescription>Real-time environmental parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium">Water Temperature</p>
                            <p className="text-sm text-gray-600">Optimal: 16-20°C</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">{selectedPondData.waterTemp}</span>
                          <Badge variant="default" className="ml-2">
                            Normal
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Activity className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-medium">Dissolved Oxygen</p>
                            <p className="text-sm text-gray-600">Optimal: 7-9 mg/L</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-green-600">{selectedPondData.oxygenLevel}</span>
                          <Badge variant="default" className="ml-2">
                            Good
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Fish className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="font-medium">pH Level</p>
                            <p className="text-sm text-gray-600">Optimal: 6.5-7.5</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-purple-600">{selectedPondData.phLevel}</span>
                          <Badge
                            variant={selectedPondData.status === "attention" ? "secondary" : "default"}
                            className="ml-2"
                          >
                            {selectedPondData.status === "attention" ? "Monitor" : "Normal"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feeding & Maintenance</CardTitle>
                    <CardDescription>Recent activities and schedules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Last Feeding</p>
                          <p className="text-sm text-gray-600">{selectedPondData.lastFed}</p>
                        </div>
                        <Badge variant="default">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Next Feeding</p>
                          <p className="text-sm text-gray-600">In 2 hours</p>
                        </div>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Water Quality Check</p>
                          <p className="text-sm text-gray-600">Daily at 06:00</p>
                        </div>
                        <Badge variant="default">Automated</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Maintenance</p>
                          <p className="text-sm text-gray-600">Next: March 15</p>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Pond</CardTitle>
                  <CardDescription>Choose a specific pond to view live monitoring data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Please select a pond from the dropdown above to view real-time monitoring information.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Tokens</CardTitle>
                    <CardDescription>
                      {selectedPond === "all"
                        ? `Showing all ${filteredTokens.length} active tokens across all ponds`
                        : `Showing ${filteredTokens.length} tokens in ${selectedPondData?.name}`}
                    </CardDescription>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardHeader>
              <CardContent>
                {selectedPond !== "all" && selectedPondData ? (
                  <div className="mb-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">IoT Parameters</CardTitle>
                          <CardDescription>Real-time monitoring data</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                              <Thermometer className="h-6 w-6 text-blue-600 mb-1" />
                              <p className="text-xl font-bold">{selectedPondData.waterTemp}</p>
                              <p className="text-xs text-gray-600">Water Temperature</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                              <Activity className="h-6 w-6 text-green-600 mb-1" />
                              <p className="text-xl font-bold">{selectedPondData.oxygenLevel}</p>
                              <p className="text-xs text-gray-600">Dissolved Oxygen</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                              <Droplets className="h-6 w-6 text-cyan-600 mb-1" />
                              <p className="text-xl font-bold">pH {selectedPondData.phLevel}</p>
                              <p className="text-xs text-gray-600">pH Level</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                              <AlertTriangle className="h-6 w-6 text-amber-600 mb-1" />
                              <p className="text-xl font-bold capitalize">{selectedPondData.status}</p>
                              <p className="text-xs text-gray-600">Overall Status</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Pond Details</CardTitle>
                          <CardDescription>{selectedPondData.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Size:</span>
                              <span className="font-medium">{selectedPondData.size}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Capacity:</span>
                              <span className="font-medium">{selectedPondData.capacity}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Current Stock:</span>
                              <span className="font-medium">{selectedPondData.currentStock}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Utilization:</span>
                              <span className="font-medium">{selectedPondData.utilization}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Last Fed:</span>
                              <span className="font-medium">{selectedPondData.lastFed}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Total Value:</span>
                              <span className="font-medium">{selectedPondData.totalValue}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Fish Details by Token</h3>
                    </div>
                  </div>
                ) : null}

                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTokens.map((token) => {
                      const pond = ponds.find((p) => p.id === token.pond)
                      return (
                        <Card key={token.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <Fish className="h-6 w-6 text-blue-600" />
                              <Badge variant={token.status === "Ready Soon" ? "default" : "secondary"}>
                                {token.status}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold">{token.species}</h4>
                              <p className="text-sm text-gray-600">Token {token.id}</p>
                              <p className="text-xs text-gray-500">
                                {pond?.name} ({pond?.location})
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-600">Quantity</p>
                                <p className="font-medium">{token.quantity}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Progress</p>
                                <p className="font-medium">{token.progress}%</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Growth Progress</span>
                                <span>{token.progress}%</span>
                              </div>
                              <Progress value={token.progress} className="h-2" />
                            </div>

                            <div className="text-sm">
                              <p className="text-gray-600">Harvest Date</p>
                              <p className="font-medium flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {token.harvestDate}
                              </p>
                            </div>

                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <Link href={`/token/${token.id}?role=producer`}>View Details</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTokens.map((token) => {
                      const pond = ponds.find((p) => p.id === token.pond)
                      return (
                        <div key={token.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <Fish className="h-8 w-8 text-blue-600" />
                              <div>
                                <h4 className="font-semibold text-lg">{token.species}</h4>
                                <p className="text-sm text-gray-600">
                                  Token {token.id} • {pond?.name} ({pond?.location})
                                </p>
                              </div>
                            </div>
                            <Badge variant={token.status === "Ready Soon" ? "default" : "secondary"}>
                              {token.status}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-5 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Quantity</p>
                              <p className="font-medium">{token.quantity}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Progress</p>
                              <p className="font-medium">{token.progress}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Funding</p>
                              <p className="font-medium">{token.funded}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Harvest Date</p>
                              <p className="font-medium flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {token.harvestDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Days Remaining</p>
                              <p className="font-medium">{token.daysRemaining} days</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span>{token.progress}%</span>
                            </div>
                            <Progress value={token.progress} className="h-2" />
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/token/${token.id}?role=producer`}>View Details</Link>
                            </Button>
                            {token.status === "Ready Soon" && <Button size="sm">Initiate Harvest</Button>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pond Performance</CardTitle>
                  <CardDescription>Production efficiency by pond</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <p className="font-medium">Pond Performance Chart</p>
                      <p className="text-sm text-gray-600">Average utilization: 83%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Water Quality Trends</CardTitle>
                  <CardDescription>Environmental parameter history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <p className="font-medium">Water Quality Trends</p>
                      <p className="text-sm text-gray-600">All parameters stable</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Token Distribution by Pond</CardTitle>
                <CardDescription>How your tokens are distributed across ponds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ponds.map((pond) => {
                    const pondTokens = tokens.filter((token) => token.pond === pond.id)
                    const totalValue = pondTokens.reduce(
                      (sum, token) => sum + Number.parseInt(token.total.replace(/[$,]/g, "")),
                      0,
                    )
                    return (
                      <div key={pond.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Waves className="h-6 w-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">{pond.name}</h4>
                            <p className="text-sm text-gray-600">{pond.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{pondTokens.length} tokens</p>
                          <p className="text-sm text-gray-600">${totalValue.toLocaleString()} total value</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
