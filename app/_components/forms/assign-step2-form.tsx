"use client";

import { stepFormSchema } from "@/schema/assignment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { updateAssignment } from "@/actions/assignment-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGeolocation } from "@/hooks/use-geo-location";
import { useEffect, useState } from "react";

import { compressImage } from "@/lib/compress-img";
import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";

import { FirebaseStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const AssignFormStep = ({
  driverId,
  formId,
}: {
  driverId: string;
  formId: string;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof stepFormSchema>>({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      driverId: driverId,
      amount: "",
      collectedAddress: "",
      image: "",
      remarks: "",
      collectedTime: new Date().toISOString(),
      status: Status.COMPLETED,
    },
  });

  const { address } = useGeolocation();

  useEffect(() => {
    if (address) {
      form.setValue("collectedAddress", address);
    }
  }, [address, form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (image) {
      URL.revokeObjectURL(image);
    }

    if (file) {
      try {
        console.log(
          "Original file size:",
          (file.size / 1024 / 1024).toFixed(2),
          "MB"
        );

        const compressedImage = await compressImage(file);
        console.log(
          "Compressed file size:",
          (compressedImage.size / 1024 / 1024).toFixed(2),
          "MB"
        );

        const arrayBuffer = await compressedImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        //reference to the storage location
        const storageRef = ref(FirebaseStorage, `insurance/${file.name}`);

        // Upload the file to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, buffer);

        // Monitor upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Calculate upload progress percentage
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            setIsUploading(true);
          },
          (error) => {
            console.log("Error while uploading the image:", error);
            toast.error("Error uploading the image");
            setIsUploading(false);
          },
          () => {
            // Handle successful upload and get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL);
              form.setValue("image", downloadURL);
              setIsUploading(false);
              setImageLoading(true);
            });
          }
        );
      } catch (error) {
        console.log("Error while handling image change", error);
        toast.error("Error uploading the image");
      }
    }
  };

  const { isSubmitting, errors } = form.formState;
  console.log(errors);

  const onSubmit = async (values: z.infer<typeof stepFormSchema>) => {
    try {
      const res = await updateAssignment(formId, driverId, values);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {!image ? (
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <ImageIcon className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md mx-auto font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        capture={"environment"}
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    (ఫోటోను అప్‌లోడ్ చేయండి)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              {imageLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <LoaderCircle className="animate-spin h-6 w-6" />
                </div>
              )}
              <Image
                src={image}
                alt="uploaded image"
                height={250}
                width={250}
                loading="lazy"
                onLoad={handleImageLoad} // Call the function when the image has finished loading
              />
            </div>
          )}

          {isUploading && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Uploading... {Math.round(uploadProgress)}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Collecting..." : "Collect"}
        </Button>
      </form>
    </Form>
  );
};
