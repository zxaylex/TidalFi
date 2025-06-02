import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fish, Waves, TrendingUp, Shield, Users, Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white scroll-smooth">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">TidalFi</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="#platform-features" className="text-gray-600 hover:text-blue-600">
              Platform Features
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-600 font-bol" asChild>
              <Link href="/auth" >Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
            Investing in a
            <span className="text-blue-600 block font-bold ">Bountiful Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect sustainable fish producers with global investors and buyers through blockchain-powered tokenization.
            Transparent, traceable, and profitable aquaculture for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-600" asChild>
              <Link href="/auth?role=producer">I'm a Producer</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth?role=investor">I'm an Investor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth?role=buyer">I'm a Buyer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How TidalFi Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Fish className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Producers Tokenize</CardTitle>
                <CardDescription>
                  Sustainable fish producers create tokens representing their future harvests, backed by IoT monitoring
                  and sustainability certifications.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Investors Fund</CardTitle>
                <CardDescription>
                  Global investors purchase tokens to fund sustainable aquaculture operations and earn returns from
                  successful harvests.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Buyers Purchase</CardTitle>
                <CardDescription>
                  Restaurants and retailers buy tokens to secure premium, traceable fish with verified sustainability
                  credentials.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="platform-features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                Built on ICP with Internet Identity for secure, decentralized transactions
              </p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability Tracking</h3>
              <p className="text-gray-600">Real-time IoT monitoring and Government issued certifications</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">DAO Governance</h3>
              <p className="text-gray-600">Community-driven platform decisions and sustainability standards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
