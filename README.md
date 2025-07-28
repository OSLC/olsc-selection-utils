# OSLC Selection Utils

[![CI/CD Pipeline](https://github.com/OSLC/oslc-selection-utils/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/OSLC/oslc-selection-utils/actions/workflows/ci-cd.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-github%20pages-blue)](https://OSLC.github.io/olsc-selection-utils/)
[![npm package](https://img.shields.io/badge/npm-@oslc/selection--webcomponent-red)](https://github.com/OSLC/oslc-selection-utils/packages)

A comprehensive toolkit for implementing OSLC Selection dialogs in web applications, featuring modern Web Components with extensive styling capabilities.

## 🚀 Quick Start

### Using the Published Packages

```bash
# Configure npm for GitHub registry
npm config set @oslc:registry https://npm.pkg.github.com

# Install the components
npm install @oslc/postmessage-helper @oslc/selection-webcomponent
```

### Direct HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="https://cdn.jsdelivr.net/gh/OSLC/olsc-selection-utils@main/src/oslc-selection-demo/vendor/@oslc/oslc-selection-webcomponent/index.browser.js"></script>
</head>
<body>
    <oslc-selection-button 
        dialog-url="https://your-oslc-server/selector"
        dialog-title="Select Resources"
        button-text="Browse Resources">
    </oslc-selection-button>
    
    <script>
        document.querySelector('oslc-selection-button')
            .addEventListener('oslc-selection-made', (event) => {
                console.log('Selected resources:', event.detail.resources);
            });
    </script>
</body>
</html>
```

## 📦 Components

### 1. OSLC PostMessage Helper (`@oslc/postmessage-helper`)

A TypeScript utility for handling OSLC postMessage communication in delegated UIs.

**Features:**
- Type-safe postMessage handling
- OSLC Core 3.0 compliant
- Support for selection and creation dialogs
- Comprehensive error handling

### 2. OSLC Selection WebComponent (`@oslc/selection-webcomponent`)

A modern Web Component for OSLC selection dialogs with extensive styling support.

**Features:**
- Standards-based Custom Element
- Extensive CSS customization via custom properties
- Built-in dialog management
- Event-driven architecture
- Framework agnostic

## 🎨 Styling

The selection webcomponent supports comprehensive styling through CSS custom properties:

```css
.my-theme {
    --oslc-button-background: #007bff;
    --oslc-button-color: white;
    --oslc-button-border-radius: 4px;
    --oslc-button-padding: 8px 16px;
    --oslc-button-hover-background: #0056b3;
    --oslc-button-transition: all 0.3s ease;
}
```

See the [live demo](https://OSLC.github.io/olsc-selection-utils/) for comprehensive styling examples.

## 🛠️ Development

### Prerequisites

- Node.js 22+
- PowerShell 7+ (for Windows scripts)

### GitHub Registry

Packages are published to:
- `https://npm.pkg.github.com/@oslc/postmessage-helper`
- `https://npm.pkg.github.com/@oslc/selection-webcomponent`

### Demo Deployment

Live demo automatically deployed to: https://OSLC.github.io/olsc-selection-utils/

## 📖 Documentation

- **[Live Demo](https://OSLC.github.io/olsc-selection-utils/)** - Interactive examples and styling showcase
- **[Component Documentation](src/oslc-postmessage-helper/README.md)** - PostMessage Helper API
- **[WebComponent Documentation](src/oslc-selection-webcomponent/README.md)** - Selection WebComponent API

## 🔧 API Reference

### PostMessage Helper

```typescript
import { OslcPostMessageHelper } from '@oslc/postmessage-helper';

const helper = new OslcPostMessageHelper();
helper.onSelectionMade = (resources) => {
    console.log('Selected:', resources);
};
```

### Selection WebComponent

```javascript
// Programmatic usage
const button = document.createElement('oslc-selection-button');
button.dialogUrl = 'https://your-server/selector';
button.dialogTitle = 'Select Items';
button.buttonText = 'Browse';

button.addEventListener('oslc-selection-made', (event) => {
    const resources = event.detail.resources;
    // Handle selection
});
```

## 🔍 Examples

### Basic Selection

```html
<oslc-selection-button 
    dialog-url="https://rm.example.com/selector"
    dialog-title="Select Requirements"
    button-text="Choose Requirements">
</oslc-selection-button>
```

### Styled Selection

```html
<oslc-selection-button 
    dialog-url="https://rm.example.com/selector"
    dialog-title="Select Requirements"
    button-text="Choose Requirements"
    class="my-custom-theme">
</oslc-selection-button>

<style>
.my-custom-theme {
    --oslc-button-background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    --oslc-button-border-radius: 25px;
    --oslc-button-padding: 12px 24px;
}
</style>
```

### Event Handling

```javascript
document.addEventListener('oslc-selection-made', (event) => {
    const resources = event.detail.resources;
    
    resources.forEach(resource => {
        console.log(`Selected: ${resource['oslc:label']}`);
        console.log(`URI: ${resource['rdf:resource']}`);
    });
});
```

## License

This project is licensed under the Eclipse Public License 2.0.
