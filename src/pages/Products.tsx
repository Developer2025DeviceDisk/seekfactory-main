"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Layout/Header";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const BASE_URL = `${import.meta.env.VITE_API_URL}`; // ✅ your backend URL
  
  const { products, fetchProducts, loading } = useProducts();

  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Newest First");
  const [sortOrder, setSortOrder] = useState("Descending");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchProducts(); // fetch on page load
  }, []);

  useEffect(() => {
    console.log("✅ Products from API:", products);
  }, [products]);

  return (
    <div>
      <Header />
      <main className="p-4 sm:p-6 md:p-8 lg:px-20 xl:px-32 bg-gray-50 min-h-screen">
        {/* Search + Filters Button */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-3 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search for machinery..."
            className="px-4 py-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Filters
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-md flex flex-col lg:flex-row flex-wrap gap-6">
            {/* Category */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border w-full px-3 py-2 rounded-md"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Textile</option>
                <option>Manufacturing</option>
                <option>Food Processing</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border w-full px-3 py-2 rounded-md"
              >
                <option>Newest First</option>
                <option>Price</option>
                <option>Name</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border w-full px-3 py-2 rounded-md"
              >
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium mb-2">
                Price Range: ${minPrice} - ${maxPrice}
              </label>
              <div className="relative flex items-center">
                {/* Min Price */}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
                  }
                  className="absolute pointer-events-none appearance-none w-full h-1 bg-transparent z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />

                {/* Max Price */}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
                  }
                  className="absolute pointer-events-none appearance-none w-full h-1 bg-transparent z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />

                {/* Track */}
                <div className="relative w-full h-1 bg-gray-300 rounded">
                  <div
                    className="absolute h-1 bg-blue-600 rounded"
                    style={{
                      left: `${(minPrice / 100000) * 100}%`,
                      right: `${100 - (maxPrice / 100000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          Products ({products?.length || 0})
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : products?.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => {
              // Compute image URL safely
              const imageUrl =
                product?.images?.length > 0
                  ? `${BASE_URL}${product.images[0]}`
                  : "https://via.placeholder.com/300";

              // Log it for debugging
              console.log("🖼️ Image URL for product:", product.name, imageUrl);

              return (
                <div
                  key={product._id}
                  className="bg-white shadow rounded-2xl overflow-hidden transition hover:shadow-xl"
                >
                  {/* Product Image */}
                  <div className="relative h-48 sm:h-56 w-full">
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                      {product.category || "Uncategorized"}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      {product.title}
                    </h3>
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                      {product.subcategory || "no subcategory"}
                    </span>
                    <p className="text-gray-500 text-sm mb-2">
                      {product.name || "No description"}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      {product.sort_description || "No Sort description"}
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-600 font-bold text-lg">
                        ${product.priceRange || "N/A"}
                      </span>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm">
                      MOQ: {product.minOrderQuantity || "-"}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      Lead Time: {product.leadTime || "-"}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                        View Details
                      </button>
                      <button
                      onClick={()=> navigate(`/inquiry/new`)}
                       className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm">
                        chat with us
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </main>
    </div>
  );
}
