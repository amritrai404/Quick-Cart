'use client'
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Fallback to fetch single product if not found in context
        fetch(`https://dummyjson.com/products/${id}`)
          .then(res => res.json())
          .then(data => setProduct(data))
          .catch(err => console.error(err));
      }
      setLoading(false);
    }
  }, [id, products]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain h-full w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded border ${selectedImage === index ? 'border-orange-500' : 'border-gray-200'}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.stock} in stock)</span>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold mb-2">
                {currency}{product.price}
                {product.discountPercentage && (
                  <span className="text-sm text-gray-500 ml-2 line-through">
                    {currency}{Math.round(product.price * (100 + product.discountPercentage) / 100)}
                  </span>
                )}
              </p>
              {product.discountPercentage && (
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Brand: {product.brand}</li>
                <li>Category: {product.category}</li>
              </ul>
            </div>

            <button
              onClick={() => addToCart(product.id)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;