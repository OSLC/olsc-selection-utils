/**
 * Copyright (c) 2025 Andrew Berezovskyi
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import { OslcPostMessageHelper, OslcResource, OslcProtocol } from '@oslc/postmessage-helper';

/**
 * Event detail for the oslc-selection-made event
 */
export interface OslcSelectionEventDetail {
  resources: OslcResource[];
}

/**
 * Event detail for the oslc-selection-cancelled event
 */
export interface OslcSelectionCancelledEventDetail {
  reason: string;
}

/**
 * Custom events dispatched by the OSLC selection component
 */
export type OslcSelectionMadeEvent = CustomEvent<OslcSelectionEventDetail>;
export type OslcSelectionCancelledEvent = CustomEvent<OslcSelectionCancelledEventDetail>;

/**
 * OSLC Selection Web Component
 * 
 * A custom element that displays a button which, when clicked, opens a modal dialog
 * containing an iframe with an OSLC selection dialog. Uses the OSLC postMessage
 * protocol to communicate with the delegated UI and provides selected resources
 * back to the consumer.
 * 
 * @example
 * ```html
 * <oslc-selection-button 
 *   dialog-url="http://localhost:8080/selection" 
 *   dialog-title="Select Requirements"
 *   button-text="Select Resources">
 * </oslc-selection-button>
 * ```
 * 
 * @fires oslc-selection-made - When resources are selected
 * @fires oslc-selection-cancelled - When dialog is cancelled
 */
export class OslcSelectionButton extends HTMLElement {
  private button: HTMLButtonElement;
  private dialog: HTMLDialogElement;
  private iframe: HTMLIFrameElement;
  private cleanupListener?: () => void;

  // Observed attributes
  static get observedAttributes(): string[] {
    return ['dialog-url', 'dialog-title', 'button-text', 'button-class'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Create elements
    this.button = document.createElement('button');
    this.dialog = document.createElement('dialog');
    this.iframe = document.createElement('iframe');
    
    this.setupComponent();
  }

  connectedCallback(): void {
    this.updateButton();
    this.updateDialog();
  }

  disconnectedCallback(): void {
    this.cleanup();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      switch (name) {
        case 'button-text':
        case 'button-class':
          this.updateButton();
          break;
        case 'dialog-url':
        case 'dialog-title':
          this.updateDialog();
          break;
      }
    }
  }

  /**
   * Get the dialog URL
   */
  get dialogUrl(): string {
    return this.getAttribute('dialog-url') || '';
  }

  /**
   * Set the dialog URL
   */
  set dialogUrl(value: string) {
    this.setAttribute('dialog-url', value);
  }

  /**
   * Get the dialog title
   */
  get dialogTitle(): string {
    return this.getAttribute('dialog-title') || 'Select Resources';
  }

  /**
   * Set the dialog title
   */
  set dialogTitle(value: string) {
    this.setAttribute('dialog-title', value);
  }

  /**
   * Get the button text
   */
  get buttonText(): string {
    return this.getAttribute('button-text') || 'Select Resources';
  }

  /**
   * Set the button text
   */
  set buttonText(value: string) {
    this.setAttribute('button-text', value);
  }

  /**
   * Get the button CSS class
   */
  get buttonClass(): string {
    return this.getAttribute('button-class') || '';
  }

  /**
   * Set the button CSS class
   */
  set buttonClass(value: string) {
    this.setAttribute('button-class', value);
  }

  private setupComponent(): void {
    // Setup shadow DOM with styles
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: var(--oslc-button-display, inline-block);
          margin: var(--oslc-button-margin, 0);
        }
        
