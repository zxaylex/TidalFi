"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  Leaf,
  AlertTriangle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data - in real app this would come from API based on proposal ID
const getProposalData = (id: string) => {
  const proposals = {
    "PROP-001": {
      id: "PROP-001",
      title: "Increase Minimum Sustainability Score to 85",
      description:
        "This proposal aims to raise the minimum sustainability score requirement for new token listings from the current threshold of 80 to 85. This change will ensure higher environmental standards across the platform and maintain TidalFi's position as a leader in sustainable aquaculture financing.",
      fullDescription: `
## Background

The current minimum sustainability score of 80 has served us well since the platform's launch, but as the aquaculture industry evolves and environmental standards become more stringent, we believe it's time to raise our requirements.

## Rationale

1. **Environmental Leadership**: By increasing our standards, TidalFi will continue to lead the industry in promoting truly sustainable aquaculture practices.

2. **Investor Confidence**: Higher sustainability standards will attract more environmentally conscious investors and increase overall platform credibility.

3. **Market Differentiation**: This change will help differentiate TidalFi tokens from competitors and justify premium pricing.

4. **Future-Proofing**: Anticipating regulatory changes and market demands for higher environmental standards.

## Implementation Details

- New minimum score: 85/100 (up from 80/100)
- Grace period: 90 days for existing farmers to meet new requirements
- Grandfathering: Existing tokens below 85 will remain valid until harvest
- Support program: Technical assistance for farmers to improve their scores

## Expected Impact

- Estimated 15% of current farmers may need to improve practices
- Average platform sustainability score expected to increase from 87 to 91
- Potential 8-12% increase in token pricing due to premium positioning
- Enhanced platform reputation and investor attraction

## Timeline

If approved, implementation would begin 30 days after vote conclusion, with full enforcement starting 90 days later.
      `,
      category: "Sustainability Standards",
      proposer: {
        address: "EcoInvestor.icp",
        name: "EcoInvestor DAO",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 4.8,
        proposalsSubmitted: 12,
        votingPower: 15420,
      },
      status: "Active",
      createdAt: "2024-01-15T10:00:00Z",
      votingEnds: "2024-01-25T23:59:59Z",
      timeLeft: "3 days, 14 hours",
      votesFor: 12450,
      votesAgainst: 3200,
      totalVotes: 15650,
      quorum: 20000,
      quorumPercentage: 78.25,
      participationRate: 68.5,
      yourVote: null,
      yourVotingPower: 2450,
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      tags: ["sustainability", "standards", "environment"],
      supportingDocuments: [
        {
          name: "Sustainability Impact Analysis",
          type: "PDF",
          size: "2.1 MB",
          url: "#",
        },
        {
          name: "Industry Benchmark Report",
          type: "PDF",
          size: "1.8 MB",
          url: "#",
        },
        {
          name: "Implementation Timeline",
          type: "PDF",
          size: "945 KB",
          url: "#",
        },
      ],
      comments: [
        {
          id: 1,
          author: "SustainableFarmer.icp",
          avatar: "/placeholder.svg?height=32&width=32",
          content:
            "I support this proposal. As a farmer who already exceeds these standards, I believe this will help differentiate quality operations and justify premium pricing.",
          timestamp: "2024-01-20T14:30:00Z",
          votes: 23,
          replies: 3,
        },
        {
          id: 2,
          author: "SmallFarmAdvocate.icp",
          avatar: "/placeholder.svg?height=32&width=32",
          content:
            "While I appreciate the environmental goals, I'm concerned about the impact on smaller farms. The 90-day grace period might not be sufficient for farms that need significant infrastructure improvements.",
          timestamp: "2024-01-20T11:15:00Z",
          votes: 18,
          replies: 7,
        },
        {
          id: 3,
          author: "GreenInvestor.icp",
          avatar: "/placeholder.svg?height=32&width=32",
          content:
            "This is exactly what the platform needs. ESG investors are increasingly demanding higher standards, and this positions TidalFi ahead of the curve.",
          timestamp: "2024-01-19T16:45:00Z",
          votes: 31,
          replies: 2,
        },
      ],
      votingHistory: [
        {
          voter: "EcoFund.icp",
          vote: "For",
          power: 5420,
          timestamp: "2024-01-20T15:30:00Z",
        },
        {
          voter: "SustainableCapital.icp",
          vote: "For",
          power: 3200,
          timestamp: "2024-01-20T14:15:00Z",
        },
        {
          voter: "SmallFarmDAO.icp",
          vote: "Against",
          power: 1800,
          timestamp: "2024-01-20T12:00:00Z",
        },
      ],
      relatedProposals: [
        {
          id: "PROP-007",
          title: "Establish Sustainability Improvement Fund",
          status: "Draft",
          relation: "Supporting proposal to help farmers meet new standards",
        },
        {
          id: "PROP-004",
          title: "Carbon Credit Program Implementation",
          status: "Passed",
          relation: "Previous sustainability initiative",
        },
      ],
    },
  }

  return proposals[id as keyof typeof proposals] || proposals["PROP-001"]
}

