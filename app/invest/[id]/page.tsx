"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Calendar, MapPin, Fish } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function InvestPage() {
  const params = useParams()
  const tokenId = params.id as string
  const [investmentAmount, setInvestmentAmount] = useState("")

  // Mock token data - in real app this would come from API
  const token = {
    tokenId: "TF-001",
    species: "Atlantic Salmon",
    farmer: "Nordic Aqua Farm",
    location: "Norway",
    quantity: "2,500 kg",
    totalValue: 25000,
    pricePerKg: "$10.00",
    minInvestment: 500,
    maxInvestment: 5000,
    harvestDate: "2024-03-15",
    expectedROI: "12-15%",
    fundingProgress: 75,
    daysLeft: 12,
    tokenPrice: 10.0,
    availableTokens: 625,
  }

  const handleInvestment = () => {
    console.log(`Investing $${investmentAmount} in token ${tokenId}`)
    // Investment logic would go here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="investor" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" asChild>
              <Link href="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Investment Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <Fish className="h-8 w-8 text-blue-600" />
                        {token.species}
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        Token ID: {token.tokenId} • {token.quantity} available
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="text-sm">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="text-xl font-bold">${token.totalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price per kg</p>
                      <p className="text-xl font-bold">{token.pricePerKg}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Harvest Date</p>
                      <p className="text-xl font-bold">{token.harvestDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected ROI</p>
                      <p className="text-xl font-bold text-green-600">{token.expectedROI}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>
                        ${((token.totalValue * token.fundingProgress) / 100).toLocaleString()} / $
                        {token.totalValue.toLocaleString()} ({token.fundingProgress}%)
                      </span>
                    </div>
                    <Progress value={token.fundingProgress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {token.farmer} • {token.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {token.daysLeft} days left
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Opportunity</CardTitle>
                  <CardDescription>Why invest in this harvest token</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800">High-Quality Farm</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Nordic Aqua Farm has a 95% success rate and 4.9/5 farmer rating
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Strong Market Demand</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Atlantic Salmon is in high demand with premium pricing
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Sustainable Practices</h4>
                      <p className="text-sm text-purple-700 mt-1">ASC certified with carbon neutral operations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Make Investment</CardTitle>
                  <CardDescription>Invest in this harvest token</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Token Price</p>
                      <p className="font-bold text-lg">${token.tokenPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Available</p>
                      <p className="font-bold text-lg">{token.availableTokens}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Min Investment</p>
                      <p className="font-medium">${token.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Max Investment</p>
                      <p className="font-medium">${token.maxInvestment}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="investment-amount">Investment Amount ($)</Label>
                        <Input
                          id="investment-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                          min={token.minInvestment}
                          max={token.maxInvestment}
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          Min: ${token.minInvestment} • Max: ${token.maxInvestment}
                        </p>
                      </div>

                      {investmentAmount && (
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          <p>
                            You will receive:{" "}
                            <span className="font-bold">
                              {Math.floor(Number(investmentAmount) / token.tokenPrice)} tokens
                            </span>
                          </p>
                          <p>
                            Representing:{" "}
                            <span className="font-bold">
                              {((Number(investmentAmount) / token.totalValue) * 100).toFixed(2)}%
                            </span>{" "}
                            of harvest
                          </p>
                          <p>
                            Expected return:{" "}
                            <span className="font-bold text-green-600">
                              ${(Number(investmentAmount) * 0.135).toFixed(0)} - $
                              {(Number(investmentAmount) * 0.15).toFixed(0)}
                            </span>
                          </p>
                        </div>
                      )}

                      <Button onClick={handleInvestment} className="w-full" size="lg" disabled={!investmentAmount}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Type</span>
                      <span className="font-medium">Harvest Token</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Period</span>
                      <span className="font-medium">~4 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liquidity</span>
                      <span className="font-medium">At harvest</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">• Weather and environmental conditions</p>
                    <p className="text-gray-600">• Market price fluctuations</p>
                    <p className="text-gray-600">• Fish health and mortality risks</p>
                    <p className="text-gray-600">• Regulatory changes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
