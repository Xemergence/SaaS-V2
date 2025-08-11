import { Button } from "@/UIComponents";
import { Separator } from "@/UIComponents";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Smartphone,
  Home,
  Factory,
  Star,
  Loader2,
  Check,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "3d-art" | "nfc" | "iot-realestate" | "manufacturing";
  priceId: string; // Stripe Price ID
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "3d-art-cover-1",
    name: "Custom Art Display Cover",
    description:
      "Premium 3D printed protective cover for artwork displays with customizable designs",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "3d-art",
    priceId: "price_3d_art_cover_basic",
    features: [
      "Custom Design",
      "Durable Material",
      "UV Protection",
      "Easy Installation",
    ],
    rating: 4.8,
    reviews: 24,
    inStock: true,
  },
  {
    id: "3d-sculpture-base",
    name: "Modular Sculpture Base",
    description:
      "Adjustable 3D printed base system for sculptures and art installations",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    category: "3d-art",
    priceId: "price_3d_sculpture_base",
    features: [
      "Modular Design",
      "Multiple Sizes",
      "Weather Resistant",
      "Professional Grade",
    ],
    rating: 4.9,
    reviews: 18,
    inStock: true,
  },
  {
    id: "nfc-social-card",
    name: "Smart Social Media Card",
    description:
      "NFC-enabled business card that instantly shares your social media profiles",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    category: "nfc",
    priceId: "price_nfc_social_card",
    features: [
      "Instant Sharing",
      "Customizable Design",
      "Durable NFC Chip",
      "Mobile Compatible",
    ],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: "nfc-review-stand",
    name: "NFC Review Collection Stand",
    description:
      "Table stand with NFC technology for collecting customer reviews and feedback",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "nfc",
    priceId: "price_nfc_review_stand",
    features: [
      "Easy Setup",
      "Review Analytics",
      "Multiple Platforms",
      "Elegant Design",
    ],
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: "iot-property-sensor",
    name: "Smart Property Monitor",
    description:
      "IoT sensor system for monitoring temperature, humidity, and security in real estate",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "iot-realestate",
    priceId: "price_iot_property_sensor",
    features: [
      "24/7 Monitoring",
      "Mobile Alerts",
      "Cloud Dashboard",
      "Easy Installation",
    ],
    rating: 4.8,
    reviews: 67,
    inStock: true,
  },
  {
    id: "iot-access-control",
    name: "Smart Access Control System",
    description:
      "IoT-based keyless entry system for rental properties and commercial spaces",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "iot-realestate",
    priceId: "price_iot_access_control",
    features: [
      "Keyless Entry",
      "Remote Management",
      "Access Logs",
      "Mobile App",
    ],
    rating: 4.9,
    reviews: 43,
    inStock: true,
  },
  {
    id: "manufacturing-tracker",
    name: "Production Line Tracker",
    description:
      "IoT device for tracking production efficiency and equipment status in small manufacturing",
    price: 399.99,
    originalPrice: 499.99,
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    category: "manufacturing",
    priceId: "price_manufacturing_tracker",
    features: [
      "Real-time Tracking",
      "Efficiency Analytics",
      "Equipment Monitoring",
      "Custom Reports",
    ],
    rating: 4.7,
    reviews: 31,
    inStock: true,
  },
  {
    id: "quality-sensor",
    name: "Quality Control Sensor Kit",
    description:
      "Automated quality control sensors for small-scale manufacturing operations",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    category: "manufacturing",
    priceId: "price_quality_sensor",
    features: [
      "Automated Testing",
      "Quality Reports",
      "Alert System",
      "Easy Integration",
    ],
    rating: 4.5,
    reviews: 22,
    inStock: true,
  },
];

