'use client'
import React, { useEffect, useState } from 'react';

const LoadingSkeleton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-night-sky">
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-100 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>

        {/* Little Prince Silhouette */}
        <div className="relative mb-8 animate-bounce" style={{ height: '80px', width: '50px' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-beige rounded-full"></div>
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-500 rounded"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-red-500 rounded-full"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-300 rounded-t-full"></div>
        </div>

        {/* Loading Text */}
        <p className="text-beige font-serif text-lg mb-2">Loading your journey...</p>
        <div className="w-32 h-1.5 bg-beige rounded-full overflow-hidden">
          <div className="h-full bg-yellow-300 rounded-full animate-loading-bar"></div>
        </div>

        {/* Tailwind CSS - Add to your globals.css */}
        <style jsx global>{`
        .bg-night-sky { background: linear-gradient(to bottom, #0a0e24 0%, #1a103d 100%); }
        .bg-beige { background-color: #f8e6d1; }
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        `}</style>
      </div>
  );
};

export default LoadingSkeleton;
