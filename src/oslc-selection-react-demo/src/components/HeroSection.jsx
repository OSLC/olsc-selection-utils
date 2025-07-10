import React from 'react'

const HeroSection = ({ oslcLoaded, loadError }) => {
  const getBuildStatus = () => {
    if (oslcLoaded) {
      return <span className="text-success">✅ Production components loaded successfully</span>
    } else if (loadError) {
      return <span className="text-danger">❌ Failed to load components: {loadError}</span>
    } else {
      return <span className="text-warning">⚠️ Components not loaded yet</span>
    }
  }

  return (
    <div className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">OSLC Selection WebComponent - React Demo</h1>
            <p className="lead">
              Experience the OSLC Selection WebComponent integrated with React. This demo showcases 
              both the functional OSLC integration and the comprehensive theming system using CSS custom properties.
            </p>
            <div className="alert alert-info mt-4" role="alert">
              <strong>Build Status:</strong> {getBuildStatus()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 