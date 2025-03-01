"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RecordImageModal({ image }: { image: string }) {
  const [loadingImg, setImageLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingImg) {
        setImageLoading(false);
      }
    }, 3000); // After 3 seconds, force loadingImg to false if not already

    return () => clearTimeout(timeout); // Clean up timeout if the component unmounts
  }, [loadingImg]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="outline-none focus:outline-none">
          <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {loadingImg ? (
          <div className="flex items-center justify-center h-96">
            <LoaderCircle className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <div className="relative w-full h-96">
            <Image
              src={image}
              alt="image"
              fill
              objectFit="contain"
              loading="lazy"
              onLoadingComplete={handleImageLoad}
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
