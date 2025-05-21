"use client";

import Image from "next/image";

type SmartImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: boolean;
};

/**
 * SmartImage automatically uses <Image> for allowed domains, and falls back to <img> otherwise.
 */
export default function SmartImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback = false,
}: SmartImageProps) {
  const isAllowedDomain =
    src.startsWith("/") || // local static files
    src.includes("res.cloudinary.com") ||
    src.includes("images.unsplash.com") ||
    src.includes("media.istockphoto.com");

  if (isAllowedDomain && !fallback) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width || 300} // default width
        height={height || 200} // default height
        fill
        className={className}
        unoptimized // optional: remove if you want Next.js to optimize
      />
    );
  }

  // Fallback for unknown or disallowed domains
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
