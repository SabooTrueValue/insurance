import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (
  buffer: Buffer,
  filename: string,
  mimetype: string
) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `images/${Date.now()}_${filename}`, // Change the path for your needs
    Body: buffer,
    ContentType: mimetype,
    ACL: "public-read", // If you want the image to be publicly accessible
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location; // Return the URL of the uploaded image
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading to S3");
  }
};