export default function ProposalDetailsPage() {
  const params = useParams()
  const proposalId = params.id as string
  const proposal = getProposalData(proposalId)
  const [userVote, setUserVote] = useState<"For" | "Against" | null>(proposal.yourVote)
  const [newComment, setNewComment] = useState("")

  const handleVote = (vote: "For" | "Against") => {
    setUserVote(vote)
    console.log(`Voting ${vote} on proposal ${proposalId}`)
    // Voting logic would go here
  }

  const handleComment = () => {
    if (newComment.trim()) {
      console.log(`Adding comment: ${newComment}`)
      setNewComment("")
      // Comment submission logic would go here
    }
  }

  const timeRemaining = () => {
    const endDate = new Date(proposal.votingEnds)
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()

    if (diff <= 0) return "Voting ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${days} days, ${hours} hours remaining`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/governance">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Governance
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Proposal Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {proposal.icon}
                    <div>
                      <CardTitle className="text-2xl">{proposal.title}</CardTitle>
                      <CardDescription className="text-lg mt-2">{proposal.description}</CardDescription>
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge variant="outline">{proposal.category}</Badge>
                        <Badge variant={proposal.status === "Active" ? "default" : "secondary"}>
                          {proposal.status}
                        </Badge>
                        <span className="text-sm text-gray-600">Proposal {proposal.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {proposal.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Voting Status */}
            <Card>
              <CardHeader>
                <CardTitle>Voting Status</CardTitle>
                <CardDescription>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {timeRemaining()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{proposal.votesFor.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Votes For</p>
                    <p className="text-xs text-gray-500">
                      {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{proposal.votesAgainst.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Votes Against</p>
                    <p className="text-xs text-gray-500">
                      {((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{proposal.totalVotes.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Total Votes</p>
                    <p className="text-xs text-gray-500">{proposal.participationRate}% participation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Support Distribution</span>
                      <span>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% For</span>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500"
                        style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-500"
                        style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quorum Progress</span>
                      <span>
                        {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} (
                        {proposal.quorumPercentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={proposal.quorumPercentage} className="h-2" />
                    {proposal.quorumPercentage < 100 && (
                      <p className="text-xs text-amber-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Quorum not yet reached
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Tabs */}
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="votes">Votes</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Proposal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{proposal.fullDescription}</div>
                  </CardContent>
                </Card>

                {proposal.supportingDocuments.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Supporting Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {proposal.supportingDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-600">
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="discussion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Discussion</CardTitle>
                    <CardDescription>{proposal.comments.length} comments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add Comment */}
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Share your thoughts on this proposal..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleComment} disabled={!newComment.trim()}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Comments */}
                    <div className="space-y-6">
                      {proposal.comments.map((comment) => (
                        <div key={comment.id} className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {comment.author
                                  .split(".")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                              <div className="flex items-center space-x-4 mt-3">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.votes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  Reply ({comment.replies})
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="votes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Voting Activity</CardTitle>
                    <CardDescription>Recent votes cast on this proposal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {proposal.votingHistory.map((vote, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {vote.voter
                                  .split(".")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{vote.voter}</p>
                              <p className="text-xs text-gray-500">{new Date(vote.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={vote.vote === "For" ? "default" : "destructive"}>{vote.vote}</Badge>
                            <p className="text-xs text-gray-500 mt-1">{vote.power.toLocaleString()} voting power</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Related Proposals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {proposal.relatedProposals.map((related, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{related.title}</h4>
                            <Badge variant="outline">{related.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{related.relation}</p>
                          <Button variant="outline" size="sm" className="mt-3" asChild>
                            <Link href={`/governance/${related.id}`}>View Proposal</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Proposer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Proposed By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={proposal.proposer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {proposal.proposer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{proposal.proposer.name}</h3>
                      <p className="text-sm text-gray-600">{proposal.proposer.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Reputation</p>
                      <p className="font-medium">{proposal.proposer.reputation}/5</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Proposals</p>
                      <p className="font-medium">{proposal.proposer.proposalsSubmitted}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Voting Power</p>
                      <p className="font-medium">{proposal.proposer.votingPower.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Your Voting Power */}
            <Card>
              <CardHeader>
                <CardTitle>Your Vote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{proposal.yourVotingPower.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Your Voting Power</p>
                  <p className="text-xs text-gray-500">
                    {((proposal.yourVotingPower / proposal.quorum) * 100).toFixed(2)}% of quorum
                  </p>
                </div>

                {userVote ? (
                  <div className="text-center">
                    <Badge variant={userVote === "For" ? "default" : "destructive"} className="mb-2">
                      You voted: {userVote}
                    </Badge>
                    <p className="text-xs text-gray-600">You can change your vote until voting ends</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 text-center">You haven't voted yet</p>
                )}

                <div className="space-y-2">
                  <Button
                    onClick={() => handleVote("For")}
                    className="w-full"
                    variant={userVote === "For" ? "default" : "outline"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote("Against")}
                    className="w-full"
                    variant={userVote === "Against" ? "destructive" : "outline"}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Vote Against
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Proposal Created</p>
                      <p className="text-xs text-gray-500">{new Date(proposal.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Voting Started</p>
                      <p className="text-xs text-gray-500">{new Date(proposal.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Voting Ends</p>
                      <p className="text-xs text-gray-500">{new Date(proposal.votingEnds).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Voters</span>
                    <span className="font-medium">
                      {Math.floor(proposal.totalVotes / 100)} {/* Rough estimate */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Vote Size</span>
                    <span className="font-medium">
                      {Math.floor(proposal.totalVotes / Math.floor(proposal.totalVotes / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-medium">{proposal.comments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-medium">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
