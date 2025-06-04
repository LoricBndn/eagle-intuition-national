import { Trash2 } from "lucide-react";
import { deleteVideo } from "@/lib/actions";

export function DeleteVideo({ id }: { id: string }) {
  const deleteVideoWithId = deleteVideo.bind(null, id);

  return (
    <form action={deleteVideoWithId}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}