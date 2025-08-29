import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  status: string;
}

const MyProducts: React.FC = () => {
  console.log("MyProducts component rendered");
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products, "products from new file");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // JWT token
        const res = await axios.get("https://seekfactory-backend.onrender.com/api/products/my/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Fetch products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p
                className={`mt-2 text-sm font-medium ${
                  product.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
