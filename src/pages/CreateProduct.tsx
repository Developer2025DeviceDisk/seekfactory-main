import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

// Mock categories for demonstration
const mockCategories: Category[] = [
  { id: "1", name: "Industrial Machinery" },
  { id: "2", name: "Construction Equipment" },
  { id: "3", name: "Agricultural Tools" },
  { id: "4", name: "Manufacturing Equipment" },
  { id: "5", name: "Packaging Machinery" }
];
const categoryWithSubcategories: Record<string, string[]> = {
  "Industrial Machinery": ["CNC Machines", "Lathes", "Drills"],
  "Construction Equipment": ["Excavators", "Cranes", "Loaders"],
  "Agricultural Tools": ["Tractors", "Ploughs", "Harvesters"],
  "Manufacturing Equipment": ["Conveyors", "Welding Machines"],
  "Packaging Machinery": ["Filling Machines", "Labeling Machines", "Sealing Machines"]
};


const CreateProduct = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sort_description: "",
    category: "",
    subcategory: "",
    priceRange: "",
    minOrderQuantity: "",
    countryOfOrigin: "China",
    certification: [] as string[],
    specifications: {}
  });


  useEffect(() => {
    if (user) {
      // Check if user is a supplier
      if (user.role !== 'supplier') {
        toast({
          title: "Access Denied",
          description: "Only suppliers can create products.",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      // Load mock categories
      setCategories(mockCategories);
    }
  }, [user, navigate, toast]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // Placeholder image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      toast({
        title: "Limit reached",
        description: "You can upload up to 5 images.",
        variant: "destructive",
      });
      return;
    }

    const newFiles = Array.from(files);

    // add file objects for upload
    setFileList((prev) => [...prev, ...newFiles]);

    // add preview URLs for display
    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (url: string, index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFileList((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(url);
  };

  // Handle video selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video size should not exceed 5MB",
        variant: "destructive",
      });
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleRemoveVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    toast({
      title: "Error",
      description: "You must be logged in as a supplier to create a product.",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("auth_token");
    const formDataToSend = new FormData();

    // append text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });

    // append tags
    formDataToSend.append("tags", JSON.stringify(tags));

    // append certifications
    formDataToSend.append("certifications", JSON.stringify([]));

    // append images
    fileList.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // append video if available
    if (videoFile) {
      formDataToSend.append("video", videoFile);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/create-new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (!response.ok) throw new Error("Failed to create product");

    const data = await response.json();

    toast({
      title: "Success",
      description: "Product created successfully and is pending approval!",
    });

    navigate("/dashboard");
  } catch (error) {
    console.error("Error creating product:", error);
    toast({
      title: "Error",
      description: "Failed to create product. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

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
              Create New Product
            </h1>
            <p className="text-muted-foreground">
              Add a new product to your catalog. It will be reviewed before going live.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                <Label htmlFor="description">sort_description</Label>
                <Textarea
                  id="sort_description"
                  value={formData.sort_description}
                  onChange={(e) => handleInputChange('sort_description', e.target.value)}
                  placeholder="Describe your product, its features, and benefits"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your product, its features, and benefits"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => handleInputChange("subcategory", value)}
                    disabled={!formData.category} // disable until category selected
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category &&
                        categoryWithSubcategories[formData.category].map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price </Label>
                  <Input
                    id="priceRange"
                    value={formData.priceRange}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    placeholder="e.g., $100 per unit"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minOrderQuantity">Minimum Order Quantity</Label>
                  <Input
                    id="minOrderQuantity"
                    type="number"
                    value={formData.minOrderQuantity}
                    onChange={(e) => handleInputChange('minOrderQuantity', e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                  <Select
                    value={formData.countryOfOrigin}
                    onValueChange={(value) => handleInputChange('countryOfOrigin', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
              </div>
            </CardContent>
          </Card>

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

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
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

          <Card>
            <CardHeader>
              <CardTitle>Certifications & Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Certification Standards</Label>
                <Textarea
                  placeholder="List any certifications (ISO 9001, CE, FDA, etc.)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Enter certifications separated by commas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Images (up to 5)</Label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  disabled={images.length >= 5}
                />
                <p className="text-sm text-muted-foreground">
                  High-quality images help buyers understand your product better
                </p>
              </div>

              {images.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {images.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt="Product"
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 text-xs opacity-80 group-hover:opacity-100 hover:bg-destructive/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Product Video (Max 5MB)</Label>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
              </div>

              {videoPreview && (
                <div className="relative group mt-4">
                  <video
                    src={videoPreview}
                    controls
                    className="w-64 h-40 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 text-xs opacity-80 group-hover:opacity-100 hover:bg-destructive/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>


          <div className="flex items-center justify-between pt-6">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </main>

    <Footer />
  </div>
);
};

export default CreateProduct;
