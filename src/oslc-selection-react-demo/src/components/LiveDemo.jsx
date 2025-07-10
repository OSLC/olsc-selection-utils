import React, { useState, useEffect, useRef } from 'react'

const LiveDemo = ({ oslcLoaded, selectedResources, onSelectionUpdate }) => {
  const [dialogUrl, setDialogUrl] = useState('https://rm.refimpl.oslc.ldsw.eu/services/serviceProviders/sp_single/service1/requirements/selector')
  const [protocol, setProtocol] = useState('#oslc-core-postMessage-1.0')
  const buttonRef = useRef(null)

  const fullUrl = dialogUrl + protocol

  // Update button URL when URL or protocol changes
  useEffect(() => {
    if (buttonRef.current && oslcLoaded) {
      buttonRef.current.setAttribute('dialog-url', fullUrl)
    }
  }, [fullUrl, oslcLoaded])

  const parseUrlAndSetProtocol = (url) => {
    if (url.includes('#oslc-core-windowName-1.0')) {
      setProtocol('#oslc-core-windowName-1.0')
      return url.replace('#oslc-core-windowName-1.0', '')
    } else if (url.includes('#oslc-core-postMessage-1.0')) {
      setProtocol('#oslc-core-postMessage-1.0')
      return url.replace('#oslc-core-postMessage-1.0', '')
    } else {
      setProtocol('#oslc-core-postMessage-1.0')
      return url
    }
  }

  const handleUrlChange = (e) => {
    const newUrl = e.target.value.trim()
    const baseUrl = parseUrlAndSetProtocol(newUrl)
    setDialogUrl(baseUrl)
  }

  const handleProtocolChange = (e) => {
    setProtocol(e.target.value)
  }

  return (
    <div className="demo-section">
      <div className="card demo-card">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">
            <i className="bi bi-play-circle"></i> Live Functional Demo
          </h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Try the Selection Component:</h5>
              <p className="text-muted">
                Click the button below to experience OSLC resource selection. This demo simulates 
                the selection process and displays the results.
              </p>
              
              {/* OSLC Selection Button */}
              {oslcLoaded ? (
                <oslc-selection-button 
                  ref={buttonRef}
                  dialog-title="Select OSLC Resources"
                  button-text="Select OSLC Resources"
                  button-class="btn btn-success btn-lg">
                </oslc-selection-button>
              ) : (
                <button className="btn btn-secondary btn-lg" disabled>
                  Loading OSLC Component...
                </button>
              )}
              
              <div className="mt-3">
                <label htmlFor="dialog-url-input" className="form-label">
                  <strong>OSLC Selector URL:</strong>
                </label>
                <div className="input-group">
                  <input 
                    type="url" 
                    id="dialog-url-input" 
                    className="form-control" 
                    value={dialogUrl}
                    onChange={handleUrlChange}
                    placeholder="Enter OSLC selector base URL"
                  />
                  <select 
                    id="protocol-selector" 
                    className="form-select" 
                    style={{ maxWidth: '250px' }}
                    value={protocol}
                    onChange={handleProtocolChange}
                  >
                    <option value="#oslc-core-postMessage-1.0">#oslc-core-postMessage-1.0</option>
                    <option value="#oslc-core-windowName-1.0" disabled>#oslc-core-windowName-1.0</option>
                  </select>
                </div>
                <small className="text-muted form-text">
                  Change this URL to test with different OSLC providers. The protocol dropdown will be automatically selected based on the URL hash. Default connects to <a href="https://rm.refimpl.oslc.ldsw.eu/" target="_blank" rel="noopener noreferrer">https://rm.refimpl.oslc.ldsw.eu/</a> (credentials: admin/admin).
                </small>
              </div>
            </div>
            
            <div className="col-md-6">
              <h5>Usage in React:</h5>
              <div className="code-snippet">{`import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute('dialog-url', '${fullUrl}');
    }
  }, []);

  return (
    <oslc-selection-button 
      ref={buttonRef}
      dialog-title="Select Resources"
      button-text="Browse Items">
    </oslc-selection-button>
  );
}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveDemo 