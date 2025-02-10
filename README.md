# Simple Virtualization Component for React

## Overview

The Simple Virtualization Component for React is a high-performance rendering solution designed to efficiently handle large lists of items by only rendering the items currently visible in the viewport. This approach significantly improves performance and memory usage when dealing with extensive lists or dynamic content.

## Features

- **Dynamic Rendering**: Renders only the items currently visible in the viewport
- **Variable Height Support**: Automatically measures and adjusts to items of different heights
- **Efficient Scrolling**: Optimized scroll handling with minimal performance overhead
- **Flexible Item Types**: Supports multiple item types including:
  - Strings
  - React Elements
  - Functional Components
  - Custom Components with Props

## Installation

Install the component using npm or yarn:

```bash
npm install simple-virtualization
# or
yarn add simple-virtualization
```

## Usage

### Basic Example

```typescript
import { Virtualization } from 'simple-virtualization';

function App() {
  const items = [
    'Item 1', 
    'Item 2', 
    <CustomComponent key="3" />,
    ({ index }) => <DynamicComponent index={index} />
  ];

  return (
    <Virtualization 
      items={items} 
      className="my-list"
      itemClassName="list-item"
    />
  );
}
```

## Props

### `TVirtualization`

| Prop Name | Type | Description | Default |
|-----------|------|-------------|---------|
| `items` | `Array` | List of items to render | Required |
| `className` | `string` | CSS class for the container | `''` |
| `itemClassName` | `string` | CSS class for each item | `''` |
| `style` | `React.CSSProperties` | Custom styles for the container | `undefined` |
| `itemStyle` | `React.CSSProperties` | Custom styles for each item | `undefined` |

### Supported Item Types

1. **Strings**: Plain text content
   ```typescript
   const items = ['Hello', 'World'];
   ```

2. **React Elements**: Direct React components
   ```typescript
   const items = [<div>First</div>, <span>Second</span>];
   ```

3. **Functional Components**: Components with optional index
   ```typescript
   const items = [
     ({ index }) => <div>Item {index}</div>
   ];
   ```

4. **Custom Components**: Components with additional props
   ```typescript
   const items = [
     {
       component: ({ index, customProp }) => <div>{customProp}</div>,
       props: { customProp: 'Hello' }
     }
   ];
   ```

## How It Works

The Virtualization component uses several optimization techniques:

- **Dynamic Height Measurement**: Calculates and caches item heights
- **Binary Search for Positioning**: Efficiently finds the correct items to render
- **Scroll Direction Detection**: Adapts rendering based on scroll direction
- **Intelligent Buffering**: Renders extra items beyond the viewport for smooth scrolling

## Performance Considerations

- Ideal for lists with 100+ items
- Supports variable-height items
- Minimizes DOM manipulation
- Reduces memory usage for large lists

## Limitations

- Requires initial render to measure item heights
- Best suited for relatively uniform item sizes
- May have slight performance overhead for very small lists

## Advanced Configuration

### Custom Styling

```typescript
<Virtualization 
  items={items}
  style={{ maxHeight: '500px' }}
  itemStyle={{ 
    padding: '10px', 
    borderBottom: '1px solid #eee' 
  }}
/>
```

## TypeScript Support

Full TypeScript support is provided with comprehensive type definitions.

## Browser Compatibility

Compatible with modern browsers supporting React and ES6 features.

## Contributing

Contributions are welcome! Please submit pull requests or open issues on our GitHub repository.

## License

MIT License

## Contact

For support or questions, please open an issue on the project repository.