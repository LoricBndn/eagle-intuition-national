'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type Newsletter = {
  id: string
  email: string;
  category: string;
  createdAt: Date;
};

interface ExportCSVButtonProps {
  data: Newsletter[];
}

export default function ExportCSVButton({ data }: ExportCSVButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    try {
      const header = ['email', 'category', 'createdAt'];
      const rows = data.map(n =>
        [n.email, n.category, new Date(n.createdAt).toLocaleString()].join(',')
      );
      const csvContent = [header.join(','), ...rows].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'newsletters.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="hover:bg-[#e3791e] text-white bg-primary cursor-pointer py-2 px-6 rounded-md flex items-center gap-2"
      disabled={loading}
      aria-label="Exporter les emails de la newsletter au format CSV"
    >
      <span className="hidden md:inline">
        {loading ? 'Exportando...' : 'Exportar para CSV'}
      </span>
      <Send className="w-4 h-4" />
    </button>
  );
}
