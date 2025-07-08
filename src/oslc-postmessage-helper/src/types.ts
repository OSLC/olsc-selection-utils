/**
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Distribution License 1.0 which is available at
 * http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * SPDX-License-Identifier: BSD-3-Simple
 */

/**
 * OSLC resource representation as returned by OSLC delegated UIs
 */
export interface OslcResource {
  'rdf:resource': string;
  'oslc:label': string;
}

/**
 * OSLC response structure for selection and creation dialogs
 */
export interface OslcResponse {
  'oslc:results': OslcResource[];
}

/**
 * Protocol types supported by OSLC delegated UIs
 */
export enum OslcProtocol {
  WindowName = '#oslc-core-windowName-1.0',
  PostMessage = '#oslc-core-postMessage-1.0'
}

/**
 * Event handler type for OSLC message responses
 */
export type OslcMessageHandler = (message: string) => void;

/**
 * Event handler type for processed OSLC resources
 */
export type OslcResourceHandler = (resources: OslcResource[]) => void;

/**
 * Event handler type for individual OSLC resource selection/creation
 */
export type OslcSingleResourceHandler = (url: string, label: string) => void;

/**
 * Event handler type for preprocessing before handling OSLC responses
 */
export type OslcPreprocessingHandler = () => void;
