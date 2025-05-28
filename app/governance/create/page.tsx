"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Vote, Upload, AlertCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CreateProposalPage() {
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState<"farmer" | "investor" | "buyer">("farmer")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fullDescription: "",
    duration: "7",
    requiresQuorum: true,
  })

  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as "farmer" | "investor" | "buyer"
    const storedRole = localStorage.getItem("userRole") as "farmer" | "investor" | "buyer"

    if (roleFromUrl) {
      setUserRole(roleFromUrl)
    } else if (storedRole) {
      setUserRole(storedRole)
    }
  }, [searchParams])

  const handleSubmit = () => {
    console.log("Creating proposal:", formData)
    // Proposal creation logic would go here
  }

  const categories = [
    "Platform Economics",
    "Security & Infrastructure",
    "Community Support",
    "Governance Rules",
    "Feature Requests",
    "Policy Changes",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader forceRole={userRole} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" asChild>
              <Link href={`/governance?role=${userRole}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Governance
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <Vote className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Proposal</h1>
            <p className="text-gray-600">Propose changes to improve the TidalFi platform</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>Provide clear and detailed information about your proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Reduce Platform Transaction Fees"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief summary of your proposal (will be shown in the proposal list)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-description">Full Description *</Label>
                <Textarea
                  id="full-description"
                  placeholder="Detailed explanation of your proposal including background, rationale, implementation details, and expected impact..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  rows={10}
                />
                <p className="text-xs text-gray-600">
                  Tip: Include background information, rationale, implementation details, timeline, and expected impact
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Voting Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days (recommended)</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Voting Requirements</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="quorum"
                      checked={formData.requiresQuorum}
                      onCheckedChange={(checked) => setFormData({ ...formData, requiresQuorum: !!checked })}
                    />
                    <Label htmlFor="quorum" className="text-sm">
                      Require 20,000 token quorum
                    </Label>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Proposal Guidelines</h4>
                      <ul className="text-sm text-blue-800 mt-2 space-y-1">
                        <li>• Proposals require a minimum of 1,000 tokens to submit</li>
                        <li>• Be specific and provide clear implementation details</li>
                        <li>• Consider the impact on all user types (farmers, investors, buyers)</li>
                        <li>• Proposals cannot be edited once submitted</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Supporting Documents (Optional)</CardTitle>
                  <CardDescription>Upload documents that support your proposal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, or image files up to 10MB</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button variant="outline" asChild>
                  <Link href={`/governance?role=${userRole}`}>Cancel</Link>
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.category || !formData.description || !formData.fullDescription}
                >
                  Submit Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
