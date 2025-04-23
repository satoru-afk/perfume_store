import Image from "next/image";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background image with blur effect */}
      <div className="absolute inset-0">
        <Image
          src="/images/little-prince-bg.png" // Replace with your image path
          alt="Dreamy perfume background"
          fill
          className="object-cover"
          priority
          quality={80}
          
        />
        {/* Overlay for better text readability */}
        {/* Replace the overlay div with this */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 to-rose-200/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto ">
        <h1 className="text-5xl md:text-6xl font-serif font-light text-rose-900 mb-6 drop-shadow-lg">
          The Little Scent
        </h1>
        <p className="text-xl md:text-2xl text-rose-800 mb-10 leading-relaxed drop-shadow-md">
          Perfume is the unseen, unforgettable, ultimate accessory of fashion
          that heralds your arrival and prolongs your departure.
        </p>
        <Link
          href="/shop"
          className="bg-rose-500 hover:bg-rose-300 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-rose-300/50 "
        >
          Discover Our Scents
        </Link>
      </div>

      {/* Decorative elements */}
      <Link
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-none "
        href="/#featured-perfumes"
      >
        <svg
          className="w-8 h-8 text-rose-500 hover:text-rose-300 drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </Link>
    </section>
  );
}
