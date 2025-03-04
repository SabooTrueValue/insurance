"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, ImageOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecordImageModal({ image }: { image: string }) {
  const [loadingImg, setImageLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoading(false);
    setHasError(false); // Reset error state when image loads successfully
  };

  const handleImageError = () => {
    setHasError(true);
    setImageLoading(false); // Set loading to false if image fails to load
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingImg) {
        setImageLoading(false); // Force set to false after 3 seconds
      }
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [loadingImg]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="outline-none focus:outline-none">
          <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* Show loader while the image is loading */}
        {loadingImg && !hasError && (
          <div className="flex items-center justify-center h-96">
            <LoaderCircle className="animate-spin h-6 w-6" />
          </div>
        )}

        {/* Show error message when image fails to load */}
        {hasError && (
          <div className="flex items-center flex-col space-y-4 justify-center h-96">
            <ImageOff className="h-20 w-20 mx-auto text-gray-900/90 dark:text-white/90" />
            <div className="text-muted-foreground">Image failed to load</div>
          </div>
        )}

        {/* Show the image if it's loaded successfully */}
        {!loadingImg && !hasError && (
          <div className="relative w-full h-96">
            <Image
              src={image}
              alt="image"
              fill
              objectFit="contain"
              loading="lazy"
              onLoadingComplete={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        )}

        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button variant="default" asChild>
            <Link href={image} target={"_blank"}>
              Download
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
