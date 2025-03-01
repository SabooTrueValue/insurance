import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecordImageModal({ image }: { image: string }) {
  if (!image) {
    return <>Loading...</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="outline-none focus:outline-none">
          <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="relative w-full h-96">
          <Image src={image} alt="image" fill objectFit="contain" />
        </div>
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
