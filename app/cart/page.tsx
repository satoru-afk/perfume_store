"use client";

import Button from "@/components/Button";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
  const {
    isHydrated,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isHydrated || !isClient) {
    return (
      <div className="pt-16 pb-20 min-h-screen flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }
  return (
    <div className="pt-16 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-rose-900 mb-8">Your Cart</h1>

        {cartCount === 0 ? (
          <div className="text-center py-12">
            <p className="text-rose-700 mb-7">Your cart is empty</p>
            <Button href="/shop" title="Continue Shopping" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-rose-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative h-32 w-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-rose-900">
                              {item.name}
                            </h3>
                            <p className="text-lg font-medium text-rose-900">
                              ${item.price}
                            </p>
                          </div>
                          <p className="text-rose-600 mb-4">{item.family}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-rose-200 rounded-full">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 text-rose-500 hover:bg-rose-50 rounded-l-full"
                              >
                                -
                              </button>
                              <span className="px-3">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 text-rose-500 hover:bg-rose-50 rounded-r-full"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-rose-500 hover:text-rose-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-serif text-rose-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-rose-700">
                      Subtotal ({cartCount} items)
                    </span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-rose-700">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-rose-200 pt-4 flex justify-between">
                    <span className="text-lg font-medium text-rose-900">
                      Total
                    </span>
                    <span className="text-lg font-medium text-rose-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4 mt-6 items-center">
                  <Button href="/checkout" title="Proceed to Checkout" />
                  <p className="text-xs text-rose-500 mt-2 text-center">
                    or{" "}
                    <Link href="/shop" className="hover:underline">
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
