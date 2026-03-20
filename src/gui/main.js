/**
 * @fileoverview JSCircuit Editor - Application Entry Point
 * @description Standalone bootstrap for the embeddable JSCircuit app.
 */

import { createJSCircuitApp } from './createJSCircuitApp.js';

const root = document.body;

createJSCircuitApp(root, {
  allowPostMessage: true,
  subtitle: 'A browser-native circuit editor that now embeds cleanly inside notebooks too.'
});
