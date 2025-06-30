import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'profile_pictures' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    return NextResponse.json({ message: 'Image uploaded successfully', imageUrl }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in image upload API:', error);
    return NextResponse.json({ message: 'Failed to upload image', error: message }, { status: 500 });
  }
}
