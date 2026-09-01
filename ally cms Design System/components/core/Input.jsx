export function Input({ label, error, disabled = false, ...props }) {
  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: 'var(--space-2)',
          fontSize: 'var(--fs-sm)',
          fontWeight: 600,
          color: 'var(--color-fg)',
        }}>
          {label}
        </label>
      )}
      <input
        style={{
          display: 'block',
          width: '100%',
          padding: '10px 12px',
          fontSize: 'var(--fs-base)',
          fontFamily: 'var(--font-body)',
          background: 'var(--color-bg)',
          border: error ? '1px solid var(--color-signal)' : 'var(--border-1)',
          borderRadius: 'var(--radius-1)',
          color: 'var(--color-fg)',
          transition: `border-color var(--dur-quick)`,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        disabled={disabled}
        {...props}
      />
      {error && (
        <div style={{
          marginTop: 'var(--space-2)',
          fontSize: 'var(--fs-xs)',
          color: 'var(--color-signal)',
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
