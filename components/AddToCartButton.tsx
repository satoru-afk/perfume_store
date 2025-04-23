'use client'
import React, { useCallback } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { Perfume } from "@/constants/perfumes";
import { toast } from "sonner";

const AddToCartButton = ({ perfume }: { perfume: Perfume }) => {
  const { addToCart } = useCart();
  const handleAddToCart = useCallback(() => {
    addToCart(perfume);
    toast.success(`${perfume.name} has been added to your inventory!`, {
      description: "Check your cart for more details.",
      richColors: true,
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
  }, [addToCart, perfume]);
  return (
    <button
      onClick={handleAddToCart}
      className={`p-2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer`}
      aria-label="Add to cart"
    >
      <FiShoppingCart className="w-5 h-5" />
    </button>
  );
};

export default AddToCartButton;
