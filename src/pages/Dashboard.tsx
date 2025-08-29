import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Settings,
  Package,
  MessageSquare,
  TrendingUp,
  Star,
  MapPin,
  Mail,
  Phone,
  Globe,
  Building,
  Calendar,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductManagement from "@/components/Dashboard/ProductManagement";
import MyProducts from "../components/Dashboard/products";

interface Profile {
  id: string;
  user_type: string;
  company_name: string;
  contact_person: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website: string;
  profile_image_url: string;
  is_verified: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  status: string;
  created_at: string;
  categories: { name: string } | null;
}

interface Inquiry {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  quantity_required: number;
  target_price: string;
  delivery_timeline: string;
}

const Dashboard = () => {
  const { user, session } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  if (user && session) {
    fetchDashboard();
    // fetchProducts(); // 👈 add this
  }
}, [user, session]);

const fetchProducts = async () => {
  const auth_token = localStorage.getItem("auth_token");
  try {
    const res = await fetch("https://seekfactory-backend.onrender.com/api/products/my/products", {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setProducts(data);
      console.log(data, "products in dashboard");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

useEffect(()=>{
  fetchProducts();
  console.log(fetchProducts());
},[])

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const endpoint = user?.userType === 'supplier' ? '/api/dashboard/supplier' : '/api/dashboard/buyer';
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDashboardData(data);
      } else {
        setDashboardData(null);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Header />
  //       <div className="container mx-auto px-4 py-16">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
  //           <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={dashboardData?.profile?.profile_image_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {dashboardData?.profile?.contact_person?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Welcome back, {dashboardData?.profile?.contact_person}
                  {user?.name || 'guest'}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={dashboardData?.profile?.is_verified ? "default" : "secondary"}>
                    {dashboardData?.profile?.is_verified ? "Verified" : "Unverified"} {dashboardData?.profile?.user_type}
                  </Badge>
                  {dashboardData?.profile?.company_name && (
                    <span className="text-muted-foreground">• {dashboardData.profile.company_name}</span>
                  )}
                </div>
              </div>
            </div>
            <Button asChild>
              <Link to="/dashboard/profile">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.products?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.inquiries?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Total conversations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Products
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/products/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.products?.slice(0, 3).map((product: Product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.price_range}</p>
                        </div>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </div>
                    ))}
                    {dashboardData?.products?.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No products yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.inquiries?.slice(0, 3).map((inquiry: Inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{inquiry.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {inquiry.quantity_required} • {inquiry.target_price}
                          </p>
                        </div>
                        <Badge variant={inquiry.status === 'pending' ? 'outline' : 'default'}>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                    {dashboardData?.inquiries?.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No inquiries yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            {/* <h3>i am king of</h3> */}
            <ProductManagement />
            {/* <MyProducts/> */}
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>My Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.inquiries?.map((inquiry: Inquiry) => (
                    <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{inquiry.subject}</CardTitle>
                          <Badge variant={inquiry.status === 'pending' ? 'outline' : 'default'}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {inquiry.message}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <div className="font-medium">{inquiry.quantity_required}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Target Price:</span>
                            <div className="font-medium">{inquiry.target_price}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Timeline:</span>
                            <div className="font-medium">{inquiry.delivery_timeline}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <div className="font-medium">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {dashboardData?.inquiries?.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
                      <p className="text-muted-foreground">Your conversations will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.profile && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={dashboardData.profile.profile_image_url} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {dashboardData.profile.contact_person?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{dashboardData.profile.contact_person}</h3>
                        <p className="text-muted-foreground">{dashboardData.profile.company_name}</p>
                        <Badge variant={dashboardData.profile.is_verified ? "default" : "secondary"} className="mt-2">
                          {dashboardData.profile.is_verified ? "Verified" : "Unverified"} {dashboardData.profile.user_type}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Contact Information</h4>
                        {dashboardData.profile.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{dashboardData.profile.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{user?.email}</span>
                        </div>
                        {dashboardData.profile.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <a href={dashboardData.profile.website} target="_blank" rel="noopener noreferrer" 
                               className="text-primary hover:underline">
                              {dashboardData.profile.website}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Location</h4>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                          <div>
                            {dashboardData.profile.address && <div>{dashboardData.profile.address}</div>}
                            <div>
                              {dashboardData.profile.city && `${dashboardData.profile.city}, `}
                              {dashboardData.profile.state && `${dashboardData.profile.state}, `}
                              {dashboardData.profile.country}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {dashboardData.profile.description && (
                      <div>
                        <h4 className="font-medium mb-2">About</h4>
                        <p className="text-muted-foreground">{dashboardData.profile.description}</p>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button asChild>
                        <Link to="/dashboard/profile/edit">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
