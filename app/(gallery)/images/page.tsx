import ImageGrid from "@/components/ImageGrid";
import { getImage } from "@/services/apiServices/imageService";
import { instance } from "@/services/axios";

export default async function ImagePage() {
  const getImageRes = await instance(getImage({params: { page: 1, limit: 20 }}));
  const initialImages = getImageRes.data;

  return (
    <main className="min-h-screen w-[100vw] bg-teal-900 p-4">
      <ImageGrid initialImages={initialImages} />
    </main>
  );
}
