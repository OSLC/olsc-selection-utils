import React from 'react'

const StylingExamples = ({ oslcLoaded }) => {
  const themes = [
    {
      name: 'Default Theme',
      className: '',
      code: '/* No custom properties needed for default styling */'
    },
    {
      name: 'Material Design',
      className: 'material-theme',
      code: `.material-theme oslc-selection-button {
  --oslc-button-background: #1976d2;
  --oslc-button-color: white;
  --oslc-button-font-weight: 500;
  --oslc-button-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`
    },
    {
      name: 'Bootstrap Style',
      className: 'bootstrap-theme',
      code: `.bootstrap-theme oslc-selection-button {
  --oslc-button-border: 1px solid #007bff;
  --oslc-button-background: #007bff;
  --oslc-button-color: #ffffff;
  --oslc-button-border-radius: 0.375rem;
}`
    },
    {
      name: 'Rounded Theme',
      className: 'rounded-theme',
      code: `.rounded-theme oslc-selection-button {
  --oslc-button-border-radius: 25px;
  --oslc-button-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --oslc-button-hover-transform: translateY(-2px);
}`
    },
    {
      name: 'Dark Theme',
      className: 'dark-theme',
      code: `.dark-theme oslc-selection-button {
  --oslc-button-background: #495057;
  --oslc-button-color: #ffffff;
  --oslc-button-border: 1px solid #6c757d;
}`
    },
    {
      name: 'Outline Theme',
      className: 'outline-theme',
      code: `.outline-theme oslc-selection-button {
  --oslc-button-background: transparent;
  --oslc-button-color: #007bff;
  --oslc-button-border: 2px solid #007bff;
  --oslc-button-hover-background: #007bff;
  --oslc-button-hover-color: white;
}`
    },
    {
      name: 'Success Theme',
      className: 'success-theme',
      code: `.success-theme oslc-selection-button {
  --oslc-button-background: #28a745;
  --oslc-button-color: white;
  --oslc-button-hover-background: #218838;
}`
    },
    {
      name: 'Large Theme',
      className: 'large-theme',
      code: `.large-theme oslc-selection-button {
  --oslc-button-padding: 16px 32px;
  --oslc-button-font-size: 1.2rem;
  --oslc-button-font-weight: 600;
  --oslc-button-min-width: 200px;
}`
    },
    {
      name: 'Compact Theme',
      className: 'compact-theme',
      code: `.compact-theme oslc-selection-button {
  --oslc-button-padding: 4px 8px;
  --oslc-button-font-size: 0.875rem;
  --oslc-button-border-radius: 2px;
}`
    },
    {
      name: 'Animated Theme',
      className: 'animated-theme',
      code: `.animated-theme oslc-selection-button {
  --oslc-button-background: #ff6b6b;
  --oslc-button-hover-transform: scale(1.05);
  --oslc-button-active-transform: scale(0.95);
  --oslc-button-transition: all 0.3s ease;
}`
    }
  ]

  return (
    <div className="demo-section">
      <h2>Component Styling Examples</h2>
      <p>The OSLC Selection WebComponent supports extensive styling through CSS custom properties. Here are various pre-built themes:</p>
      
      <div className="demo-grid">
        {themes.map((theme, index) => (
          <div key={index} className="demo-item">
            <h4>{theme.name}</h4>
            <div className={theme.className}>
              {oslcLoaded ? (
                <oslc-selection-button 
                  button-text={`${theme.name} Button`}>
                </oslc-selection-button>
              ) : (
                <button className="btn btn-secondary" disabled>
                  Loading...
                </button>
              )}
            </div>
            <div className="code-block">{theme.code}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StylingExamples 