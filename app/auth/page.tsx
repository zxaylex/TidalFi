"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Fish, TrendingUp, ShoppingCart, Shield, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "producer"
  const [selectedRole, setSelectedRole] = useState(initialRole)

  const handleInternetIdentityLogin = (role: string) => {
    // Store the user role in localStorage for persistence
    localStorage.setItem("userRole", role)
    localStorage.setItem("isAuthenticated", "true")

    // In a real app, this would integrate with Internet Identity
    console.log(`Logging in as ${role} with Internet Identity`)

    // Redirect to role-specific dashboard
    window.location.href = `/dashboard/${role}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">TidalFi</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Join 
              <span className="font-bold text-blue-900">TidalFi</span>
            </h1>
            <p className="text-xl text-gray-600">Choose your role and start your sustainable aquaculture journey</p>
          </div>

          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="producer" className="flex items-center gap-2">
                <Fish className="h-4 w-4" />
                Producer
              </TabsTrigger>
              <TabsTrigger value="investor" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Investor
              </TabsTrigger>
              <TabsTrigger value="buyer" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Buyer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="producer" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Fish className="h-6 w-6 text-blue-600" />
                        Fish Producer
                      </CardTitle>
                      <CardDescription>
                        Tokenize your sustainable fish harvests and access global funding
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">What you can do:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Create tokens for future harvests</li>
                        <li>• Access upfront funding from investors</li>
                        <li>• Manage harvest settlements</li>
                        <li>• Build reputation and certifications</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Government issued certifications</li>
                        <li>• KYC verification</li>
                      </ul>
                    </div>
                  </div>
                  <Button onClick={() => handleInternetIdentityLogin("producer")} className="w-full  bg-blue-800 hover:bg-blue-700" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Continue with Internet Identity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investor" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                        Investor
                      </CardTitle>
                      <CardDescription>
                        Fund sustainable aquaculture and earn returns from successful harvests
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">What you can do:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Purchase harvest tokens</li>
                        <li>• Track investment performance</li>
                        <li>• Monitor sustainability metrics</li>
                        <li>• Participate in DAO governance</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Diversified aquaculture exposure</li>
                        <li>• Transparent sustainability tracking</li>
                        <li>• Fractional ownership opportunities</li>
                        <li>• Support for sustainable practices</li>
                      </ul>
                    </div>
                  </div>
                  <Button onClick={() => handleInternetIdentityLogin("investor")} className="w-full  bg-blue-800 hover:bg-blue-700" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Continue with Internet Identity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buyer" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                        Buyer
                      </CardTitle>
                      <CardDescription>
                        Purchase premium, traceable fish with verified sustainability credentials
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">What you can do:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Browse available fish harvests</li>
                        <li>• Purchase tokens for future delivery</li>
                        <li>• Track delivery and quality</li>
                        <li>• Verify sustainability credentials</li>
                        <li>• Build supplier relationships</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Perfect for:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Restaurants</li>
                        <li>• Seafood retailers</li>
                        <li>• Food distributors</li>
                        <li>• Sustainability-focused buyers</li>
                      </ul>
                    </div>
                  </div>
                  <Button onClick={() => handleInternetIdentityLogin("buyer")} className="w-full  bg-blue-800 hover:bg-blue-700" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Continue with Internet Identity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
