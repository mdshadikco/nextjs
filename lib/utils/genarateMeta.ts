// lib/metadata.ts
import { Metadata } from "next";

interface GenerateMetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export const createMetadata = ({
  title = "Default Title",
  description = "Default description for the page.",
  keywords = ["nextjs", "default", "app"],
  image = "/default-og.png",
  url = "https://image-gallery.com",
}: GenerateMetaOptions = {}): Metadata => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url,
    },
  };
};
