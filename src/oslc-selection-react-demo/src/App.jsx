import React, { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import LiveDemo from './components/LiveDemo'
import ResultsSection from './components/ResultsSection'
import StylingExamples from './components/StylingExamples'
import IntegrationExamples from './components/IntegrationExamples'
import BuildInstructions from './components/BuildInstructions'
import Footer from './components/Footer'
import './App.css'

// Import the OSLC web component
import '@oslc/oslc-selection-webcomponent'

function App() {
  const [oslcLoaded, setOslcLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [selectedResources, setSelectedResources] = useState([])
  const [currentDialogUrl, setCurrentDialogUrl] = useState('')

  useEffect(() => {
    // Check if the OSLC component is available
    const checkOslcComponent = () => {
      if (customElements.get('oslc-selection-button')) {
        console.log('✅ OSLC Selection WebComponent loaded successfully')
        setOslcLoaded(true)
      } else {
        console.log('⏳ Waiting for OSLC component to load...')
        setTimeout(checkOslcComponent, 100)
      }
    }

    // Start checking for the component
    checkOslcComponent()
  }, [])

  // Handle OSLC selection events
  useEffect(() => {
    const handleSelectionMade = (event) => {
      console.log('OSLC Selection Made:', event.detail.resources)
      setSelectedResources(event.detail.resources)
    }

    const handleSelectionCancelled = (event) => {
      console.log('OSLC Selection Cancelled:', event.detail.reason)
      // You could show a notification here
    }

    document.addEventListener('oslc-selection-made', handleSelectionMade)
    document.addEventListener('oslc-selection-cancelled', handleSelectionCancelled)

    return () => {
      document.removeEventListener('oslc-selection-made', handleSelectionMade)
      document.removeEventListener('oslc-selection-cancelled', handleSelectionCancelled)
    }
  }, [])

  const clearSelection = () => {
    setSelectedResources([])
  }

  const removeResource = (index) => {
    setSelectedResources(prev => prev.filter((_, i) => i !== index))
  }

  const handleDialogUrlChange = (url) => {
    setCurrentDialogUrl(url)
  }

  return (
    <div className="App">
      <HeroSection oslcLoaded={oslcLoaded} loadError={loadError} />
      
      <div className="container mt-5">
        <LiveDemo 
          oslcLoaded={oslcLoaded} 
          selectedResources={selectedResources}
          onSelectionUpdate={setSelectedResources}
          onDialogUrlChange={handleDialogUrlChange}
        />
        
        <ResultsSection 
          selectedResources={selectedResources}
          onClearSelection={clearSelection}
          onRemoveResource={removeResource}
        />
        
        <StylingExamples oslcLoaded={oslcLoaded} dialogUrl={currentDialogUrl} />
        
        <IntegrationExamples />
        
        <BuildInstructions />
      </div>
      
      <Footer />
    </div>
  )
}

export default App 