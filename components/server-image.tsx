"use server";

import { getPlaiceholder } from "plaiceholder";

interface BlurServerImageProps {
  image: string;
}

const BlurServerImage = async ({ image }: BlurServerImageProps) => {
  const buffer = await fetch(image).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);

  return { base64 };
};

export default BlurServerImage;
