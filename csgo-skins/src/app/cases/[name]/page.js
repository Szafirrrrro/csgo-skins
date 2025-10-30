const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default async function CaseDetail({ params }) {
  const { name } = await params; // ✅ unwrap params
  const res = await fetch(`${API_BASE}/cases/${name}`, { cache: 'no-store' });
  if (!res.ok) return <div>Case not found</div>;
  const data = await res.json();

  return (
    <div style={{ padding: 40 }}>
      <h1>{data.displayName}</h1>
      <img src={data.banner} alt={data.displayName} style={{ maxWidth: 500 }} />
      <p>Price: {parseFloat(data.price).toFixed(2)}zł</p>
    </div>
  );
}
