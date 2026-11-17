export default function Spinner({ label = 'Loading' }) {
  return (
    <div role="status" className="flex items-center gap-3 py-10 text-ash">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-ink" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
