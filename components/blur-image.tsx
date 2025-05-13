"use client";

import Image from "next/image";
import { useState } from "react";

interface BlurImageProps {
  alt: string;
  src: string;
  base64: string;
}

const BlurImage = ({ alt, src, base64 }: BlurImageProps) => {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL={base64}
      onLoadingComplete={() => setImageLoading(false)}
      className={`object-cover transition-all duration-700 ease-in-out ${
        isImageLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
      }`}
    />
  );
};

export default BlurImage;
