"use client";

import Image from "next/image";
import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: boolean;
  fill?: boolean;
  placeholder?: "blur" | "empty" | undefined;
};
/**
 * A smart image component that handles different image sources and fallbacks.
 * It uses Next.js Image component for optimized loading and rendering.
 * If the image fails to load or is from a disallowed domain, it falls back to a native <img> element.
 
 */

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "empty",
  fallback = false,
  fill = false,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  const isAllowedDomain =
    src.startsWith("/") ||
    src.includes("res.cloudinary.com") ||
    src.includes("images.unsplash.com") ||
    src.includes("media.istockphoto.com");

  //  If disallowed or error, fall back to native <img>
  if (!isAllowedDomain || fallback || hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    );
  }

  //  If allowed, use Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width || 300 : undefined}
      height={!fill ? height || 200 : undefined}
      fill={fill || false}
      className={className}
      placeholder={placeholder}
      loading="lazy"
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
