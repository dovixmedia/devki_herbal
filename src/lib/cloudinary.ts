export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
};

export function getCloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number; crop?: string }
) {
  const { width, height, crop = 'fill' } = options || {};
  const base = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  const opts = [crop];
  if (width) opts.push(`w_${width}`);
  if (height) opts.push(`h_${height}`);
  return `${base}/${opts.join(',')}/${publicId}`;
}
