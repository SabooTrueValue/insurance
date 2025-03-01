import imageCompression from "browser-image-compression";

//compress image
export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    maxCompression: 1,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log("Error while compressing the image", error);
    throw error;
  }
};
