// app/about/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About QuickCart
        </motion.h1>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>QuickCart</strong> is a modern e-commerce platform built with{" "}
              <span className="font-medium">Next.js, Tailwind CSS, and MongoDB</span>.  
              It provides a fast, secure, and seamless shopping experience for customers 
              while empowering sellers with an intuitive dashboard.
            </p>

            <p>
              🚀 Our goal is to make online shopping <em>simple, quick, and reliable</em>.  
              Whether you’re a buyer looking for the best deals or a seller wanting 
              to grow your business, QuickCart has got you covered.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>⚡ Fast and responsive design</li>
              <li>🛒 Easy product browsing and cart management</li>
              <li>📦 Secure order processing</li>
              <li>📊 Seller dashboard for managing products & sales</li>
            </ul>

            <p>
              💡 Built by <strong>Amrit Rai</strong> and contributors with love for 
              modern web technologies ❤️
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
