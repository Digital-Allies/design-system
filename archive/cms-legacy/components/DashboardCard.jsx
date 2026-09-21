export function DashboardCard({ title, value, label, trend = 0 }) {
  return React.createElement('div', { className: 'cms-stat', style: { border: '1px solid var(--cms-border)', padding: 'var(--space-5)' } },
    React.createElement('div', { className: 'cms-stat__label' }, label),
    React.createElement('div', { className: 'cms-stat__number' }, value),
    trend !== 0 && React.createElement('div', {
      style: { fontSize: '12px', color: trend > 0 ? '#1F8A5B' : '#C5301A', marginTop: '4px' }
    }, (trend > 0 ? '+' : '') + trend + '%')
  );
}
Object.assign(window, { DashboardCard });
