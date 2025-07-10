import React from 'react'

const BuildInstructions = () => {
  return (
    <div className="demo-section">
      <div className="card demo-card">
        <div className="card-header bg-info text-white">
          <h3 className="card-title mb-0">
            <i className="bi bi-gear"></i> Build Instructions
          </h3>
        </div>
        <div className="card-body">
          <h5>To build and run the React demo:</h5>
          <div className="code-snippet">{`# Install dependencies
cd src/oslc-selection-react-demo
npm install

# Build the OSLC components first (from root directory)
cd ../../..
npm run build

# Start the React development server
cd src/oslc-selection-react-demo
npm run dev

# Or build for production
npm run build
npm run preview`}</div>
          <p className="mt-3">The React demo will automatically load the OSLC components from the vendor directory and provide a modern development experience with hot reloading.</p>
          
          <h6 className="mt-4">Key Features:</h6>
          <ul>
            <li><strong>Hot Reloading:</strong> Changes to React components are reflected immediately</li>
            <li><strong>TypeScript Support:</strong> Full TypeScript support for better development experience</li>
            <li><strong>Component State Management:</strong> React hooks for managing selection state</li>
            <li><strong>Event Handling:</strong> Proper cleanup of event listeners</li>
            <li><strong>Responsive Design:</strong> Bootstrap integration for mobile-friendly UI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BuildInstructions 