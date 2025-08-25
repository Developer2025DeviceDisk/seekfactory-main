import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HeadphonesIcon,
  Users,
  FileText
} from "lucide-react";

const ContactUs = () => {
  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      contact: "vimarsh@seekfactory.com",
      action: "Send Email",
      href: "mailto:vimarsh@seekfactory.com"
    },
    {
      title: "Phone Support",
      description: "Speak with our team directly",
      icon: Phone,
      contact: "+91 9876543210",
      action: "Call Now",
      href: "tel:+919876543210"
    },
    {
      title: "Visit Our Office",
      description: "Meet us in person",
      icon: MapPin,
      contact: "Delhi, India",
      action: "Get Directions",
      href: "#"
    },
    {
      title: "Live Chat",
      description: "Chat with support team",
      icon: MessageSquare,
      contact: "Available 9 AM - 6 PM IST",
      action: "Start Chat",
      href: "#"
    }
  ];

  const supportTeams = [
    {
      title: "Sales Support",
      description: "Help with product inquiries and quotes",
      icon: Users,
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      specialties: ["Product Selection", "Price Negotiations", "Bulk Orders", "Custom Requirements"]
    },
    {
      title: "Technical Support",
      description: "Technical assistance and platform help",
      icon: HeadphonesIcon,
      availability: "Mon-Sat, 8 AM - 8 PM IST",
      specialties: ["Platform Navigation", "Account Issues", "Quality Assurance", "Documentation"]
    },
    {
      title: "Business Development",
      description: "Partnership and growth opportunities",
      icon: FileText,
      availability: "Mon-Fri, 10 AM - 5 PM IST",
      specialties: ["Supplier Partnerships", "Business Growth", "Strategic Planning", "Market Insights"]
    }
  ];

  const faqs = [
    {
      question: "How do I get started as a buyer?",
      answer: "Simply create an account, browse our product categories, and start connecting with verified suppliers."
    },
    {
      question: "How long does supplier verification take?",
      answer: "Basic verification typically takes 3-5 business days. Premium and Gold verification may take 7-14 days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support various payment methods including bank transfers, letters of credit, and trade assurance programs."
    },
    {
      question: "Do you provide quality assurance?",
      answer: "Yes, we offer comprehensive quality assurance including third-party inspections and quality certifications."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order status through your dashboard. We provide real-time updates on production and shipping."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - SeekFactory</title>
        <meta 
          name="description" 
          content="Get in touch with SeekFactory's support team. We're here to help with your B2B sourcing needs." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Have questions or need assistance? Our expert team is here to help you succeed 
                in your B2B sourcing journey. Reach out to us through any of the channels below.
              </p>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the most convenient way to reach us
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-4">{method.contact}</p>
                      <Button className="w-full" asChild>
                        <a href={method.href}>{method.action}</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form and Support Teams */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">Send Us a Message</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Form</CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you within 24 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Your first name" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Your last name" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                        
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="Your company name" />
                        </div>
                        
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="How can we help you?" />
                        </div>
                        
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Tell us more about your requirements..."
                            rows={5}
                          />
                        </div>
                        
                        <Button className="w-full bg-hero-gradient hover:opacity-90">
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Support Teams */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">Our Support Teams</h2>
                  <div className="space-y-6">
                    {supportTeams.map((team, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center">
                              <team.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{team.title}</CardTitle>
                              <CardDescription>{team.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{team.availability}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {team.specialties.map((specialty, specialtyIndex) => (
                              <span 
                                key={specialtyIndex}
                                className="px-2 py-1 bg-muted rounded-md text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Quick answers to common questions
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Office Hours */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Business Hours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold mb-2">Sales & Support</h3>
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM IST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <p className="text-muted-foreground">Monday - Saturday</p>
                  <p className="text-muted-foreground">8:00 AM - 8:00 PM IST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Emergency Support</h3>
                  <p className="text-muted-foreground">24/7 Available</p>
                  <p className="text-muted-foreground">For urgent issues</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;