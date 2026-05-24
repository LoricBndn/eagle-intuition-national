import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="text-6xl font-bold text-primary">404</span>
      <h1 className="text-2xl font-semibold text-gray-800">Página não encontrada</h1>
      <p className="text-gray-500 max-w-md">
        A página que procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="rounded bg-primary px-6 py-2 text-white hover:bg-[#e3791e] transition-colors"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
