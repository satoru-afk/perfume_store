"use client";
import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { navLink } from "@/constants/NavLink";
import { useState } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`w-full bg-white/80 backdrop-blur-sm border border-rose-200 fixed z-50 top-0 left-0`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/#hero" className="flex items-center space-x-2">
            <span className="text-2xl font-serif text-rose-400">✦</span>
            <span className="text-xl font-light text-rose-900">
              The Little Scent
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLink.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-rose-800 hover:text-rose-500 transition-colors"
              >
                {label}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-rose-800 hover:text-rose-500 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link
              href="/cart"
              className="relative text-rose-800 hover:text-rose-500 transition-colors mr-4"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-rose-800 hover:text-rose-500 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="w-6 h-6 cursor-pointer" />
              ) : (
                <FiMenu className="w-6 h-6 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div
          className={`md:hidden ${isOpen ? "block" : "hidden"} pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-3">
            {navLink.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-rose-800 hover:text-rose-500 transition-colors px-3 py-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}