import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  sort_description: string;
  category: string;
  subcategory: string;
  priceRange: string;
  minOrderQuantity: string;
  countryOfOrigin: string;
  tags: string[];
  certifications: string;
  images: string[];
}

// ✅ Category → Subcategory mapping
const categoryMap: Record<string, string[]> = {
  "Industrial Machinery": ["CNC Machines", "Lathes", "Milling Machines"],
  "Construction Equipment": ["Excavators", "Cranes", "Loaders"],
  "Manufacturing Tools": ["Cutting Tools", "Welding Tools", "Hand Tools"],
  "Agricultural Equipment": ["Tractors", "Harvesters", "Sprayers"],
  "Electronics": ["Consumer Electronics", "Industrial Electronics", "Components"],
  "Automotive Parts": ["Engine Parts", "Brake Systems", "Transmission Parts"],
  "Textile Machinery": ["Knitting Machines", "Weaving Machines", "Sewing Machines"],
  "Food Processing": ["Mixers", "Packaging Machines", "Cutting Machines"]
};

const ProductForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    sort_description: '',
    category: '',
    subcategory: '',
    priceRange: '',
    minOrderQuantity: '',
    countryOfOrigin: '',
    tags: [],
    certifications: '',
    images: []
  });

  useEffect(() => {
    if (user?.role !== 'supplier') {
      toast({
        title: 'Access Denied',
        description: 'Only suppliers can create/edit products',
        variant: 'destructive'
      });
      navigate('/dashboard');
      return;
    }

    fetchCategories();

    if (isEditing && id) {
      fetchProduct(id);
    }
  }, [user, isEditing, id]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async (productId: string) => {
    try {
      setLoadingProduct(true);
      const response = await apiClient.getProduct(productId);
      if (response.success && response.data) {
        const product = response.data;
        setFormData({
          name: product.name || '',
          description: product.description || '',
          sort_description: product.sort_description || '',
          category: product.category || '',
          subcategory: product.subcategory || '',
          priceRange: product.priceRange || '',
          minOrderQuantity: product.minOrderQuantity?.toString() || '',
          countryOfOrigin: product.countryOfOrigin || '',
          tags: product.tags || [],
          certifications: product.certifications || '',
          images: product.images || []
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product details',
        variant: 'destructive'
      });
      navigate('/dashboard');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Reset subcategory when category changes
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
      subcategory: ''
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Product name is required',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Product description is required',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.sort_description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Product sort_description is required',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please select a category',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.subcategory) {
      toast({
        title: 'Validation Error',
        description: 'Please select a subcategory',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        sort_description: formData.sort_description.trim(),
        category: formData.category,
        subcategory: formData.subcategory,
        priceRange: formData.priceRange.trim(),
        minOrderQuantity: formData.minOrderQuantity ? parseInt(formData.minOrderQuantity) : undefined,
        countryOfOrigin: formData.countryOfOrigin,
        tags: formData.tags,
        certifications: formData.certifications,
        images: formData.images
      };

      let response;
      if (isEditing && id) {
        response = await apiClient.updateProduct(id, productData);
      } else {
        response = await apiClient.createProduct(productData);
      }

      if (response.success) {
        toast({
          title: 'Success',
          description: `Product ${isEditing ? 'updated' : 'created'} successfully!`,
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} product`,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                {isEditing ? 'Edit Product' : 'Create New Product'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing
                  ? 'Update your product information'
                  : 'Add a new product to your catalog. It will be reviewed before going live.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your product, its features, and benefits"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_description">Sort Description *</Label>
                  <Textarea
                    id="sort_description"
                    value={formData.sort_description}
                    onChange={(e) => handleInputChange('sort_description', e.target.value)}
                    placeholder="Short description for listings"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))
                        ) : (
                          Object.keys(categoryMap).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ✅ Subcategory dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory *</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange('subcategory', value)}
                      disabled={!formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category && categoryMap[formData.category]?.length > 0 ? (
                          categoryMap[formData.category].map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="Other">Other</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price_range">Price Range</Label>
                    <Input
                      id="price_range"
                      value={formData.priceRange}
                      onChange={(e) => handleInputChange('priceRange', e.target.value)}
                      placeholder="e.g., $10-50 per unit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min_order_quantity">Minimum Order Quantity</Label>
                    <Input
                      id="min_order_quantity"
                      type="number"
                      value={formData.minOrderQuantity}
                      onChange={(e) => handleInputChange('minOrderQuantity', e.target.value)}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country_of_origin">Country of Origin</Label>
                  <Select
                    value={formData.countryOfOrigin}
                    onValueChange={(value) => handleInputChange('countryOfOrigin', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags & Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Tags & Keywords</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tags help buyers find your product more easily
                  </p>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-2"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Certification Standards</Label>
                  <Textarea
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    placeholder="List any certifications (ISO 9001, CE, FDA, etc.)"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter certifications separated by commas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Product' : 'Create Product'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductForm;
