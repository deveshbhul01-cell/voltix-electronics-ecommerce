import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "DEV Pro Headphones",
    category: "Audio",
    price: 3999,
    oldPrice: 4999,
    icon: "🎧",
    rating: 4.8,
    reviews: 184,
    badge: "BESTSELLER",
    stock: 25,
    featured: true,
    description:
      "Immersive wireless audio with powerful bass and all-day comfort.",
    features: [
      "40mm premium drivers",
      "Bluetooth 5.3",
      "Up to 40 hours battery",
      "Low latency mode",
      "USB-C fast charging"
    ]
  },

  {
    name: "DEV Watch X1",
    category: "Wearables",
    price: 5499,
    oldPrice: 6499,
    icon: "⌚",
    rating: 4.7,
    reviews: 126,
    badge: "NEW",
    stock: 18,
    featured: true,
    description:
      "Premium smart watch with fitness tracking and a vibrant display.",
    features: [
      "AMOLED display",
      "Heart rate tracking",
      "Sleep monitoring",
      "Multiple sports modes",
      "Long battery life"
    ]
  },

  {
    name: "DEV Mechanical Keyboard",
    category: "Gaming",
    price: 4499,
    oldPrice: 5299,
    icon: "⌨️",
    rating: 4.9,
    reviews: 231,
    badge: "POPULAR",
    stock: 30,
    featured: true,
    description:
      "Responsive mechanical keyboard designed for gaming and productivity.",
    features: [
      "Mechanical switches",
      "RGB lighting",
      "Anti-ghosting",
      "Detachable USB-C",
      "Compact premium design"
    ]
  },

  {
    name: "DEV Wireless Mouse",
    category: "Accessories",
    price: 1999,
    oldPrice: 2499,
    icon: "🖱️",
    rating: 4.6,
    reviews: 98,
    badge: "",
    stock: 40,
    description:
      "Precision wireless performance with a comfortable ergonomic design.",
    features: [
      "Adjustable DPI",
      "Silent switches",
      "Wireless connectivity",
      "Ergonomic shape",
      "Long battery life"
    ]
  },

  {
    name: "DEV Gaming Controller",
    category: "Gaming",
    price: 2999,
    oldPrice: 3699,
    icon: "🎮",
    rating: 4.8,
    reviews: 156,
    badge: "TRENDING",
    stock: 27,
    description:
      "Responsive wireless controls designed for competitive gameplay.",
    features: [
      "Wireless connection",
      "Dual vibration",
      "Responsive triggers",
      "Ergonomic grip",
      "PC compatible"
    ]
  },

  {
    name: "DEV Power Bank 20K",
    category: "Power",
    price: 2499,
    oldPrice: 2999,
    icon: "🔋",
    rating: 4.7,
    reviews: 203,
    badge: "",
    stock: 35,
    description:
      "20,000mAh high-speed portable charging for your everyday devices.",
    features: [
      "20,000mAh capacity",
      "Fast charging",
      "USB-C input/output",
      "Dual device charging",
      "Safety protection"
    ]
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(
      products
    );

    console.log(
      "✅ DEVSTORE products seeded successfully."
    );

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedProducts();
