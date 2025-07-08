# @oslc/postmessage-helper

A TypeScript module for OSLC postMessage communication in delegated UIs, following the OSLC specification section 4.3.

## Features

- ✅ Type-safe OSLC postMessage communication
- ✅ Support for both window name and postMessage protocols
- ✅ Selection and creation dialog helpers
- ✅ Event listener management with cleanup
- ✅ ES modules and CommonJS support
- ✅ Ready for NPM and JSR publication

## Installation

```bash
npm install @oslc/postmessage-helper
```

## Usage

### Basic Usage

```typescript
import { OslcPostMessageHelper, OslcResource } from '@oslc/postmessage-helper';

// Register a selection dialog listener
const iframe = document.getElementById('selectionDialog') as HTMLIFrameElement;

const cleanup = OslcPostMessageHelper.registerSelectionListener(
  iframe,
  (resources: OslcResource[]) => {
    console.log('Selected resources:', resources);
    resources.forEach(resource => {
      console.log(`- ${resource['oslc:label']}: ${resource['rdf:resource']}`);
    });
  },
  () => {
    console.log('Preprocessing: clearing previous selections');
  }
);

// Clean up when done
cleanup();
```

### Creation Dialog

```typescript
const creationCleanup = OslcPostMessageHelper.registerCreationListener(
  iframe,
  (url: string, label: string) => {
    console.log(`Created resource: ${label} (${url})`);
  }
);
```

### Sending Responses (from within a delegated UI)

```typescript
// Send selection response
const selectedResources: OslcResource[] = [
  { 'rdf:resource': 'http://example.com/resource/1', 'oslc:label': 'Resource 1' },
  { 'rdf:resource': 'http://example.com/resource/2', 'oslc:label': 'Resource 2' }
];

OslcPostMessageHelper.sendSelectionResponse(selectedResources);

// Send creation response
const createdResource: OslcResource = {
  'rdf:resource': 'http://example.com/resource/new',
  'oslc:label': 'New Resource'
};

OslcPostMessageHelper.sendCreationResponse(createdResource);

// Send cancellation
OslcPostMessageHelper.sendCancelResponse();
```

### Building Dialog URLs

```typescript
import { OslcProtocol } from '@oslc/postmessage-helper';

const dialogUrl = OslcPostMessageHelper.buildDialogUrl(
  'http://example.com/selectionDialog',
  OslcProtocol.PostMessage
);
// Result: 'http://example.com/selectionDialog#oslc-core-postMessage-1.0'
```

## API Reference

### OslcPostMessageHelper

Static class providing OSLC postMessage communication methods.

#### Methods

- `registerSelectionListener(iframe, resourceHandler, preprocessingHandler?)` - Register listener for selection dialogs
- `registerCreationListener(iframe, resourceHandler, preprocessingHandler?)` - Register listener for creation dialogs
- `registerRawResponseListener(iframe, messageHandler)` - Register listener for raw OSLC messages
- `sendSelectionResponse(resources)` - Send selection response
- `sendCreationResponse(resource)` - Send creation response
- `sendCancelResponse()` - Send cancellation response
- `buildDialogUrl(baseUrl, protocol?)` - Build dialog URL with protocol fragment

### Types

- `OslcResource` - OSLC resource with URL and label
- `OslcResponse` - OSLC response structure
- `OslcProtocol` - Supported protocols (WindowName, PostMessage)

## License

Eclipse Public License 1.0 OR Eclipse Distribution License 1.0
