import { supabase } from "./supabase";

// Supabase storage bucket name
const STORAGE_BUCKET = "images";

// Base URL for Supabase storage
const getStorageUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}`;
};

// Optimized image URLs using CDN with WebP format and compression
export const SUPABASE_IMAGES = {
  // Logo and branding - using optimized CDN URLs
  logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&q=80&fm=webp",
  logoBlack:
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&q=80&fm=webp",

  // Dashboard and features - optimized for web
  dashboardExample:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60&fm=webp",
  aiTools:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=60&fm=webp",
  aiTools2:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=60&fm=webp",
  cuttingEdgeFeatures:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=60&fm=webp",

  // Products - compressed for faster loading
  nfcKeychain:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60&fm=webp",

  // Team - optimized size
  teamMembers:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=60&fm=webp",

  // Vite default - small optimized version
  viteSvg:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&q=80&fm=webp",
};

// Function to upload an image to Supabase storage
export async function uploadImage(
  file: File,
  fileName: string,
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    return `${getStorageUrl()}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Function to get public URL for an image
export function getImageUrl(fileName: string): string {
  return `${getStorageUrl()}/${fileName}`;
}

// Function to delete an image from Supabase storage
export async function deleteImage(fileName: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

// Function to list all images in the bucket
export async function listImages(): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).list();

    if (error) {
      console.error("Error listing images:", error);
      return [];
    }

    return data?.map((file) => file.name) || [];
  } catch (error) {
    console.error("Error listing images:", error);
    return [];
  }
}
