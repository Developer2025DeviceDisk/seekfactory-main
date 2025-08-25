import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Users, 
  FileText, 
  Search, 
  Truck, 
  Clock,
  Target,
  Eye,
  Camera,
  Star
} from "lucide-react";

const QualityAssurance = () => {
  const qualityStandards = [
    {
      title: "Supplier Verification",
      icon: Shield,
      description: "Multi-tier verification process ensuring supplier credibility",
      features: [
        "Business license verification",
        "Factory location confirmation",
        "Financial stability assessment",
        "Production capacity evaluation",
        "Export experience validation"
      ],
      badge: "Basic"
    },
    {
      title: "Product Quality Control",
      icon: Award,
      description: "Comprehensive quality checks at every stage",
      features: [
        "Pre-production sample approval",
        "In-line production monitoring",
        "Pre-shipment inspection",
        "Final quality certification",
        "Compliance with international standards"
      ],
      badge: "Premium"
    },
    {
      title: "Third-Party Inspections",
      icon: Eye,
      description: "Independent quality verification by certified inspectors",
      features: [
        "Professional inspection services",
        "Detailed quality reports",
        "Photo and video documentation",
        "Compliance testing",
        "Risk assessment reports"
      ],
      badge: "Gold"
    }
  ];

  const inspectionProcess = [
    {
      step: 1,
      title: "Pre-Production Inspection",
      icon: Search,
      description: "Verify materials, components, and production setup",
      timing: "Before production starts",
      coverage: [
        "Raw material quality check",
        "Component specifications verification",
        "Production line setup validation",
        "Quality control system review"
      ]
    },
    {
      step: 2,
      title: "During Production Inspection",
      icon: Clock,
      description: "Monitor production quality and adherence to specifications",
      timing: "25-75% production completion",
      coverage: [
        "Production process monitoring",
        "In-line quality checks",
        "Sample product testing",
        "Production timeline assessment"
      ]
    },
    {
      step: 3,
      title: "Pre-Shipment Inspection",
      icon: CheckCircle,
      description: "Final quality verification before goods are shipped",
      timing: "100% production completion",
      coverage: [
        "Finished product quality check",
        "Packaging and labeling verification",
        "Quantity confirmation",
        "Final compliance testing"
      ]
    },
    {
      step: 4,
      title: "Container Loading Supervision",
      icon: Truck,
      description: "Ensure proper loading and container security",
      timing: "During container loading",
      coverage: [
        "Loading procedure supervision",
        "Container condition check",
        "Cargo securing verification",
        "Documentation review"
      ]
    }
  ];

  const certifications = [
    {
      name: "ISO 9001",
      description: "Quality Management System",
      icon: Award,
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "CE Marking",
      description: "European Conformity",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800"
    },
    {
      name: "BIS Certification",
      description: "Bureau of Indian Standards",
      icon: Star,
      color: "bg-orange-100 text-orange-800"
    },
    {
      name: "UL Listed",
      description: "Underwriters Laboratories",
      icon: Shield,
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const qualityBenefits = [
    {
      title: "Reduced Risk",
      description: "Minimize quality-related issues and product returns",
      icon: Shield,
      percentage: "85%"
    },
    {
      title: "Cost Savings",
      description: "Avoid costly rework and replacement expenses",
      icon: Target,
      percentage: "70%"
    },
    {
      title: "Faster Delivery",
      description: "Streamlined process with fewer delays",
      icon: Clock,
      percentage: "60%"
    },
    {
      title: "Higher Satisfaction",
      description: "Improved customer satisfaction and trust",
      icon: Star,
      percentage: "95%"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Quality Assurance - SeekFactory</title>
        <meta 
          name="description" 
          content="Learn about SeekFactory's comprehensive quality assurance program, supplier verification process, and quality control measures." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Quality Assurance
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Our comprehensive quality assurance program ensures you receive products 
                that meet the highest standards. Every supplier and product goes through 
                rigorous verification and quality control processes.
              </p>
              
              {/* Quality Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
                {qualityBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl md:text-3xl font-bold text-white">{benefit.percentage}</div>
                    <div className="text-white/80 text-sm">{benefit.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Standards */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Our Quality Standards
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Multi-layered quality assurance approach covering every aspect of sourcing
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {qualityStandards.map((standard, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <standard.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <CardTitle className="text-xl">{standard.title}</CardTitle>
                        <Badge className={
                          standard.badge === "Gold" ? "bg-yellow-100 text-yellow-800" :
                          standard.badge === "Premium" ? "bg-purple-100 text-purple-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {standard.badge}
                        </Badge>
                      </div>
                      <CardDescription>{standard.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-left">
                        {standard.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Inspection Process */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Quality Inspection Process
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professional inspection services at every stage of production
                </p>
              </div>

              <div className="space-y-8">
                {inspectionProcess.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-accent text-accent-foreground">
                              Step {step.step}
                            </Badge>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                          </div>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.timing}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {step.coverage.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Supported Certifications
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We ensure products meet international quality and safety standards
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <cert.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <CardDescription>{cert.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className={cert.color}>
                        Verified
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Benefits */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Quality Benefits
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  How our quality assurance program benefits your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {qualityBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{benefit.percentage}</div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Experience Quality Assurance
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start sourcing with confidence knowing every product and supplier is thoroughly verified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-hero-gradient hover:opacity-90">
                  Find Quality Suppliers
                </Button>
                <Button size="lg" variant="outline">
                  Request Quality Report
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

export default QualityAssurance;