import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { IncomingMessage } from 'http';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form data
    const form = formidable({ multiples: false });
    const data = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req as unknown as IncomingMessage, (_err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
        if (_err) reject(_err);
        else resolve({ fields, files });
      });
    });
    // Handle both single and multiple file uploads
    let fileObj = data.files.file;
    if (Array.isArray(fileObj)) fileObj = fileObj[0];
    if (!fileObj || Array.isArray(fileObj) || typeof fileObj !== 'object' || !('filepath' in fileObj)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // @ts-ignore
    const fileData = await fs.readFile((fileObj as unknown as formidable.File).filepath);
    const uploadRes = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (_err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (_err) reject(_err);
        else resolve(result!);
      }).end(fileData);
    });
    return NextResponse.json({ url: uploadRes.secure_url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
} 