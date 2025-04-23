"use client";

import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import { FiUpload, FiCheckCircle, FiX } from "react-icons/fi";
import Image from "next/image";
import Button from "@/components/Button";
import LoadingSkeleton from "@/components/LoadingSkeleton";
export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, isHydrated } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    shippingProvider: "",
    contact: "",
    paymentProof: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, paymentProof: file }));

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, paymentProof: null }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.shippingProvider)
      newErrors.shippingProvider = "Please select a provider";
    if (!formData.contact.trim())
      newErrors.contact = "Email or phone is required";
    if (!formData.paymentProof)
      newErrors.paymentProof = "Payment proof is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      formPayload.append("address", formData.address);
      formPayload.append("shippingProvider", formData.shippingProvider);
      formPayload.append("contact", formData.contact);
      formPayload.append("cartTotal", cartTotal.toString());
      formPayload.append(
        "cartItems",
        JSON.stringify(
          cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            family: item.family,
          }))
        )
      );

      if (formData.paymentProof) {
        formPayload.append("paymentProof", formData.paymentProof);
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) throw new Error("Failed to submit order");

      const result = await response.json();

      if (result.success) {
        setOrderId(result.orderId);
        clearCart();
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Submission failed"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return <LoadingSkeleton/>
  }

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="pt-20 text-center">
        <h2 className="text-2xl text-rose-900 mb-8">Your cart is empty</h2>
        <Button href="/shop" title="Continue Shopping" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-30 text-center max-w-md mx-auto">
        <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl text-rose-900 mb-2">Order Received!</h2>
        <div className="bg-rose-50 p-4 rounded-lg mb-4">
          <p className="font-medium">
            Order ID: <span className="text-rose-600">{orderId}</span>
          </p>
        </div>
        <h1 className="text-5xl text-red-600 mb-4">PLease Take a Screenshot to save the order number, as it will disappear once you close the tab.!</h1>
        <p className="text-rose-700 mb-10">
          We will verify the payment and ship your orders an send you a message. in case you do not receive any contact from us within 1-2 days, please reach out to use at +856 20 77889900 | jondoe@gamail.com, and include your order ID.
        </p>
        <Button href="/shop" title="Continue Shopping" />
      </div>
    );
  }

  return (
    <div className="pt-26 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-rose-900 mb-8">
         Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Instructions */}
          <div className="bg-rose-50 p-6 rounded-xl">
            <h2 className="text-xl font-serif text-rose-900 mb-4">
              Payment Instructions
            </h2>

            <div className="mb-6">
              <h3 className="font-medium text-rose-800 mb-2">
                1. Scan QR Code
              </h3>
              <div className="bg-white p-4 rounded-lg border border-rose-200 flex justify-center">
                {/* Replace with your actual QR code */}
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  <Image
                    src="/images/fakeQR.jpg"
                    width={192}
                    height={192}
                    alt="fake qr"
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-rose-600 mt-2">
                Scan to pay ${cartTotal.toFixed(2)} using your mobile payment
                app
              </p>
            </div>

            <div>
              <h3 className="font-medium text-rose-800 mb-2">
                2. Upload Payment Proof
              </h3>
              <p className="text-rose-700">
                After payment, take a screenshot and upload it below as proof of
                transaction.
              </p>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-rose-800 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g., John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.fullName ? "border-rose-500" : "border-rose-200"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-rose-800 mb-1">
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="e.g., 123 Main St, Anytown, State, Country"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.address ? "border-rose-500" : "border-rose-200"
                  }`}
                />
                {errors.address && (
                  <p className="text-rose-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="shippingProvider"
                  className="block text-rose-800 mb-1"
                >
                  Shipping Provider <span className="text-rose-500">*</span>
                </label>
                <select
                  id="shippingProvider"
                  name="shippingProvider"
                  value={formData.shippingProvider}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg cursor-pointer ${
                    errors.shippingProvider
                      ? "border-rose-500"
                      : "border-rose-200"
                  }`}
                >
                  <option className="cursor-pointer" value="">
                    Select provider
                  </option>
                  <option className="cursor-pointer" value="FedEx">
                    FedEx
                  </option>
                  <option className="cursor-pointer" value="UPS">
                    UPS
                  </option>
                  <option className="cursor-pointer" value="DHL">
                    DHL
                  </option>
                  <option className="cursor-pointer" value="USPS">
                    USPS
                  </option>
                  <option className="cursor-pointer" value="Other">
                    Other
                  </option>
                </select>
                {errors.shippingProvider && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.shippingProvider}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact" className="block text-rose-800 mb-1">
                  Email or Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="e.g., yourname@email.com or +856 20 12345678
"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.contact ? "border-rose-500" : "border-rose-200"
                  }`}
                />
                {errors.contact && (
                  <p className="text-rose-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="paymentProof"
                  className="block text-rose-800 mb-1"
                >
                  Payment Screenshot <span className="text-rose-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.paymentProof ? "border-rose-500" : "border-rose-200"
                  }`}
                >
                  <input
                    type="file"
                    id="paymentProof"
                    name="paymentProof"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Payment proof preview"
                        className="max-h-auto mx-auto rounded-lg mb-2"
                        width={300} // You can adjust this based on your layout
                        height={300} // Same here
                        unoptimized // Optional: Use this if imagePreview is a local blob or external URL
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-rose-50"
                        aria-label="Remove image"
                      >
                        <FiX className="w-4 h-4 text-rose-500" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="paymentProof"
                      className="cursor-pointer block text-center p-6"
                    >
                      <FiUpload className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                      <p className="text-rose-700">
                        Click to upload payment screenshot
                      </p>
                      <p className="text-sm text-rose-500 mt-1">
                        PNG, JPG accepted (max 5MB)
                      </p>
                    </label>
                  )}
                </div>
                {errors.paymentProof && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.paymentProof}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full mt-6 transition-colors cursor-pointer ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-rose-600"
                }`}
              >
                {isSubmitting ? "Processing..." : "Complete Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
