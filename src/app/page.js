import CaseCard from '@/components/Cases/CaseCard';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default async function CasesPage() {
  const res = await fetch(`${API_BASE}/cases`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load cases');
  const cases = await res.json();

  const gridStyle = 
  {
    maxWidth: '1440px',       // or '100%' if you don't want a hard cap
    margin: '0 auto',
    padding: '32px 24px 60px',
    display: 'grid',
    gap: '28px 26px',
    // auto-fit collapses empty tracks so columns change with space
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    justifyItems: 'center',
  };

  return (
    <div>
      <div style={gridStyle}>
        {cases.map((c) => (
          <CaseCard key={c.name} data={c} />
        ))}
      </div>
    </div>
  );
}
