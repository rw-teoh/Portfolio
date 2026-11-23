export default function LockedCard({ label = 'Locked' }: { label?: string }) {
  return (
    <div className="locked-card" aria-label={label}>
      <span className="locked-icon">🔒</span>
      <span>{label}</span>
    </div>
  );
}