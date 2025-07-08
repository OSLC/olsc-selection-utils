# OSLC Selection Utils

[![CI/CD Pipeline](https://github.com/OSLC/olsc-selection-utils/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/OSLC/olsc-selection-utils/actions/workflows/ci-cd.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-github%20pages-blue)](https://OSLC.github.io/olsc-selection-utils/)
[![npm package](https://img.shields.io/badge/npm-@oslc/selection--webcomponent-red)](https://github.com/OSLC/olsc-selection-utils/packages)

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

- Node.js 16+ and npm 7+
- PowerShell 7+ (for Windows scripts)

### Build Process

```bash
# Clone the repository
git clone https://github.com/OSLC/olsc-selection-utils.git
cd olsc-selection-utils

# Install dependencies
npm run install:all

# Build all components
npm run build

# Run local demo
npm run serve:demo
```

### Testing

```bash
# Run local CI simulation
npm run test:ci

# Run with verbose output
npm run test:ci:verbose
```

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for automated building, testing, and deployment:

### Automatic Processes

- **On every push/PR**: Run tests and build validation
- **On push to main**: Publish packages to GitHub NPM registry
- **On push to main**: Deploy demo to GitHub Pages
- **On release**: Publish versioned packages with release artifacts

### GitHub Registry

Packages are published to:
- `https://npm.pkg.github.com/@oslc/postmessage-helper`
- `https://npm.pkg.github.com/@oslc/selection-webcomponent`

### Demo Deployment

Live demo automatically deployed to: https://OSLC.github.io/olsc-selection-utils/

## 📖 Documentation

- **[Live Demo](https://OSLC.github.io/olsc-selection-utils/)** - Interactive examples and styling showcase
- **[CI/CD Documentation](.github/README.md)** - Detailed GitHub Actions setup
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

## 🎯 Use Cases

### Enterprise Applications

- **Requirements Management**: Select linked requirements
- **Test Management**: Choose test cases and test plans
- **Project Management**: Link work items and deliverables
- **Asset Management**: Select related assets and resources

### Integration Scenarios

- **JSP/Servlet Applications**: Drop-in component for legacy systems
- **Modern SPAs**: Framework-agnostic web component
- **Microservices**: Standardized selection interface
- **API Integration**: Consistent OSLC-compliant selection

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:ci`
5. Submit a pull request

## 📝 License

This project is licensed under the Eclipse Public License 1.0 OR Eclipse Distribution License 1.0.

## 🔗 Links

- **Demo**: https://OSLC.github.io/olsc-selection-utils/
- **GitHub**: https://github.com/OSLC/olsc-selection-utils
- **Issues**: https://github.com/OSLC/olsc-selection-utils/issues
- **OSLC Community**: https://oslc.org
- **Registry**: https://github.com/OSLC/olsc-selection-utils/packages
