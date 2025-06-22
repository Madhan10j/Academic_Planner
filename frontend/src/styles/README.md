# CSS Structure Documentation

This directory contains the organized CSS structure for the Academic Planner application.

## File Structure

```
styles/
├── index.css          # Main styles index (imports all styles)
├── App.css            # Base styles, layout, and component styles
└── pages/             # Page-specific styles
    ├── Tasks.css      # Tasks page styles
    ├── Dashboard.css  # Dashboard page styles
    ├── Timetable.css  # Timetable page styles
    ├── Auth.css       # Authentication pages styles (Login/Register)
    └── Profile.css    # Profile page styles
```

## Usage

### Importing Styles

The main entry point is `index.css` which imports all the necessary styles:

```javascript
// In main.jsx
import './styles/index.css';
```

### Adding New Page Styles

1. Create a new CSS file in the `pages/` directory
2. Add the import to `index.css`
3. Use the page-specific classes in your components

### CSS Organization

#### Base Styles (`App.css`)
- CSS Variables (colors, spacing, typography)
- Reset and base styles
- Layout components (header, sidebar, main content)
- Common components (buttons, forms, modals)
- Utility classes
- Responsive breakpoints
- Animations and transitions

#### Page-Specific Styles (`pages/*.css`)
- Page layout and structure
- Page-specific components
- Page-specific responsive design
- Page-specific animations

## CSS Variables

The application uses CSS custom properties for consistent theming:

### Colors
- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary brand color
- `--color-accent`: Accent color
- `--color-bg`: Background color
- `--color-text`: Text color
- `--color-border`: Border color

### Spacing
- `--space-xs`: 0.25rem
- `--space-sm`: 0.5rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 2rem
- `--space-2xl`: 3rem

### Typography
- `--text-xs`: 0.75rem
- `--text-sm`: 0.875rem
- `--text-base`: 1rem
- `--text-lg`: 1.125rem
- `--text-xl`: 1.25rem
- `--text-2xl`: 1.5rem
- `--text-3xl`: 1.875rem
- `--text-4xl`: 2.25rem

## Responsive Design

The application uses mobile-first responsive design with these breakpoints:

- **Mobile**: < 700px
- **Tablet**: 700px - 900px
- **Desktop**: 900px - 1200px
- **Large Desktop**: > 1200px

## Best Practices

1. **Use CSS Variables**: Always use CSS custom properties for colors, spacing, and typography
2. **Mobile-First**: Write styles for mobile first, then enhance for larger screens
3. **Component-Based**: Keep styles organized by component/page
4. **Consistent Naming**: Use BEM-like naming conventions for CSS classes
5. **Performance**: Minimize CSS specificity and avoid deep nesting

## Dark Mode Support

The application includes automatic dark mode support using `prefers-color-scheme` media query. CSS variables automatically switch between light and dark themes. 