import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Star, 
  TrendingUp, 
  Globe, 
  Users,
  Award,
  Building,
  Quote
} from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      company: "Mumbai Manufacturing Co.",
      industry: "Textile Machinery",
      location: "Mumbai, India",
      story: "After partnering with SeekFactory, we found reliable Chinese suppliers for our textile machinery needs. The quality verification process gave us confidence, and we've saved 30% on procurement costs while improving our production efficiency.",
      results: {
        costSavings: "30%",
        productionIncrease: "45%",
        timeline: "6 months"
      },
      contact: "Rajesh Kumar",
      position: "Procurement Manager",
      avatar: "/api/placeholder/60/60",
      verified: true
    },
    {
      id: 2,
      company: "Delhi Engineering Works",
      industry: "CNC Machines",
      location: "Delhi, India",
      story: "SeekFactory connected us with top-tier CNC machine suppliers from China. The transparency in the verification process and quality assurance helped us modernize our workshop with cutting-edge equipment.",
      results: {
        costSavings: "25%",
        productionIncrease: "60%",
        timeline: "4 months"
      },
      contact: "Priya Sharma",
      position: "Operations Director",
      avatar: "/api/placeholder/60/60",
      verified: true
    },
    {
      id: 3,
      company: "Chennai Food Processing",
      industry: "Food Processing Equipment",
      location: "Chennai, India",
      story: "Finding food-grade processing equipment was challenging until we discovered SeekFactory. The platform's supplier verification and quality standards helped us source FDA-approved equipment for our expansion.",
      results: {
        costSavings: "35%",
        productionIncrease: "80%",
        timeline: "8 months"
      },
      contact: "Arjun Reddy",
      position: "Factory Manager",
      avatar: "/api/placeholder/60/60",
      verified: true
    }
  ];

  const supplierStories = [
    {
      id: 1,
      company: "Changzhou Precision Machinery",
      industry: "CNC Equipment",
      location: "Changzhou, China",
      story: "Joining SeekFactory opened up the Indian market for us. The platform's verification process enhanced our credibility, and we've established long-term partnerships with multiple Indian SMEs.",
      results: {
        salesIncrease: "150%",
        newMarkets: "3",
        partnershipDeals: "25+"
      },
      contact: "Li Wei",
      position: "Export Manager",
      avatar: "/api/placeholder/60/60",
      verified: true
    },
    {
      id: 2,
      company: "Guangzhou Industrial Solutions",
      industry: "Packaging Machinery",
      location: "Guangzhou, China",
      story: "The SeekFactory platform helped us understand Indian market requirements better. The quality feedback system and direct buyer communication increased our sales significantly.",
      results: {
        salesIncrease: "120%",
        newMarkets: "2",
        partnershipDeals: "18+"
      },
      contact: "Zhang Mei",
      position: "Business Development",
      avatar: "/api/placeholder/60/60",
      verified: true
    }
  ];

  const stats = [
    { label: "Successful Partnerships", value: "500+", icon: Users },
    { label: "Cost Savings Achieved", value: "₹2.5Cr+", icon: TrendingUp },
    { label: "Countries Connected", value: "5+", icon: Globe },
    { label: "Verified Suppliers", value: "200+", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Success Stories | SeekFactory</title>
        <meta name="description" content="Read real success stories from buyers and suppliers who have transformed their businesses through SeekFactory's verified B2B marketplace." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how businesses across India and China have transformed their operations, 
            reduced costs, and accelerated growth through SeekFactory's verified marketplace.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Buyer Success Stories */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Buyer Success Stories
          </h2>
          <div className="space-y-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-6">
                        <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-xl">{story.company}</h3>
                            {story.verified && (
                              <Badge variant="default" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {story.industry}
                            </span>
                            <span>{story.location}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={story.avatar} />
                          <AvatarFallback>{story.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{story.contact}</div>
                          <div className="text-sm text-muted-foreground">{story.position}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg mb-4">Key Results</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">Cost Savings</span>
                          <span className="text-lg font-bold text-green-600">{story.results.costSavings}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">Production Increase</span>
                          <span className="text-lg font-bold text-blue-600">{story.results.productionIncrease}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="text-sm font-medium">Timeline</span>
                          <span className="text-lg font-bold text-purple-600">{story.results.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supplier Success Stories */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Supplier Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supplierStories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{story.company}</h3>
                        {story.verified && (
                          <Badge variant="default" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {story.industry} • {story.location}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{story.story}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-xs font-medium">Sales Increase</span>
                      <span className="text-sm font-bold text-green-600">{story.results.salesIncrease}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-xs font-medium">New Markets</span>
                      <span className="text-sm font-bold text-blue-600">{story.results.newMarkets}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span className="text-xs font-medium">Partnership Deals</span>
                      <span className="text-sm font-bold text-purple-600">{story.results.partnershipDeals}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={story.avatar} />
                      <AvatarFallback>{story.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{story.contact}</div>
                      <div className="text-xs text-muted-foreground">{story.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Ready to Write Your Success Story?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of successful businesses who have transformed their operations through 
                SeekFactory's verified marketplace. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/suppliers">Find Suppliers</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">Join as Supplier</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;