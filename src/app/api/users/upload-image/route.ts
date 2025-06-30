// app/api/users/upload-image/route.ts 

import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary (usually done once, e.g., in a utility file or directly here for simplicity)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File; // 'file' is the name we'll use in FormData on the frontend

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    // Using a Promise to handle the stream upload
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'profile_pictures' }, // Optional: organize your uploads into a folder
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      ).end(buffer);
    });

    // @ts-ignore - Cloudinary upload_stream returns a result object
    const imageUrl = uploadResult.secure_url;

    return NextResponse.json({ message: 'Image uploaded successfully', imageUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Error in image upload API:', error);
    return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
  }
}
