'use client';

export default function ExportCSVButton() {
  const handleExport = () => {
    window.open('/api/newsletters/export');
  };

  return (
    <button
      onClick={handleExport}
      className="cursor-pointer rounded-md border px-4 py-2 hover:bg-gray-100"
    >
      Exportar para CSV
    </button>
  );
}
