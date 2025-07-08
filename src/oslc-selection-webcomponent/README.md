# @oslc/selection-webcomponent

A modern web component for OSLC selection dialogs using standard HTML dialog elements and iframe communication.

## Features

- ✅ Standard HTML `<dialog>` element for modal display
- ✅ OSLC postMessage protocol support
- ✅ TypeScript with full type safety
- ✅ Shadow DOM encapsulation
- ✅ Customizable styling
- ✅ Event-driven architecture
- ✅ Accessibility support

## Installation

```bash
npm install @oslc/selection-webcomponent
```

## Usage

### Basic HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import '@oslc/selection-webcomponent';
    </script>
</head>
<body>
    <oslc-selection-button 
        dialog-url="http://localhost:8080/selection" 
        dialog-title="Select Requirements"
        button-text="Select Resources"
        button-class="btn btn-primary">
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

### JavaScript/TypeScript Usage

```typescript
import { OslcSelectionButton } from '@oslc/selection-webcomponent';

// Create programmatically
const selectionButton = new OslcSelectionButton();
selectionButton.dialogUrl = 'http://localhost:8080/selection';
selectionButton.dialogTitle = 'Select Requirements';
selectionButton.buttonText = 'Choose Items';

// Listen for selections
selectionButton.addEventListener('oslc-selection-made', (event) => {
    const resources = event.detail.resources;
    resources.forEach(resource => {
        console.log(`Selected: ${resource['oslc:label']} (${resource['rdf:resource']})`);
    });
});

// Listen for cancellation
selectionButton.addEventListener('oslc-selection-cancelled', (event) => {
    console.log('Selection cancelled:', event.detail.reason);
});

document.body.appendChild(selectionButton);
```

### Using in JSP (No Build Required)

```jsp
<%@ page contentType="text/html" %>
<!DOCTYPE html>
<html>
<head>
    <title>OSLC Selection Demo</title>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@oslc/selection-webcomponent/dist/index.esm.js"></script>
</head>
<body>
    <h1>Select OSLC Resources</h1>
    
    <oslc-selection-button 
        dialog-url="${pageContext.request.contextPath}/services/requirements/selector"
        dialog-title="Select Requirements"
        button-text="Browse Requirements"
        button-class="btn btn-secondary">
    </oslc-selection-button>

    <div id="selected-resources"></div>

    <script>
        document.querySelector('oslc-selection-button')
            .addEventListener('oslc-selection-made', function(event) {
                const container = document.getElementById('selected-resources');
                container.innerHTML = '<h2>Selected Resources:</h2><ul></ul>';
                const list = container.querySelector('ul');
                
                event.detail.resources.forEach(function(resource) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = resource['rdf:resource'];
                    a.textContent = resource['oslc:label'];
                    li.appendChild(a);
                    list.appendChild(li);
                });
            });
    </script>
</body>
</html>
```

## API Reference

### Attributes

- `dialog-url` - URL of the OSLC selection dialog
- `dialog-title` - Title displayed in the modal header (default: "Select Resources")
- `button-text` - Text displayed on the button (default: "Select Resources")
- `button-class` - CSS classes to apply to the button

### Properties

- `dialogUrl: string` - Get/set the dialog URL
- `dialogTitle: string` - Get/set the dialog title
- `buttonText: string` - Get/set the button text
- `buttonClass: string` - Get/set the button CSS class

### Events

#### `oslc-selection-made`

Fired when resources are selected in the dialog.

```typescript
interface OslcSelectionEventDetail {
  resources: OslcResource[];
}
```

#### `oslc-selection-cancelled`

Fired when the dialog is cancelled or closed without selection.

```typescript
interface OslcSelectionCancelledEventDetail {
  reason: string;
}
```

### Styling

The component uses Shadow DOM for style encapsulation while providing extensive CSS custom properties for external styling. You can customize virtually every aspect of the component's appearance:

#### Button Styling

```css
oslc-selection-button {
    /* Button container */
    --oslc-button-display: inline-block;
    --oslc-button-margin: 10px 0;
    
    /* Button appearance */
    --oslc-button-padding: 12px 24px;
    --oslc-button-border: 2px solid #007bff;
    --oslc-button-border-radius: 6px;
    --oslc-button-background: #007bff;
    --oslc-button-color: white;
    --oslc-button-font-family: 'Segoe UI', system-ui;
    --oslc-button-font-size: 16px;
    --oslc-button-font-weight: 600;
    --oslc-button-transition: all 0.3s ease;
    --oslc-button-min-width: 150px;
    
    /* Button states */
    --oslc-button-hover-background: #0056b3;
    --oslc-button-hover-border-color: #0056b3;
    --oslc-button-hover-transform: translateY(-1px);
    --oslc-button-active-background: #004085;
    --oslc-button-focus-outline: 2px solid #80bdff;
    --oslc-button-focus-outline-offset: 2px;
    
    /* Disabled state */
    --oslc-button-disabled-background: #e9ecef;
    --oslc-button-disabled-color: #6c757d;
    --oslc-button-disabled-opacity: 0.65;
}
```

#### Dialog Styling