const categories = [
  { id: "all", name: "All Products", icon: Package },
  { id: "3d-art", name: "3D Printed Art", icon: Package },
  { id: "nfc", name: "NFC Products", icon: Smartphone },
  { id: "iot-realestate", name: "IoT Real Estate", icon: Home },
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory,
  );

  const handlePurchase = async (product: Product) => {
    setLoadingProduct(product.id);

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-stripe-checkout",
        {
          body: {
            priceId: product.priceId,
            quantity: 1,
            successUrl: `${window.location.origin}/products?payment=success&product=${product.id}`,
            cancelUrl: `${window.location.origin}/products?payment=cancelled`,
          },
        },
      );

      if (error) {
        console.error("Error creating checkout session:", error);
        alert("Failed to initiate payment. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to get checkout URL. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingProduct(null);
    }
  };

  const addToCart = (productId: string) => {
    setCart((prev) => [...prev, productId]);
    setTimeout(() => {
      setCart((prev) => prev.filter((id) => id !== productId));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* Header */}
      <header className="bg-[#1e1e2d] border-b border-[#2a2a3a] sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-[#7b68ee] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-[#2a2a3a]"></div>
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
                <span className="text-white font-bold text-xs">xE</span>
              </div>
              <span className="text-xl font-bold text-white">
                xEmergence Store
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#7b68ee] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1a1a24] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
            PRODUCTS FOR SALE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Innovative Solutions for Your Business
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            From 3D printed art covers to IoT solutions for real estate and
            manufacturing - discover products designed to enhance your business
            operations.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[#121218] border-b border-[#2a2a3a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#7b68ee] text-white"
                      : "bg-[#1e1e2d] text-gray-300 hover:bg-[#2a2a3a] hover:text-white"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPurchase={() => handlePurchase(product)}
                onAddToCart={() => addToCart(product.id)}
                isLoading={loadingProduct === product.id}
                isInCart={cart.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1e2d] py-12 border-t border-[#2a2a3a]">
        <div className="container mx-auto px-4 text-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
              <span className="text-white font-bold text-xs">xE</span>
            </div>
            <span className="text-xl font-bold text-white">xEmergence</span>
          </Link>
          <p className="text-gray-300 mb-4">
            Secure payments powered by Stripe • No account required
          </p>
          <Separator className="bg-[#2a2a3a] mb-6" />
          <div className="flex justify-center gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onPurchase: () => void;
  onAddToCart: () => void;
  isLoading: boolean;
  isInCart: boolean;
}

function ProductCard({
  product,
  onPurchase,
  onAddToCart,
  isLoading,
  isInCart,
}: ProductCardProps) {
  return (
    <div className="bg-[#1e1e2d] rounded-lg border border-[#2a2a3a] hover:border-[#7b68ee] transition-all group overflow-hidden h-[580px] flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-[#ff7676] text-white px-2 py-1 rounded-full text-xs font-medium">
            SALE
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Rating Section - Fixed Height */}
        <div className="flex items-center gap-2 mb-3 h-5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-300">({product.reviews})</span>
        </div>

        {/* Product Title - Fixed Height */}
        <div className="h-14 mb-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Product Description - Fixed Height */}
        <div className="h-10 mb-4">
          <p className="text-gray-300 text-sm line-clamp-2 leading-tight">
            {product.description}
          </p>
        </div>

        {/* Features Section - Fixed Height */}
        <div className="h-8 mb-4">
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-[#2a2a3a] text-gray-300 px-2 py-1 rounded whitespace-nowrap"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-gray-400 whitespace-nowrap">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price Section - Fixed Height */}
        <div className="h-8 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Fixed at bottom with consistent dimensions */}
        <div className="mt-auto">
          <div className="flex gap-3">
            <Button
              onClick={onPurchase}
              disabled={isLoading || !product.inStock}
              className="flex-1 h-12 bg-[#7b68ee] hover:bg-[#6a5acd] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </>
              )}
            </Button>
            <Button
              onClick={onAddToCart}
              disabled={!product.inStock || isInCart}
              variant="outline"
              className="w-12 h-12 border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545] disabled:opacity-50 flex-shrink-0"
            >
              {isInCart ? (
                <Check className="h-4 w-4" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
