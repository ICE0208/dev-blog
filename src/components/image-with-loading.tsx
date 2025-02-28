"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  height?: string;
  priority?: boolean;
}

export default function ImageWithLoading({
  src,
  alt,
  height = "400px",
  priority = false,
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (isLoading === false) {
      // 로딩이 자연스럽게 사라지기 위해 350ms 뒤에 스켈레톤을 사라지게 한다.
      setTimeout(() => setShowSkeleton(false), 350);
    }
  }, [isLoading]);

  return (
    <div
      className="relative w-full my-8"
      style={{ height }}
    >
      {/* Skeleton */}
      {showSkeleton && (
        <div
          className={`absolute inset-0 transition-opacity  duration-300 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="size-full flex items-center justify-center">
            <div className="size-8 border-4 border-gray-600 border-t-gray-400 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-opacity duration-300 object-contain m-0 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
}
