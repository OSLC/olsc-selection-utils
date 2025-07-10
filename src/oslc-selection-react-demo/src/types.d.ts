declare namespace JSX {
  interface IntrinsicElements {
    'oslc-selection-button': {
      'dialog-url'?: string
      'dialog-title'?: string
      'button-text'?: string
      'button-class'?: string
      className?: string
      ref?: React.RefObject<HTMLElement>
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'oslc-selection-button': HTMLElement
  }
}

export {} 