import type { ImageMetadata } from "astro";

export async function getAlbumImages(albumId: string) {
  // 1. Glob all images in the albums directory
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/albums/**/*.{jpeg,jpg,png}",
    { eager: false }
  );
  console.log("All matched files:", Object.keys(images));
  console.log("Filtered for albumId:", albumId);

  // 2. Filter images by albumId folder
  const filteredImages = Object.entries(images).filter(([key]) =>
    key.includes(`/albums/${albumId}/`)
  );

  // 3. Resolve the glob promises
  const resolvedImages = await Promise.all(
    filteredImages.map(async ([, image]) => {
      const mod = await image();
      return mod.default;
    })
  );

  // 4. Shuffle images
  resolvedImages.sort(() => Math.random() - 0.5);

  return resolvedImages;
}
