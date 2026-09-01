export function Button({ children, variant = 'primary', disabled = false, ...props }) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    fontSize: 'var(--fs-base)',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    border: 'var(--border-1)',
    borderRadius: 'var(--radius-1)',
    transition: `all var(--dur-quick)`,
    minWidth: 100,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      ...baseStyles,
      background: 'var(--color-accent)',
      color: '#fff',
      borderColor: 'var(--color-accent)',
    },
    secondary: {
      ...baseStyles,
      background: 'var(--color-bg-alt)',
      borderColor: 'var(--color-charcoal)',
      color: 'var(--color-fg)',
    },
    outline: {
      ...baseStyles,
      background: 'transparent',
      borderColor: 'var(--color-charcoal)',
      color: 'var(--color-fg)',
    },
  };

  return (
    <button style={variants[variant]} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
