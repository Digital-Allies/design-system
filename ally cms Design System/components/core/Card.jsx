export function Card({ children, ...props }) {
  return (
    <div
      style={{
        background: 'var(--color-bg)',
        border: 'var(--border-1)',
        borderRadius: 'var(--radius-1)',
        padding: 'var(--space-6)',
        transition: `transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
