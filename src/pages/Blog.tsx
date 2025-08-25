import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  ArrowLeft,
  TrendingUp,
  Globe,
  Package,
  Shield
} from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Helmet } from "react-helmet-async";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Finding Reliable Suppliers in China",
    excerpt: "Learn proven strategies for identifying, vetting, and building relationships with trustworthy Chinese manufacturers.",
    content: `
      <p>China remains the world's manufacturing powerhouse, producing everything from electronics to textiles. However, finding reliable suppliers can be challenging for international buyers. This comprehensive guide will walk you through the essential steps to identify and work with trustworthy Chinese manufacturers.</p>
      
      <h2>1. Research and Initial Screening</h2>
      <p>Start your supplier search with thorough research. Use legitimate B2B platforms like SeekFactory, Alibaba, or Made-in-China to find potential suppliers. Look for companies with:</p>
      <ul>
        <li>Verified business licenses and certifications</li>
        <li>Detailed company profiles with clear contact information</li>
        <li>Positive customer reviews and ratings</li>
        <li>Multiple years of operation</li>
        <li>Professional website and communication</li>
      </ul>

      <h2>2. Verification Process</h2>
      <p>Never skip the verification process. Here's what you should verify:</p>
      <ul>
        <li><strong>Business License:</strong> Request and verify their business registration</li>
        <li><strong>Factory Inspection:</strong> Conduct virtual or in-person factory visits</li>
        <li><strong>Quality Certifications:</strong> Check for ISO, CE, FDA, or industry-specific certifications</li>
        <li><strong>Financial Stability:</strong> Review their financial standing and payment terms</li>
      </ul>

      <h2>3. Communication and Relationship Building</h2>
      <p>Effective communication is crucial for long-term success. Best practices include:</p>
      <ul>
        <li>Use clear, specific language in all communications</li>
        <li>Establish regular check-in schedules</li>
        <li>Be respectful of cultural differences</li>
        <li>Maintain written records of all agreements</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Finding reliable suppliers in China requires patience, due diligence, and ongoing relationship management. By following these guidelines and working with reputable platforms like SeekFactory, you can build successful partnerships that drive your business growth.</p>
    `,
    author: "David Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Sourcing",
    tags: ["China", "Suppliers", "Manufacturing", "Quality Control"],
    featured: true,
    imageUrl: "/api/placeholder/800/400"
  },
  {
    id: "2",
    title: "Digital Transformation in B2B Manufacturing: Trends for 2024",
    excerpt: "Explore how technology is reshaping manufacturing and what trends buyers and suppliers should watch this year.",
    content: `
      <p>The manufacturing industry is undergoing a significant digital transformation. From AI-powered quality control to blockchain supply chain tracking, technology is revolutionizing how businesses operate and interact in the B2B space.</p>

      <h2>Key Digital Trends in Manufacturing</h2>
      
      <h3>1. Artificial Intelligence and Machine Learning</h3>
      <p>AI is transforming manufacturing in multiple ways:</p>
      <ul>
        <li>Predictive maintenance to reduce downtime</li>
        <li>Quality control through computer vision</li>
        <li>Demand forecasting and inventory optimization</li>
        <li>Automated supplier matching and evaluation</li>
      </ul>

      <h3>2. IoT and Smart Factories</h3>
      <p>Internet of Things (IoT) devices are creating smart factories that offer:</p>
      <ul>
        <li>Real-time production monitoring</li>
        <li>Energy efficiency optimization</li>
        <li>Supply chain visibility</li>
        <li>Automated data collection and analysis</li>
      </ul>

      <h2>Impact on B2B Relationships</h2>
      <p>These technological advances are changing how buyers and suppliers interact:</p>
      <ul>
        <li>Digital platforms enable better supplier discovery and evaluation</li>
        <li>Real-time data sharing improves collaboration</li>
        <li>Automated processes reduce human error and increase efficiency</li>
        <li>Virtual reality enables remote factory inspections</li>
      </ul>
    `,
    author: "Sarah Johnson",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Technology",
    tags: ["Digital Transformation", "AI", "IoT", "Manufacturing"],
    featured: false,
    imageUrl: "/api/placeholder/800/400"
  }
];

const Blog = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const post = blogPosts.find(p => p.id === slug);
      setCurrentPost(post || null);
    }
  }, [slug]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  // If viewing a specific post
  if (slug && currentPost) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{currentPost.title} | SeekFactory Blog</title>
          <meta name="description" content={currentPost.excerpt} />
        </Helmet>
        
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">{currentPost.category}</Badge>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                {currentPost.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{currentPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            <Separator className="my-8" />

            <div className="flex flex-wrap gap-2 mb-8">
              {currentPost.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </article>
        </main>

        <Footer />
      </div>
    );
  }

  // Main blog listing page
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | SeekFactory - Global Trade Insights</title>
        <meta name="description" content="Stay updated with the latest trends in global trade, manufacturing, and B2B commerce." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            SeekFactory Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights, industry trends, and practical guides for global B2B trade
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-muted flex items-center justify-center">
                <Package className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="default" className="mb-4 w-fit">Featured</Badge>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <Button asChild className="w-fit">
                  <Link to={`/blog/${featuredPost.id}`}>Read More</Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-200">
              <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">{post.category}</Badge>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link 
                    to={`/blog/${post.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link to={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;