/**
 * Image optimization utilities
 */

// Generate optimized CDN URLs with aggressive compression
export const getOptimizedImageUrl = (
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
    fit?: "crop" | "fill" | "scale";
  } = {},
) => {
  const {
    width = 400,
    height,
    quality = 60,
    format = "webp",
    fit = "crop",
  } = options;

  if (baseUrl.includes("unsplash.com")) {
    const params = new URLSearchParams();
    params.set("w", width.toString());
    if (height) params.set("h", height.toString());
    params.set("q", quality.toString());
    params.set("fm", format);
    params.set("fit", fit);

    return `${baseUrl}?${params.toString()}`;
  }

  return baseUrl;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map(preloadImage));
};

// Generate responsive image srcset with smaller sizes for faster loading
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [300, 400, 600, 800],
): string => {
  if (!baseUrl.includes("unsplash.com")) return "";

  return sizes
    .map(
      (size) =>
        `${getOptimizedImageUrl(baseUrl, { width: size, quality: 60 })} ${size}w`,
    )
    .join(", ");
};

// Get appropriate sizes attribute
export const getSizesAttribute = (
  breakpoints: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  } = {},
): string => {
  const { mobile = "100vw", tablet = "50vw", desktop = "33vw" } = breakpoints;

  return `(max-width: 768px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
};
