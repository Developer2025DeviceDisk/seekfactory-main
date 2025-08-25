import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  FileText, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Target,
  Globe,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";

const BuyingGuide = () => {
  const steps = [
    {
      step: 1,
      title: "Research & Planning",
      icon: Search,
      description: "Define your requirements and research suitable suppliers",
      details: [
        "Clearly define your product specifications",
        "Set your budget and timeline expectations",
        "Research market prices and industry standards",
        "Identify key features and quality requirements"
      ],
      tips: [
        "Create a detailed requirement document",
        "Compare multiple options before deciding",
        "Consider future scalability needs"
      ]
    },
    {
      step: 2,
      title: "Supplier Selection",
      icon: Users,
      description: "Choose verified suppliers that match your needs",
      details: [
        "Check supplier verification status and badges",
        "Review supplier ratings and customer feedback",
        "Evaluate supplier's production capacity",
        "Assess communication and response times"
      ],
      tips: [
        "Prioritize verified and gold-badge suppliers",
        "Request reference contacts from previous clients",
        "Check supplier's export experience"
      ]
    },
    {
      step: 3,
      title: "Quotation & Negotiation",
      icon: FileText,
      description: "Request quotes and negotiate terms",
      details: [
        "Request detailed quotations from multiple suppliers",
        "Compare pricing, terms, and delivery schedules",
        "Negotiate payment terms and warranties",
        "Clarify technical specifications and standards"
      ],
      tips: [
        "Always request FOB and CIF pricing",
        "Negotiate longer payment terms for larger orders",
        "Confirm all specifications in writing"
      ]
    },
    {
      step: 4,
      title: "Payment & Security",
      icon: CreditCard,
      description: "Secure payment methods and financial protection",
      details: [
        "Use secure payment methods like Trade Assurance",
        "Consider using escrow services for large orders",
        "Verify supplier's banking details",
        "Understand payment terms and milestones"
      ],
      tips: [
        "Never pay 100% in advance for new suppliers",
        "Use LC (Letter of Credit) for high-value orders",
        "Keep all payment records and documentation"
      ]
    },
    {
      step: 5,
      title: "Quality Assurance",
      icon: Shield,
      description: "Ensure product quality meets your standards",
      details: [
        "Request product samples before bulk orders",
        "Arrange third-party quality inspections",
        "Define quality control checkpoints",
        "Establish clear quality standards and acceptance criteria"
      ],
      tips: [
        "Use professional inspection services",
        "Document all quality requirements clearly",
        "Plan inspection visits if possible"
      ]
    },
    {
      step: 6,
      title: "Logistics & Delivery",
      icon: Truck,
      description: "Manage shipping and delivery efficiently",
      details: [
        "Choose appropriate shipping methods (air/sea)",
        "Understand Incoterms and responsibilities",
        "Arrange customs clearance and documentation",
        "Track shipments and plan for delays"
      ],
      tips: [
        "Factor in customs duties and taxes",
        "Use reliable freight forwarders",
        "Plan for 15-20% buffer time in delivery"
      ]
    }
  ];

  const bestPractices = [
    {
      title: "Due Diligence",
      icon: Target,
      practices: [
        "Verify supplier business licenses and certifications",
        "Check supplier's financial stability",
        "Validate factory location and capabilities",
        "Review legal compliance and certifications"
      ]
    },
    {
      title: "Communication",
      icon: Globe,
      practices: [
        "Establish clear communication channels",
        "Confirm understanding of specifications",
        "Maintain regular progress updates",
        "Document all agreements in writing"
      ]
    },
    {
      title: "Risk Management",
      icon: AlertTriangle,
      practices: [
        "Diversify supplier base for critical items",
        "Maintain backup supplier relationships",
        "Use appropriate insurance coverage",
        "Plan for supply chain disruptions"
      ]
    },
    {
      title: "Cost Optimization",
      icon: DollarSign,
      practices: [
        "Negotiate volume discounts for larger orders",
        "Optimize shipping costs and methods",
        "Consider total cost of ownership",
        "Plan orders to minimize freight costs"
      ]
    }
  ];

  const redFlags = [
    "Prices significantly below market average",
    "Reluctance to provide samples or factory visits",
    "Requests for 100% advance payment",
    "Poor communication or delayed responses",
    "No verifiable business address or licenses",
    "Pressure to make quick decisions",
    "Unwillingness to provide references"
  ];

  return (
    <>
      <Helmet>
        <title>Buying Guide - SeekFactory</title>
        <meta 
          name="description" 
          content="Complete guide to buying industrial equipment from Chinese suppliers. Learn best practices, avoid risks, and make successful purchases." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Complete Buying Guide
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Master the art of sourcing from Chinese suppliers with our comprehensive 
                step-by-step guide. Avoid common pitfalls and make successful purchases.
              </p>
            </div>
          </section>

          {/* Buying Process Steps */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  6-Step Buying Process
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Follow this proven process to ensure successful sourcing from Chinese suppliers
                </p>
              </div>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-accent text-accent-foreground">
                              Step {step.step}
                            </Badge>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                          </div>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Key Activities</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Pro Tips</h4>
                          <ul className="space-y-2">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Best Practices
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Essential practices to ensure successful sourcing and minimize risks
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bestPractices.map((practice, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center">
                          <practice.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {practice.practices.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Warning Signs to Avoid
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Recognize these red flags to protect yourself from fraudulent suppliers
                </p>
              </div>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <CardTitle className="text-xl text-red-700">Supplier Red Flags</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {redFlags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700">{flag}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Ready to Start Sourcing?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Apply what you've learned and start sourcing from verified Chinese suppliers with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Browse Products
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Find Suppliers
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BuyingGuide;