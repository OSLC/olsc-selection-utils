import React from 'react'
import { useOslcSelection } from '../hooks/useOslcSelection'

const OslcSelectorExample = ({ dialogUrl, title = "Select Resources", buttonText = "Browse Items" }) => {
  const { buttonRef, selectedResources, isLoaded, clearSelection } = useOslcSelection(
    dialogUrl,
    (resources) => {
      console.log('Resources selected:', resources)
    },
    (reason) => {
      console.log('Selection cancelled:', reason)
    }
  )

  if (!isLoaded) {
    return <div>Loading OSLC component...</div>
  }

  return (
    <div className="oslc-selector-example">
      <h5>{title}</h5>
      <oslc-selection-button 
        ref={buttonRef}
        dialog-title={title}
        button-text={buttonText}>
      </oslc-selection-button>
      
      {selectedResources.length > 0 && (
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Selected ({selectedResources.length}):</h6>
            <button className="btn btn-sm btn-outline-secondary" onClick={clearSelection}>
              Clear
            </button>
          </div>
          <ul className="list-group">
            {selectedResources.map((resource, index) => (
              <li key={index} className="list-group-item">
                <strong>{resource['oslc:label']}</strong>
                <br />
                <small className="text-muted">{resource['rdf:resource']}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OslcSelectorExample 