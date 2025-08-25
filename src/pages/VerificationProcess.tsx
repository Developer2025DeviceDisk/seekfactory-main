import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Building,
  Shield,
  Award,
  ArrowRight
} from "lucide-react";

const VerificationProcess = () => {
  const steps = [
    {
      step: 1,
      title: "Application Submission",
      description: "Submit your supplier application with required documents",
      duration: "1-2 days",
      icon: FileCheck,
      requirements: [
        "Business license and registration",
        "Tax certificates",
        "Bank verification documents",
        "Company profile and overview"
      ]
    },
    {
      step: 2,
      title: "Document Review",
      description: "Our team reviews all submitted documentation",
      duration: "3-5 days",
      icon: Clock,
      requirements: [
        "Legal document verification",
        "Financial stability check",
        "Export/Import license validation",
        "Insurance coverage verification"
      ]
    },
    {
      step: 3,
      title: "Quality Assessment",
      description: "Evaluation of manufacturing capabilities and quality standards",
      duration: "5-7 days",
      icon: Shield,
      requirements: [
        "ISO certification review",
        "Quality management system audit",
        "Product sample evaluation",
        "Manufacturing facility inspection"
      ]
    },
    {
      step: 4,
      title: "Verification Complete",
      description: "Approved suppliers receive verified status and platform access",
      duration: "1 day",
      icon: Award,
      requirements: [
        "Verified supplier badge",
        "Premium listing privileges",
        "Access to buyer inquiries",
        "Marketing and promotional tools"
      ]
    }
  ];

  const verificationLevels = [
    {
      level: "Basic Verification",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Business license verification",
        "Basic company information",
        "Contact details confirmation",
        "Standard listing privileges"
      ]
    },
    {
      level: "Premium Verification",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: [
        "Comprehensive document review",
        "Quality certifications",
        "Financial stability check",
        "Priority search placement"
      ]
    },
    {
      level: "Gold Verification",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      features: [
        "On-site facility inspection",
        "Third-party quality audit",
        "Trade reference verification",
        "Exclusive marketing features"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Verification Process | SeekFactory</title>
        <meta name="description" content="Learn about SeekFactory's comprehensive supplier verification process. Understand the steps, requirements, and benefits of becoming a verified supplier." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Verification Process
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our rigorous verification process ensures that buyers connect with trustworthy, 
            reliable suppliers. Learn about the steps and requirements to become verified.
          </p>
        </div>

        {/* Process Overview */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Verification Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={step.step} className="relative">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <Badge variant="outline">{step.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Verification Levels */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Verification Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verificationLevels.map((level, index) => (
              <Card key={index} className={`${level.bgColor} border-l-4 border-l-current ${level.color}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <level.icon className={`w-8 h-8 ${level.color}`} />
                    <CardTitle className={level.color}>{level.level}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Detail */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Company Documentation
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Business license and registration certificate</li>
                    <li>• Tax registration and VAT certificates</li>
                    <li>• Export/Import license (if applicable)</li>
                    <li>• Company bank account verification</li>
                    <li>• Directors and shareholders information</li>
                    <li>• Business insurance certificates</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Quality & Compliance
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• ISO 9001:2015 Quality Management certificate</li>
                    <li>• Product testing and compliance reports</li>
                    <li>• Factory inspection certificates</li>
                    <li>• Environmental compliance documents</li>
                    <li>• Safety and health certifications</li>
                    <li>• Industry-specific certifications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does the verification process take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The complete verification process typically takes 10-15 business days, depending on the 
                  completeness of your documentation and the verification level you're applying for.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if my application is rejected?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If your application is rejected, we'll provide detailed feedback on the areas that need 
                  improvement. You can reapply after addressing the concerns raised.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a cost for verification?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Basic verification is free. Premium and Gold verification levels may involve fees 
                  for third-party audits and inspections. Contact us for detailed pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Ready to Get Verified?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start your verification journey today and gain access to thousands of qualified buyers 
                looking for reliable suppliers like you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/auth">Start Application</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/supplier-guidelines">View Guidelines</Link>
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

export default VerificationProcess;