```css
oslc-selection-button {
    /* Dialog container */
    --oslc-dialog-width: 900px;
    --oslc-dialog-height: 700px;
    --oslc-dialog-max-width: 95vw;
    --oslc-dialog-max-height: 95vh;
    --oslc-dialog-border: 1px solid #dee2e6;
    --oslc-dialog-border-radius: 12px;
    --oslc-dialog-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    --oslc-dialog-background: #ffffff;
    --oslc-dialog-animation: slideIn 0.3s ease;
    
    /* Dialog backdrop */
    --oslc-dialog-backdrop-background: rgba(0, 0, 0, 0.6);
    --oslc-dialog-backdrop-filter: blur(3px);
    
    /* Dialog header */
    --oslc-dialog-header-padding: 20px 24px;
    --oslc-dialog-header-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --oslc-dialog-header-border-bottom: none;
    --oslc-dialog-header-border-radius: 12px 12px 0 0;
    
    /* Dialog title */
    --oslc-dialog-title-font-size: 1.5rem;
    --oslc-dialog-title-font-weight: 600;
    --oslc-dialog-title-color: white;
    --oslc-dialog-title-font-family: 'Segoe UI', system-ui;
    
    /* Close button */
    --oslc-close-button-color: white;
    --oslc-close-button-hover-background: rgba(255, 255, 255, 0.1);
    --oslc-close-button-border-radius: 50%;
    --oslc-close-button-transition: all 0.2s ease;
    
    /* Content area */
    --oslc-dialog-content-background: #f8f9fa;
    --oslc-iframe-border-radius: 0 0 12px 12px;
    
    /* Loading state */
    --oslc-loading-color: #495057;
    --oslc-loading-font-size: 1.1rem;
    --oslc-loading-background: #f8f9fa;
}
```

#### Theming Examples

**Material Design Theme:**
```css
oslc-selection-button.material {
    --oslc-button-border-radius: 4px;
    --oslc-button-background: #1976d2;
    --oslc-button-padding: 8px 16px;
    --oslc-button-font-weight: 500;
    --oslc-button-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    --oslc-dialog-border-radius: 4px;
    --oslc-dialog-box-shadow: 0 11px 15px -7px rgba(0,0,0,0.2);
}
```

**Bootstrap Theme:**
```css
oslc-selection-button.bootstrap {
    --oslc-button-border-radius: 0.375rem;
    --oslc-button-padding: 0.375rem 0.75rem;
    --oslc-button-font-size: 1rem;
    --oslc-button-border: 1px solid transparent;
    --oslc-dialog-border-radius: 0.5rem;
}
```

**Dark Theme:**
```css
oslc-selection-button.dark {
    --oslc-button-background: #495057;
    --oslc-button-color: #ffffff;
    --oslc-button-border: 1px solid #6c757d;
    --oslc-dialog-background: #343a40;
    --oslc-dialog-header-background: #495057;
    --oslc-dialog-title-color: #ffffff;
    --oslc-close-button-color: #ffffff;
    --oslc-dialog-content-background: #343a40;
}
```

#### CSS Custom Properties Reference

All available CSS custom properties with their default values:

| Property | Default | Description |
|----------|---------|-------------|
| `--oslc-button-display` | `inline-block` | Button container display |
| `--oslc-button-margin` | `0` | Button container margin |
| `--oslc-button-padding` | `8px 16px` | Button internal padding |
| `--oslc-button-border` | `1px solid #ccc` | Button border |
| `--oslc-button-border-radius` | `4px` | Button border radius |
| `--oslc-button-background` | `#f8f9fa` | Button background color |
| `--oslc-button-color` | `#333` | Button text color |
| `--oslc-button-font-family` | `inherit` | Button font family |
| `--oslc-button-font-size` | `inherit` | Button font size |
| `--oslc-button-font-weight` | `normal` | Button font weight |
| `--oslc-button-transition` | `all 0.2s ease` | Button transition |
| `--oslc-button-min-width` | `auto` | Button minimum width |
| `--oslc-button-min-height` | `auto` | Button minimum height |
| `--oslc-button-hover-background` | `#e9ecef` | Button hover background |
| `--oslc-button-hover-border-color` | `#adb5bd` | Button hover border color |
| `--oslc-button-hover-color` | `inherit` | Button hover text color |
| `--oslc-button-hover-transform` | `none` | Button hover transform |
| `--oslc-button-active-background` | `#dee2e6` | Button active background |
| `--oslc-button-active-color` | `inherit` | Button active text color |
| `--oslc-button-active-transform` | `none` | Button active transform |
| `--oslc-button-disabled-background` | `#f8f9fa` | Button disabled background |
| `--oslc-button-disabled-color` | `#6c757d` | Button disabled text color |
| `--oslc-button-disabled-opacity` | `0.65` | Button disabled opacity |
| `--oslc-button-focus-outline` | `2px solid #007bff` | Button focus outline |
| `--oslc-button-focus-outline-offset` | `2px` | Button focus outline offset |
| `--oslc-dialog-border` | `none` | Dialog border |
| `--oslc-dialog-border-radius` | `8px` | Dialog border radius |
| `--oslc-dialog-box-shadow` | `0 4px 20px rgba(0, 0, 0, 0.3)` | Dialog box shadow |
| `--oslc-dialog-max-width` | `90vw` | Dialog maximum width |
| `--oslc-dialog-max-height` | `90vh` | Dialog maximum height |
| `--oslc-dialog-width` | `800px` | Dialog width |
| `--oslc-dialog-height` | `600px` | Dialog height |
| `--oslc-dialog-background` | `white` | Dialog background |
| `--oslc-dialog-animation` | `none` | Dialog animation |
| `--oslc-dialog-backdrop-background` | `rgba(0, 0, 0, 0.5)` | Dialog backdrop |
| `--oslc-dialog-backdrop-filter` | `none` | Dialog backdrop filter |

And many more for header, title, close button, content, iframe, and loading states.

## Browser Support

- Chrome/Edge 88+
- Firefox 98+
- Safari 15.4+

Requires support for:
- Custom Elements v1
- Shadow DOM v1
- HTML Dialog Element
- ES2020 features

## License

Eclipse Public License 1.0 OR Eclipse Distribution License 1.0
