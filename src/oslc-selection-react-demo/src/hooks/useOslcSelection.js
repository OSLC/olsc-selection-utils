import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for integrating OSLC Selection WebComponent with React
 * @param {string} dialogUrl - The OSLC selector URL
 * @param {Function} onSelection - Callback when resources are selected
 * @param {Function} onCancellation - Callback when selection is cancelled
 * @returns {Object} - Object containing button ref and selected resources
 */
export function useOslcSelection(dialogUrl, onSelection, onCancellation) {
  const [selectedResources, setSelectedResources] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const buttonRef = useRef(null)

  // Check if OSLC component is available
  useEffect(() => {
    const checkComponent = () => {
      if (customElements.get('oslc-selection-button')) {
        setIsLoaded(true)
      } else {
        setTimeout(checkComponent, 100)
      }
    }
    checkComponent()
  }, [])

  // Set dialog URL when component is loaded
  useEffect(() => {
    if (buttonRef.current && isLoaded && dialogUrl) {
      buttonRef.current.setAttribute('dialog-url', dialogUrl)
    }
  }, [dialogUrl, isLoaded])

  // Handle selection events
  useEffect(() => {
    const handleSelection = (event) => {
      const resources = event.detail.resources
      setSelectedResources(resources)
      onSelection?.(resources)
    }

    const handleCancellation = (event) => {
      onCancellation?.(event.detail.reason)
    }

    document.addEventListener('oslc-selection-made', handleSelection)
    document.addEventListener('oslc-selection-cancelled', handleCancellation)

    return () => {
      document.removeEventListener('oslc-selection-made', handleSelection)
      document.removeEventListener('oslc-selection-cancelled', handleCancellation)
    }
  }, [onSelection, onCancellation])

  const clearSelection = () => {
    setSelectedResources([])
  }

  return {
    buttonRef,
    selectedResources,
    isLoaded,
    clearSelection
  }
} 