        button {
          padding: var(--oslc-button-padding, 8px 16px);
          border: var(--oslc-button-border, 1px solid #ccc);
          border-radius: var(--oslc-button-border-radius, 4px);
          background: var(--oslc-button-background, #f8f9fa);
          color: var(--oslc-button-color, #333);
          cursor: pointer;
          font-family: var(--oslc-button-font-family, inherit);
          font-size: var(--oslc-button-font-size, inherit);
          font-weight: var(--oslc-button-font-weight, normal);
          transition: var(--oslc-button-transition, all 0.2s ease);
          min-width: var(--oslc-button-min-width, auto);
          min-height: var(--oslc-button-min-height, auto);
        }
        
        button:hover {
          background: var(--oslc-button-hover-background, #e9ecef);
          border-color: var(--oslc-button-hover-border-color, #adb5bd);
          color: var(--oslc-button-hover-color, var(--oslc-button-color, #333));
          transform: var(--oslc-button-hover-transform, none);
        }
        
        button:active {
          background: var(--oslc-button-active-background, #dee2e6);
          color: var(--oslc-button-active-color, var(--oslc-button-color, #333));
          transform: var(--oslc-button-active-transform, none);
        }
        
        button:disabled {
          background: var(--oslc-button-disabled-background, #f8f9fa);
          color: var(--oslc-button-disabled-color, #6c757d);
          cursor: not-allowed;
          opacity: var(--oslc-button-disabled-opacity, 0.65);
        }
        
        button:focus {
          outline: var(--oslc-button-focus-outline, 2px solid #007bff);
          outline-offset: var(--oslc-button-focus-outline-offset, 2px);
        }
        
        dialog {
          padding: 0;
          border: var(--oslc-dialog-border, none);
          border-radius: var(--oslc-dialog-border-radius, 8px);
          box-shadow: var(--oslc-dialog-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.3));
          max-width: var(--oslc-dialog-max-width, 90vw);
          max-height: var(--oslc-dialog-max-height, 90vh);
          width: var(--oslc-dialog-width, 800px);
          height: var(--oslc-dialog-height, 600px);
          background: var(--oslc-dialog-background, white);
          animation: var(--oslc-dialog-animation, none);
        }
        
        dialog::backdrop {
          background: var(--oslc-dialog-backdrop-background, rgba(0, 0, 0, 0.5));
          backdrop-filter: var(--oslc-dialog-backdrop-filter, none);
        }
        
        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--oslc-dialog-header-padding, 16px 20px);
          border-bottom: var(--oslc-dialog-header-border-bottom, 1px solid #e9ecef);
          background: var(--oslc-dialog-header-background, #f8f9fa);
          border-radius: var(--oslc-dialog-header-border-radius, 8px 8px 0 0);
          min-height: var(--oslc-dialog-header-min-height, auto);
        }
        
        .dialog-title {
          margin: 0;
          font-size: var(--oslc-dialog-title-font-size, 1.25rem);
          font-weight: var(--oslc-dialog-title-font-weight, 500);
          color: var(--oslc-dialog-title-color, #333);
          font-family: var(--oslc-dialog-title-font-family, inherit);
        }
        
        .close-button {
          background: var(--oslc-close-button-background, none);
          border: var(--oslc-close-button-border, none);
          font-size: var(--oslc-close-button-font-size, 1.5rem);
          cursor: pointer;
          color: var(--oslc-close-button-color, #6c757d);
          padding: var(--oslc-close-button-padding, 0);
          width: var(--oslc-close-button-width, 32px);
          height: var(--oslc-close-button-height, 32px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--oslc-close-button-border-radius, 4px);
          transition: var(--oslc-close-button-transition, all 0.2s ease);
        }
        
        .close-button:hover {
          background: var(--oslc-close-button-hover-background, #e9ecef);
          color: var(--oslc-close-button-hover-color, #495057);
        }
        
        .dialog-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--oslc-dialog-content-background, transparent);
        }
        
        iframe {
          flex: 1;
          border: var(--oslc-iframe-border, none);
          width: 100%;
          min-height: var(--oslc-iframe-min-height, 500px);
          border-radius: var(--oslc-iframe-border-radius, 0);
        }
        
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--oslc-loading-padding, 40px);
          color: var(--oslc-loading-color, #6c757d);
          font-size: var(--oslc-loading-font-size, inherit);
          background: var(--oslc-loading-background, transparent);
        }
      </style>
    `;

    // Setup button
    this.button.addEventListener('click', this.openDialog.bind(this));
    this.shadowRoot!.appendChild(this.button);

    // Setup dialog structure
    this.dialog.innerHTML = `
      <div class="dialog-header">
        <h2 class="dialog-title"></h2>
        <button class="close-button" type="button" aria-label="Close">×</button>
      </div>
      <div class="dialog-content">
        <div class="loading">Loading selection dialog...</div>
      </div>
    `;

    // Setup close button
    const closeButton = this.dialog.querySelector('.close-button')!;
    closeButton.addEventListener('click', this.closeDialog.bind(this));

    // Setup dialog backdrop click to close
    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) {
        this.closeDialog();
      }
    });

    // Setup ESC key to close
    this.dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeDialog();
      }
    });

    this.shadowRoot!.appendChild(this.dialog);
  }

  private updateButton(): void {
    this.button.textContent = this.buttonText;
    this.button.className = this.buttonClass;
  }

  private updateDialog(): void {
    const titleElement = this.dialog.querySelector('.dialog-title')!;
    titleElement.textContent = this.dialogTitle;
  }

  private openDialog(): void {
    if (!this.dialogUrl) {
      console.error('OSLC Selection Button: dialog-url attribute is required');
      return;
    }

    // Show dialog
    this.dialog.showModal();

    // Prepare iframe
    const dialogContent = this.dialog.querySelector('.dialog-content')!;
    
    // Create iframe with OSLC protocol
    const url = OslcPostMessageHelper.buildDialogUrl(this.dialogUrl, OslcProtocol.PostMessage);
    this.iframe.src = url;
    this.iframe.style.display = 'none'; // Hide until loaded

    // Clear content and add iframe
    dialogContent.innerHTML = `
      <div class="loading">Loading selection dialog...</div>
    `;
    dialogContent.appendChild(this.iframe);

    // Setup iframe load handler
    this.iframe.addEventListener('load', () => {
      const loadingElement = dialogContent.querySelector('.loading');
      if (loadingElement) {
        loadingElement.remove();
      }
      this.iframe.style.display = 'block';
    }, { once: true });

    // Setup OSLC message listener
    this.cleanupListener = OslcPostMessageHelper.registerSelectionListener(
      this.iframe,
      this.handleSelection.bind(this),
      this.handlePreprocessing.bind(this)
    );
  }

  private closeDialog(): void {
    this.dialog.close();
    this.cleanup();
    
    // Dispatch cancelled event
    this.dispatchEvent(new CustomEvent<OslcSelectionCancelledEventDetail>('oslc-selection-cancelled', {
      detail: { reason: 'user-cancelled' },
      bubbles: true,
      composed: true
    }));
  }

  private cleanup(): void {
    if (this.cleanupListener) {
      this.cleanupListener();
      this.cleanupListener = undefined;
    }
    
    // Clear iframe src to stop any ongoing requests
    this.iframe.src = 'about:blank';
  }

  private handlePreprocessing(): void {
    // Called before handling selection - could be used to show loading state
    console.debug('OSLC Selection: preprocessing selection response');
  }

  private handleSelection(resources: OslcResource[]): void {
    this.cleanup();
    this.dialog.close();

    // Dispatch selection event
    this.dispatchEvent(new CustomEvent<OslcSelectionEventDetail>('oslc-selection-made', {
      detail: { resources },
      bubbles: true,
      composed: true
    }));
  }
}

// Define the custom element
if (!customElements.get('oslc-selection-button')) {
  customElements.define('oslc-selection-button', OslcSelectionButton);
}
