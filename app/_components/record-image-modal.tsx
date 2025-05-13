"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function RecordImageModal({ image }: { image: string }) {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Function to handle image error (fallback behavior)
  const handleImageError = () => {
    setHasError(true);
    setImageLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="outline-none focus:outline-none">
          <ExternalLink />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {hasError ? (
          <div className="text-center text-red-500">
            <p>Failed to load image</p>
          </div>
        ) : (
          <div className="relative w-full h-[400px]">
            {/* Image loader */}
            {isImageLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <Loader className="animate-spin" />
              </div>
            )}

            <Image
              src={image}
              alt="Image preview"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => setImageLoading(false)}
              onError={handleImageError} // Set error if image fails to load
              className={`transition-all duration-700 ease-in-out ${
                isImageLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
              }`}
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
