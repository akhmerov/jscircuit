import { Circuit } from "../domain/aggregates/Circuit.js";
import { CircuitService } from "../application/CircuitService.js";
import { GUIAdapter } from "./adapters/GUIAdapter.js";
import {
  ElementRegistry,
  rendererFactory,
  GUICommandRegistry,
  setupCommands
} from "../config/registry.js";
import { initMenu } from "./menu/initMenu.js";
import { Logger } from "../utils/Logger.js";
import { globalPerformanceMonitor } from "../utils/PerformanceUtils.js";
import { QucatNetlistAdapter } from "../infrastructure/adapters/QucatNetlistAdapter.js";
import { renderAppShell } from "./appShell.js";

function fitCanvasHiDPIOnce(canvas){
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const cssW = Math.max(1, Math.round(rect.width));
  const cssH = Math.max(1, Math.round(rect.height));
  canvas.width  = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}

function setupHiDPICanvas(canvas, onResize) {
  const ctx = canvas.getContext('2d');
  const resize = () => {
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width));
    const cssH = Math.max(1, Math.round(rect.height));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW; canvas.height = pxH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize?.();
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener('resize', resize, { passive: true });
  resize();
  return () => { ro.disconnect(); window.removeEventListener('resize', resize); };
}

function setupPostMessageBridge({ app, allowPostMessage }) {
  if (!allowPostMessage) return () => {};

  const onMessage = (event) => {
    if (event.origin !== window.location.origin &&
        !event.origin.includes('github.io') &&
        !event.origin.includes('localhost')) {
      return;
    }

    const data = event.data;
    if (data.type === 'loadCircuit' && data.netlist) {
      app.loadNetlist(data.netlist, { zoomToFit: true }).catch((error) => {
        Logger.error('[Documentation] Failed to load example circuit:', error);
      });
    }
  };

  window.addEventListener('message', onMessage);
  window.parent?.postMessage({ type: 'appReady' }, '*');
  return () => window.removeEventListener('message', onMessage);
}

export function createJSCircuitApp(root, options = {}) {
  const {
    height = '680px',
    theme = 'light',
    subtitle,
    initialNetlist = null,
    allowPostMessage = false,
    onCircuitChange = null,
  } = options;

  const shell = renderAppShell(root, { height, theme, subtitle });
  const stage = shell.stage;
  const canvas = shell.canvas;
  const controls = shell.controls;

  fitCanvasHiDPIOnce(canvas);

  const circuit = new Circuit();
  const circuitService = new CircuitService(circuit, ElementRegistry);
  const guiAdapter = new GUIAdapter(
    controls,
    canvas,
    circuitService,
    ElementRegistry,
    rendererFactory,
    GUICommandRegistry
  );

  initMenu({ mount: shell.menubar, eventTarget: root });

  globalPerformanceMonitor.startTiming('app-initialization');
  setupCommands(circuitService, guiAdapter.circuitRenderer);
  guiAdapter.initialize();
  const cleanupResize = setupHiDPICanvas(canvas, () => {
    guiAdapter.circuitRenderer.reCenter();
    guiAdapter.circuitRenderer.centerScrollPosition();
    guiAdapter.circuitRenderer.render();
  });
  guiAdapter.circuitRenderer.reCenter();
  guiAdapter.circuitRenderer.centerScrollPosition();
  stage.classList.add('ready');
  globalPerformanceMonitor.endTiming('app-initialization');

  if (Logger.isDev) {
    const originalRender = guiAdapter.circuitRenderer.render;
    let renderCount = 0;
    guiAdapter.circuitRenderer.render = function() {
      renderCount++;
      const start = performance.now();
      const result = originalRender.apply(this, arguments);
      const duration = performance.now() - start;
      if (duration > 16) {
        Logger.warn(`Slow render #${renderCount}: ${duration.toFixed(2)}ms`);
      }
      return result;
    };
  }

  const emitCircuitChange = () => {
    if (typeof onCircuitChange === 'function') {
      onCircuitChange({
        netlist: QucatNetlistAdapter.exportToString(circuitService.circuit),
        snapshot: circuitService.exportState(),
        elementCount: circuitService.getElements().length,
      });
    }
  };

  circuitService.on('update', () => {
    if (circuitService.getElements().length > 0) {
      root.querySelector('.jsc-empty-state')?.setAttribute('hidden', 'hidden');
    } else {
      root.querySelector('.jsc-empty-state')?.removeAttribute('hidden');
    }
    emitCircuitChange();
  });

  const cleanupBridge = setupPostMessageBridge({ app: { loadNetlist }, allowPostMessage });

  async function loadNetlist(netlist, { zoomToFit = false } = {}) {
    const openCommand = GUICommandRegistry.get('openNetlist', circuitService, guiAdapter.circuitRenderer);
    if (!openCommand) {
      throw new Error('OpenNetlist command is not available');
    }

    openCommand.previousState = circuitService.exportState();
    const elements = await openCommand._parseNetlistContent(netlist);
    await openCommand._loadElementsIntoCircuit(elements);
    circuitService.emit('update');
    if (zoomToFit) {
      setTimeout(() => {
        guiAdapter.circuitRenderer.zoomToFit();
        guiAdapter.circuitRenderer.render();
      }, 50);
    }
  }

  function exportNetlist() {
    if (circuitService.getElements().length === 0) return '';
    return QucatNetlistAdapter.exportToString(circuitService.circuit);
  }

  function setTheme(nextTheme = 'light') {
    root.dataset.theme = nextTheme;
  }

  function destroy() {
    cleanupResize();
    cleanupBridge();
    guiAdapter.dispose();
    root.innerHTML = '';
  }

  if (initialNetlist) {
    loadNetlist(initialNetlist, { zoomToFit: true }).catch((error) => {
      Logger.error('[JSCircuit] Failed to load initial netlist', error);
    });
  } else {
    emitCircuitChange();
  }

  return {
    root,
    stage,
    canvas,
    controls,
    circuit,
    circuitService,
    guiAdapter,
    loadNetlist,
    exportNetlist,
    exportState: () => circuitService.exportState(),
    importState: (snapshot) => circuitService.importState(snapshot),
    setTheme,
    destroy,
  };
}
