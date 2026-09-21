# Button

Primary action trigger for forms, dialogs, and page actions. Supports three visual variants and disabled state.

## Usage

```jsx
<Button variant="primary" onClick={() => alert('Clicked!')}>
  Create Page
</Button>

<Button variant="secondary">Edit</Button>
<Button variant="outline" disabled>Delete</Button>
```

## Variants

- **primary**: Main CTA, accent blue background
- **secondary**: Soft bg, secondary actions
- **outline**: Bordered only, transparent bg
