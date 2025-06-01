import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET() {
  const newsletters = await prisma.newsletter.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const header = ['Email', 'Date de création'];
  const rows = newsletters.map(n => [
    n.email,
    n.createdAt.toISOString(),
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(r => r.map(field => `"${field.replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="newsletters.csv"',
    },
  });
}
