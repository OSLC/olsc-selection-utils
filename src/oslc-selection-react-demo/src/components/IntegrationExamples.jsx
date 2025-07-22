import React from 'react'

const IntegrationExamples = () => {
  return (
    <div className="demo-section">
      <div className="card demo-card">
        <div className="card-header bg-warning text-dark">
          <h3 className="card-title mb-0">
            <i className="bi bi-code-square"></i> Integration Examples
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Custom Hook (Recommended)</h5>
              <div className="code-snippet">{`import React from 'react';
import { useOslcSelection } from './hooks/useOslcSelection';

function MyComponent() {
  const { buttonRef, selectedResources, isLoaded, clearSelection } = useOslcSelection(
    'https://your-oslc-url/selector',
    (resources) => {
      console.log('Selected:', resources);
    },
    (reason) => {
      console.log('Cancelled:', reason);
    }
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <oslc-selection-button 
        ref={buttonRef}
        dialog-title="Select Resources"
        button-text="Browse Items">
      </oslc-selection-button>
      
      {selectedResources.length > 0 && (
        <div>
          <h6>Selected ({selectedResources.length}):</h6>
          <button onClick={clearSelection}>Clear</button>
          <ul>
            {selectedResources.map((resource, index) => (
              <li key={index}>{resource['oslc:label']}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`}</div>
            </div>
            
            <div className="col-md-6">
              <h5>React Functional Component</h5>
              <div className="code-snippet">{`import React, { useRef, useEffect, useState } from 'react';

function OslcSelector({ dialogUrl, onSelection }) {
  const buttonRef = useRef(null);
  const [selectedResources, setSelectedResources] = useState([]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute('dialog-url', dialogUrl);
    }
  }, [dialogUrl]);

  useEffect(() => {
    const handleSelection = (event) => {
      const resources = event.detail.resources;
      setSelectedResources(resources);
      onSelection?.(resources);
    };

    document.addEventListener('oslc-selection-made', handleSelection);
    return () => {
      document.removeEventListener('oslc-selection-made', handleSelection);
    };
  }, [onSelection]);

  return (
    <div>
      <oslc-selection-button 
        ref={buttonRef}
        dialog-title="Select Resources"
        button-text="Browse Items">
      </oslc-selection-button>
      
      {selectedResources.length > 0 && (
        <div className="mt-3">
          <h6>Selected ({selectedResources.length}):</h6>
          <ul>
            {selectedResources.map((resource, index) => (
              <li key={index}>{resource['oslc:label']}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntegrationExamples 