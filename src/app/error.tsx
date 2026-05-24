"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="text-5xl">⚠️</span>
      <h2 className="text-2xl font-semibold text-gray-800">Algo correu mal</h2>
      <p className="text-gray-500 max-w-md">
        Ocorreu um erro inesperado. Por favor tente novamente.
      </p>
      <button
        onClick={reset}
        className="rounded bg-primary px-6 py-2 text-white hover:bg-[#e3791e] transition-colors"
      >
        Tentar novamente
      </button>
    </main>
  );
}
