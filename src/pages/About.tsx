import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Globe, 
  Award,
  TrendingUp,
  Shield,
  Clock,
  Building,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const About = () => {
  const stats = [
    { label: "Active Suppliers", value: "25,000+", icon: Users },
    { label: "Countries Covered", value: "50+", icon: Globe },
    { label: "Successful Transactions", value: "$2.5B+", icon: TrendingUp },
    { label: "Years of Experience", value: "15+", icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize trust through rigorous verification processes and secure transaction systems."
    },
    {
      icon: Globe,
      title: "Global Innovation",
      description: "Connecting businesses worldwide to foster innovation and economic growth across borders."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Our dedicated support ensures every transaction meets the highest standards of satisfaction."
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Streamlined processes and advanced technology make B2B trading faster and more efficient."
    }
  ];

  const team = [
    {
      name: "David Chen",
      role: "CEO & Founder",
      image: "",
      bio: "15+ years in international trade and B2B marketplaces. Former executive at Alibaba Group.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "",
      bio: "Technology leader with expertise in e-commerce platforms and enterprise software solutions.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Zhang",
      role: "VP of Operations",
      image: "",
      bio: "Supply chain expert specializing in quality assurance and global logistics coordination.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      image: "",
      bio: "Customer experience professional focused on building lasting partnerships between buyers and suppliers.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Started as a small team with a vision to revolutionize B2B trading"
    },
    {
      year: "2012",
      title: "Global Expansion",
      description: "Expanded to serve suppliers and buyers across 25 countries"
    },
    {
      year: "2016",
      title: "Mobile Platform Launch",
      description: "Launched mobile app to enable trading on-the-go"
    },
    {
      year: "2019",
      title: "AI Integration",
      description: "Introduced AI-powered matching and recommendation systems"
    },
    {
      year: "2022",
      title: "Sustainability Initiative",
      description: "Launched green supplier certification program"
    },
    {
      year: "2024",
      title: "Next Generation Platform",
      description: "Reimagined platform with enhanced user experience and advanced features"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Established 2009
            </Badge>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6">
              About SeekFactory
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're on a mission to transform global B2B trade by connecting businesses 
              with verified suppliers through our secure, innovative marketplace platform.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    To democratize global trade by providing a trusted, efficient, and transparent 
                    platform that empowers businesses of all sizes to connect, collaborate, and 
                    thrive in the international marketplace.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    To become the world's most trusted B2B marketplace, where every business 
                    can easily find reliable partners, access global markets, and build 
                    sustainable growth through international trade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and help us build lasting relationships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From a small startup to a global platform serving thousands of businesses worldwide
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">
                          {milestone.year}
                        </span>
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate professionals dedicated to revolutionizing global B2B trade
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Twitter className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about our platform or want to learn more about how we can help your business? 
                  We'd love to hear from you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Headquarters</div>
                      <div className="text-muted-foreground">123 Business District, Shanghai, China</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">+86 21 1234 5678</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">hello@seekfactory.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ready to Start Trading?</CardTitle>
                  <CardDescription>
                    Join thousands of businesses already using SeekFactory to grow their international trade.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/auth">Create Free Account</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link to="/suppliers">Browse Suppliers</Link>
                  </Button>
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      No setup fees • Free to browse • Secure payments
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;