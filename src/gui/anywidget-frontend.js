import { createJSCircuitApp } from './createJSCircuitApp.js';

function normalizeTheme(modelTheme) {
  if (modelTheme === 'dark' || modelTheme === 'light') return modelTheme;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default {
  render({ model, el }) {
    const app = createJSCircuitApp(el, {
      height: model.get('height') || '680px',
      theme: normalizeTheme(model.get('theme')),
      subtitle: model.get('subtitle') || 'Interactive QuCat editor packaged as an anywidget.',
      initialNetlist: model.get('netlist') || null,
      onCircuitChange: ({ netlist, snapshot, elementCount }) => {
        if (model.get('netlist') !== netlist) {
          model.set('netlist', netlist);
        }
        if (model.get('snapshot') !== snapshot) {
          model.set('snapshot', snapshot);
        }
        if (model.get('element_count') !== elementCount) {
          model.set('element_count', elementCount);
        }
        model.save_changes();
      }
    });

    let isApplyingRemoteState = false;

    const syncFromModel = async () => {
      if (isApplyingRemoteState) return;
      isApplyingRemoteState = true;
      try {
        const snapshot = model.get('snapshot');
        const netlist = model.get('netlist');
        const height = model.get('height') || '680px';
        const theme = normalizeTheme(model.get('theme'));
        const subtitle = model.get('subtitle') || 'Interactive QuCat editor packaged as an anywidget.';

        el.querySelector('.jsc-shell')?.style.setProperty('--jsc-height', height);
        const subtitleNode = el.querySelector('.jsc-toolbar__title span');
        if (subtitleNode) subtitleNode.textContent = subtitle;
        app.setTheme(theme);

        if (snapshot && snapshot !== app.exportState()) {
          app.importState(snapshot);
        } else if (netlist && netlist !== app.exportNetlist()) {
          await app.loadNetlist(netlist, { zoomToFit: true });
        }
      } finally {
        isApplyingRemoteState = false;
      }
    };

    model.on('change:netlist', syncFromModel);
    model.on('change:snapshot', syncFromModel);
    model.on('change:height', syncFromModel);
    model.on('change:theme', syncFromModel);
    model.on('change:subtitle', syncFromModel);

    return () => {
      model.off('change:netlist', syncFromModel);
      model.off('change:snapshot', syncFromModel);
      model.off('change:height', syncFromModel);
      model.off('change:theme', syncFromModel);
      model.off('change:subtitle', syncFromModel);
      app.destroy();
    };
  }
};
