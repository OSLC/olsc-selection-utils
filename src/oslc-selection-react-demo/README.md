# OSLC Selection WebComponent - React Demo

This is a React-based demo showcasing the integration of the OSLC Selection WebComponent with modern React development practices.

## Features

- **React Integration**: Demonstrates how to use the OSLC Selection WebComponent in React applications
- **State Management**: Uses React hooks for managing selection state
- **Event Handling**: Proper cleanup of event listeners
- **Styling Examples**: Showcases various CSS custom property themes
- **Hot Reloading**: Vite development server with instant updates
- **TypeScript Support**: Full TypeScript support for better development experience

## Prerequisites

Before running this demo, you need to build the OSLC components:

```bash
# From the root directory
npm run build
```

## Installation

```bash
# Navigate to the React demo directory
cd src/oslc-selection-react-demo

# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

The demo will be available at `http://localhost:3000`

## Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Key Integration Points

### 1. Importing the Web Component

```javascript
import '@oslc/oslc-selection-webcomponent'
```

### 2. Using the Component in React

```jsx
import React, { useRef, useEffect } from 'react'

function MyComponent() {
  const buttonRef = useRef(null)
  
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute('dialog-url', 'your-oslc-url')
    }
  }, [])

  return (
    <oslc-selection-button 
      ref={buttonRef}
      dialog-title="Select Resources"
      button-text="Browse Items">
    </oslc-selection-button>
  )
}
```

### 3. Handling Selection Events

```jsx
useEffect(() => {
  const handleSelection = (event) => {
    const resources = event.detail.resources
    console.log('Selected:', resources)
  }

  document.addEventListener('oslc-selection-made', handleSelection)
  return () => {
    document.removeEventListener('oslc-selection-made', handleSelection)
  }
}, [])
```

## Styling

The demo includes various CSS custom property themes that can be applied to the OSLC Selection WebComponent:

- Material Design
- Bootstrap Style
- Rounded Theme
- Dark Theme
- Outline Theme
- Success Theme
- Large Theme
- Compact Theme
- Animated Theme

## Project Structure

```
src/oslc-selection-react-demo/
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── LiveDemo.jsx
│   │   ├── ResultsSection.jsx
│   │   ├── StylingExamples.jsx
│   │   ├── IntegrationExamples.jsx
│   │   ├── BuildInstructions.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Dependencies

- React 18.2.0
- React DOM 18.2.0
- Vite 5.0.8
- @oslc/oslc-selection-webcomponent (local dependency)
- Bootstrap 5.3.3 (CDN)

## Browser Support

This demo requires modern browsers that support:
- ES6 modules
- Custom Elements
- CSS Custom Properties
- React 18 features 