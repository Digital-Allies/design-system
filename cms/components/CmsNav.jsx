export function CmsNav({ items = [], active = 'dashboard', onSelect = () => {} }) {
  return React.createElement('nav', { className: 'cms-nav', style: { display: 'flex', flexDirection: 'column', gap: 0 } },
    items.map(item =>
      React.createElement('button', {
        key: item.id,
        className: 'cms-navitem' + (item.id === active ? ' active' : ''),
        onClick: () => onSelect(item.id),
        style: { background: 'none', border: 'none', textAlign: 'left', fontFamily: 'inherit' }
      },
        item.icon && React.createElement('span', { dangerouslySetInnerHTML: { __html: item.icon } }),
        React.createElement('span', {}, item.label)
      )
    )
  );
}
Object.assign(window, { CmsNav });
