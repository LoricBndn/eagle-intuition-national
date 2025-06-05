import { importVideos } from "@/lib/importVideos";

async function main() {
  try {
    await importVideos();
    console.log("Import terminé avec succès !");
  } catch (e) {
    console.error("Erreur pendant l'import :", e);
  }
}

main();
