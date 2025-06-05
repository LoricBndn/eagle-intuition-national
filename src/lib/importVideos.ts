import fetch from "node-fetch";
import { createVideo } from "@/lib/actions";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCfNvmUI9Zi2EjDMDavZqA7A";

async function getUploadsPlaylistId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as any;
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function getVideosFromPlaylist(playlistId: string) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as any;
  return data.items.map((item: any) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    imageUrl: item.snippet.thumbnails.high.url,
  }));
}

export async function importVideos() {
  const playlistId = await getUploadsPlaylistId();
  const videos = await getVideosFromPlaylist(playlistId);

  for (const video of videos) {
    const formData = new FormData();
    formData.set("title", video.title);
    formData.set("url", video.url);
    formData.set("imageUrl", video.imageUrl);

    await createVideo(null, formData);
  }
}
