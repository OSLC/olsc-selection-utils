import React from 'react'

const ResultsSection = ({ selectedResources, onClearSelection, onRemoveResource }) => {
  const escapeHtml = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  if (selectedResources.length === 0) {
    return (
      <div className="demo-section">
        <div className="card demo-card">
          <div className="card-header bg-success text-white">
            <h3 className="card-title mb-0">
              <i className="bi bi-check-circle"></i> Selected Resources
            </h3>
          </div>
          <div className="card-body">
            <div className="empty-state">
              <h4>No resources selected yet</h4>
              <p>Use the selection button above to choose OSLC resources. Selected items will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="demo-section">
      <div className="card demo-card">
        <div className="card-header bg-success text-white">
          <h3 className="card-title mb-0">
            <i className="bi bi-check-circle"></i> Selected Resources
          </h3>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Selected {selectedResources.length} resource{selectedResources.length === 1 ? '' : 's'}:</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={onClearSelection}>
              Clear All
            </button>
          </div>
          <div className="resources-list">
            {selectedResources.map((resource, index) => (
              <div key={index} className="resource-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{escapeHtml(resource['oslc:label'])}</h6>
                    <div className="resource-url">{escapeHtml(resource['rdf:resource'])}</div>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger ms-2" 
                    onClick={() => onRemoveResource(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsSection 