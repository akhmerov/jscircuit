from pathlib import Path

import anywidget
import traitlets


class JSCircuitWidget(anywidget.AnyWidget):
    """Notebook-friendly wrapper around the JSCircuit editor."""

    _esm = Path(__file__).parent / "static" / "widget.js"

    netlist = traitlets.Unicode("").tag(sync=True)
    snapshot = traitlets.Unicode('{"elements":[]}').tag(sync=True)
    height = traitlets.Unicode("680px").tag(sync=True)
    theme = traitlets.Unicode("auto").tag(sync=True)
    subtitle = traitlets.Unicode("Interactive QuCat editor packaged as an anywidget.").tag(sync=True)
    element_count = traitlets.Int(0).tag(sync=True)
