import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  Star,
  Package,
  Shield,
  Globe,
  Phone,
  Mail
} from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  country_of_origin: string;
  tags: string[];
  min_order_quantity: number;
  specifications: any;
  certification_standards: string[];
  images: any;
  categories: { name: string } | null;
  profiles: {
    id: string;
    company_name: string;
    contact_person: string;
    is_verified: boolean;
    description: string;
    city: string;
    country: string;
    website: string;
    profile_image_url: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchProductById } = useProducts();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user, session } = useAuth();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryType, setInquiryType] = useState('product_info');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryRequirements, setInquiryRequirements] = useState('');
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [mediaList, setMediaList] = useState<string[]>([]);



  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      console.log(data, "productdetaildata")
      setProduct(data);

      // Combine images + video (if exists)
      const combinedMedia = [
        ...(data.images || []),
        ...(data.video ? [data.video] : []),
      ];
      setMediaList(combinedMedia);

      setLoading(false);
    };

    if (id) loadProduct();
  }, [id]);


  // const fetchProduct = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/products/${id}`);
  //     const data = await res.json();
  //     console.log(data , " data of productdetail")
  //     if (res.ok) {
  //       setProduct(data);
  //     } else {
  //       setProduct(null);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching product:', error);
  //     setProduct(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchReviews = async () => {
  //   try {
  //     const res = await fetch(`/api/reviews?productId=${id}`);
  //     const data = await res.json();
  //     if (res.ok) {
  //       setReviews(data.reviews || []);
  //       setAvgRating(data.avgRating || 0);
  //     } else {
  //       setReviews([]);
  //       setAvgRating(0);
  //     }
  //   } catch (error) {
  //     setReviews([]);
  //     setAvgRating(0);
  //   }
  // };

  //   useEffect(() => {
  //   if (id) {
  //     fetchProduct();
  //     // fetchReviews();
  //   }
  // }, [id]);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');
    setOrderSuccess(false);
    if (!user || !session) {
      setOrderError('You must be logged in as a buyer to place an order.');
      return;
    }
    if (!shippingAddress) {
      setOrderError('Shipping address is required.');
      return;
    }
    setOrderLoading(true);
    try {
      const payload = {
        supplierId: product.profiles.id, // Assuming product.supplierId is available or can be derived
        products: [
          {
            productId: product.id,
            quantity: orderQuantity,
            unitPrice: product.price_range, // Assuming product.basePrice is available
            specifications: '',
          },
        ],
        shippingAddress,
        totalAmount: product.price_range * orderQuantity, // Assuming product.basePrice is available
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');
      setOrderSuccess(true);
      setShowOrderForm(false);
      // Optionally redirect to order detail or show payment button
    } catch (error: any) {
      setOrderError(error.message || 'Failed to create order.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError('');
    setInquirySuccess(false);
    if (!user || !session || user.userType !== 'buyer') {
      setInquiryError('You must be logged in as a buyer to send an inquiry.');
      return;
    }
    if (!inquiryMessage) {
      setInquiryError('Message is required.');
      return;
    }
    setInquiryLoading(true);
    try {
      const payload = {
        productId: product.id,
        supplierId: product.profiles?.id || product.supplierId,
        inquiryType,
        message: inquiryMessage,
        requirements: inquiryRequirements ? { text: inquiryRequirements } : undefined,
      };
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send inquiry');
      setInquirySuccess(true);
      setShowInquiryForm(false);
    } catch (error: any) {
      setInquiryError(error.message || 'Failed to send inquiry.');
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Sidebar Thumbnails */}
                  {mediaList.length > 0 && (
                    <div className="flex md:flex-col gap-3 md:w-24 w-full md:h-[500px] overflow-auto">
                      {mediaList.map((media: string, index: number) => {
                        const fullUrl = `${import.meta.env.VITE_API_URL}${media}`;
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${selectedImage === index
                              ? "border-primary"
                              : "border-transparent"
                              }`}
                          >
                            {media.endsWith(".mp4") ? (
                              <video src={fullUrl} className="w-20 h-20 object-cover" muted />
                            ) : (
                              <img src={fullUrl} alt={`${product.name} ${index + 1}`} className="w-20 h-20 object-cover" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}


                  {/* Main Media Display */}
                  <div className="flex-1 flex justify-center items-center border rounded-lg p-4 bg-muted">
                    {mediaList.length > 0 ? (
                      mediaList[selectedImage].endsWith(".mp4") ? (
                        <video
                          src={`${import.meta.env.VITE_API_URL}${mediaList[selectedImage]}`}
                          controls
                          autoPlay
                          className="max-h-[500px] object-contain"
                        />
                      ) : (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${mediaList[selectedImage]}`}
                          alt={product.name}
                          className="max-h-[500px] object-contain rounded-lg"
                        />
                      )
                    ) : (
                      <div className="text-center">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No media available</p>
                      </div>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>



            {/* Product Details Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sub-Category</h4>
                  <p className="text-muted-foreground">{product.subcategory}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Short Description</h4>
                  <p className="text-muted-foreground">{product.sort_description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {product.specifications && (
                  <div>
                    <h4 className="font-medium mb-2">Specifications</h4>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {JSON.stringify(product.specifications, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {product.certification_standards?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.certification_standards.map((cert: string, index: number) => (
                        <Badge key={index} variant="outline">
                          <Shield className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {product.tags?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>


          {/* Product Info & Supplier */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                    {product.categories && (
                      <Badge variant="outline">{product.categories}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg text-primary mb-1">
                    <span>$</span> {product.priceRange || "Contact for quote"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Min. order: {product.minOrderQuantity || 'N/A'} units
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Origin: {product.countryOfOrigin}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/inquiry/new" state={{ product }}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Link>
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Supplier
                  </Button> */}
                  {/* <Button variant="outline" className="w-full" onClick={() => setShowOrderForm(true)}>
                    Order Now
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            {/* Supplier Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={"images" || product.profiles.profile_image_url || "image"} />
                    <AvatarFallback>
                      {product.supplier.companyName?.charAt(0) || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{product.supplier.companyName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.supplier.name}
                    </p>
                    {product.supplier.isVerified && (
                      <Badge variant="default" className="mt-1">
                        <Star className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {'description' || product.profiles.description && (
                  <p className="text-sm text-muted-foreground">
                    {product.profiles.description}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{product?.supplier?.address?.city || "City N/A"}, {product?.supplier?.address?.country || "Country N/A"}</span>
                  </div>
                  {/* {'website Link' ||product.profiles.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={product.profiles.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )} */}
                </div>

                <Separator />

                <Button variant="outline" className="w-full" asChild>
                  {/* <Link to={`/supplier/${product.profiles.id}`}> */}
                  View Full Profile
                  {/* </Link> */}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">{avgRating.toFixed(1)} / 5</span>
        </div>
        {reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border rounded p-4">
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} size={16} />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">by {review.buyer.email}</span>
              </div>
              <div className="text-sm">{review.comment}</div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </section> */}

      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Place Order</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="shippingAddress" className="block text-sm font-medium mb-1">Shipping Address</label>
                <textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  required
                />
              </div>
              {orderError && <p className="text-red-500 text-sm">{orderError}</p>}
              {orderSuccess && (
                <p className="text-green-500 text-sm">Order placed successfully!</p>
              )}
              <Button type="submit" className="w-full" disabled={orderLoading}>
                {orderLoading ? 'Placing Order...' : 'Submit Order'}
              </Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={() => setShowOrderForm(false)}>
              Cancel
            </Button>
          </Card>
        </div>
      )}

      {user?.userType === 'buyer' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Send Inquiry</h2>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium mb-1">Type</label>
                <select
                  id="inquiryType"
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="product_info">Product Info</option>
                  <option value="price_quote">Price Quote</option>
                  <option value="custom_order">Custom Order</option>
                </select>
              </div>
              <div>
                <label htmlFor="inquiryMessage" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="inquiryMessage"
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label htmlFor="inquiryRequirements" className="block text-sm font-medium mb-1">Requirements (optional)</label>
                <textarea
                  id="inquiryRequirements"
                  value={inquiryRequirements}
                  onChange={e => setInquiryRequirements(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={2}
                />
              </div>
              {inquiryError && <p className="text-red-500 text-sm">{inquiryError}</p>}
              {inquirySuccess && <p className="text-green-500 text-sm">Inquiry sent successfully!</p>}
              <Button type="submit" className="w-full" disabled={inquiryLoading}>
                {inquiryLoading ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={() => setShowInquiryForm(false)}>
              Cancel
            </Button>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;