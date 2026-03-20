const APP_SHELL_STYLE_ID = 'jscircuit-app-shell-style';

const APP_SHELL_CSS = `
.jsc-root {
  --jsc-bg: #f5f7fb;
  --jsc-panel: #ffffff;
  --jsc-panel-muted: #eef3ff;
  --jsc-border: #d7deea;
  --jsc-text: #1f2937;
  --jsc-subtle: #5f6b7a;
  --jsc-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  --jsc-radius: 18px;
  color: var(--jsc-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.jsc-root[data-theme="dark"] {
  --jsc-bg: #0f172a;
  --jsc-panel: #111827;
  --jsc-panel-muted: #172033;
  --jsc-border: #243041;
  --jsc-text: #e5eefc;
  --jsc-subtle: #9fb0c7;
  --jsc-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
}

.jsc-shell {
  min-height: 420px;
  height: var(--jsc-height, 680px);
  width: 100%;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 0;
  overflow: hidden;
  background: var(--jsc-bg);
  border: 1px solid var(--jsc-border);
  border-radius: var(--jsc-radius);
  box-shadow: var(--jsc-shadow);
}

.jsc-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 14px 18px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--jsc-panel) 88%, white 12%), var(--jsc-panel));
  border-bottom: 1px solid var(--jsc-border);
}

.jsc-toolbar__title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.jsc-toolbar__title strong {
  font-size: 15px;
  letter-spacing: 0.01em;
}

.jsc-toolbar__title span,
.jsc-statusbar,
.jsc-empty-state p {
  font-size: 12px;
  color: var(--jsc-subtle);
}

.jsc-toolbar__actions {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.jsc-toolbar__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--jsc-border);
  background: var(--jsc-panel-muted);
  color: var(--jsc-text);
  font-size: 12px;
  font-weight: 600;
}

.jsc-shell .controls {
  margin: 0;
}

.jsc-shell .menubar {
  border: 0;
  border-bottom: 1px solid var(--jsc-border);
  border-radius: 0;
}

.jsc-canvas-region {
  position: relative;
  min-height: 0;
  background:
    radial-gradient(circle at top, color-mix(in srgb, var(--jsc-panel-muted) 70%, transparent) 0, transparent 55%),
    var(--jsc-panel);
}

.jsc-shell .canvas-container {
  height: 100%;
  overflow: auto;
  position: relative;
  border: 0;
  min-height: 0;
  background:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    var(--jsc-panel);
  background-size: 24px 24px, 24px 24px, auto;
}

.jsc-shell #circuitCanvas {
  display: block;
  width: max(100%, 2200px);
  height: max(100%, 1500px);
  min-width: 2200px;
  min-height: 1500px;
  max-width: none;
  max-height: none;
  border: none;
}

.jsc-empty-state {
  position: absolute;
  left: 24px;
  bottom: 24px;
  max-width: 320px;
  padding: 16px 18px;
  border: 1px solid color-mix(in srgb, var(--jsc-border) 85%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--jsc-panel) 92%, transparent);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
  pointer-events: none;
}

.jsc-empty-state h2 {
  margin: 0 0 8px;
  font-size: 14px;
}

.jsc-empty-state ul {
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 12px;
  color: var(--jsc-subtle);
}

.jsc-statusbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 18px 12px;
  border-top: 1px solid var(--jsc-border);
  background: color-mix(in srgb, var(--jsc-panel) 96%, var(--jsc-bg));
}

.jsc-statusbar strong {
  color: var(--jsc-text);
}

@media (max-width: 720px) {
  .jsc-toolbar,
  .jsc-statusbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .jsc-empty-state {
    right: 16px;
    left: 16px;
    bottom: 16px;
    max-width: none;
  }
}
`;

export function ensureAppShellStyles(documentRef = document) {
  if (documentRef.getElementById(APP_SHELL_STYLE_ID)) return;
  const style = documentRef.createElement('style');
  style.id = APP_SHELL_STYLE_ID;
  style.textContent = APP_SHELL_CSS;
  documentRef.head.appendChild(style);
}

export function renderAppShell(root, { height = '680px', theme = 'light', subtitle = 'Notebook-ready circuit editor for QuCat netlists.' } = {}) {
  ensureAppShellStyles(root.ownerDocument);
  root.classList.add('jsc-root');
  root.dataset.theme = theme;
  root.innerHTML = `
    <div class="jsc-shell" style="--jsc-height: ${height};">
      <div class="jsc-toolbar">
        <div class="jsc-toolbar__title">
          <strong>JSCircuit</strong>
          <span>${subtitle}</span>
        </div>
        <div class="jsc-toolbar__actions" aria-hidden="true">
          <span class="jsc-toolbar__pill">⌘ / Ctrl shortcuts</span>
          <span class="jsc-toolbar__pill">Double-click to edit</span>
          <span class="jsc-toolbar__pill">Scroll to pan the canvas</span>
        </div>
      </div>
      <div class="menubar controls" id="menubar"></div>
      <div class="jsc-canvas-region">
        <div class="canvas-container">
          <canvas id="circuitCanvas"></canvas>
        </div>
        <aside class="jsc-empty-state">
          <h2>Start with a component or a netlist</h2>
          <p>Use the toolbar to place components, paste a QuCat netlist, or double-click any element to tweak its parameters.</p>
          <ul>
            <li><strong>R / C / L / J / G</strong> component shortcuts stay available.</li>
            <li><strong>Ctrl+Shift+V</strong> pastes a copied netlist.</li>
            <li><strong>Ctrl + wheel</strong> zooms while preserving scroll.</li>
          </ul>
        </aside>
      </div>
      <div class="jsc-statusbar">
        <span><strong>Tip:</strong> drag to reposition elements and use the property inspector to rename them.</span>
        <span>Designed for standalone pages and notebook embeds.</span>
      </div>
    </div>
  `;

  return {
    stage: root.querySelector('.jsc-shell'),
    controls: root.querySelector('.controls'),
    canvas: root.querySelector('#circuitCanvas'),
    menubar: root.querySelector('#menubar')
  };
}
