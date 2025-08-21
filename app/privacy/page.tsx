// app/privacy/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              At <strong>QuickCart</strong>, your privacy is our top priority. We are committed to protecting
              the personal information you provide while using our services.
            </p>

            <h2 className="font-semibold mt-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information like name, email, and contact details</li>
              <li>Payment information for processing orders</li>
              <li>Usage data to improve our platform and services</li>
            </ul>

            <h2 className="font-semibold mt-4">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you regarding your account or purchases</li>
              <li>To improve our website and personalize your experience</li>
            </ul>

            <h2 className="font-semibold mt-4">Security</h2>
            <p>
              We implement appropriate security measures to protect your data. However, no method of
              transmission over the Internet is 100% secure.
            </p>

            <h2 className="font-semibold mt-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us at
              <strong> contact@QuickCart</strong>.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
