# JupyterLite Demo

This page pairs the embedded JSCircuit editor with a live JupyterLite Python REPL so you can sketch a circuit in the browser and inspect or edit its QuCat netlist in a notebook-like environment.

## How to use this page

1. Build or modify a circuit in the editor below.
2. Copy the generated netlist from JSCircuit with **Ctrl+Shift+C**.
3. Paste that text into the JupyterLite REPL to inspect or transform it in Python.
4. If you edit the netlist in Python, copy it back into JSCircuit with **Ctrl+Shift+V**.

> **Note**
> The full `JSCircuitWidget` anywidget package is intended for full Jupyter environments where Python packages can be installed. This JupyterLite page is a lightweight browser-only demo that lets you exercise the notebook workflow without a server.

## Side-by-side demo

<table>
  <tr>
    <td width="58%" valign="top">
      <h3>JSCircuit editor</h3>
      <iframe
        src="app/jscircuit.html"
        width="100%"
        height="640"
        style="border: 1px solid #ccc; border-radius: 8px; background: white;"
        allow="clipboard-write; clipboard-read"
      ></iframe>
    </td>
    <td width="42%" valign="top">
      <h3>JupyterLite Python REPL</h3>
      <iframe
        src="https://jupyterlite.github.io/demo/repl/index.html?kernel=python&toolbar=1&clearCellsOnExecute=1&showBanner=0&code=sample_netlist%20%3D%20%22%22%22R%3B-5%2C0%3B-4%2C0%3B5.0e%2B1%3B%0AC%3B-4%2C0%3B-3%2C0%3B1.0e-12%3B%0AW%3B-3%2C0%3B-2%2C0%3B%3B%0AG%3B-2%2C0%3B-2%2C1%3B%3B%22%22%22%0Alines%20%3D%20%5Bline%20for%20line%20in%20sample_netlist.splitlines()%20if%20line.strip()%5D%0Acomponent_types%20%3D%20%5Bline.split(%27%3B%27)%5B0%5D%20for%20line%20in%20lines%5D%0Aprint(%27Loaded%20sample%20netlist%20with%27%2C%20len(lines)%2C%20%27elements%27)%0Aprint(%27Component%20types%3A%27%2C%20component_types)%0Asample_netlist"
        width="100%"
        height="640"
        style="border: 1px solid #ccc; border-radius: 8px; background: white;"
        allow="clipboard-read; clipboard-write"
      ></iframe>
    </td>
  </tr>
</table>

## Try these next

- Copy a netlist from the editor and replace `sample_netlist` in the REPL.
- Split the netlist into lines and count component types.
- Edit component values in Python, print the updated text, and paste it back into JSCircuit.
- Use the packaged `JSCircuitWidget` in a full Jupyter environment for a tighter Python ↔ UI loop.
