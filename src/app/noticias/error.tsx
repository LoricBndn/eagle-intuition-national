"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NoticiasError({
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
      <h2 className="text-2xl font-semibold text-gray-800">Erro ao carregar notícias</h2>
      <p className="text-gray-500">Não foi possível carregar as publicações.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded bg-primary px-6 py-2 text-white hover:bg-[#e3791e] transition-colors"
        >
          Tentar novamente
        </button>
        <Link href="/" className="rounded border border-gray-300 px-6 py-2 text-gray-600 hover:bg-gray-50 transition-colors">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
