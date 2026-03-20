var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/domain/valueObjects/Label.js
var Label;
var init_Label = __esm({
  "src/domain/valueObjects/Label.js"() {
    Label = class _Label {
      /**
       * Creates an instance of Label.
       * 
       * @constructor
       * @param {string} value - The label value.
       * @throws {Error} If the label is invalid.
       */
      constructor(value) {
        if (!_Label.isValid(value)) {
          throw new Error("Invalid label: Must be non-empty and less than 50 characters.");
        }
        this.value = value;
      }
      /**
       * Validates the label value.
       * 
       * @static
       * @param {string} value - The label value to validate.
       * @returns {boolean} True if the value is valid, otherwise false.
       */
      static isValid(value) {
        return typeof value === "string" && value.trim().length > 0 && value.length <= 50;
      }
      /**
       * Returns the string representation of the label.
       * 
       * @returns {string} The label value.
       */
      toString() {
        return this.value;
      }
      /**
       * Checks if this label is equal to another label.
       * 
       * @param {Label} other - The other label to compare.
       * @returns {boolean} True if the labels are equal, otherwise false.
       */
      equals(other) {
        return other instanceof _Label && this.value === other.value;
      }
    };
  }
});

// src/domain/valueObjects/Position.js
var Position;
var init_Position = __esm({
  "src/domain/valueObjects/Position.js"() {
    Position = class _Position {
      /**
       * Creates an instance of Position.
       * @param {number} x - The x-coordinate in pixels.
       * @param {number} y - The y-coordinate in pixels.
       */
      constructor(x, y) {
        if (typeof x !== "number" || typeof y !== "number") {
          throw new Error("Position requires numeric coordinates");
        }
        if (!isFinite(x) || !isFinite(y)) {
          throw new Error("Position coordinates must be finite numbers");
        }
        this.x = x;
        this.y = y;
      }
      /**
       * Checks if this position is equal to another position.
       * @param {Position} other - The other position to compare with.
       * @param {number} tolerance - Optional tolerance for floating-point comparison (default: 0)
       * @returns {boolean} True if the positions are equal, false otherwise.
       */
      equals(other, tolerance = 0) {
        if (!(other instanceof _Position)) {
          return false;
        }
        if (tolerance === 0) {
          return this.x === other.x && this.y === other.y;
        }
        return Math.abs(this.x - other.x) <= tolerance && Math.abs(this.y - other.y) <= tolerance;
      }
      /**
       * Returns a string representation of the position.
       * @returns {string} String in format "x,y"
       */
      toString() {
        return `${this.x},${this.y}`;
      }
      /**
       * Creates a Position from a string representation.
       * @param {string} str - String in format "x,y"
       * @returns {Position} New Position instance
       */
      static fromString(str) {
        const [x, y] = str.split(",").map((s) => parseFloat(s.trim()));
        return new _Position(x, y);
      }
      /**
       * Creates a copy of this position.
       * @returns {Position} New Position instance with same coordinates
       */
      clone() {
        return new _Position(this.x, this.y);
      }
      /**
       * Adds another position to this one.
       * @param {Position} other - The position to add
       * @returns {Position} New position with sum
       */
      add(other) {
        return new _Position(this.x + other.x, this.y + other.y);
      }
      /**
       * Subtracts another position from this one.
       * @param {Position} other - The position to subtract
       * @returns {Position} New position with difference
       */
      subtract(other) {
        return new _Position(this.x - other.x, this.y - other.y);
      }
      /**
       * Scales this position by a factor.
       * @param {number} factor - Scaling factor
       * @returns {Position} New scaled position
       */
      scale(factor) {
        return new _Position(this.x * factor, this.y * factor);
      }
      /**
       * Calculates the Euclidean distance to another position.
       * @param {Position} other - The other position
       * @returns {number} Distance in pixels
       */
      distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
      /**
       * Calculates the Manhattan distance to another position.
       * @param {Position} other - The other position
       * @returns {number} Manhattan distance in pixels
       */
      manhattanDistanceTo(other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
      }
      /**
       * Creates the midpoint between this position and another.
       * @param {Position} other - The other position
       * @returns {Position} Midpoint position
       */
      midpoint(other) {
        return new _Position(
          (this.x + other.x) / 2,
          (this.y + other.y) / 2
        );
      }
    };
  }
});

// src/domain/valueObjects/Properties.js
var Properties;
var init_Properties = __esm({
  "src/domain/valueObjects/Properties.js"() {
    Properties = class {
      /**
       * Creates a properties container.
       * 
       * @param {Object} values - An object containing the value objects for the properties.
       * @throws {Error} If any value is invalid.
       */
      constructor(values = {}) {
        if (typeof values !== "object" || values === null) {
          throw new Error("Properties must be a non-null object.");
        }
        Object.entries(values).forEach(([key, value]) => {
          if (!this.isValidValue(value)) {
            throw new Error(`Invalid value for property "${key}". Must be a float, "variable", or undefined.`);
          }
        });
        this.values = values;
      }
      /**
       * Checks if a value is valid.
       * 
       * @param {*} value - The value to check.
       * @returns {boolean} True if the value is valid, otherwise false.
       */
      isValidValue(value) {
        return typeof value === "number" || value === "variable" || value === void 0;
      }
      /**
       * Updates a property value.
       * 
       * @param {string} key - The property key to update.
       * @param {*} value - The new value for the property.
       * @throws {Error} If the value is invalid.
       */
      updateProperty(key, value) {
        if (!this.isValidValue(value)) {
          throw new Error(`Invalid value for property "${key}". Must be a float, "variable", or "undefined".`);
        }
        this.values[key] = value;
      }
      /**
       * Describes the properties in the container.
       * 
       * @returns {string} A string description of the properties.
       */
      describe() {
        return Object.entries(this.values).map(([key, value]) => `${key}: ${value}`).join(", ");
      }
    };
  }
});

// src/domain/entities/Element.js
var Element;
var init_Element = __esm({
  "src/domain/entities/Element.js"() {
    init_Label();
    init_Position();
    init_Properties();
    Element = class _Element {
      /**
       * Creates an instance of an Element.
       * 
       * @param {string} id - The unique identifier for the element.
       * @param {Position[]} nodes - The list of node positions.
       * @param {Label|null} label - The label of the element (optional).
       * @param {Properties} properties - A container for the element's specific properties.
       * @throws {Error} If attempting to instantiate the abstract class directly.
       */
      constructor(id, nodes, label = null, properties) {
        if (new.target === _Element) {
          throw new Error("Cannot instantiate abstract class Element directly.");
        }
        if (!Array.isArray(nodes) || !nodes.every((t) => t instanceof Position)) {
          throw new Error("Nodes must be an array of Position instances.");
        }
        if (label !== null && !(label instanceof Label)) {
          throw new Error("Label must be an instance of Label or null.");
        }
        if (!(properties instanceof Properties)) {
          throw new Error("Properties must be an instance of Properties.");
        }
        this.id = id;
        this.nodes = nodes;
        this.label = label;
        this.type = null;
        this.properties = properties;
      }
      /**
       * Describes the element with its type, id, nodes, label, and properties.
       * 
       * @returns {string} A string description of the element.
       */
      describe() {
        const labelText = this.label ? `, label: "${this.label}"` : "";
        const nodesText = this.nodes.map((t) => `(${t.x}, ${t.y})`).join(", ");
        return `${this.type} (${this.id}): nodes: [${nodesText}]${labelText}, properties: ${this.properties.describe()}`;
      }
      /**
       * Gets the properties container for this element.
       *
       * @returns {Properties} The properties container.
       */
      getProperties() {
        return this.properties;
      }
    };
  }
});

// src/utils/idGenerator.js
var counter, generateId;
var init_idGenerator = __esm({
  "src/utils/idGenerator.js"() {
    counter = 0;
    generateId = (prefix = "") => {
      counter += 1;
      return `${prefix}${counter}`;
    };
  }
});

// src/domain/factories/ElementRegistry.js
var ElementRegistryClass, ElementRegistry;
var init_ElementRegistry = __esm({
  "src/domain/factories/ElementRegistry.js"() {
    ElementRegistryClass = class _ElementRegistryClass {
      constructor() {
        if (!_ElementRegistryClass.instance) {
          this._registry = {};
          _ElementRegistryClass.instance = this;
        }
        return _ElementRegistryClass.instance;
      }
      /**
       * Registers a new element type.
       * @param {string} type - The name of the element type.
       * @param {Function} factoryFunction - The factory function for creating the element.
       */
      register(type, factoryFunction) {
        if (this._registry[type]) {
          throw new Error(`Element type "${type}" is already registered.`);
        }
        this._registry[type] = factoryFunction;
      }
      /**
       * Retrieves the factory function for a given element type.
       * @param {string} type - The element type.
       * @returns {Function} The factory function.
       */
      get(type) {
        return this._registry[type];
      }
      /**
       * Retrieves all registered element types.
       * @returns {string[]} The list of element types.
       */
      getTypes() {
        return Object.keys(this._registry);
      }
    };
    ElementRegistry = new ElementRegistryClass();
    Object.freeze(ElementRegistry);
  }
});

// src/domain/factories/ElementFactory.js
var ElementFactory;
var init_ElementFactory = __esm({
  "src/domain/factories/ElementFactory.js"() {
    init_ElementRegistry();
    init_idGenerator();
    ElementFactory = class {
      /**
       * Creates a new instance of an element based on the specified type.
       * If no ID is provided, one is generated automatically using the type prefix.
       *
       * @param {string} type - The type of the element to create.
       * @param {string|null|undefined} id - Optional unique identifier.
       * @param {Position[]} nodes - The array of terminal positions.
       * @param {Properties} properties - A Properties instance.
       * @param {Label|null} label - Optional label (default: null).
       * @returns {Element} An instance of the requested element type.
       * @throws {Error} If the type is not registered in the registry.
       */
      static create(type, id, nodes, properties, label = null) {
        const factoryFunction = ElementRegistry.get(type);
        if (!factoryFunction) {
          throw new Error(`Element type "${type}" is not registered.`);
        }
        const safeId = id ?? generateId(type[0].toUpperCase());
        return factoryFunction(safeId, nodes, label, properties);
      }
    };
  }
});

// src/application/ElementService.js
var ElementService_exports = {};
__export(ElementService_exports, {
  ElementService: () => ElementService
});
var ElementService;
var init_ElementService = __esm({
  "src/application/ElementService.js"() {
    init_ElementFactory();
    init_Position();
    init_Element();
    ElementService = class _ElementService {
      /**
       * Constructs the ElementService.
       * 
       * @param {ElementFactory} elementFactory - The factory responsible for creating elements.
       */
      constructor(elementFactory) {
        this.elementFactory = elementFactory;
      }
      /**
       * Creates a new element using the factory.
       * 
       * @param {string} type - The type of the element to create (e.g., "Resistor", "Junction").
       * @param {string} id - The unique identifier for the element.
       * @param {Position[]} nodes - The terminal positions.
       * @param {Object} propertiesArgs - The arguments for the specific properties container.
       * @returns {Element} The newly created element.
       */
      static create(type, id, nodes, propertiesArgs) {
        if (!this.elementFactory) {
          throw new Error("ElementFactory is not set.");
        }
        return this.elementFactory.create(type, id, nodes, propertiesArgs);
      }
      /**
       * Deletes an element.
       * 
       * @param {Element[]} elements - The array of elements.
       * @param {string} id - The unique identifier of the element to delete.
       * @returns {Element[]} The updated list of elements.
       */
      static delete(elements, id) {
        return elements.filter((element) => element.id !== id);
      }
      /**
       * Moves an element to a new position, updating all terminal positions.
       * 
       * @param {Element} element - The element to move.
       * @param {Position} newReferencePosition - The new position for the reference terminal.
       */
      static move(element, newReferencePosition) {
        const refTerminal = element.nodes[0];
        const deltaX = newReferencePosition.x - refTerminal.x;
        const deltaY = newReferencePosition.y - refTerminal.y;
        element.nodes = element.nodes.map(
          (terminal) => new Position(terminal.x + deltaX, terminal.y + deltaY)
        );
      }
      /**
       * Rotates an element to a new orientation.
       * 
       * @param {Element} element - The element to rotate.
       * @param {number} newOrientation - The new orientation (0, 90, 180, or 270 degrees).
       */
      static rotate(element, newOrientation) {
        if (![0, 90, 180, 270].includes(newOrientation)) {
          throw new Error("Orientation must be one of 0, 90, 180, or 270 degrees.");
        }
        const refTerminal = element.nodes[0];
        const refX = refTerminal.x;
        const refY = refTerminal.y;
        element.nodes = element.nodes.map((terminal, index) => {
          if (index === 0) return terminal;
          const relX = terminal.x - refX;
          const relY = terminal.y - refY;
          const [newRelX, newRelY] = _ElementService._rotatePosition(relX, relY, newOrientation);
          return new Position(refX + newRelX, refY + newRelY);
        });
      }
      /**
       * Rotates a position around the origin.
       * 
       * @param {number} x - The x-coordinate of the position.
       * @param {number} y - The y-coordinate of the position.
       * @param {number} angle - The angle to rotate by (in degrees).
       * @returns {number[]} The rotated [x, y] position.
       */
      static _rotatePosition(x, y, angle) {
        const radians = Math.PI / 180 * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const newX = Math.round(x * cos - y * sin);
        const newY = Math.round(x * sin + y * cos);
        return [newX, newY];
      }
      /**
       * Updates properties of an element.
       * 
       * @param {Element} element - The element whose properties are being updated.
       * @param {Object} updates - An object containing property updates.
       * @throws {Error} If any property value is invalid.
       */
      static updateProperties(element, updates) {
        Object.entries(updates).forEach(([key, value]) => {
          if (!element.properties.isValidValue(value)) {
            throw new Error(`Invalid value for property "${key}". Must be a float, "variable", or "undefined".`);
          }
          element.properties.values[key] = value;
        });
      }
    };
  }
});

// src/domain/aggregates/Circuit.js
var Circuit = class {
  /**
   * Creates a new empty circuit.
   *
   * Initializes the circuit with empty collections for elements and connections.
   * The circuit starts in a valid state with no elements or connections.
   */
  constructor() {
    this.elements = [];
    this.connections = /* @__PURE__ */ new Map();
  }
  /**
   * Validates whether an element can be added to the circuit.
   *
   * @param {Element} element - The element to validate.
   * @throws {Error} If the element violates circuit rules.
   */
  validateAddElement(element) {
    if (this.elements.some((el) => el.id === element.id)) {
      throw new Error(`Element with id ${element.id} is already in the circuit.`);
    }
  }
  /**
   * Validates and establishes a connection between two elements in the circuit.
   * This method handles two types of connections:
   * - Node-to-Node connections: Direct connections between nodes of two elements.
   * - Node-to-Wire-Body connections: A node connecting to any point along a wire's body.
   *
   * @param {Element} element1 - The first element to connect.
   * @param {Element} element2 - The second element to connect.
   * @throws {Error} If the connection violates circuit rules.
   */
  validateConnection(element1, element2) {
    const element1NodeKeys = new Set(element1.nodes.map((node2) => `${node2.x},${node2.y}`));
    for (const node2 of element2.nodes) {
      const key = `${node2.x},${node2.y}`;
      if (element1NodeKeys.has(key)) {
        const connectedElements = this.connections.get(key) || [];
        const isAlreadyConnected = connectedElements.some(
          (connectedElement) => connectedElement !== element1 && connectedElement !== element2
        );
        if (isAlreadyConnected) {
          throw new Error(
            `Node at position (${node2.x}, ${node2.y}) is already connected and cannot accept additional connections.`
          );
        }
        if (!this.connections.has(key)) {
          this.connections.set(key, []);
        }
        this.connections.get(key).push(element1, element2);
      }
    }
    const wire = element1.type === "wire" ? element1 : element2.type === "wire" ? element2 : null;
    const node = element1.type === "wire" ? element2.nodes[0] : element1.nodes[0];
    if (wire && node) {
      for (let i = 0; i < wire.nodes.length - 1; i++) {
        const start = wire.nodes[i];
        const end = wire.nodes[i + 1];
        if (this.isNodeOnWireSegment(node, start, end)) {
          const key = `${node.x},${node.y}`;
          const connectedElements = this.connections.get(key) || [];
          if (connectedElements.some((e) => e === node)) {
            throw new Error(`Node at position (${node.x}, ${node.y}) is already connected and cannot accept additional connections.`);
          }
          if (!this.connections.has(key)) {
            this.connections.set(key, []);
          }
          this.connections.get(key).push(wire, node);
          return;
        }
      }
    }
  }
  /**
   * Checks if a node lies on the body of a wire, defined by a line segment between two endpoints.
   *
   * This method is used to validate node-to-wire-body connections in a circuit.
   * It ensures that a node is either at one of the wire's terminal positions
   * or lies along any of the wire's intermediate line segments.
   *
   * @param {Position} node - The node to check.
   * @param {Position} wireStart - The starting point of the wire's line segment.
   * @param {Position} wireEnd - The ending point of the wire's line segment.
   * @returns {boolean} True if the node lies on the wire's line segment, otherwise false.
   */
  isNodeOnWireSegment(node, wireStart, wireEnd) {
    if (node.x < Math.min(wireStart.x, wireEnd.x) || node.x > Math.max(wireStart.x, wireEnd.x) || node.y < Math.min(wireStart.y, wireEnd.y) || node.y > Math.max(wireStart.y, wireEnd.y)) {
      return false;
    }
    const crossProduct = (wireEnd.y - wireStart.y) * (node.x - wireStart.x) - (node.y - wireStart.y) * (wireEnd.x - wireStart.x);
    if (Math.abs(crossProduct) > 1e-10) {
      return false;
    }
    return true;
  }
  /**
   * Serializes the circuit elements into a format suitable for export or persistence.
   *
   * This method converts all circuit elements into a plain JavaScript object format
   * that can be easily serialized to JSON or other data formats. It's primarily used
   * by export adapters like QucatNetlistAdapter for file operations.
   *
   * @returns {Object[]} Array of serialized element objects, each containing:
   *   - {string} id - The unique element identifier
   *   - {string} type - The element type (resistor, capacitor, wire, etc.)
   *   - {Object[]} nodes - Array of node positions as {x, y} objects
   *   - {Object} properties - Element properties as key-value pairs
   *   - {string|null} label - Element label text or null if no label
   *
   * @example
   * const serialized = circuit.getSerializedElements();
   * console.log(serialized[0]); // { id: 'R1', type: 'resistor', nodes: [{x: 10, y: 20}], ... }
   */
  getSerializedElements() {
    return this.elements.map((el) => ({
      id: el.id,
      type: el.type,
      nodes: el.nodes.map((p) => ({ x: p.x, y: p.y })),
      properties: el.properties.values,
      label: el.label ? el.label.value : null
    }));
  }
};

// src/utils/EventEmitter.js
var EventEmitter = class {
  /**
   * Constructs a new EventEmitter instance.
   * Manages a collection of event listeners.
   */
  constructor() {
    this.events = {};
  }
  /**
   * Registers a new listener for the given event.
   * 
   * @param {string} event - The name of the event.
   * @param {Function} callback - The function to execute when the event is emitted.
   * 
   * @example
   * ```js
   * emitter.on("update", () => console.log("Circuit updated"));
   * ```
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  /**
   * Removes a specific listener from an event.
   * 
   * @param {string} event - The event name.
   * @param {Function} callback - The function to remove from the listener list.
   * 
   * @example
   * ```js
   * const handler = () => console.log("Circuit updated");
   * emitter.on("update", handler);
   * emitter.off("update", handler); // Removes the listener
   * ```
   */
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
  /**
   * Emits an event, triggering all registered callbacks for that event.
   * 
   * @param {string} event - The event name.
   * @param {*} [data] - Optional data to pass to the event listeners.
   * 
   * @example
   * ```js
   * emitter.emit("elementAdded", { id: "R1", type: "resistor" });
   * ```
   */
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
};

// src/application/CircuitService.js
init_Element();
init_idGenerator();

// src/config/registry.js
init_ElementRegistry();

// src/gui/renderers/RendererFactory.js
var RendererFactory = class {
  constructor() {
    this.registry = /* @__PURE__ */ new Map();
  }
  /**
   * Registers a renderer for a specific element type.
   * @param {string} type - The type of element (e.g., "Resistor", "Wire").
   * @param {Function} rendererConstructor - The constructor function for the renderer.
   */
  register(type, rendererConstructor) {
    this.registry.set(type, rendererConstructor);
  }
  /**
   * Creates a renderer for the specified element type.
   * @param {string} type - The type of element.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   * @returns {Object} - The renderer instance.
   * @throws {Error} - If no renderer is registered for the given type.
   */
  create(type, context) {
    const Renderer = this.registry.get(type);
    if (!Renderer) {
      throw new Error(`No renderer registered for element type: "${type}"`);
    }
    return new Renderer(context);
  }
  /**
   * Returns all registered renderer types for debugging.
   * @returns {string[]} - Array of registered type names.
   */
  getRegisteredTypes() {
    return [...this.registry.keys()];
  }
};

// src/domain/entities/Resistor.js
init_Element();
init_Properties();

// src/domain/valueObjects/Resistance.js
var Resistance = class {
  /**
   * Create a Resistance.
   * @param {number} value - The value of the resistance.
   * @throws {Error} Throws an error if the resistance value is less than or equal to zero.
   */
  constructor(value) {
    if (value <= 0) {
      throw new Error("Resistance must be greater than zero.");
    }
    this.value = value;
  }
  /**
   * Check if this resistance is equal to another resistance.
   * @param {Resistance} other - The other resistance to compare.
   * @returns {boolean} True if the resistances are equal, false otherwise.
   */
  equals(other) {
    return this.value === other.value;
  }
};

// src/domain/entities/Resistor.js
var Resistor = class extends Element {
  /**
   * Creates an instance of Resistor.
   * 
   * @param {string} id - The unique identifier for the resistor.
   * @param {Position[]} nodes - The two node positions for the resistor.
   * @param {Label|null} label - The label of the resistor (optional).
   * @param {Properties} properties - A container for the resistor's properties, including resistance.
   */
  constructor(id, nodes, label = null, properties = new Properties({ resistance: void 0 })) {
    if (nodes.length !== 2) {
      throw new Error("A Resistor must have exactly two nodes.");
    }
    if (!(properties instanceof Properties)) {
      throw new Error("Properties must be an instance of Properties.");
    }
    const resistance = properties.values.resistance;
    if (resistance !== void 0) {
      if (typeof resistance !== "number") {
        throw new Error("Resistance must be a number or undefined.");
      }
      new Resistance(resistance);
    }
    super(id, nodes, label, properties);
    this.type = "resistor";
  }
};

// src/domain/entities/Wire.js
init_Element();
init_Properties();
var Wire = class extends Element {
  constructor(id, nodes, label = null, properties = new Properties()) {
    super(id, nodes, label, properties);
    this.type = "wire";
  }
};

// src/domain/entities/Capacitor.js
init_Element();
var Capacitor = class extends Element {
  constructor(id, nodes, label = null, properties) {
    super(id, nodes, label, properties);
    this.type = "capacitor";
  }
};

// src/domain/entities/Inductor.js
init_Element();
var Inductor = class extends Element {
  constructor(id, nodes, label = null, properties) {
    super(id, nodes, label, properties);
    this.type = "inductor";
  }
};

// src/domain/entities/Junction.js
init_Element();
var Junction = class extends Element {
  constructor(id, nodes, label = null, properties) {
    super(id, nodes, label, properties);
    this.type = "junction";
  }
};

// src/domain/entities/Ground.js
init_Element();
var Ground = class extends Element {
  constructor(id, nodes, label = null, properties) {
    super(id, nodes, label, properties);
    this.type = "ground";
  }
};

// src/gui/renderers/ElementRenderer.js
var ElementRenderer = class {
  /**
   * Creates a new ElementRenderer instance.
   *
   * @param {CanvasRenderingContext2D} context - The 2D rendering context for the canvas
   */
  constructor(context) {
    this.context = context;
    this.showAlignmentGuide = false;
    this.alignmentGuideColor = "red";
    this.alignmentGuideSize = 4;
  }
  /**
   * Renders a terminal as a small circle.
   * @param {Position} position - The terminal's position.
   */
  renderTerminal(position) {
    this.context.fillStyle = "black";
    this.context.beginPath();
    this.context.arc(position.x, position.y, 2, 0, Math.PI * 2);
    this.context.fill();
    if (this.showAlignmentGuide) {
      this.renderAlignmentGuide(position);
    }
  }
  /**
   * Renders a label at a given position.
   * @param {string} text - The label text.
   * @param {number} x - X-coordinate.
   * @param {number} y - Y-coordinate.
   */
  renderLabel(text, x, y) {
    this.context.fillStyle = "black";
    this.context.font = "9px Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(text, x, y);
  }
  /**
   * Formats a component value with its unit for display
   * @param {string} propertyKey - The property key (e.g., 'resistance', 'capacitance')
   * @param {number} value - The numeric value
   * @returns {string} Formatted value with unit (e.g., "10 Ω", "1.5 μF")
   */
  formatValue(propertyKey, value) {
    if (value === void 0 || value === null) return "";
    const formatters = {
      resistance: (val) => this.formatWithPrefix(val, "\u03A9"),
      capacitance: (val) => this.formatWithPrefix(val, "F"),
      inductance: (val) => this.formatWithPrefix(val, "H"),
      critical_current: (val) => this.formatWithPrefix(val, "A")
    };
    const formatter = formatters[propertyKey];
    return formatter ? formatter(value) : `${value}`;
  }
  /**
   * Formats a number with appropriate SI prefix and unit
   * @param {number} value - The numeric value
   * @param {string} unit - The base unit (e.g., 'Ω', 'F', 'H')
   * @returns {string} Formatted string with prefix and unit
   */
  formatWithPrefix(value, unit) {
    if (value === 0) return `0 ${unit}`;
    const prefixes = [
      { threshold: 1e9, symbol: "G" },
      { threshold: 1e6, symbol: "M" },
      { threshold: 1e3, symbol: "k" },
      { threshold: 1, symbol: "" },
      { threshold: 1e-3, symbol: "m" },
      { threshold: 1e-6, symbol: "\u03BC" },
      { threshold: 1e-9, symbol: "n" },
      { threshold: 1e-12, symbol: "p" },
      { threshold: 1e-15, symbol: "f" }
    ];
    const absValue = Math.abs(value);
    for (const prefix of prefixes) {
      if (absValue >= prefix.threshold) {
        const scaledValue = value / prefix.threshold;
        const formattedValue = scaledValue % 1 === 0 ? scaledValue.toString() : scaledValue.toPrecision(3);
        return `${formattedValue} ${prefix.symbol}${unit}`;
      }
    }
    return `${value.toExponential(2)} ${unit}`;
  }
  /**
   * Renders element properties (label and/or value) below/beside the component
   * @param {Object} element - The element to render properties for
   * @param {number} centerX - Center X coordinate of the component
   * @param {number} centerY - Center Y coordinate of the component
   * @param {number} angle - Rotation angle in radians
   */
  renderProperties(element, centerX, centerY, angle = 0) {
    if (!element || typeof element.getProperties !== "function") {
      return;
    }
    const label = element.label ? element.label.value || element.label : null;
    const properties = element.getProperties();
    if (!properties || !properties.values) {
      return;
    }
    const primaryProperty = this.getPrimaryProperty(element);
    const propertyValue = primaryProperty ? properties.values[primaryProperty] : null;
    let displayText = "";
    if (label && propertyValue !== void 0 && propertyValue !== null) {
      const formattedValue = this.formatValue(primaryProperty, propertyValue);
      displayText = `${label}=${formattedValue}`;
    } else if (label) {
      displayText = label;
    } else if (propertyValue !== void 0 && propertyValue !== null) {
      displayText = this.formatValue(primaryProperty, propertyValue);
    }
    if (!displayText) return;
    const { textX, textY, textAlign } = this.calculateTextPosition(centerX, centerY, angle);
    this.context.save();
    this.context.fillStyle = "black";
    this.context.font = "9px Arial";
    this.context.textAlign = textAlign;
    this.context.textBaseline = "middle";
    this.context.fillText(displayText, textX, textY);
    this.context.restore();
  }
  /**
   * Gets the primary property key for a component type
   * @param {Object} element - The element
   * @returns {string|null} The primary property key
   */
  getPrimaryProperty(element) {
    const typeMapping = {
      resistor: "resistance",
      capacitor: "capacitance",
      inductor: "inductance",
      junction: "inductance"
    };
    return typeMapping[element.type] || null;
  }
  /**
   * Calculates text position based on component center and rotation
   * @param {number} centerX - Component center X
   * @param {number} centerY - Component center Y
   * @param {number} angle - Rotation angle in radians
   * @returns {Object} Text positioning info {textX, textY, textAlign}
   */
  calculateTextPosition(centerX, centerY, angle) {
    const verticalOffsetDistance = 18;
    const horizontalOffsetDistance = 18;
    const normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const isVertical = normalizedAngle > Math.PI / 4 && normalizedAngle < 3 * Math.PI / 4 || normalizedAngle > 5 * Math.PI / 4 && normalizedAngle < 7 * Math.PI / 4;
    if (isVertical) {
      return {
        textX: centerX + verticalOffsetDistance,
        textY: centerY,
        textAlign: "left"
      };
    } else {
      return {
        textX: centerX,
        textY: centerY + horizontalOffsetDistance,
        textAlign: "center"
      };
    }
  }
  /**
   * Optional: Renders an alignment guide (e.g., a small cross) at a given position.
   * This can be used to visualize the grid intersections.
   * @param {Position} position - The position to mark.
   */
  renderAlignmentGuide(position) {
    const ctx = this.context;
    const size = this.alignmentGuideSize;
    ctx.save();
    ctx.strokeStyle = this.alignmentGuideColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(position.x - size, position.y);
    ctx.lineTo(position.x + size, position.y);
    ctx.moveTo(position.x, position.y - size);
    ctx.lineTo(position.x, position.y + size);
    ctx.stroke();
    ctx.restore();
  }
  /**
   * Get the rotation angle in radians from element properties.
   * @param {Object} element - The element with properties.
   * @returns {number} Rotation angle in radians.
   */
  getElementRotation(element) {
    const orientationDegrees = element.properties?.values?.orientation || 0;
    return orientationDegrees * Math.PI / 180;
  }
  /**
   * Apply element rotation to the canvas context.
   * This should be called before drawing, and must be paired with restoreRotation().
   * @param {Object} element - The element with rotation properties.
   * @param {number} centerX - Center X coordinate for rotation.
   * @param {number} centerY - Center Y coordinate for rotation.
   */
  applyRotation(element, centerX, centerY) {
    const rotation = this.getElementRotation(element);
    if (rotation !== 0) {
      this.context.save();
      this.context.translate(centerX, centerY);
      this.context.rotate(rotation);
      this.context.translate(-centerX, -centerY);
      return true;
    }
    return false;
  }
  /**
   * Restore canvas context after rotation.
   * Only call this if applyRotation() returned true.
   */
  restoreRotation() {
    this.context.restore();
  }
  /**
   * Abstract method for rendering an element.
   * @param {Object} element - The element to render.
   */
  renderElement(element) {
    throw new Error("renderElement() must be implemented in derived classes.");
  }
};

// src/utils/getImagePath.js
init_ElementRegistry();

// assets/C.png
var C_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAACVklEQVR4nO3dwWnEMBBAUW1wLzok/VeSHFSN0kHwQhbxk/ca8PgwHwkMfuy9B0DB2+kBAO4SLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8i4Tg/Ac+acL/9V91rr8epn3PXf3pefOWEBGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpBxzTnfTw8BJ9mBjmuM8Xl6CDjMDkS4EgIZggVkCBaQIVhAhmABGYIFZAgWkHGNMT5OD8FTfDP0++xAxLXW+jo9BPfNOU+P8OfYgQ5XQiBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIOOx9z49A8AtTlhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkfANboxp4RlTMaQAAAABJRU5ErkJggg==";

// assets/C_hover.png
var C_hover_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAACoklEQVR4nO3csW0UURhG0d9o5Coc4GgyIqiDWqkDIrKJ7MBVIKSlAXuxk317tec08L6XXOkFM3en02kACj6tHgDwXoIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZ2+oBnLfv+zYzDwsnvBzH8fdSh93affkYwbp+DzPztPD8x5l5vuB5t3ZfPsCTEMgQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMrZ933+uHsFZ96sH3Jgf+77/WT2C120z83X1CLgiX1YP4G2ehECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpCxzcyv1SM46358kHtJv2fG3xqu1HYcx7fVI3jbvu+fZ+Zp9Y4b8v04jufVI3idJyGQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpCxrR7Af73MzOPi8y993i3dlw+4O51OqzcAvIsnIZAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGf8AVEknfwHMjjoAAAAASUVORK5CYII=";

// assets/C_selected.png
var C_selected_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAADPUlEQVR4nO3dvWodVxSA0XODiryHhKawGnXpUgR1gQRXqVPnmfwIxoF0IoU7d2rsYsB6j3TjInFSOCgyYX4+a636wt4Dmo974Fx0WpZlABR8tfcCAI8lWECGYAEZZ1sMub0bX48xzreYBezi/uZ6/LH2kE2CNf6M1duNZgHbuxpjvFt7iCMhkCFYQIZgARmCBWQIFpAhWECGYAEZW93Deowfxxjv914C+MTFGOPV3kuMcaxgvb+5Xv/iGfB5bu/23uAfjoRAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkHOm3hDzCNE2r/6vueZ5Pa894rKf2vDzMNywgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjLOpml6tvaQ777/+fybb58/+Jk3r1+e//LTi7VXgU9s8Q6UHen9PV1eXi6rTyFlnufT3jt8NE2Tv0/+5kgIZAgWkCFYQIZgARmCBWQIFpAhWEDG2Rjjau0hf108+/Whz7x5/fKH3397cb/2Ll+At3sv8AVa/R0oO9L7e1qW9e/l3d6NZ+O/X7Srm+vxbvVl4ra4SPnULo4e6XmP6EjvryMhkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQcbb3AnyeeZ5Pe++wpaf2vDzMNywgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCDjSDfdL27v9l4B+BcXey/w0ZGC9WrvBYBjcyQEMgQLyBAsIEOwgAzBAjIEC8gQLCBjq3tY92OMq41mAdu732LIaVmWLeYA/G+OhECGYAEZggVkfAAITlpuCh/66gAAAABJRU5ErkJggg==";

// assets/C_hover_selected.png
var C_hover_selected_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAADf0lEQVR4nO3csU4UURTH4YOuhMrG1kICYQuJlT6HlpY8CCUPso/Ae2hloJgEIoWFjTGxIitkLYwWQoCN2Xvnn/2+epNzhmR+mxtmZ2OxWBRAgke9FwB4KMECYggWEGPSYsjhbL5VVTstZgFdnB8dbF6uekiTYNXvWJ00mgW0t19Vp6se4kgIxBAsIIZgATEEC4ghWEAMwQJiCBYQo9VzWA/xrqrOei8B3LBbVce9l6gaV7DOjg42V/7gGbCcw9m89wp/ORICMQQLiCFYQAzBAmIIFhBDsIAYggXEGNNzWNxiOp1Oqup5xxW+DMNw1WrYul0vyxGs8XteVZ87zt+uqouG89btelmCIyEQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIMbG3t7eh1UPefxka+vps539uz7z49v5yfXPy8tV7xJos6pedZy/PQzDRath0+n0RVV9bjXvFp+qat5x/uiM6f6dVNXrVQ+5/nlZ37+e3vexO/8g0EjPL4dRGtP960gIxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4gxqaqPqx4ypl97B+r9toZ1420N/xjT/TsZhuHNqocczuYvq+rkno+9PzrYvPcn4etmBK9bWTdvW75OJ8GY7l9HQiCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYkx6L8C9vlTVduf5reet0/WyBMEauWEYrqrqovcerazb9bIcR0IghmABMQQLiCFYQAzBAmKM6b+Eu4ezee8dgJt2ey/wx5iCddx7AWDcHAmBGIIFxBAsIIZgATEEC4ghWEAMwQJitHoO67yq9hvNAto7bzFkY7FYtJgD8N8cCYEYggXEECwgxi9MbH22Hl5sTQAAAABJRU5ErkJggg==";

// assets/G.png
var G_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAACnklEQVR4nO3csW0cMRBAUcowDDfh6IJN1ItrdS92wOAiNSE4WQcuQJtQxL97L2Yw0QcGIOblPM8BUPBl9wAAVwkWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWEDG190DANccx/F9jHH74Nl9zvn+GfPsIFjQcRtj/P7gzesY488nzLKFlRDIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIMOJZFjA/fU1BAvWePr76ytYCYEMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMpxI5um5v94hWOD+eoaVEMgQLCBDsIAMwQIyBAvIECwgQ7CADMECMnwchY5vF97cjuNYPsguggUdPy68+bV8io2shECGYAEZggVkCBaQIVhAhmABGYIFZPiHBR1vF978HGPcVw+yi2BBx98Lb+5zzoc95WwlBDIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADB9H4f/P8NcLb9hMsHh6c873McbD/g5/JFZCIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMJ5JhDXfiFxAsWMCd+DWshECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGU4kQ8fT34l/Oc9z9wwAl1gJgQzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvI+Acm8DM/bTPCuQAAAABJRU5ErkJggg==";

// assets/G_hover.png
var G_hover_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAACp0lEQVR4nO3cMWrcUBRA0e+QxmmzAleCqZ31eG1ZT/oBVdlFUipFXBtbaPi6nnN6wasuPPh6D9u2DYCCL7MHAHgvwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CAjK+zBwDetizLzzHGZcen13VdX46eZybBgvO7jDGeZw9xBlZCIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMJ5LhQO6v35ZgwbHcX78hKyGQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIYTydwt99d7BIt75v56jJUQyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyPByF83va+d1lWZZfh04ymWDB+T3u/O7b+GQv+a2EQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkOHnZzi/v+P/j8wf9WeMcT14lqkEC87v9xjj+47vruu6/jh6mJmshECGYAEZggVkCBaQIVhAhmABGYIFZAgWkOHhKPds7yvwT/V6vESwuFvrur7MnoGPsRICGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQ4kQzHcif+hgQLDuRO/G1ZCYEMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMpxIhvNzJ/7Vw7Zts2cAeBcrIZAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVk/AMR8itcyxr7gwAAAABJRU5ErkJggg==";

// assets/G_selected.png
var G_selected_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAADXElEQVR4nO3cIYsdVxiA4ZNQSv9E1C5cExNXV1HiCmmrIqqq6/Mraiv3J4QE1i0r4uLWtGIgV/VPhJhbkZaKLpspuTNzX/Z59MA56oWPOXwPDofDACh4uPUFAOYSLCBDsICML9Y45OpmfDXGOFvjLGAT+6dPxvulD1klWONjrH5f6SxgfY/HGH8sfYiREMgQLCBDsIAMwQIyBAvIECwgQ7CAjLXeYc3x/Rjj3daXAP7jfIzxautLjHFawXr39MnyD8+A/+fqZusb/MtICGQIFpAhWECGYAEZggVknNJfQuAOu91uzl65/TRNi++l2opgQcecvXKr7KXaipEQyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCDDimRYgP3ryxAsWMa937++BCMhkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGFcnce/avdwgW2L+eYSQEMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMD0eh48sZ35ztdrujHvrtdz+fff3Nj3d+8/bNy7Nfnl8c9dzbCBZ0PJrxzetjH3p9eTGuLz8Zo6OfexsjIZAhWECGYAEZggVkCBaQIVhAhmABGd5hQcefM755NsbYH/PQvx+O3vnO6u2bl8+uLy+Oeu5tBAs6Psz4Zj9N01FXOV/dfPqbH356sf/t1xeLr5A2EgIZggVkCBaQIVhAhmABGYIFZAgWkCFYQIaHo/DxZfjjGd+wMcHi3pum6f0YY/FX2nw+IyGQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIYVybAMe+IXIFiwAHvil2EkBDIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIsCIZOu79nnjBggh74o2EQIhgARmCBWQIFpAhWEDGKf0lPL+62foKwC3Ot77AP04pWK+2vgBw2oyEQIZgARmCBWQIFpAhWECGYAEZggVkrPUOa84eH6BrlT1cDw6HwxrnAHw2IyGQIVhAhmABGX8B3hpgGk/QWyYAAAAASUVORK5CYII=";

// assets/G_hover_selected.png
var G_hover_selected_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAADdElEQVR4nO3cv0pbYRjH8cf+Eduhi1dQFALWsb2Pjt30QhyF3obdCl28j64qHDB07SIFhzYokg7adrAYzUnOOT/8fOaE552+8IY3z8p0Oi2ABE/6PgDAfQkWEEOwgBjPuhiyd3CxVlUbXcwCejHe312dLHtIJ8Gq61gddTQL6N52VR0ve4grIRBDsIAYggXEECwghmABMQQLiCFYQIyu3mHdx/uqOu37EMAtm1V12PchqoYVrNP93dWlPzwDHmbv4KLvI/zlSgjEECwghmABMYb0GxbwH6PR6FNVbc3x1ZOmaXYWfZ4+CRYM31ZVve37EEPgSgjEECwghmABMQQLiCFYQAzBAmIIFhBDsIAYggXEECwghmABMQQLiCFYQAzBAmIIFhBDsIAYggXEECwghhXJsED2ry+XYMFi2b++RK6EQAzBAmIIFhBDsIAYggXEECwghmABMQQLiCFYQAzBAmIIFhBDsIAYggXEECwghmABMQQLiCFYQAzBAmJYkcyjZf96HsHiMbN/PYwrIRBDsIAYggXEECwghmABMQQLiCFYQAzBAmJ4OArD93rO722NRqOvbYc/fb629mp9487PnJ+NP3/5OJm0nTWLYMHwvZjzey9rAS/5ry4n9eP78ayPbbedcx+uhEAMwQJiCBYQQ7CAGIIFxBAsIIZgATEEC4ghWEAMwQJiCBYQQ7CAGP78DMP3q67/yPxQP6vqpO3wm20Nd/65+fxsfHR1aVsDUPWtqtbn+N5J0zTv2g7fO7h4U1VHMz72YX93deZKh7ZcCYEYggXEECwghmABMQQLiCFYQAzBAmIIFhDDw1Ees3lfgbd+Pc58BItHq2manb7PwMO4EgIxBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIYUUyLJY98UskWLBA9sQvlyshEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBiCBcQQLCCGYAExBAuIIVhADMECYggWEEOwgBhWJMPw2RN/Q7Bg4OyJ/8eVEIghWECMIV0JN/cOLvo+A3DbZt8H+GNIwTrs+wDAsLkSAjEEC4ghWEAMwQJiCBYQQ7CAGIIFxOjqHda4qrY7mgV0b9zFkJXpdNrFHIDWXAmBGIIFxBAsIMZv17RayekPNnsAAAAASUVORK5CYII=";

// assets/J.png
var J_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAAFlklEQVR4nO3dMW6UVxSG4eMoBYrYAC2Fp0ia1OkjNuA1ZE3ZCRugTj0NLRuwEN2k8H8lg8bD2B773nPO80gIRPXryN+rMcIzV4fDIQAy+GX2AwCcS7CANAQLSEOwgDQEC0hDsIA0BAtIQ7CANAQLSEOwgDQEC0hDsIA0BAtIQ7CANAQLSEOwgDQEC0hDsIA0BCu53W73ZvYzZOFW+QlWYrvd7q+I+Lz9zgluVYNgJbUN72NEvIuIj4b4MLeqQ7ASujfAt9tfvQ1DPMqtahGsZI4McDDEH7hVPYKVyIkBDoa4cauaBCuJMwY4tB+iW9UlWAk8YoBD2yG6VW2CtbgnDHBoN0S3qk+wFvaMAQ5thuhWPQjWoi4wwKH8EN2qD8Fa0AUHOJQdolv1IliLeYEBDuWG6Fb9CNZCXnCAQ5khulVPgrWIVxjgkH6IbtWXYC3gFQc4pB2iW/UmWJNNGOCQbohuhWBNNHGAQ5ohuhUREVeHw2H2M7S0vfvl57h7j6bZbiPiw36//zT7QY5ZIFb3fYmI9/v9/tvsB+nIK6xJti/4m7iLxWzLvnpYLFa3EXEjVvMI1kTbK5oPIVpHLRirZV+FdiFYk4nWcWLFMYK1ANH6nljxEMFahGjdEStOEayFdI+WWPEzgrWYrtESK84hWAvqFi2x4lyCtagu0RIrHkOwFlY9WmLFYwnW4qpGS6x4CsFKoFq0xIqnEqwkqkRLrHgOwUoke7TEiucSrGSyRkusuATBSihbtMSKSxGspLJES6y4JMFKbPVoiRWX5i2SC1gxDNufl3omscpPsIpYLFpft99/m/oUd8SqEMEqZLForUCsivFvWIUs9m9as4lVQYJVjGhFhFiVJVgFNY+WWBUmWEU1jZZYFSdYhTWLllg1IFjFNYmWWDUhWA0Uj5ZYNSJYTRSNllg1I1iNFIuWWDUkWM0UiZZYNSVYDSWPllg1dnV9ff377Idgmj8j4t9Y44eUz/E1Iv6JiP9mPwhzXF1fX/vpZyAF3xICaQgWkIZgAWkIFpCGYAFpCBaQhmABafwaEX/Mfgim8R9HScWn5jSV+BN2/GhOY74lbChxrCKOfMI0fQhWM8ljNYhWU4LVSJFYDaLVkGA1USxWg2g1I1gNFI3VIFqNCFZxxWM1iFYTglVYk1gNotWAYBXVLFaDaBUnWAU1jdUgWoUJVjHNYzWIVlGCVYhYfUe0ChKsIhaL1dft12yiVYxgFbBYrG4j4u/t1wqfeyhahQhWcgvG6sN+v/+02Ie1ilYRgpXYqrEafyFaXJpgJbV6rAbR4pIEK6EssRpEi0sRrGSyxWoQLS5BsBLJGqtBtHguwUoie6wG0eI5BCuBKrEaRIunEqzFVYvVIFo8hWAtrGqsBtHisQRrUdVjNYgWjyFYC+oSq0G0OJdgLaZbrAbR4hyCtZCusRpEi58RrEV0j9UgWpwiWAsQq++JFg8RrMnE6jjR4hjBmkisThMtfnR1OBxmP0NLu93uTUR8joh3s58lFozVfYuF/UtEvN/v999mP0hHXmFNsn3B38T8Vw9LxypiqVdatxFxI1bzCNZECwxx+VgNbkWEYE03cYjpBuhWCNYCJgwx7QDdqjfBWsQrDjH9AN2qL8FayCsMscwA3aonwVrMCw6x3ADdqh/BWtALDLHsAN2qF8Fa1AWHWH6AbtWHYC3sAkNsM0C36kGwFveMIbYboFvVJ1gJPGGIbQfoVrUJVhKPGGL7AbpVXYKVyBlDNMCNW9UkWMmcGKIB/sCt6hGshI4M0QAf4Fa1CFZS94b4JQzwJLeqwzuOJrfb7d54Q7nzuFV+ggWk4VtCIA3BAtIQLCANwQLSECwgDcEC0hAsIA3BAtIQLCANwQLSECwgDcEC0hAsIA3BAtIQLCANwQLSECwgDcEC0vgf6lo0VT25A1kAAAAASUVORK5CYII=";

// assets/J_hover.png
var J_hover_default = "data:image/png;base64,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";

// assets/J_selected.png
var J_selected_default = "data:image/png;base64,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";

// assets/J_hover_selected.png
var J_hover_selected_default = "data:image/png;base64,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";

// assets/L.png
var L_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAAcpklEQVR4nO2debgeRZWH38QAQtiEYZd9qQGUVVEchECMsqMgAjpBQFFBBKMigzDMAwMqiMiAKMqorKOgoogsypYAKiIQULYDBAJEQMGwJiQEcuePqg8/vnzd5/R2c/ve8z7PfZJ7u7pPL9W/PnXqVNWogYEBHMdx2sDohX0CjuM4VlywHMdpDS5YjuO0Bhcsx3FagwuW4zitwQXLcZzW4ILlOE5rcMFyHKc1uGA5jtMaXLAcx2kNLliO47QGFyzHcVqDC5bjOK3BBctxnNbgguU4TmtwwXIcpzW4YDmO0xpcsBzHaQ0uWI7jtAYXLMdxWoMLluM4rcEFy3Gc1uCC5ThOa3DBchynNbhgOY7TGlywHMdpDS5YjuO0Bhcsx3FagwuW4zitwQXLcZzW4ILlOE5rcMFyHKc1jFnYJ7CwCSGMAlYBVgfe2vXvfOBx4FrgfhEZaPAcFgHWAjZIP+sA84AZwA3AXSIyvyn76RyWBzYDNgXWJV7/dOAPwB0iMqdh+28GtgC2Jt6L0cA04E7i9f+jYfujidc/jvj8FwEeBh5IP9NFZF6D9kcB/wq8j1gHRxOf/+Nd/z7ZZD1sA6MGBkbm9YcQVgO+DHwYWFUpPg34NXA5cJOIvFKD/aWBzwD7AJuQ//GYSRSu64DLROSJGuwvAuwJ7AdsSXxJs3gFmAr8HviJiNxa1X46h62AfYH3AJsDi+YUnwHcDvwYuLQO8Uh1YHdgPLA9sFxO8VeBPwMXA98VkRdrsL8o8F5gt/SzjrLLE8DPgJPrqANtZMQJVghhOeA/gM8Bby5xiL8DXwfOEJHXSth/E3AgcCKwUgn784AfAEeJyAsl9ieEsC3wHWDjMvsD1wCfFpFHStpfG/geMKGk/XuAQ0TkppL2lwZOBj5B9KSK8jfgGODcCnXgcGI9XLGE/TnAGUThmlli/9YyYgQrhDAW+DxwJLBMDYe8EfiYiMwocA7bA98iNruqMh04QESmFLC/EvANYGIN9mcDXwG+bX1p04t6GPBVYIkazuF84Msi8jfrDiGE7YDzgDVrsH8nMElEJhewvzpwIbBtDfafJz7P00VkVg3HG/KMCMEKIWwC/BxYr+ZDzwQOEpHLFPvLED2KfWq2PwCcBhybF2NK8ZFPEz3DOsS6m1uAT4jIvXmFQggbET3Dd9ds/3mip/K9vPhOipGdBEwCRtV8DhcTPc7n8wqFEPYAfkh+07MMDwF7ishfaj7ukGPYC1YIYQti4PwtDZr5NnBkP9FITdDrqceryuJeYO9+opG8mv8FDmjQ/ivAp0TkvH4bQwgfB75PfoyqKucShXOBzokklj8FNmrQ/l3ADv2aaEksTwU+26D9mcAEEbmjQRsLnWEtWCGEdxDjLcsOgrnfATt1B2OTZ3Ut8I5BsP8ssE23aCXP6izgkEGwD7CfiPyk+w8hhP2A/xsk+98BDuv2tEIIGwM30ewHq8OfiKLxuqeV4mVXAv82CPafS/ZvGwRbC4Vhm4cVQngXUSwGQ6wgVsiLUvc4IYSlgKsYHLGC+EJeEULoDuL+N4MnVgDnpTgdACGEHYjxosHiUOCELvsrAVcwOGIF8E7gyvTsO97tRQyOWEGs69em3tdhybD0sEIIWwO/AZYqsftLxC70lShX0b9KjJVcRbnA6jxiGsUyxPywotwC7EAUqm+W2H8AeJDYe7Z2if1fALYhxoluApYucYxHiPdhfcrFm74AnE1MBXlXif2fJMbG1qVcL+IUYGfgWODoEvs/S+yJfCuwZIn9XwB2FJE/lNh3SDPsBCuEsB5wG8WCy7cAxwG3Ai+IyEAIYQwxP2g3YrB89brPtYsZwH8Bk4HHROTVrkTC8cRcqfc0aP9l4BSiyN7d6XEKIaxMDJLvST09i3lcAFwK3CIiTyX7Y4G3AzsCR1EuDcXK74k5XteREoVTHViDmEx6ArBag/YfJwbvLwd+31UHlga2SvaLdFg8D7xDRB6q/UwXIsNKsFJzbArxC2/hbmI+zeVKD9NSxPjIv1c+yTcym5gPdKqIzM6xP5qYt/N1YLGaz+FXwBEiMj2vUAhhPHAO5byuPB4BDhaR6xT7awP/Q/yA1MlcYi/jGXmjCZJ4fomYbFxHSkY3FwCfzUtGTeK1O9F7t+bP3Qxs1/QoicFkuAnWYcCZxuI/ASaKyKsFjr8/UbjGlji9Xu4hBukfL2B/I2Ll3qIG+y8Srz83JaPH/lhiwuvna7APcDoxJcOcQ5RSAy6kXFOpl9uB/bWUjB77qwNXU0+P4yxiAuwFBeyPIdaBfY27HCYiZ5U5uaHIsBGsEMJaRI/JIiYXEZMuzWLVZWcDYrMhbyiLxgPEL99TJewvQmw2fKCC/bnEGMfkMjuHEI4lBvSrcKyInFTS/vbE5msVb/NqYPcyQ3xSU3kKcdxnWWYA40XkgRL2xxA7Mz5qKD4LeJvmQbeFYdFLmNzlc7CJ1fnAx8uIFUCqYHsQ4z5leJiYr1NYrJL9ecBHiOJchteAj5QVq8RJxETYspxN7JwohYjcQIwrFh4Wk7gb2KfseMT07MYTm7NleBnYo4xYJfuvAvsTPS2NscD30zvSeoaFYAEHEUe5a1xEzEwvW9EBSMl5B5bY9TGiWP21ov0XgF2JPUlFOUhEflXR/gBxiE2Z41xGT65UyXO4jDgWsCh/A3YtOw6zy/4MYm+suUnfxQFVEzxTHT4QW47bBMrV1yFH65uEIYRVgPvQewUfJbrGL9Vo+0Ri0N7CfGArEbm9RvtbEZsm1t6zY0SktGfTx/4SxOaxtffqFmIzKLODocQ5fIXo8Vl4mdgU/1ON9rck9i5bP/4nish/1mh/KaLHuIZS9HlgQxF5si7bC4Ph4GEdgy2F4eA6xSpxHHFYioWz6xQrgDTNy5cK7HJKzfZnY4ujdNivTrFKFLmmL9UpVgDpmVqbx3OJ6St12n8RONhQdBniYPVW02rBSuP0LK7uD0Xkmrrtp+7ix4zFn67bfmL5AmWb6N4u0ltXJpFXo8g1FblXRbA+20ebSDEQkd8CPzIUPSi9M62l1YJFnIFAy4l5EvhiE8ZDCJtjnwHiiLorS5oArsjQm/3qtJ8o8tVu4gtf5JoOSb2stZFmaj3CWHyDEMJmddrv4ouA1pGzBPCphuwPCq0VrPSyfs5Q9BARea6h0zi8QNlliUNG6uSDwMoFyltfLBNp3OJeBXbZK4SwQp3nQLGcsFWI96xOJlFsVEWROmNGRJ7F9vH6XHp3WklrBYvYra2Ntbu5SGJkEdLLWiR+A3BgGhBbF0WnK3lnmhusLg6g2Fi7RahxmpsQwqYUH1xe2xQvKR/qoIK7fbQB0QZARH5JnDUkj1WJaTGtpJWClXJKLN7KaQ2exqcoPr/TqpSfFvgNhBDeTrnB1WVSAfrZH01skhfl050ZLWqgzLVsF0J4W032J1B8gPpiNNsss9T5L7Q1L6uVgkVcMECLBUyjXJ6QSnKpDy25e135MGXtT0wTylVlPPqiCf1Yl5i/VIl0DWXHdpa9d72UfZaH1h1L6+IyYnJyHpsTB3S3jrYKliVucXrVBNEc9qLc1C8AHwwhVJqfKU0MWHb2hLdQTxynjHdVx74dPkT5ea4mpon1SpM6UPYoufuqFIv9mUl1/nRD0UlN2G+a1glWetl3Uoo9R5wytymqfKEXxT5wNYuJVBuA/ckqxtNYurIvK0TRLtJZ0I8q17Ak1afL2ZdqUz7X5eX140fERNE8dgohDNbklrXROsEizo2kLQD7vQaSRIHXg+1VZ5A8YCHvPz6EUKY51+FAqi3CO4YKTeMQQh3NyqpN8wMq7r9Ng8H3l9CTWccQ36VW0UbB0uZDmo99ipky7Ej1VVe2SlPFFCZ5JltWtA/VXriqHmLVYxxQg/0t0xTKhUnzxL+zov1RNCsYZ6In1dY9t1jjtEqwUqByZ6XYzVUHFyto9udhy3cq2yR5v6HMEehDhko16ZJgaqkRVxAXXshjk7KCQZzILo+52J6B5V72wxLsP5xYF/LQ6lJp0uBsLcVh5waD/43QKsEiziSqJeld3pTxlHejzUN1I3H9Pa1JWvZl0b7Kc4nLel2qlNukZJPEMivGOcRlveo41htITXJNMC8l3oO5SrmyHo5WB14irj+orUy9Y6pTTaG9C8syeAtk1ELbBEv7skKDggVsjb4KzxVpBs2fKuU2Kxr0TEmnmtDdmAYYW+ZKGlfEfkLLI5sL/Ja4vJrm5ZXJSRtnKHNBugeaYLy/aE5YemZaSs0lqQ5coZRblvoXlu3G8i5Y3qkhQ2sEKyW6aW3uB0REGjwNiwvfaQr9XCk3Gvvc8x22QB/Ae3X6dwqgTVJYKHCdnoEmMjeLyMtJMG5Wyk4okcConfM8opcL/7wXWfwLxaebfi96DLPj3WrNYmiwWQgIcQWkPHZrUxJpawSLuILMukqZJr0rgF2U7dOI0x9DfFm1oOd2Be1bmjBXA6Qv/C1K2aI9bRuh559dk/H/fqwKbFjwHLRzvqVrjnhNsKB4s1B7ZvP5p2cn6EmcWp0qTZokUXsn1gNCU+dQN20SLMsc5k3Gr1YnLjmVx5WdmTTT6r9TlfLjCp6G9nLNIE5m2OF6pfwGIYQic9NbmnBFBMt6TOD1Z7C+Uqz7mu8FtA6YooI1Ttl+R2c201QXLJ0PTS4hZ3knWpPe0CbB0ga5PoveK1KFcYYyvTGLKUr5LawZ1yl2osU7ru6Zejh36azE9nqR19HE5Rngzq7fpwL/qHjMbizn+vo1p3uheVlbW2OJaYTB5kqx3meuxbGg2WEyvyO+G3nUkSYzKLRJsLRA57VlF5YwsqmyfTYLVtbJyj5F4lhboT+v3/T8/kf0xTJMzcLU/a01h67rnqAu/V8TzXEFuta1c32ZeM3d9N6TXkYT762FbdCfweSe36egP4M6Z9B4A2mhjWuVYk3N0VU7rRCsEMLixBhWHrVOP9wHrVL9UUTm9PztJuLS73lY41jaDAMLiIOIzEUPfFs9rIA+HKhfE1BrFo7FvlzWOGX7TSLS2zN5LXos0bowqfasBui53yLST0R7aUywEtqCFxvWNCC+cVohWMSXVZtH6k5le1W0SvXn3j+kiQO187J6WNpL9UCaxK0XLY61prFZagmO97NlaZaqx07nuGZR++meaD1lVsHScpamZkwWuUDd6KFpwdLq4JvQP4hDgjFpmMFQx9L125hgpYxsLSs7q1JOIT/uYe2h0SrUPRl/1zwsiIFszUPVROVFYHqfv08nJlLmzf1uEUOLF5YVw7yH/PtsfVk1Lz8rZqkJ1sohhBVF5O/G8yiK5d3YOYRQdq3NQWMM5RfkHEo8LSJl1uizovUOQnalvE3Zb/kQwlsyvCPg9cnytLGHWc/xfmU/iC9zVcG6v99agyIyEEK4n/xOE4tgWYT9voy/3w3smbPfxiGEUXlrJabpZLQ5+bPuoSZYEOuYxRstjIg8FUJ4hph3lsXx6WdI05YmoYblpayCJljziV3o/XjIcHxtIYs10Fen6ethicgzwExlX4sYaKKSJRbaNsuxQT/Hf4hIVo9klvfZYUn0df0si41kNT3vQY9lWj6KVWj6HRkUXLBsaDGGB3PW29PiJ6C/DJZme56nrC2JnisGaUiQJhhVBCsYhsho9vOu0dKK0O5xacFKdUOrB03HsVywhhALW7AyXX4RmYmeB6MlQ2oxlnnke3LacCUtPrQm+urSVQRrcfSAunaOedf4IPrMCdo91p7RzLxmPQs/8O6CNYTQXoiqaC+LVhm1r2tVD+v+lG+ThSpYyngyS5OtimDl2kjeV2nBSvdGuwdVPSztGWt1pOnhMU2/I4PCcBGsx5s6cMoB0+JH2sugxbG0l2EtZbsWo9GahGOB1XK2a71jr5A/Zm4auoeTJ4qroS+Yq12jdo/WUrZrz0h7xlodWbLhXKjG3pHBZLgIlhbQrEJez0oHrTu6qoel9U5NV7ZbZrDI82DyxAzgobxRBmmbdg9WzdmmNcdAv8ZHlO3aPa7qYVlSFix1rSxa8mwrGC6C1SSWSe6eUbZrX98VQghL5WzXppTRxutZeirzbGhj7Z40HF9bRj3PhuVFnqZs13pKM68/PRvtHLR7rNURsNW1Ec0YWpLhmhgFrE5somyY/v0VemWtguVleVrZ/qjhGMsQky/fQIotaV//3JdRROaEEGaT36zKy3bXZnntl91dtEyeDS0Tf1afYVG9aIK1XE4ulmVw9GPKdq2OQLMe1jTgSOKEffcTY1r3E5uKTbZQamWMiGht+6HG3cBVg2jPUom0l8Gygk/WOL0l0JeT0uxDFMM8wcrz8LQXVltSylImz0beuUEfoe+Ddo8WI/ZW9ktPsSyppp2D5Rk1JlhJ0E9NP63Fm4Q6mpv+rGGWiFnKdsgO7GveFdhehheU7XlejCZYdXhYeTY0D0u7NrDdo6x7rXW6gPKMU0+ldg+8SajggqWjffUsrr5FsLK+4nUJluYBVPGwmhaswfCwIPteWzwsyzPW6kqTTcJhgQuWjlaJLMHUKk3CwRKsNntYQ0GwLM9YqysuWAouWDra193ysjbtYWmZ9KA3m/peZwr6a0H3OmJYy+Qkr2rPoK4mYVZPYV0elvacTLPPjmRcsHReU7arK46kGJe25FXWS7GYst9AmiROo6yHtQT6XGQWwdKEfQzZnQJ1eFhz0HvDsjo3NMGaKyJaPQH9fWtyxtxhgQuWjpahbZ3eV/sCZwV2tcVARxkX49SaLJbAchaWl7VK4qImGJbm2Bj0j0vWvdbujcW7Ar2uaHVtxOOCpVOXYGnCk+VJafvl7duNlhqR5QFavLfFayqTZUt7Btq1ge0eZd3rsveuFxesirhg6dQlWGV7uiyCZRmDpnkJfb2UtJCEdg7aOD9LmTndC1j0UId3aLlHWddZl3fqglURFyydyoKVmmxasyYrcKxlcIPNe9Beqrw4UNZcXx3qEKw8G1qMyiIYlnuUda+1oP6Sac4wDResirhg6dThYWneFWQHrutqEpbysBJas7COJmGejTo8nCpNQkunguUZu2BVxAVLpw7B0tICIPsrPhQEa2F7WAtbsCxpE5Zn7IJVERcsHS2gaqmolvyaKh5WYzGshCZYdXhYTQtWlRiWxcOyPGOtjDV4P2JxwdLRVuNZLYSg9SJZRC3rpbB02efNJdWhySZhHaLddJPQco+y0hMsgpV7D0IIi6HPK9bkyk/DAhcsHW3it86UN3lUaRI+hd5UWDdvY1oKXhv2kScK2nxbufYT2gR4eZnoWtB9BcNy99o5ziN7Xi9Lk1AbvrQ6eh6YVtdGPC5YOpZKtLayXZsx8zWy0wpeNZyDJgbrERMn85iRs02bnM4yH7lWJm/Gzr8q+45BFyTtHj2ck63+InpyrHZ8rY6AC5aKC5bOY+hDOrTKqK0591BODhJUnxPesohE1rqKoE8/vFZq8vQlzVWurYqTZyPv3Dpo11h6Tvb0bLRJIrVnrNWR+eiTAI54XLAUROQV8r0PqC5Y2rp5VQVLWzV6NvmLFGiCNUo5h/XQm0N5Nh5DD/xr11h1EQntGVUVrBnKykcOLlhWNFd9nawNaYkqbQmpvyjbtZdpbSVxUV21WfHwLItY5DX5LE3GvGW65qOvq5e3TNgYdMHQ7rH2jDZWFoPV7Htz0IALlg2tMr07Z2qUddC79KsK1iLkx8k070Nbs+4JdA+nimDNSjby0M4x7xrXR4/hVRWsJcgQpVQ3tlb2d8Ey4IJlQ/u6r0l2k0NrKkD1JiHAB/r9Ma2rqHlYuTGi5OFo6/5tW3IbwAMZiz90o8WxNkzX2o++96YHLUZlWe4+61mvD6yh7GvxYkc8Llg2JhvKTCj49w4vo78sD6PnAu2UY1/L8rYEtbUyO4QQFsiHSktkba/sa1mVWLP/ZuB9Gduy7k2H58hfCBbiR0Mb11m2DgDcYCgz4nHBsnEbumAsUClT7GQvZb97tcnf0vZrlOOMCyH0G/7yIWU/gNsNZbQXalH6v5gT0Kdnud5g33KOC1xruifbKftdY3wG2gpTH86IJWqC9RyxjjkKLlgGUi6U9lLt0GcivW2BFZX9rjOehra02WLAuO4/pGTK3ZX9poqI1gsKcIWhzG7GvxU+tog8DtypFNujzzPYHt3DtC4bp9WBFelp/qbz0TzM640zlo54XLDsaB7O0iz4hf+I4biXGO1fbSizd8/v26LPCX+pxbiIPAn8SSm2S3fGefr/Lso+t4qItip0B+1cl2PBeNmHDce13FuwPaveZ74n+rAkrW45CRcsO5ZKdVynazuEsAwLCkgvDwN3WIyLyBPAXUqxiSGE7t7Cww2H/oXFfuJyZfuKwCe7fj8Yfa097ZjdWM719WsOIWwATFTK35nE2MLt6L15e6dn30lpOc5wXBcsIy5YdqahB8ffxj+/6CehezeXGHrHutGaLm8CTgAIIeyI3hx8AFvAvYNFXI4PISydXtrjazpmh3vIH8IDsVnY6RU8AX0BDfMq4ulZaV7W8sCJ6f97o+fgTRMRrV45CRcsI6my/tBQ9NwQwheAzxrKWpuDHS42lNk3hPB547F/UVAw7wKmK2VWAH6cfrQB19OBP1uNp3O1eFmXhBAmAftYylrtFyh/WLJ/rqHsDwraH9G4YBXjLPTlqhYHvmk4lqAHkd+4g8id2DyCb2GbAfP8gvYHgG8biu6MnkoAcGZBwQQ4z1BmaeA0Q7kr0z0twlRsOVOnoc/B9SyxTjlGXLAKICLPE8WgDk4q8bICHFuT/fNFpEhzsMNZwKM12J8OfKfoTumcL6jBPpS4l+mZnVST/W+JiGXqGifhglWcM7BN6JbHZODCMjuKyB3AzyrafxE4qqT9OcDRFe0DHJ2OVYajsC2emsdPRWRqyX0vBKZUtP88cGbFY4w4XLAKIiLPAd+ocIhXgM+U9K46HEe1hUmPL5BK0I+L0VMc8rgVWzyuL6lX74QK9udj673Lsj8AfIZqUxqfkuqSUwAXrHKcDNxYct+viUilcWMich/lm4Z/oeKXPY0tPATbEmS9zAEOrSjYED1dy/i+fhwjItr40FzS/l8rufuNwClV7I9UXLBKkDLfdwVuLrjrpdQX/zgZOLXgPjOAXdIcX5UQkduBj2FbJKPDXOCjad+q9l8hBvctWfrdnEp9YnESxfLYAG4Cdk11yCnIqIGBqh+6kUsIYSwxj0gbejFADNYfXYdY9JzDJGw9Yr8F9heRWhc6CCFsBfwSWEUp+gTwIRG5tWb7KxGD8JYBxpNE5PSa7S9K9LQmoU9SeAOwm4hkLXbhKLhgVSRNDXwisYnUb3Xn+4BPiMgfGjyHXYGz6b8qy2xivOcbyiR9VeyvCpxD9Hj6cQVwcIGM8qL2RwNHEuNS/QaA/5UYN/x1E/bTOWxNzKnqN5XPLOC7wLEiUsQjdXpwwaqJNG/5ZsS5j9YhBnanAlcNxsDWNG5vc+JiDMsRl756iphr9HTT9tM5bEq8Bx3hnkUc+qINKarL/gpE0VyZuKjHTOLohKmDMf1wmqlhJ+JzGE0cevUg8R6U7RF1unDBchynNXjQ3XGc1uCC5ThOa3DBchynNbhgOY7TGlywHMdpDS5YjuO0Bhcsx3FagwuW4zitwQXLcZzW4ILlOE5rcMFyHKc1uGA5jtMaXLAcx2kNLliO47QGFyzHcVqDC5bjOK3BBctxnNbgguU4TmtwwXIcpzW4YDmO0xpcsBzHaQ0uWI7jtAYXLMdxWoMLluM4rcEFy3Gc1uCC5ThOa3DBchynNbhgOY7TGlywHMdpDS5YjuO0Bhcsx3FagwuW4zit4f8BvQkpw8PhkmgAAAAASUVORK5CYII=";

// assets/L_hover.png
var L_hover_default = "data:image/png;base64,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";

// assets/L_selected.png
var L_selected_default = "data:image/png;base64,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";

// assets/L_hover_selected.png
var L_hover_selected_default = "data:image/png;base64,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";

// assets/R.png
var R_default = "data:image/png;base64,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";

// assets/R_hover.png
var R_hover_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjAsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+17YcXAAANi0lEQVR4nO3dW6wdVR3H8W/pUbAEC/WCkqCEQFfQiELBCwURbBVigtEQTNDEGBMuRo2xDxqUF4kgJsQLEcRLfCFEjUBAH4AebiLIpVTBULIoUSmKIFq5hCqlcHyY2e257L3nstaaWWvW75OQHM7Zs/b/rJn9O7Nmz/532dzcHCIiKdir7wJEROpSYIlIMhRYIpIMBZaIJEOBJSLJUGCJSDIUWCKSDAWWiCRDgSUiyVBgiUgyFFgikgwFlogkQ4ElIslQYIlIMhRYIpIMBZaIJEOBJSLJUGCJSDIUWCKSDAWWiCRDgSUiyVBgiUgyFFgikgwFlogkQ4ElIslQYIlIMhRYIpIMBZaIJEOBJSLJUGCJSDJm+i4gJsaYI4AjgcOA7cD9wAPW2hd7LWwRY8xe1tpX+q4jZTHOoTFmb+CdwBpgFfAo8KC19uFeC4vIsrm5ub5r6J0x5ijgAuAjY368DdgAXG2t7WWyjDHLgHXAF4AjgEOAJ4DNwFXAr/qqbcQYMwMcA7wNOLT89p+BLcAma+2uvmqD3XN4OnAmcDRwEPBX4GHgUmC25/17OnAJcPCYh/wGON9a+8dOC4tQ9oFljDkVuA54VcVDfwZ8tuuD2hjzBuCXwAemPOx24Cxr7SOdFDVP+WL7KHAhRZiO8zBwHnBdH6FgjDHAFcCJUx52G3CGtfbpTooqlfP3U+AzFQ99CTjNWntD+KrilfU1LGPM+4BrqA4rKA6or4WtaCFjzP7ATUwPKyheiPcaY04KXtRSFwHXMjmsKH92LUWodaqck3uYHlZQzPGN5Zx36etUhxUUx+i15TGbrawDC7gY2KfB4y/o+IC5HHhXzceuBK4vl7edMMZsAL7SYJOvltt0whhzNHA9xdzUcRRwWbiKFiqPpW802GQf4FuByklCtktCY8y7Kf7yNvUH4Fhr7cueS1rAGHMosJXmf1SeAA6z1v7Xf1V7GGNWAY8DKxpuugM42Fq73X9VexhjXkNx0fqghpu+QjF/f/Ff1R7GmOXAfRQh2dR7rLX3ei4pCTmfYX2i5XZHAR/zWcgEZ9Nu/xwEfNJzLeOcQ/OwotzmbM+1jPMpmocVFHN+judaxvk47cIK4AyfhaQk58Ba57Dt571VMdkpDtue662KyVxeNF284Fzm4MPeqpjM5RhyOXaTluWS0BhzIPCk4zAHWmv/6aOexVSfm0zqe5O19ikf9aQk1zOsD3oY42QPY4Qc28fvOImP+kLOXw77N2R90co1sHycUq/3MEbIsUMuG3yMHXt9Oe/faGW3JCxv1HuM8XcUN/E48FbfN0JmVN824JCI64t9/oLUF7scz7BW436wUI5xmIdxFjucPOp7C3HXF/v8HVyOlZUcA8vnqXSI03KfY4ZY1sQ+fz5/59j3b3bLQgWWmxCBoBdcPGPmuH+jltU1rLKjwL+o/1GNKs8Cr/N113uG9T0DvD7i+mKfP6/1pSC3M6xj8HewUI61xuN4a8irvv2Ju77Y528lxTGdjdwCS0sQN5o/N7HPX/QUWO5yOqBVn5vY3wSJXjbXsIwx+wL/oV7vqyZ2AqustS+4DJJ5fQdYa3e4DJL5/DnXl4qczrDej/+DBeDVwPEexjmBfOs7wcM4mr8M5BRY+iiIG82fm9jnLwkKLD9yOKBVn5uQgZpNYGVxDctTO48qrduRqD5A9bkK1g4nJrmcYYVstTLi0u6ji1YhLnPQRX0uz6H9280c9C6XwOrilNnllD/kcmHEZQ66mL/Y6xvy/k3G4JeEHtt5VGnV7kP17daq3Yzmb7cs2s3kcIblq51MlbbtSHy1G6kSe31t281o/gpZtJvJIbC6PFVu81xd1tdmaRL7/HWx3BqJff8OflmowPKrzYtHLzi359L+3WPwgTXoa1gB2nlUadTuQ/Ut0ajdjOZvicG3mxn6GZbvdjJVmrYj8d1upErs9TVtN6P5W2jw7WaGHlh9nCI3ec4+6muyRIl9/rpcbo3Evn8HvSxUYPnX5EWkF5zbc2r/LjXowBrsNayA7Tyq1Gr3ofomqtVuRvM30aDbzQz5DMulncwDwIMtt63bjsSl3cjQ66vTLkXzN96g280MObBcTo1ny/9CPrfLcmEjbvXVee4hz98sxRy2NYT5S9KMMea+vosI5O0O284Cy4Avt9y+iwPapb46z+1S30bSqG9Dy+27CFSX+fucMeZEh+eP1rLVq1cP8yJWezuBVeXXLtcgJrb7cGw3shM4gOKAjrW+2OdvVN92iiVUG7HP3yANeUnY1l3W2hfKi5Z3OYwzraWIS7uRO621OyKuL/b5y6W+QVJgLTU74eumpi0JXJcL475ualoNrsvVcV83Na2G2OcvhvoGSYG11PyDxOnCbNlaZIHye74CIVR9rm8IjPu6qVDzN78mp8CKvL5BUmAt9DKwad7/30/x+aw2JrUjcWk38kxZ00hs9T2Lv/omtZuJpb4u5m8T7esbJAXWQs/P/+CotXYXcKvDeOP+0rr89b1F9Xmv7xaH8WKfv8FRYC007q+Z7+scvq5vjPi+n8jXcnXa9+oaV4uv5epI7PtXy8J5FFgLPTfmey6BcLIxZvnof8p2Iyc5jOf7gF5c33Lc3uEaN1c5zZ9rfb4DdXAUWAu9OOZ7Wyn6ZbexuB2JS7uRbcCjY77vsz6Xdjwh6lvcbib2+QtR3yMU92YJCqxKZVN/X8sap3ePxv0DAxHVN5twfS5ngV3UN+7MP0sKrHp8XSfyfX1jxFd9vq9f1flZlfk1+b5+NeLrOlao+hRYpZm+C0iEyztJx5WtRgCOC1SDr/rWOoxzc8ufVVlrjFlB8VGk2OcvVH0KrJLOsGqw1j6FezsSp3Yj0/4Z8gzqO4G46ws6f8CuluMOzgwLb5Qcsr2B11JcFN0PWD7vZ08CfwO2TNl+Fjiy5XO7dp6ss+TbSH/11VlSuczfOtz+uIaeP9f6quZvC8XNqAfO+97LwPMUt+I8x/g3jAZnxlp7bN9FdK18+3kNxYG2DvimtbbqoNmIW7uUJR/jaKBuIIRslzJN3UBwmb+QgTB6TNv5W4/b/p06f9baTxtj1gPnsaeX1+byxtKsDLZFsm+xt7xVfRMNoj4p6BpWTT22+7irzsGs+iYaRH1SUGA108ddx01uWXC5vaGtJnOi+VtKd7I3oMBqJvYDWoGw1JDmL3sKrGZc2pG0sbidTJWu61vcDqWK6luoaX3ZU2A10EO7jwXtRqqoviXa1OdyE2lTjeoTBVYbXZ7Ct1mixF5fl8uuNnMRe31ZU2A11+UBPcRAUKD281yDoMBqzqUdSROT2o1UUX2FodaXNQVWQx7apdQ1tp1MFQ/tUuoa2w6liuZvt1bzlzsFVjudHNA9bdvFc6g+Xb9qRYHVThfvJLk8Rxf1ubSMcdm2rtjnr8t3IwdDgdWCYzuSOqrajUyl+oZdX84UWO2FPKX3MXbI+nwsmUIuu2KfPy0HW1JgtRfyBRd7IKi+eMceNAVWe3cALwUYdyfwOw/j3EGYf21lZzm2q98Sbv581Bf7/s2SAqulgO1IvLQbybi+O621O1wHiX3+cqXAchPiWoTPMUMsPXyOGXt9se/f7Ciw3MT+ggtRn88XXIgXb+zzp+tXDhRYbny3I/HdbiS3+pq246kS+/xlR4HlIEC7FK/tRgK0SwlRX+zzF219OVJgudMSKZ4xc1wCZ0WB5S72F1xOF6Fjnz9dv3KkwHLnqx1JqHYjW8uxXYWsz8f8PUbc9amdjAcKLEce25G0aodSxWM7lyDtUBKpL9r9mxsFlh85fBRE9fU/RvYUWH7cDLj+9QzZbmQW9/pCtoRxHXvOwxjTuO6bOQ9jCAosL8pWIbc7DBG03Yi19mngbochQtfn2s7l9+XvGISH+m5XOxk/FFj+/MRh2y7e7v61w7axdwh1+d3qctlHP/ZWReYUWP5cDWxvue2NPguZQIHl5oaW2/0buMZnITlTYHlirf0f8MMWmz5EN9c3HgK2tNjuaeA2v6WMdWv5XE1tod3v1dQtLZ/nivLYEA8UWH5dSHE/UBPftta+EqKY+cq31C9qsekPunjBlc9xWYtNL+zidoFyH13ccLPHKI4J8USB5VHZ5+gs6jd+uwK4MlxFS/wcuKfB47cClwaqZZzvl89Z1z3ALwLVMs6VwI9qPvYl4Cz1vvJLgeWZtfYm4Him310+B3wHOLeLs6uR8sO8pwKbazz878B6a23b63KNlc/1ofK5q2wGTil/p06U++pc4LtMv01kG7C2PBbEo2Vzc7r5NgRjzCrgTOA0YC3wAkV7kRuA71lre/uYhjFmJbAB+BKw36If7wIuBy4IeavANMaYNwLnA+cAM4t+/DxFYFxirfXZ+qURY8zhwBeBU4CVwL7AncD1wFVdBn1OFFgZK0P1vcBqYAXwJ2CTtfYfvRZWMsa8GTgGeAewA3gEuFthkC8FlogkQ9ewRCQZCiwRSYYCS0SSocASkWQosEQkGQosEUmGAktEkqHAEpFkKLBEJBkKLBFJhgJLRJKhwBKRZCiwRCQZCiwRSYYCS0SSocASkWQosEQkGQosEUmGAktEkqHAEpFkKLBEJBkKLBFJhgJLRJKhwBKRZCiwRCQZCiwRSYYCS0SSocASkWQosEQkGf8H7Ua6EDNgqa0AAAAASUVORK5CYII=";

// assets/R_selected.png
var R_selected_default = "data:image/png;base64,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";

// assets/R_hover_selected.png
var R_hover_selected_default = "data:image/png;base64,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";

// src/utils/assetMap.js
var ASSET_MAP = {
  C: { default: C_default, hover: C_hover_default, selected: C_selected_default, hover_selected: C_hover_selected_default },
  G: { default: G_default, hover: G_hover_default, selected: G_selected_default, hover_selected: G_hover_selected_default },
  J: { default: J_default, hover: J_hover_default, selected: J_selected_default, hover_selected: J_hover_selected_default },
  L: { default: L_default, hover: L_hover_default, selected: L_selected_default, hover_selected: L_hover_selected_default },
  R: { default: R_default, hover: R_hover_default, selected: R_selected_default, hover_selected: R_hover_selected_default }
};

// src/utils/getImagePath.js
function prefixForType(type) {
  const registeredTypes = ElementRegistry.getTypes();
  const typeMap2 = {};
  registeredTypes.forEach((registeredType) => {
    let prefix;
    switch (registeredType.toLowerCase()) {
      case "inductor":
        prefix = "L";
        break;
      default:
        prefix = registeredType.charAt(0).toUpperCase();
    }
    typeMap2[registeredType.toLowerCase()] = prefix;
  });
  return typeMap2[type.toLowerCase()] || type.charAt(0).toUpperCase();
}
async function getImagePath(type, variant = "default", { mock = false } = {}) {
  if (!type || typeof type !== "string") {
    throw new Error("Invalid or unknown type");
  }
  const base = prefixForType(type);
  const suffix = variant === "default" ? "" : `_${variant}`;
  const filename = `${base}${suffix}.png`;
  if (mock) {
    return `/assets/${filename}`;
  }
  const entry = ASSET_MAP[base];
  if (entry) {
    const dataUrl = entry[variant];
    if (dataUrl) {
      return dataUrl;
    }
  }
  return `/assets/${filename}`;
}

// src/gui/renderers/ImageRenderer.js
var ImageRenderer = class extends ElementRenderer {
  constructor(context, elementType, scaledWidth = 50, scaledHeight = 20) {
    super(context);
    this.elementType = elementType;
    this.image = null;
    this.imageLoaded = false;
    this.imageLoading = false;
    this.hoverImage = null;
    this.hoverImageLoaded = false;
    this.hoverImageLoading = false;
    this.isHovered = false;
    this.isSelected = false;
    this.SCALED_WIDTH = scaledWidth;
    this.SCALED_HEIGHT = scaledHeight;
    this.SELECTION_BORDER_WIDTH = 1.5;
    this.SELECTION_BORDER_COLOR = "#007ACC";
    this.SELECTION_PADDING = 4;
  }
  async initImageIfNeeded(loadHover = false) {
    if (!this.image && !this.imageLoading) {
      this.imageLoading = true;
      try {
        if (typeof Image !== "undefined") {
          this.image = new Image();
          this.image.onload = () => {
            this.imageLoaded = true;
            if (this.context && this.context.canvas) {
              const event = new CustomEvent("renderer:imageLoaded", {
                detail: { type: this.elementType }
              });
              document.dispatchEvent(event);
            }
          };
          const imagePath = await getImagePath(this.elementType);
          this.image.src = imagePath;
        }
      } catch (error) {
        console.warn(`Error loading ${this.elementType} image:`, error);
      } finally {
        this.imageLoading = false;
      }
    }
    if (loadHover && !this.hoverImage && !this.hoverImageLoading) {
      this.hoverImageLoading = true;
      try {
        if (typeof Image !== "undefined") {
          this.hoverImage = new Image();
          this.hoverImage.onload = () => {
            this.hoverImageLoaded = true;
            if (this.context && this.context.canvas) {
              const event = new CustomEvent("renderer:imageLoaded", {
                detail: { type: `${this.elementType}_hover` }
              });
              document.dispatchEvent(event);
            }
          };
          const hoverImagePath = await getImagePath(this.elementType, "hover");
          this.hoverImage.src = hoverImagePath;
        }
      } catch (error) {
        console.warn(`Error loading ${this.elementType} hover image:`, error);
      } finally {
        this.hoverImageLoading = false;
      }
    }
  }
  async init() {
    await this.initImageIfNeeded();
  }
  /**
   * Get the appropriate image based on hover state
   * Priority: hover > normal (selection is handled via CSS border)
   */
  getCurrentImage() {
    if (this.isHovered && this.hoverImageLoaded) {
      return this.hoverImage;
    }
    return this.image;
  }
  /**
   * Check if the current image is ready to render
   */
  isImageReady() {
    if (this.isHovered && this.hoverImageLoaded) {
      return this.hoverImageLoaded;
    }
    return this.imageLoaded;
  }
  /**
   * Draw the image with proper aspect ratio
   */
  drawImage(x, y, rotation = 0) {
    const currentImage = this.getCurrentImage();
    if (!this.isImageReady() || !currentImage) return false;
    const aspectRatio = currentImage.naturalWidth / currentImage.naturalHeight;
    let drawWidth, drawHeight;
    if (aspectRatio > 1) {
      drawWidth = this.SCALED_WIDTH;
      drawHeight = this.SCALED_WIDTH / aspectRatio;
    } else {
      drawHeight = this.SCALED_HEIGHT;
      drawWidth = this.SCALED_HEIGHT * aspectRatio;
    }
    this.context.save();
    this.context.translate(x, y);
    if (rotation !== 0) {
      this.context.rotate(rotation);
    }
    if (this.isSelected) {
      const borderWidth = this.SELECTION_BORDER_WIDTH;
      const padding = this.SELECTION_PADDING;
      const borderX = -drawWidth / 2 - padding;
      const borderY = -drawHeight / 2 - padding;
      const borderWidthTotal = drawWidth + padding * 2;
      const borderHeightTotal = drawHeight + padding * 2;
      this.context.strokeStyle = this.SELECTION_BORDER_COLOR;
      this.context.lineWidth = borderWidth;
      this.context.setLineDash([]);
      this.context.strokeRect(borderX, borderY, borderWidthTotal, borderHeightTotal);
    }
    this.context.drawImage(
      currentImage,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    this.context.restore();
    return true;
  }
  /**
   * Render element with hover state
   * @param {Object} element - The element to render
   * @param {boolean} isHovered - Whether the element is being hovered
   */
  renderElementWithHover(element, isHovered) {
    this.isHovered = isHovered;
    if (isHovered && !this.hoverImage && !this.hoverImageLoading) {
      this.initImageIfNeeded(true);
    }
    this.renderElement(element);
  }
  /**
   * Render element with hover and selection states
   * @param {Object} element - The element to render
   * @param {boolean} isHovered - Whether the element is being hovered
   * @param {boolean} isSelected - Whether the element is selected
   */
  renderElementWithStates(element, isHovered, isSelected) {
    this.isHovered = isHovered;
    this.isSelected = isSelected;
    if (isHovered && !this.hoverImage && !this.hoverImageLoading) {
      this.initImageIfNeeded(true);
    }
    this.renderElement(element);
  }
  // Check if a point is within the element bounds
  isPointInBounds(mouseX, mouseY, elementMidX, elementMidY) {
    const halfWidth = this.SCALED_WIDTH / 2;
    const halfHeight = this.SCALED_HEIGHT / 2;
    return mouseX >= elementMidX - halfWidth && mouseX <= elementMidX + halfWidth && mouseY >= elementMidY - halfHeight && mouseY <= elementMidY + halfHeight;
  }
};

// src/domain/valueObjects/GridCoordinate.js
var GridCoordinate = class _GridCoordinate {
  /**
   * Creates an instance of GridCoordinate.
   * @param {number} x - The logical x-coordinate (integer).
   * @param {number} y - The logical y-coordinate (integer).
   */
  constructor(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("GridCoordinate requires integer values");
    }
    this.x = x;
    this.y = y;
  }
  /**
   * Checks if this coordinate is equal to another coordinate.
   * @param {GridCoordinate} other - The other coordinate to compare with.
   * @returns {boolean} True if the coordinates are equal, false otherwise.
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  /**
   * Returns a string representation of the coordinate.
   * @returns {string} String in format "x,y"
   */
  toString() {
    return `${this.x},${this.y}`;
  }
  /**
   * Creates a GridCoordinate from a string representation.
   * @param {string} str - String in format "x,y"
   * @returns {GridCoordinate} New GridCoordinate instance
   */
  static fromString(str) {
    const [x, y] = str.split(",").map((s) => parseInt(s.trim(), 10));
    return new _GridCoordinate(x, y);
  }
  /**
   * Scales this coordinate by a factor (for v1.0 to v2.0 conversion).
   * Results are rounded to maintain integer constraint.
   * @param {number} factor - Scaling factor (e.g., 3 for v1.0 to v2.0)
   * @returns {GridCoordinate} New scaled coordinate
   */
  scale(factor) {
    return new _GridCoordinate(Math.round(this.x * factor), Math.round(this.y * factor));
  }
  /**
   * Adds another coordinate to this one.
   * @param {GridCoordinate} other - The coordinate to add
   * @returns {GridCoordinate} New coordinate with sum
   */
  add(other) {
    return new _GridCoordinate(this.x + other.x, this.y + other.y);
  }
  /**
   * Subtracts another coordinate from this one.
   * @param {GridCoordinate} other - The coordinate to subtract
   * @returns {GridCoordinate} New coordinate with difference
   */
  subtract(other) {
    return new _GridCoordinate(this.x - other.x, this.y - other.y);
  }
  /**
   * Calculates the distance between two grid coordinates.
   * @param {GridCoordinate} other - The other coordinate
   * @returns {number} Grid distance (Manhattan distance)
   */
  distanceTo(other) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }
};

// src/infrastructure/adapters/CoordinateAdapter.js
init_Position();
var CoordinateAdapter = class {
  /**
   * Configuration constants for coordinate conversion
   */
  static CONFIG = {
    PIXELS_PER_GRID_UNIT: 10,
    V1_COMPONENT_SPAN: 1,
    // v1.0: 1 interval per component
    V2_COMPONENT_SPAN: 5,
    // v2.0: 5 intervals per component (1 × 5 scaling)
    SCALING_FACTOR: 5
    // Coordinate scaling: 1 v1.0 interval = 5 v2.0 intervals
  };
  /**
   * Converts logical grid coordinates to pixel coordinates.
   * Used when rendering domain objects to the GUI.
   * 
   * @param {GridCoordinate} gridCoord - Logical grid coordinate
   * @returns {Position} Pixel coordinate
   */
  static gridToPixel(gridCoord) {
    const x = gridCoord.x * this.CONFIG.PIXELS_PER_GRID_UNIT;
    const y = gridCoord.y * this.CONFIG.PIXELS_PER_GRID_UNIT;
    return new Position(x, y);
  }
  /**
   * Converts pixel coordinates to logical grid coordinates.
   * Used when translating GUI interactions to domain operations.
   * 
   * @param {Position} pixelPos - Pixel coordinate
   * @returns {GridCoordinate} Logical grid coordinate (rounded to nearest)
   */
  static pixelToGrid(pixelPos) {
    const x = Math.round(pixelPos.x / this.CONFIG.PIXELS_PER_GRID_UNIT);
    const y = Math.round(pixelPos.y / this.CONFIG.PIXELS_PER_GRID_UNIT);
    return new GridCoordinate(x, y);
  }
  /**
   * Converts v1.0 QuCat format coordinates to v2.0 format.
   * Used when importing legacy v1.0 netlists.
   * 
   * @param {GridCoordinate} v1Coord - v1.0 logical coordinate
   * @returns {GridCoordinate} v2.0 logical coordinate
   */
  static v1ToV2Grid(v1Coord) {
    return v1Coord.scale(this.CONFIG.SCALING_FACTOR);
  }
  /**
   * Converts v2.0 QuCat format coordinates to v1.0 format.
   * Used when exporting to legacy v1.0 format.
   * 
   * @param {GridCoordinate} v2Coord - v2.0 logical coordinate
   * @returns {GridCoordinate} v1.0 logical coordinate
   */
  static v2ToV1Grid(v2Coord) {
    const x = Math.round(v2Coord.x / this.CONFIG.SCALING_FACTOR);
    const y = Math.round(v2Coord.y / this.CONFIG.SCALING_FACTOR);
    return new GridCoordinate(x, y);
  }
  /**
   * Snaps a pixel coordinate to the nearest grid position.
   * Used for grid-aligned element placement in the GUI.
   * 
   * @param {Position} pixelPos - Input pixel coordinate
   * @returns {Position} Pixel coordinate snapped to grid
   */
  static snapToGrid(pixelPos) {
    const gridCoord = this.pixelToGrid(pixelPos);
    return this.gridToPixel(gridCoord);
  }
  /**
   * Validates that coordinates form a proper v2.0 component (6 grid units span).
   * Used when validating imported circuit data.
   * 
   * @param {GridCoordinate} coord1 - First coordinate
   * @param {GridCoordinate} coord2 - Second coordinate
   * @returns {boolean} True if coordinates form valid v2.0 component
   */
  static isValidV2Component(coord1, coord2) {
    const dx = Math.abs(coord2.x - coord1.x);
    const dy = Math.abs(coord2.y - coord1.y);
    return dx === this.CONFIG.V2_COMPONENT_SPAN && dy === 0 || dx === 0 && dy === this.CONFIG.V2_COMPONENT_SPAN;
  }
  /**
   * Validates that coordinates form a proper v1.0 component (2 grid units span).
   * Used when validating imported v1.0 circuit data.
   * 
   * @param {GridCoordinate} coord1 - First coordinate
   * @param {GridCoordinate} coord2 - Second coordinate
   * @returns {boolean} True if coordinates form valid v1.0 component
   */
  static isValidV1Component(coord1, coord2) {
    const dx = Math.abs(coord2.x - coord1.x);
    const dy = Math.abs(coord2.y - coord1.y);
    return dx === this.CONFIG.V1_COMPONENT_SPAN && dy === 0 || dx === 0 && dy === this.CONFIG.V1_COMPONENT_SPAN;
  }
  /**
   * Creates a v2.0 component node pair from a center position and orientation.
   * For 5-interval span: positions nodes at -2 and +3 from center (asymmetric).
   * Used when creating new components with proper v2.0 spacing.
   * 
   * @param {GridCoordinate} center - Center logical grid coordinate
   * @param {string} orientation - 'horizontal' or 'vertical'
   * @returns {Object} Object with {start: GridCoordinate, end: GridCoordinate}
   */
  static createV2ComponentNodes(center, orientation = "horizontal") {
    const span = this.CONFIG.V2_COMPONENT_SPAN;
    const startOffset = -Math.floor(span / 2);
    const endOffset = startOffset + span;
    if (orientation === "horizontal") {
      return {
        start: new GridCoordinate(center.x + startOffset, center.y),
        end: new GridCoordinate(center.x + endOffset, center.y)
      };
    } else {
      return {
        start: new GridCoordinate(center.x, center.y + startOffset),
        end: new GridCoordinate(center.x, center.y + endOffset)
      };
    }
  }
  /**
   * Creates a v1.0 component node pair from a center position and orientation.
   * Used when creating components for v1.0 export compatibility.
   * 
   * @param {GridCoordinate} center - Center logical grid coordinate
   * @param {string} orientation - 'horizontal' or 'vertical'
   * @returns {Object} Object with {start: GridCoordinate, end: GridCoordinate}
   */
  static createV1ComponentNodes(center, orientation = "horizontal") {
    if (orientation === "horizontal") {
      return {
        start: new GridCoordinate(center.x, center.y),
        end: new GridCoordinate(center.x + this.CONFIG.V1_COMPONENT_SPAN, center.y)
      };
    } else {
      return {
        start: new GridCoordinate(center.x, center.y),
        end: new GridCoordinate(center.x, center.y + this.CONFIG.V1_COMPONENT_SPAN)
      };
    }
  }
  /**
   * Detects the QuCat format version based on coordinate ranges.
   * Used when importing circuits to determine appropriate adapter.
   * 
   * @param {Array<{x: number, y: number}>} coordinates - Array of coordinate objects
   * @returns {string} 'v1.0' or 'v2.0'
   */
  static detectFormat(coordinates) {
    const maxCoord = Math.max(...coordinates.map((c) => Math.max(Math.abs(c.x), Math.abs(c.y))));
    return maxCoord <= 20 ? "v1.0" : "v2.0";
  }
  /**
   * Converts between different coordinate representations for external systems.
   * Used by other adapters (GUI, netlist import/export) for coordinate translation.
   * 
   * @param {Object} sourceCoord - Source coordinate object
   * @param {string} sourceFormat - 'pixel', 'logical', 'v1.0', 'v2.0'
   * @param {string} targetFormat - 'pixel', 'logical', 'v1.0', 'v2.0'
   * @returns {Object} Converted coordinate object
   */
  static convertCoordinate(sourceCoord, sourceFormat, targetFormat) {
    if (sourceFormat === targetFormat) {
      return sourceCoord;
    }
    let gridCoord;
    switch (sourceFormat) {
      case "pixel":
        gridCoord = this.pixelToGrid(sourceCoord);
        break;
      case "logical":
      case "v2.0":
        gridCoord = sourceCoord;
        break;
      case "v1.0":
        gridCoord = this.v1ToV2Grid(sourceCoord);
        break;
      default:
        throw new Error(`Unsupported source format: ${sourceFormat}`);
    }
    switch (targetFormat) {
      case "pixel":
        return this.gridToPixel(gridCoord);
      case "logical":
      case "v2.0":
        return gridCoord;
      case "v1.0":
        return this.v2ToV1Grid(gridCoord);
      default:
        throw new Error(`Unsupported target format: ${targetFormat}`);
    }
  }
};

// src/config/gridConfig.js
var GRID_SPACING = CoordinateAdapter.CONFIG.PIXELS_PER_GRID_UNIT;
var COMPONENT_GRID_POINTS = CoordinateAdapter.CONFIG.V2_COMPONENT_SPAN;
var COMPONENT_SPAN_PIXELS = COMPONENT_GRID_POINTS * GRID_SPACING;
var GRID_CONFIG = {
  // Basic measurements
  spacing: GRID_SPACING,
  // 10 pixels between points
  componentGridPoints: COMPONENT_GRID_POINTS,
  // 5 grid points span
  componentSpanPixels: COMPONENT_SPAN_PIXELS,
  // 50 pixels total
  // Integration test compatibility properties
  pixelsPerGridUnit: GRID_SPACING,
  // 10 pixels per grid unit
  componentLogicalSpan: COMPONENT_GRID_POINTS,
  // 5 logical grid intervals
  v1ComponentSpan: CoordinateAdapter.CONFIG.V1_COMPONENT_SPAN,
  // v1.0: 1 interval
  // Component height (2 grid points for visual appeal)
  componentHeightPixels: 2 * GRID_SPACING,
  // 20 pixels
  // Legacy compatibility
  legacyComponentGridPoints: 5,
  // Old system (migration)
  // Grid snapping utility function
  snapToGrid: (value) => Math.round(value / GRID_SPACING) * GRID_SPACING,
  // Logical grid snapping (pixels to logical grid units)
  snapToLogicalGrid: (pixelValue) => Math.round(pixelValue / GRID_SPACING),
  // Convert logical grid units to pixels
  logicalToPixel: (logicalValue) => logicalValue * GRID_SPACING,
  // Calculate node positions for 2-node components using logical coordinates
  // For v2.0: components span 5 logical grid intervals (50 pixels)
  calculateNodePositions: (centerX, centerY, angleRadians = 0) => {
    if (angleRadians === 0) {
      const centerLogicalX = Math.round(centerX / GRID_SPACING);
      const centerLogicalY = Math.round(centerY / GRID_SPACING);
      const startLogicalX = Math.round(centerLogicalX - 2.5);
      const endLogicalX = Math.round(centerLogicalX + 2.5);
      return {
        start: {
          x: startLogicalX * GRID_SPACING,
          y: centerLogicalY * GRID_SPACING
        },
        end: {
          x: endLogicalX * GRID_SPACING,
          y: centerLogicalY * GRID_SPACING
        }
      };
    } else {
      const halfSpanPixels = COMPONENT_SPAN_PIXELS / 2;
      const startX = centerX - halfSpanPixels * Math.cos(angleRadians);
      const startY = centerY - halfSpanPixels * Math.sin(angleRadians);
      const endX = centerX + halfSpanPixels * Math.cos(angleRadians);
      const endY = centerY + halfSpanPixels * Math.sin(angleRadians);
      return {
        start: {
          x: Math.round(startX / GRID_SPACING) * GRID_SPACING,
          y: Math.round(startY / GRID_SPACING) * GRID_SPACING
        },
        end: {
          x: Math.round(endX / GRID_SPACING) * GRID_SPACING,
          y: Math.round(endY / GRID_SPACING) * GRID_SPACING
        }
      };
    }
  }
};
function validateGridConfig() {
  if (COMPONENT_SPAN_PIXELS !== COMPONENT_GRID_POINTS * GRID_SPACING) {
    throw new Error("Grid configuration error: component span calculation is incorrect");
  }
  return true;
}
validateGridConfig();

// src/gui/renderers/ResistorRenderer.js
var ResistorRenderer = class extends ImageRenderer {
  constructor(context) {
    const width = GRID_CONFIG.componentSpanPixels;
    const height = GRID_CONFIG.componentHeightPixels;
    super(context, "resistor", width, height);
  }
  renderElement(resistor) {
    if (!this.image && !this.imageLoading) {
      this.initImageIfNeeded();
    }
    const [start, end] = resistor.nodes;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    this.renderTerminal(start);
    this.renderTerminal(end);
    this.context.save();
    this.context.translate(midX, midY);
    this.context.rotate(angle);
    this.context.translate(-midX, -midY);
    if (!this.drawImage(midX, midY)) {
      this.renderFallback(resistor, midX, midY);
    }
    this.context.restore();
    this.renderConnections(start, end, midX, midY);
    this.renderProperties(resistor, midX, midY, angle);
  }
  renderFallback(resistor, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#8B4513";
    this.context.fillStyle = "#D2B48C";
    this.context.lineWidth = 2;
    const rectX = midX - this.SCALED_WIDTH / 2;
    const rectY = midY - this.SCALED_HEIGHT / 2;
    this.context.fillRect(rectX, rectY, this.SCALED_WIDTH, this.SCALED_HEIGHT);
    this.context.strokeRect(rectX, rectY, this.SCALED_WIDTH, this.SCALED_HEIGHT);
    this.context.restore();
  }
  renderConnections(start, end, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 1;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const halfWidth = this.SCALED_WIDTH / 2;
    const connectionStart = {
      x: midX - Math.cos(angle) * halfWidth,
      y: midY - Math.sin(angle) * halfWidth
    };
    const connectionEnd = {
      x: midX + Math.cos(angle) * halfWidth,
      y: midY + Math.sin(angle) * halfWidth
    };
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(connectionStart.x, connectionStart.y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(connectionEnd.x, connectionEnd.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
    this.context.restore();
  }
};

// src/gui/renderers/WireRenderer.js
var WireRenderer = class extends ElementRenderer {
  constructor(context) {
    super(context);
    this.NORMAL_THICKNESS = 1;
    this.HOVER_THICKNESS = 3;
    this.NORMAL_COLOR = "black";
    this.SELECTED_COLOR = "#007ACC";
    this.HOVER_TOLERANCE = 5;
  }
  /**
   * Render element with hover and selection states
   */
  renderElementWithStates(wire, isHovered, isSelected) {
    const [start, end] = wire.nodes;
    this.renderTerminal(start);
    this.renderTerminal(end);
    let lineWidth = this.NORMAL_THICKNESS;
    let strokeColor = this.NORMAL_COLOR;
    if (isHovered) {
      lineWidth = this.HOVER_THICKNESS;
    }
    if (isSelected) {
      strokeColor = this.SELECTED_COLOR;
    }
    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = lineWidth;
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
  }
  /**
   * Check if mouse position is hovering over the wire
   */
  checkHover(wire, mouseX, mouseY) {
    const [start, end] = wire.nodes;
    const distance = this.distanceToLineSegment(
      mouseX,
      mouseY,
      start.x,
      start.y,
      end.x,
      end.y
    );
    return distance <= this.HOVER_TOLERANCE;
  }
  /**
   * Calculate distance from a point to a line segment
   */
  distanceToLineSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) {
      return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
    }
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (length * length)));
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    return Math.sqrt((px - closestX) * (px - closestX) + (py - closestY) * (py - closestY));
  }
  /**
   * Fallback render method (for compatibility)
   */
  renderElement(wire) {
    this.renderElementWithStates(wire, false, false);
  }
};

// src/gui/renderers/CapacitorRenderer.js
var CapacitorRenderer = class extends ImageRenderer {
  constructor(context) {
    super(context, "capacitor", 50, 20);
  }
  renderElement(capacitor) {
    if (!this.image && !this.imageLoading) {
      this.initImageIfNeeded();
    }
    const [start, end] = capacitor.nodes;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    this.renderTerminal(start);
    this.renderTerminal(end);
    this.context.save();
    this.context.translate(midX, midY);
    this.context.rotate(angle);
    this.context.translate(-midX, -midY);
    if (!this.drawImage(midX, midY)) {
      this.renderFallback(capacitor, midX, midY);
    }
    this.context.restore();
    this.renderConnections(start, end, midX, midY);
    this.renderProperties(capacitor, midX, midY, angle);
  }
  renderFallback(capacitor, midX, midY, rotation = 0) {
    this.context.save();
    this.context.translate(midX, midY);
    if (rotation !== 0) {
      this.context.rotate(rotation);
    }
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;
    const plateOffset = 10;
    this.context.beginPath();
    this.context.moveTo(-5, -plateOffset);
    this.context.lineTo(-5, plateOffset);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(5, -plateOffset);
    this.context.lineTo(5, plateOffset);
    this.context.stroke();
    this.context.restore();
  }
  renderConnections(start, end, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 1;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const halfWidth = 20;
    const connectionStart = {
      x: midX - Math.cos(angle) * halfWidth,
      y: midY - Math.sin(angle) * halfWidth
    };
    const connectionEnd = {
      x: midX + Math.cos(angle) * halfWidth,
      y: midY + Math.sin(angle) * halfWidth
    };
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(connectionStart.x, connectionStart.y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(connectionEnd.x, connectionEnd.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
    this.context.restore();
  }
};

// src/gui/renderers/InductorRenderer.js
var InductorRenderer = class extends ImageRenderer {
  constructor(context) {
    const width = GRID_CONFIG.componentSpanPixels;
    const height = GRID_CONFIG.spacing * 2.5;
    super(context, "inductor", width, height);
  }
  renderElement(inductor) {
    if (!this.image && !this.imageLoading) {
      this.initImageIfNeeded();
    }
    const [start, end] = inductor.nodes;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    this.renderTerminal(start);
    this.renderTerminal(end);
    this.context.save();
    this.context.translate(midX, midY);
    this.context.rotate(angle);
    this.context.translate(-midX, -midY);
    if (!this.drawImage(midX, midY)) {
      this.renderFallback(inductor, midX, midY);
    }
    this.context.restore();
    this.renderConstrainedConnections(start, end, midX, midY);
    this.renderProperties(inductor, midX, midY, angle);
  }
  renderFallback(inductor, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;
    const coilWidth = 40;
    const coilHeight = 20;
    for (let i = 0; i < 3; i++) {
      const x = midX - coilWidth / 2 + i * coilWidth / 3;
      this.context.beginPath();
      this.context.arc(x, midY, coilHeight / 2, 0, Math.PI, false);
      this.context.stroke();
    }
    this.context.restore();
  }
  renderConstrainedConnections(start, end, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 1;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const maxConnectionLength = this.SCALED_WIDTH / 2 - 5;
    const connectionStart = {
      x: midX - Math.cos(angle) * maxConnectionLength,
      y: midY - Math.sin(angle) * maxConnectionLength
    };
    const connectionEnd = {
      x: midX + Math.cos(angle) * maxConnectionLength,
      y: midY + Math.sin(angle) * maxConnectionLength
    };
    const startDistance = Math.sqrt((start.x - midX) ** 2 + (start.y - midY) ** 2);
    const endDistance = Math.sqrt((end.x - midX) ** 2 + (end.y - midY) ** 2);
    if (startDistance > maxConnectionLength) {
      this.context.beginPath();
      this.context.moveTo(start.x, start.y);
      this.context.lineTo(connectionStart.x, connectionStart.y);
      this.context.stroke();
    }
    if (endDistance > maxConnectionLength) {
      this.context.beginPath();
      this.context.moveTo(connectionEnd.x, connectionEnd.y);
      this.context.lineTo(end.x, end.y);
      this.context.stroke();
    }
    this.context.restore();
  }
};

// src/gui/renderers/JunctionRenderer.js
var JunctionRenderer = class extends ImageRenderer {
  constructor(context) {
    super(context, "junction", 40, 40);
  }
  renderElement(junction) {
    if (!this.image && !this.imageLoading) {
      this.initImageIfNeeded();
    }
    const [start, end] = junction.nodes;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    this.renderTerminal(start);
    this.renderTerminal(end);
    this.context.save();
    this.context.translate(midX, midY);
    this.context.rotate(angle);
    this.context.translate(-midX, -midY);
    if (!this.drawImage(midX, midY)) {
      this.renderFallback(junction, midX, midY);
    }
    this.context.restore();
    this.renderConnections(start, end, midX, midY);
    this.renderProperties(junction, midX, midY, angle);
  }
  renderFallback(junction, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;
    const size = 12;
    this.context.beginPath();
    this.context.moveTo(midX - size, midY - size);
    this.context.lineTo(midX + size, midY + size);
    this.context.moveTo(midX + size, midY - size);
    this.context.lineTo(midX - size, midY + size);
    this.context.stroke();
    this.context.restore();
  }
  renderConnections(start, end, midX, midY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 1;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const halfWidth = 15;
    const connectionStart = {
      x: midX - Math.cos(angle) * halfWidth,
      y: midY - Math.sin(angle) * halfWidth
    };
    const connectionEnd = {
      x: midX + Math.cos(angle) * halfWidth,
      y: midY + Math.sin(angle) * halfWidth
    };
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(connectionStart.x, connectionStart.y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(connectionEnd.x, connectionEnd.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
    this.context.restore();
  }
};

// src/gui/renderers/GroundRenderer.js
var GroundRenderer = class extends ImageRenderer {
  constructor(context) {
    super(context, "ground", 40, 30);
    this.GROUND_NODE_PADDING = 0;
  }
  /**
   * Override drawImage to provide special selection positioning for ground
   */
  drawImage(x, y, rotation = 0) {
    const currentImage = this.getCurrentImage();
    if (!this.isImageReady() || !currentImage) return false;
    const aspectRatio = currentImage.naturalWidth / currentImage.naturalHeight;
    let drawWidth, drawHeight;
    if (aspectRatio > 1) {
      drawWidth = this.SCALED_WIDTH;
      drawHeight = this.SCALED_WIDTH / aspectRatio;
    } else {
      drawHeight = this.SCALED_HEIGHT;
      drawWidth = this.SCALED_HEIGHT * aspectRatio;
    }
    this.context.save();
    this.context.translate(x, y);
    if (rotation !== 0) {
      this.context.rotate(rotation);
    }
    if (this.isSelected) {
      const nodeOffset = this.SCALED_WIDTH / 2;
      const pad = 4;
      const boxLeft = -(drawWidth * 0.01) - pad;
      const boxRight = nodeOffset + pad;
      const boxTop = -drawHeight / 2 - pad;
      const boxBot = drawHeight / 2 + pad;
      this.context.strokeStyle = this.SELECTION_BORDER_COLOR;
      this.context.lineWidth = this.SELECTION_BORDER_WIDTH;
      this.context.setLineDash([]);
      this.context.strokeRect(boxLeft, boxTop, boxRight - boxLeft, boxBot - boxTop);
    }
    this.context.drawImage(
      currentImage,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    this.context.restore();
    return true;
  }
  renderElement(ground) {
    if (!this.image && !this.imageLoading) {
      this.initImageIfNeeded();
    }
    const [connectionNode] = ground.nodes;
    const groundX = connectionNode.x - this.SCALED_WIDTH / 2;
    const groundY = connectionNode.y;
    const orientation = ground.properties.values.orientation || 0;
    const orientationRad = orientation * Math.PI / 180;
    this.context.save();
    this.context.translate(connectionNode.x, connectionNode.y);
    this.context.rotate(orientationRad);
    this.context.translate(-connectionNode.x, -connectionNode.y);
    if (!this.drawImage(groundX, groundY)) {
      this.renderFallback(ground, connectionNode.x, connectionNode.y);
    }
    this.context.restore();
    this.renderTerminal(connectionNode);
  }
  renderFallback(ground, nodeX, nodeY) {
    this.context.save();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;
    const connectionLineLength = 15;
    this.context.beginPath();
    this.context.moveTo(nodeX, nodeY);
    this.context.lineTo(nodeX - connectionLineLength, nodeY);
    this.context.stroke();
    const lineWidths = [20, 12, 6];
    const startX = nodeX - connectionLineLength;
    for (let i = 0; i < lineWidths.length; i++) {
      const x = startX - i * 3;
      const halfHeight = lineWidths[i] / 2;
      this.context.beginPath();
      this.context.moveTo(x, nodeY - halfHeight);
      this.context.lineTo(x, nodeY + halfHeight);
      this.context.stroke();
    }
    this.context.restore();
  }
  renderConnections(connectionNode, groundX, groundY) {
  }
  /**
   * Rotation-aware hit-test for ground elements.
   *
   * The ground image is anchored at the connection node (nodes[0]).
   * At 0° the image center sits SCALED_WIDTH/2 to the LEFT of the anchor.
   * We inverse-rotate the mouse into local frame so a single axis-aligned
   * bounding box works at every orientation.
   *
   * @param {number} mouseX
   * @param {number} mouseY
   * @param {number} midX   - midpoint fallback
   * @param {number} midY   - midpoint fallback
   * @param {Object} [element] - the ground element (for orientation + nodes)
   */
  isPointInBounds(mouseX, mouseY, midX, midY, element) {
    const anchorX = element?.nodes?.[0]?.x ?? midX;
    const anchorY = element?.nodes?.[0]?.y ?? midY;
    const orientation = element?.properties?.values?.orientation || 0;
    const rad = -(orientation * Math.PI) / 180;
    const dx = mouseX - anchorX;
    const dy = mouseY - anchorY;
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);
    const pad = 4;
    const nodeOffset = this.SCALED_WIDTH / 2;
    const left = -(this.SCALED_WIDTH * 0.01) - pad - nodeOffset;
    const right = pad;
    const top = -(this.SCALED_HEIGHT / 2) - pad;
    const bottom = this.SCALED_HEIGHT / 2 + pad;
    return localX >= left && localX <= right && localY >= top && localY <= bottom;
  }
};

// src/config/registry.js
init_idGenerator();
init_Properties();

// src/gui/commands/GUICommandRegistry.js
var GUICommandRegistryClass = class _GUICommandRegistryClass {
  constructor() {
    if (!_GUICommandRegistryClass.instance) {
      this._registry = /* @__PURE__ */ new Map();
      _GUICommandRegistryClass.instance = this;
    } else {
      this._registry = _GUICommandRegistryClass.instance._registry;
    }
    return _GUICommandRegistryClass.instance;
  }
  /**
   * Registers a command by name.
   * @param {string} name - The command name.
   * @param {Function} commandFactory - A factory function returning a command instance.
   */
  register(name, commandFactory) {
    if (this._registry.has(name)) {
      throw new Error(`Command "${name}" is already registered.`);
    }
    this._registry.set(name, commandFactory);
  }
  /**
   * Retrieves a command by name.
   * @param {string} name - The command name.
   * @returns {Command} - The command instance.
   */
  get(name, ...args) {
    if (!this._registry.has(name)) {
      console.warn(`Command "${name}" not found.`);
      return null;
    }
    return this._registry.get(name)(...args);
  }
  /**
   * Returns all registered command names.
   * @returns {string[]} - List of registered command names.
   */
  getTypes() {
    return [...this._registry.keys()];
  }
};
var GUICommandRegistry = new GUICommandRegistryClass();
Object.freeze(GUICommandRegistry);

// src/gui/commands/GUICommand.js
var GUICommand = class _GUICommand {
  /**
   * Creates a new GUICommand instance.
   *
   * @param {GUIAdapter} [guiAdapter] - Optional reference to the GUI adapter
   * @throws {Error} If attempting to instantiate the abstract base class directly
   */
  constructor(guiAdapter) {
    if (new.target === _GUICommand) {
      throw new Error("Cannot instantiate abstract class GUICommand.");
    }
    this.guiAdapter = guiAdapter;
  }
  /**
   * Executes the command.
   * @abstract
   */
  execute() {
    throw new Error("Execute method must be implemented.");
  }
  /**
   * Undoes the command, reversing its effect.
   * @abstract
   */
  undo() {
    throw new Error("Undo method must be implemented.");
  }
};

// src/gui/commands/AddElementCommand.js
init_Position();
init_ElementFactory();
init_Properties();
var AddElementCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer, elementRegistry, elementType) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.elementRegistry = elementRegistry;
    this.elementType = elementType;
    const defaultPos = new Position(400, 300);
    const snappedDefaults = CoordinateAdapter.snapToGrid(defaultPos);
    this.DEFAULT_X = snappedDefaults.x;
    this.DEFAULT_Y = snappedDefaults.y;
    this.currentMousePosition = null;
  }
  /**
   * Set the current mouse position for placement
   * @param {Object} mousePosition - Object with x and y coordinates
   */
  setMousePosition(mousePosition) {
    this.currentMousePosition = mousePosition;
  }
  /**
   * Executes the command, creating an element with proper grid-based sizing.
   * For 2-node components, creates nodes that span exactly 5 grid intervals (50 pixels).
   * Mouse position is snapped to logical grid for proper alignment.
   *
   * @param {Array<{x: number, y: number}>} customNodes - Optional custom node positions (for testing)
   */
  execute(customNodes = null) {
    let positions;
    if (customNodes && customNodes.length > 0) {
      if (this.gridSpacing && this.enableSnapping !== false) {
        positions = customNodes.map((node) => new Position(
          Math.round(node.x / this.gridSpacing) * this.gridSpacing,
          Math.round(node.y / this.gridSpacing) * this.gridSpacing
        ));
      } else {
        positions = customNodes.map((node) => new Position(node.x, node.y));
      }
    } else {
      let centerX, centerY;
      if (this.currentMousePosition) {
        const snappedPixelPos = CoordinateAdapter.snapToGrid(this.currentMousePosition);
        centerX = snappedPixelPos.x;
        centerY = snappedPixelPos.y;
      } else {
        centerX = this.DEFAULT_X;
        centerY = this.DEFAULT_Y;
      }
      const nodePositions = GRID_CONFIG.calculateNodePositions(centerX, centerY, 0);
      positions = [
        new Position(nodePositions.start.x, nodePositions.start.y),
        new Position(nodePositions.end.x, nodePositions.end.y)
      ];
    }
    const properties = new Properties({ orientation: 0 });
    const normalizedType = this.elementType === "Wire" ? "wire" : this.elementType;
    const element = ElementFactory.create(normalizedType, void 0, positions, properties, null);
    this.circuitService.addElement(element);
    this.circuitService.emit("startPlacing", { element });
  }
  /**
   * Undoes the add element command by removing the element from the circuit.
   */
  undo() {
  }
};

// src/gui/commands/DrawWireCommand.js
init_Position();
var DrawWireCommand = class extends GUICommand {
  constructor(circuitService, elementRegistry, wireSplitService) {
    super();
    this.circuitService = circuitService;
    this.elementRegistry = elementRegistry;
    this.wireSplitService = wireSplitService;
    this.wireElement = null;
    this.drawing = false;
    this.direction = null;
    this.enableSnapping = true;
    this.THRESHOLD = 2;
  }
  /**
   * Called on mousedown when user first clicks an empty area.
   * We'll place both wire nodes at the same position initially.
   */
  start(mouseX, mouseY) {
    let snappedX = mouseX;
    let snappedY = mouseY;
    if (this.enableSnapping) {
      snappedX = GRID_CONFIG.snapToGrid(mouseX);
      snappedY = GRID_CONFIG.snapToGrid(mouseY);
    }
    const wireFactory = this.elementRegistry.get("wire");
    if (!wireFactory) {
      console.error("No wire factory registered.");
      return;
    }
    this.wireElement = wireFactory(
      void 0,
      [new Position(snappedX, snappedY), new Position(snappedX, snappedY)],
      null,
      {}
    );
    this.circuitService.addElement(this.wireElement);
    this.drawing = true;
    this.direction = null;
  }
  /**
   * Called on mousemove as user drags.
   */
  move(mouseX, mouseY) {
    if (!this.drawing || !this.wireElement) return;
    let snappedX = mouseX;
    let snappedY = mouseY;
    if (this.enableSnapping) {
      snappedX = GRID_CONFIG.snapToGrid(mouseX);
      snappedY = GRID_CONFIG.snapToGrid(mouseY);
    }
    const [startNode, endNode] = this.wireElement.nodes;
    const dx = snappedX - startNode.x;
    const dy = snappedY - startNode.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (!this.direction) {
      if (absDx - absDy >= this.THRESHOLD) {
        this.direction = "horizontal";
      } else if (absDy - absDx >= this.THRESHOLD) {
        this.direction = "vertical";
      }
    }
    if (this.direction === "horizontal") {
      endNode.x = startNode.x + dx;
      endNode.y = startNode.y;
    } else if (this.direction === "vertical") {
      endNode.x = startNode.x;
      endNode.y = startNode.y + dy;
    } else {
      endNode.x = startNode.x + dx;
      endNode.y = startNode.y + dy;
    }
    this.circuitService.emit("update", {
      type: "drawWire",
      wire: this.wireElement
    });
  }
  /**
   * Called on mouseup to finalize the wire.
   */
  stop() {
    this.drawing = false;
    this.direction = null;
    if (this.wireElement && this.wireElement.nodes?.[1]) {
      const endNode = this.wireElement.nodes[1];
      this.wireSplitService.trySplitAtNode(endNode);
    }
    this.wireElement = null;
  }
  /**
   * If the user never actually moved,
   * we can remove this ephemeral wire to avoid leftover dots.
   */
  cancel() {
    if (this.wireElement) {
      this.circuitService.deleteElement(this.wireElement.id);
    }
    this.drawing = false;
    this.direction = null;
    this.wireElement = null;
  }
};

// src/gui/commands/GUIDragElementCommand.js
init_Position();
var DragElementCommand = class extends GUICommand {
  /**
   * @constructor
   * @param {CircuitService} circuitService - The service managing circuit logic.
   * @param {CircuitRenderer|WireSplitService} circuitRendererOrWireSplitService - Either the renderer (new signature) or wireSplitService (old signature).
   * @param {WireSplitService} wireSplitService - Handles wire-body and node-based splits (only used in new signature).
   */
  constructor(circuitService, circuitRendererOrWireSplitService, wireSplitService) {
    super();
    this.circuitService = circuitService;
    if (wireSplitService) {
      this.circuitRenderer = circuitRendererOrWireSplitService;
      this.wireSplitService = wireSplitService;
    } else {
      this.circuitRenderer = null;
      this.wireSplitService = circuitRendererOrWireSplitService;
    }
    this.draggedElement = null;
    this.selectedElements = [];
    this.elementOffsets = /* @__PURE__ */ new Map();
    this.draggingNodeIndex = null;
    this.offset = { x: 0, y: 0 };
    this.nodeStartPos = { x: 0, y: 0 };
    this.elementStartPos = /* @__PURE__ */ new Map();
    this.actuallyMoved = false;
    this.dragAxis = null;
    this.enableSnapping = true;
    this.LOCK_THRESHOLD = 2;
  }
  /**
   * Initiates a drag operation, determining whether the user clicked on a node or shape body.
   * @param {number} mouseX - X coordinate of mouse.
   * @param {number} mouseY - Y coordinate of mouse.
   */
  start(mouseX, mouseY) {
    this.actuallyMoved = false;
    this.elementStartPos.clear();
    const selectedElements = this.circuitRenderer ? this.circuitRenderer.getSelectedElements() : [];
    const hasRenderer = !!this.circuitRenderer;
    for (const element of this.circuitService.getElements()) {
      if (hasRenderer && !selectedElements.includes(element)) continue;
      if (element.type === "wire") {
        const nodeIndex = this.findClosestNodeIndex(element, mouseX, mouseY);
        if (nodeIndex >= 0) {
          this.draggedElement = element;
          this.draggingNodeIndex = nodeIndex;
          this.dragAxis = null;
          const node = element.nodes[nodeIndex];
          this.offset.x = mouseX - node.x;
          this.offset.y = mouseY - node.y;
          this.nodeStartPos.x = node.x;
          this.nodeStartPos.y = node.y;
          this.elementStartPos.set(element.id, {
            nodes: element.nodes.map((n) => ({ x: n.x, y: n.y }))
          });
          this.selectedElements = [element];
          return;
        }
      }
      if (this.isInsideElement(mouseX, mouseY, element)) {
        this.draggedElement = element;
        this.draggingNodeIndex = null;
        this.dragAxis = null;
        this.elementStartPos.set(element.id, {
          nodes: element.nodes.map((n) => ({ x: n.x, y: n.y }))
        });
        if (selectedElements.length > 1 && selectedElements.includes(element)) {
          this.selectedElements = [...selectedElements];
          for (const el of this.selectedElements) {
            if (!this.elementStartPos.has(el.id)) {
              this.elementStartPos.set(el.id, {
                nodes: el.nodes.map((n) => ({ x: n.x, y: n.y }))
              });
            }
          }
          this.setupMultiElementDrag(mouseX, mouseY);
        } else {
          this.selectedElements = [element];
          if (Array.isArray(element.nodes) && element.nodes.length > 0) {
            const [startNode] = element.nodes;
            this.offset.x = mouseX - startNode.x;
            this.offset.y = mouseY - startNode.y;
          }
        }
        return;
      }
    }
  }
  /**
   * Setup multi-element dragging by calculating relative offsets for each element.
   * @param {number} mouseX - X coordinate of mouse.
   * @param {number} mouseY - Y coordinate of mouse.
   */
  setupMultiElementDrag(mouseX, mouseY) {
    this.elementOffsets.clear();
    for (const element of this.selectedElements) {
      if (Array.isArray(element.nodes) && element.nodes.length > 0) {
        const [startNode] = element.nodes;
        const offset = {
          x: mouseX - startNode.x,
          y: mouseY - startNode.y
        };
        this.elementOffsets.set(element.id, offset);
      }
    }
    if (Array.isArray(this.draggedElement.nodes) && this.draggedElement.nodes.length > 0) {
      const [startNode] = this.draggedElement.nodes;
      this.offset.x = mouseX - startNode.x;
      this.offset.y = mouseY - startNode.y;
    }
  }
  /**
   * Handles mousemove events to drag the element or node.
   * @param {number} mouseX - X coordinate of mouse.
   * @param {number} mouseY - Y coordinate of mouse.
   */
  move(mouseX, mouseY) {
    if (!this.draggedElement) return;
    if (!Array.isArray(this.draggedElement.nodes) || this.draggedElement.nodes.length === 0) return;
    if (this.draggingNodeIndex !== null) {
      const originalNode = this.draggedElement.nodes[this.draggingNodeIndex];
      for (const el of this.circuitService.getElements()) {
        if (el.id !== this.draggedElement.id && el.nodes.includes(originalNode)) {
          const cloned = new Position(originalNode.x, originalNode.y);
          this.draggedElement.nodes[this.draggingNodeIndex] = cloned;
          break;
        }
      }
      const node = this.draggedElement.nodes[this.draggingNodeIndex];
      let intendedX = mouseX - this.offset.x;
      let intendedY = mouseY - this.offset.y;
      if (this.enableSnapping) {
        intendedX = GRID_CONFIG.snapToGrid(intendedX);
        intendedY = GRID_CONFIG.snapToGrid(intendedY);
      }
      if (!this.dragAxis && this.draggedElement.nodes.length === 2) {
        const otherIndex = this.draggingNodeIndex === 0 ? 1 : 0;
        const otherNode = this.draggedElement.nodes[otherIndex];
        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        this.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical";
      }
      if (this.dragAxis === "horizontal") intendedY = node.y;
      if (this.dragAxis === "vertical") intendedX = node.x;
      node.x = intendedX;
      node.y = intendedY;
      if (!this.actuallyMoved) {
        const startPos = this.elementStartPos.get(this.draggedElement.id);
        if (startPos && startPos.nodes[this.draggingNodeIndex]) {
          const originalNode2 = startPos.nodes[this.draggingNodeIndex];
          if (Math.abs(node.x - originalNode2.x) > 1 || Math.abs(node.y - originalNode2.y) > 1) {
            this.actuallyMoved = true;
          }
        }
      }
    } else {
      if (this.selectedElements.length > 1) {
        this.moveMultipleElements(mouseX, mouseY);
      } else {
        const firstNode = this.draggedElement.nodes[0];
        let intendedX = mouseX - this.offset.x;
        let intendedY = mouseY - this.offset.y;
        if (this.enableSnapping) {
          intendedX = GRID_CONFIG.snapToGrid(intendedX);
          intendedY = GRID_CONFIG.snapToGrid(intendedY);
        }
        const deltaX = intendedX - firstNode.x;
        const deltaY = intendedY - firstNode.y;
        this.draggedElement.nodes = this.draggedElement.nodes.map(
          (n) => new Position(n.x + deltaX, n.y + deltaY)
        );
        if (!this.actuallyMoved && (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1)) {
          this.actuallyMoved = true;
        }
      }
    }
    this.circuitService.emit("update", {
      type: "dragElement",
      element: this.draggedElement,
      selectedElements: this.selectedElements
    });
  }
  /**
   * Move multiple selected elements while maintaining their relative positions.
   * @param {number} mouseX - X coordinate of mouse.
   * @param {number} mouseY - Y coordinate of mouse.
   */
  moveMultipleElements(mouseX, mouseY) {
    for (const element of this.selectedElements) {
      if (!Array.isArray(element.nodes) || element.nodes.length === 0) continue;
      const elementOffset = this.elementOffsets.get(element.id);
      if (!elementOffset) continue;
      const firstNode = element.nodes[0];
      let intendedX = mouseX - elementOffset.x;
      let intendedY = mouseY - elementOffset.y;
      if (this.enableSnapping) {
        intendedX = GRID_CONFIG.snapToGrid(intendedX);
        intendedY = GRID_CONFIG.snapToGrid(intendedY);
      }
      const deltaX = intendedX - firstNode.x;
      const deltaY = intendedY - firstNode.y;
      element.nodes = element.nodes.map(
        (n) => new Position(n.x + deltaX, n.y + deltaY)
      );
      if (!this.actuallyMoved && (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1)) {
        this.actuallyMoved = true;
      }
    }
  }
  /**
   * Called on mouseup to finalize drag and check for any split conditions.
   * Includes:
   * - splitting a different wire body if a node touches it
   * - splitting the dragged wire if its body touches another node
   */
  stop() {
    if (this.actuallyMoved && this.draggedElement?.type === "wire" && Array.isArray(this.draggedElement.nodes) && this.draggedElement.nodes.length === 2) {
      const [start, end] = this.draggedElement.nodes;
      if (this.draggingNodeIndex !== null) {
        const movedNode = this.draggedElement.nodes[this.draggingNodeIndex];
        const didSplit = this.wireSplitService.trySplitAtNode(movedNode);
        if (didSplit) {
          this._resetState();
          return;
        }
      }
      if (this.draggingNodeIndex === null) {
        for (const node of this.draggedElement.nodes) {
          const didSplit = this.wireSplitService.trySplitAtNode(node);
          if (didSplit) {
            this._resetState();
            return;
          }
        }
      }
      for (const element of this.circuitService.getElements()) {
        if (element.id === this.draggedElement.id) continue;
        for (const node of element.nodes) {
          const didSplit = this.wireSplitService.splitWireAtPointIfTouching(
            this.draggedElement,
            node
          );
          if (didSplit) {
            this._resetState();
            return;
          }
          if (this.actuallyMoved) {
            this.wireSplitService.trySplitAtNode(node);
          }
        }
      }
    }
    this._resetState();
  }
  /**
   * Resets internal drag state variables after a drag completes.
   * @private
   */
  _resetState() {
    this.draggedElement = null;
    this.draggingNodeIndex = null;
    this.dragAxis = null;
    this.actuallyMoved = false;
    this.elementStartPos.clear();
  }
  /**
   * Finds the closest wire node to the click position.
   * @param {Element} element - The element to test (must be a wire).
   * @param {number} mouseX
   * @param {number} mouseY
   * @returns {number} Index of the closest node or -1 if not within range.
   */
  findClosestNodeIndex(element, mouseX, mouseY) {
    if (!Array.isArray(element.nodes)) return -1;
    const auraSize = 10;
    let closestIndex = -1;
    let minDist = Infinity;
    for (let i = 0; i < element.nodes.length; i++) {
      const node = element.nodes[i];
      const dist = Math.hypot(mouseX - node.x, mouseY - node.y);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    }
    return minDist <= auraSize ? closestIndex : -1;
  }
  /**
   * Determines if a mouse click occurred on the body of an element.
   * Uses bounding box and perpendicular distance tests.
   * @param {number} worldX
   * @param {number} worldY
   * @param {Element} element
   * @returns {boolean}
   */
  isInsideElement(worldX, worldY, element) {
    const auraSize = 10;
    if (!Array.isArray(element.nodes) || element.nodes.length < 2) return false;
    const [start, end] = element.nodes;
    const lineLength = Math.hypot(end.x - start.x, end.y - start.y);
    if (lineLength === 0) {
      return Math.hypot(worldX - start.x, worldY - start.y) <= auraSize;
    }
    const minX = Math.min(start.x, end.x) - auraSize;
    const maxX = Math.max(start.x, end.x) + auraSize;
    const minY = Math.min(start.y, end.y) - auraSize;
    const maxY = Math.max(start.y, end.y) + auraSize;
    if (worldX < minX || worldX > maxX || worldY < minY || worldY > maxY) return false;
    const distance = Math.abs(
      (end.y - start.y) * worldX - (end.x - start.x) * worldY + end.x * start.y - end.y * start.x
    ) / lineLength;
    return distance <= auraSize;
  }
};

// src/gui/commands/SelectElementCommand.js
var SelectElementCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.previousSelection = null;
    this.currentSelection = null;
  }
  /**
   * Execute selection command
   * @param {Object} element - The element to select, or null to clear selection
   */
  execute(element) {
    this.previousSelection = this.circuitRenderer.selectedElement;
    this.currentSelection = element;
    this.circuitRenderer.setSelectedElement(element);
    this.circuitRenderer.render();
  }
  /**
   * Undo selection command
   */
  undo() {
    this.circuitRenderer.setSelectedElement(this.previousSelection);
    this.circuitRenderer.render();
  }
  /**
   * Check if this command can be undone
   */
  canUndo() {
    return false;
  }
};

// src/gui/commands/MultiSelectElementCommand.js
var MultiSelectElementCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.previousSelection = /* @__PURE__ */ new Set();
    this.currentSelection = /* @__PURE__ */ new Set();
  }
  /**
   * Execute multi-selection command
   * @param {Array} elements - The elements to select
   * @param {boolean} additive - Whether to add to existing selection or replace it
   */
  execute(elements, additive = false) {
    this.previousSelection = new Set(this.circuitRenderer.getSelectedElements());
    if (!additive) {
      this.circuitRenderer.clearSelection();
    }
    if (Array.isArray(elements)) {
      elements.forEach((element) => {
        if (element) {
          this.circuitRenderer.addToSelection(element);
          this.currentSelection.add(element);
        }
      });
    } else if (elements) {
      this.circuitRenderer.addToSelection(elements);
      this.currentSelection.add(elements);
    }
  }
  /**
   * Undo multi-selection command
   */
  undo() {
    this.circuitRenderer.setSelectedElements(this.previousSelection);
  }
  /**
   * Check if this command can be undone
   */
  canUndo() {
    return false;
  }
};

// src/gui/commands/SelectAllElementsCommand.js
var SelectAllElementsCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.previousSelection = /* @__PURE__ */ new Set();
  }
  /**
   * Execute the select all command - selects all elements in the circuit
   */
  execute() {
    this.previousSelection = new Set(this.circuitRenderer.getSelectedElements());
    const allElements = this.circuitService.getElements();
    if (allElements.length === 0) {
      return;
    }
    this.circuitRenderer.clearSelection();
    allElements.forEach((element) => {
      this.circuitRenderer.addToSelection(element);
    });
    this.circuitRenderer.render();
  }
  /**
   * Undo the select all command - restore previous selection
   */
  undo() {
    this.circuitRenderer.setSelectedElements(this.previousSelection);
    this.circuitRenderer.render();
  }
  /**
   * Check if this command can be undone
   * @returns {boolean}
   */
  canUndo() {
    return false;
  }
};

// src/utils/Logger.js
function isDevelopmentMode() {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("debug")) {
      return urlParams.get("debug") !== "false";
    }
    const debugMode = localStorage.getItem("qucat-debug");
    if (debugMode !== null) {
      return debugMode === "true";
    }
  }
  if (typeof window !== "undefined") {
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:";
  }
  return true;
}
var Logger = class _Logger {
  static isDev = isDevelopmentMode();
  static log(...args) {
    if (_Logger.isDev) {
      console.log(...args);
    }
  }
  static warn(...args) {
    if (_Logger.isDev) {
      console.warn(...args);
    }
  }
  static error(...args) {
    if (_Logger.isDev) {
      console.error(...args);
    } else {
      console.error("Error occurred:", args[0]);
    }
  }
  static debug(...args) {
    if (_Logger.isDev) {
      console.debug(...args);
    }
  }
  static info(...args) {
    if (_Logger.isDev) {
      console.info(...args);
    }
  }
  /**
   * Enable/disable debug mode at runtime
   */
  static setDebugMode(enabled) {
    _Logger.isDev = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("qucat-debug", enabled.toString());
    }
  }
  /**
   * Log performance timing information
   */
  static time(label) {
    if (_Logger.isDev) {
      console.time(label);
    }
  }
  static timeEnd(label) {
    if (_Logger.isDev) {
      console.timeEnd(label);
    }
  }
};
if (typeof window !== "undefined") {
  window.setQuCatDebug = Logger.setDebugMode;
}

// src/gui/commands/DeleteElementCommand.js
var DeleteElementCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.deletedElements = [];
  }
  /**
   * Execute the delete command - remove selected elements
   */
  execute() {
    const selectedElements = this.circuitRenderer.getSelectedElements();
    if (!selectedElements || selectedElements.length === 0) {
      return;
    }
    this.deletedElements = selectedElements.map((element) => ({
      element: JSON.parse(JSON.stringify(element)),
      id: element.id
    }));
    selectedElements.forEach((element) => {
      this.circuitService.deleteElement(element.id);
    });
    this.circuitRenderer.clearSelection();
  }
  /**
   * Undo the delete command - restore deleted elements
   */
  undo() {
    if (!this.deletedElements || this.deletedElements.length === 0) {
      return;
    }
    this.deletedElements.forEach(({ element }) => {
      this.circuitService.addElement(element);
    });
  }
  /**
   * Check if this command can be undone
   * @returns {boolean}
   */
  canUndo() {
    return this.deletedElements && this.deletedElements.length > 0;
  }
};

// src/gui/commands/DeleteAllCommand.js
var DeleteAllCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.deletedElements = [];
    this.hasBeenExecuted = false;
  }
  /**
   * Execute the delete all command - remove all elements
   */
  execute() {
    const allElements = this.circuitService.getElements();
    if (!allElements || allElements.length === 0) {
      return;
    }
    this.deletedElements = allElements.map((element) => ({
      element: JSON.parse(JSON.stringify(element)),
      id: element.id
    }));
    this.hasBeenExecuted = true;
    allElements.forEach((element) => {
      this.circuitService.deleteElement(element.id);
    });
    this.circuitRenderer.clearSelection();
  }
  /**
   * Undo the delete all command - restore all deleted elements
   */
  undo() {
    if (!this.deletedElements || this.deletedElements.length === 0) {
      return;
    }
    this.deletedElements.forEach(({ element }) => {
      const existingElement = this.circuitService.getElementByID(element.id);
      if (!existingElement) {
        this.circuitService.addElement(element);
      }
    });
  }
  /**
   * Check if this command can be undone
   * @returns {boolean}
   */
  canUndo() {
    return this.hasBeenExecuted;
  }
};

// src/gui/commands/UpdateElementPropertiesCommand.js
var UpdateElementPropertiesCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.elementId = null;
    this.oldProperties = null;
    this.oldLabel = null;
    this.newProperties = null;
    this.newLabel = null;
  }
  /**
   * Initialize the command with element and new properties
   * @param {string} elementId - ID of the element to update
   * @param {Object} newProperties - New properties to set
   */
  setData(elementId, newProperties) {
    this.elementId = elementId;
    this.newProperties = newProperties;
    this.newLabel = newProperties.label;
    const element = this.circuitService.getElementByID(elementId);
    if (element) {
      this.oldProperties = { ...element.getProperties().values };
      this.oldLabel = element.label;
    }
  }
  /**
   * Execute the property update through CircuitService
   */
  execute() {
    if (!this.elementId || !this.newProperties) {
      return;
    }
    const success = this.circuitService.updateElementProperties(this.elementId, this.newProperties);
    if (!success) {
      console.error(`Failed to update element ${this.elementId}`);
    }
  }
  /**
   * Undo the property update by restoring old values through CircuitService
   */
  undo() {
    if (!this.elementId || !this.oldProperties) {
      return;
    }
    const oldPropertiesWithLabel = {
      ...this.oldProperties,
      label: this.oldLabel
    };
    const success = this.circuitService.updateElementProperties(this.elementId, oldPropertiesWithLabel);
    if (!success) {
    } else {
    }
  }
  /**
   * Check if this command can be undone
   * @returns {boolean}
   */
  canUndo() {
    return this.elementId && this.oldProperties;
  }
};

// src/gui/commands/CopyElementsCommand.js
var CopyElementsCommand = class _CopyElementsCommand extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    _CopyElementsCommand.clipboard = _CopyElementsCommand.clipboard || [];
  }
  /**
   * Execute the copy command - store selected elements in clipboard
   */
  execute() {
    const selectedElements = this.circuitRenderer.getSelectedElements();
    if (!selectedElements || selectedElements.length === 0) {
      return;
    }
    _CopyElementsCommand.clipboard = selectedElements.map(
      (element) => JSON.parse(JSON.stringify(element))
    );
  }
  /**
   * Undo the copy command - this is a no-op since copy doesn't modify circuit state
   */
  undo() {
  }
  /**
   * Check if this command can be undone - always false for copy operations
   * @returns {boolean}
   */
  canUndo() {
    return false;
  }
  /**
   * Static method to check if clipboard has content
   * @returns {boolean}
   */
  static hasClipboardContent() {
    return _CopyElementsCommand.clipboard && _CopyElementsCommand.clipboard.length > 0;
  }
  /**
   * Static method to get clipboard content
   * @returns {Array}
   */
  static getClipboardContent() {
    return _CopyElementsCommand.clipboard || [];
  }
  /**
   * Static method to clear clipboard
   */
  static clearClipboard() {
    _CopyElementsCommand.clipboard = [];
  }
};

// src/gui/commands/PasteElementsCommand.js
init_Position();
init_ElementFactory();
init_Properties();
init_Label();
var PasteElementsCommand = class extends GUICommand {
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.pastedElements = [];
    this.PASTE_OFFSET_X = 20;
    this.PASTE_OFFSET_Y = 20;
  }
  /**
   * Execute the paste command - create new elements from clipboard with new IDs
   */
  execute() {
    const clipboardContent = CopyElementsCommand.getClipboardContent();
    if (!clipboardContent || clipboardContent.length === 0) {
      return;
    }
    this.pastedElements = [];
    clipboardContent.forEach((originalElement) => {
      try {
        const offsetNodes = originalElement.nodes.map(
          (node) => new Position(node.x + this.PASTE_OFFSET_X, node.y + this.PASTE_OFFSET_Y)
        );
        const properties = new Properties(originalElement.properties?.values || {});
        const label = originalElement.label?.value ? new Label(originalElement.label.value) : null;
        const prefix = originalElement.type.charAt(0).toUpperCase();
        const existingIds = this.circuitService.circuit.elements.map((el) => el.id);
        let newId;
        let counter2 = 1;
        do {
          newId = `${prefix}${counter2}`;
          counter2++;
        } while (existingIds.includes(newId));
        const newElement = ElementFactory.create(
          originalElement.type,
          newId,
          // Use our generated unique ID
          offsetNodes,
          properties,
          label
        );
        this.circuitService.addElement(newElement);
        this.pastedElements.push(newElement);
      } catch (error) {
        console.error(`[PasteElementsCommand] Failed to paste element:`, error);
      }
    });
    this.circuitRenderer.setSelectedElements(this.pastedElements);
  }
  /**
   * Undo the paste command - remove all pasted elements
   */
  undo() {
    if (!this.pastedElements || this.pastedElements.length === 0) {
      return;
    }
    this.pastedElements.forEach((element) => {
      this.circuitService.deleteElement(element.id);
    });
    this.circuitRenderer.clearSelection();
  }
  /**
   * Check if this command can be undone
   * @returns {boolean}
   */
  canUndo() {
    return this.pastedElements && this.pastedElements.length > 0;
  }
};

// src/infrastructure/adapters/QucatNetlistAdapter.js
init_Position();
init_Properties();
init_Label();
init_ElementFactory();
var typeMap = {
  R: { fullType: "resistor", propertyKey: "resistance" },
  C: { fullType: "capacitor", propertyKey: "capacitance" },
  L: { fullType: "inductor", propertyKey: "inductance" },
  J: { fullType: "junction", propertyKey: "value" },
  G: { fullType: "ground", propertyKey: "value" },
  W: { fullType: "wire", propertyKey: "value" }
};
var elementTypeToShortCode = {
  "resistor": "R",
  "capacitor": "C",
  "inductor": "L",
  "junction": "J",
  "ground": "G",
  "wire": "W"
};
var QucatNetlistAdapter = class {
  /**
   * Export the current circuit to a .qucat-style netlist string.
   * 
   * @param {Circuit} circuit - The domain aggregate.
   * @returns {string} The netlist content as a string.
   */
  static exportToString(circuit) {
    const serialized = circuit.getSerializedElements();
    return this._serializeElements(serialized);
  }
  /**
   * Import elements from a .qucat-style netlist string.
   * 
   * @param {string} content - The netlist content as a string.
   * @returns {Element[]} An array of Element instances.
   */
  static importFromString(content) {
    const lines = content.trim().split("\n").filter((line) => line.trim());
    return this._deserializeElements(lines);
  }
  /**
   * Internal: Serialize elements into .qucat netlist lines.
   * Converts pixel coordinates to v1.0 grid coordinates for QuCat Python compatibility.
   * Pipeline: pixel → v2.0 grid → v1.0 grid
   *
   * Ground convention for QuCat:
   * - pos1 = "minus" node (ground body / triple-line side)
   * - pos2 = "plus" node  (connection stick)
   *
   * JSCircuit stores ground with nodes[0] as the connection point.
   * This adapter remaps to QuCat convention during export.
   *
   * @param {Array<Object>} elements - Serialized element objects.
   * @returns {string} Netlist string content.
   */
  static _serializeElements(elements) {
    return elements.map((el) => {
      const { type, nodes, properties, label, id } = el;
      const shortType = elementTypeToShortCode[type];
      if (!shortType) throw new Error(`Unknown element type: ${type}`);
      const pixelPos1 = new Position(nodes[0].x, nodes[0].y);
      const pixelPos2 = new Position(nodes[1].x, nodes[1].y);
      const v2Grid1 = CoordinateAdapter.pixelToGrid(pixelPos1);
      const v2Grid2 = CoordinateAdapter.pixelToGrid(pixelPos2);
      let v1Grid1 = CoordinateAdapter.v2ToV1Grid(v2Grid1);
      let v1Grid2 = CoordinateAdapter.v2ToV1Grid(v2Grid2);
      if (shortType === "G") {
        const body = v1Grid2;
        const connection = v1Grid1;
        v1Grid1 = body;
        v1Grid2 = connection;
      }
      const node1 = `${v1Grid1.x},${v1Grid1.y}`;
      const node2 = `${v1Grid2.x},${v1Grid2.y}`;
      const mapEntry = typeMap[shortType];
      const { propertyKey } = mapEntry;
      const value = propertyKey && properties[propertyKey] !== void 0 ? properties[propertyKey] : "";
      const labelStr = label ?? "";
      let vFormatted = value;
      if (typeof value === "number") {
        let decimals = 1, vString = "0";
        while (parseFloat(vString) !== value && decimals < 15) {
          vString = value.toExponential(decimals);
          decimals += 1;
        }
        vFormatted = vString;
      }
      return `${shortType};${node1};${node2};${vFormatted};${labelStr}`;
    }).join("\n");
  }
  /**
   * Internal: Deserialize netlist lines into Element instances.
   * Converts logical coordinates from file back to pixel coordinates for internal use.
   * 
   * @param {string[]} lines - Each line follows the .qucat format.
   * @returns {Element[]} Instantiated domain elements.
   */
  static _deserializeElements(lines) {
    const detectedFormat = this._detectFormatByComponentSpans(lines);
    console.log(`\uFFFD QuCat Format Detection: ${detectedFormat.version} with ${detectedFormat.confidence}% confidence - ${detectedFormat.reasoning}`);
    const elements = [];
    for (const line of lines) {
      const [shortType, pos1, pos2, valueStr, labelStr] = line.trim().split(";");
      const mapEntry = typeMap[shortType];
      if (!mapEntry) throw new Error(`Unknown element type: ${shortType}`);
      const { fullType, propertyKey } = mapEntry;
      const [logicalX1, logicalY1] = pos1.split(",").map(Number);
      const [logicalX2, logicalY2] = pos2.split(",").map(Number);
      let pixelPos1, pixelPos2;
      if (detectedFormat.version === "v1.0") {
        const v1Pos1 = new GridCoordinate(logicalX1, logicalY1);
        const v1Pos2 = new GridCoordinate(logicalX2, logicalY2);
        const v2Pos1 = CoordinateAdapter.v1ToV2Grid(v1Pos1);
        const v2Pos2 = CoordinateAdapter.v1ToV2Grid(v1Pos2);
        pixelPos1 = CoordinateAdapter.gridToPixel(v2Pos1);
        pixelPos2 = CoordinateAdapter.gridToPixel(v2Pos2);
      } else {
        const logicalPos1 = new GridCoordinate(logicalX1, logicalY1);
        const logicalPos2 = new GridCoordinate(logicalX2, logicalY2);
        pixelPos1 = CoordinateAdapter.gridToPixel(logicalPos1);
        pixelPos2 = CoordinateAdapter.gridToPixel(logicalPos2);
      }
      const nodes = shortType === "G" ? [pixelPos2, pixelPos1] : [pixelPos1, pixelPos2];
      const raw = valueStr?.trim();
      const parsedValue = raw === "" || raw === void 0 ? void 0 : parseFloat(raw);
      const label = labelStr && labelStr.trim() !== "" ? new Label(labelStr.trim()) : null;
      const propObj = {};
      if (propertyKey) {
        propObj[propertyKey] = parsedValue;
      }
      if (shortType === "G") {
        const dx = pixelPos2.x - pixelPos1.x;
        const dy = pixelPos2.y - pixelPos1.y;
        const radians = Math.atan2(dy, dx);
        let orientation = Math.round(radians * 180 / Math.PI);
        if (orientation < 0) orientation += 360;
        propObj.orientation = orientation;
      }
      const properties = new Properties(propObj);
      const element = ElementFactory.create(fullType, null, nodes, properties, label);
      elements.push(element);
    }
    return elements;
  }
  /**
   * Analyzes component spans in netlist to detect QuCat format version.
   * v1.0: Components span 1 interval (R;0,0;1,0 = 1 unit span)
   * v2.0: Components span 5 intervals (R;0,0;5,0 = 5 unit span)
   *
   * @param {string[]} lines - Netlist lines
   * @returns {Object} Detection result with version, confidence, and reasoning
   */
  static _detectFormatByComponentSpans(lines) {
    const componentTypes = ["R", "C", "L"];
    const spans = [];
    let componentCount = 0;
    for (const line of lines) {
      const [shortType, pos1, pos2] = line.trim().split(";");
      if (!componentTypes.includes(shortType)) continue;
      const [x1, y1] = pos1.split(",").map(Number);
      const [x2, y2] = pos2.split(",").map(Number);
      const span = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      spans.push(span);
      componentCount++;
    }
    if (componentCount === 0) {
      console.warn("No primitive components found in QuCat file. Falling back to v2.0 (latest)");
      return {
        version: "v2.0",
        confidence: 50,
        componentCount: 0,
        reasoning: "No components found - fallback to latest version"
      };
    }
    const uniqueSpans = [...new Set(spans)];
    const spanCounts = {};
    spans.forEach((span) => spanCounts[span] = (spanCounts[span] || 0) + 1);
    const dominantSpan = Object.keys(spanCounts).reduce(
      (a, b) => spanCounts[a] > spanCounts[b] ? a : b
    );
    const dominantCount = spanCounts[dominantSpan];
    const confidence = Math.round(dominantCount / spans.length * 100);
    let version, reasoning;
    const hasUnitSpans = spans.includes(1);
    const hasFiveSpans = spans.includes(5);
    const hasOnlyStandardSpans = uniqueSpans.every((span) => span === 1 || span === 5);
    const hasBothStandardSpans = hasUnitSpans && hasFiveSpans;
    if (hasBothStandardSpans) {
      version = "v2.0";
      reasoning = `Mixed spans but contains v2.0-style 5-interval components`;
    } else if (dominantSpan == 1 && hasOnlyStandardSpans) {
      version = "v1.0";
      reasoning = `${dominantCount}/${componentCount} components span 1 interval`;
    } else if (dominantSpan == 5 && hasOnlyStandardSpans) {
      version = "v2.0";
      reasoning = `${dominantCount}/${componentCount} components span 5 intervals`;
    } else if (hasUnitSpans && !hasFiveSpans) {
      version = "v1.0";
      reasoning = `Mixed spans but contains v1.0-style 1-interval components`;
    } else if (hasFiveSpans && !hasUnitSpans) {
      version = "v2.0";
      reasoning = `Mixed spans but contains v2.0-style 5-interval components`;
    } else {
      version = "v2.0";
      reasoning = `Ambiguous spans (dominant: ${dominantSpan}) - fallback to latest`;
    }
    return {
      version,
      confidence,
      componentCount,
      reasoning,
      spans: uniqueSpans,
      dominantSpan: parseInt(dominantSpan)
    };
  }
};

// src/gui/commands/SaveNetlistCommand.js
var SaveNetlistCommand = class extends GUICommand {
  /**
   * @param {CircuitService} circuitService - The circuit service
   * @param {CircuitRenderer} circuitRenderer - The circuit renderer for UI updates
   */
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
  }
  /**
   * Execute save netlist operation
   */
  execute() {
    try {
      const circuit = this.circuitService.circuit;
      if (!circuit || circuit.elements.length === 0) {
        console.warn("[SaveNetlistCommand] No circuit elements to save");
        alert("No circuit elements to save. Please add some components first.");
        return { undo: () => {
        } };
      }
      const netlistContent = QucatNetlistAdapter.exportToString(circuit);
      this._downloadNetlist(netlistContent);
      return { undo: () => {
      } };
    } catch (error) {
      console.error("[SaveNetlistCommand] Error saving netlist:", error);
      alert(`Error saving netlist: ${error.message}`);
      return { undo: () => {
      } };
    }
  }
  /**
   * Create and trigger a download of the netlist content
   * @param {string} content - The netlist content to download
   * @private
   */
  _downloadNetlist(content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `circuit_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:-]/g, "")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  /**
   * Undo is not applicable for save operations
   */
  undo() {
  }
};

// src/gui/commands/OpenNetlistCommand.js
var OpenNetlistCommand = class extends GUICommand {
  /**
   * @param {CircuitService} circuitService - The circuit service
   * @param {CircuitRenderer} circuitRenderer - The circuit renderer for UI updates
   */
  constructor(circuitService, circuitRenderer) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.previousState = null;
  }
  /**
   * Execute open netlist operation
   */
  execute() {
    this.previousState = this.circuitService.exportState();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt,.qucat";
    fileInput.style.display = "none";
    return new Promise((resolve) => {
      fileInput.addEventListener("change", async (event) => {
        try {
          const file = event.target.files[0];
          if (!file) {
            resolve({ undo: () => {
            } });
            return;
          }
          const content = await this._readFileContent(file);
          const elements = await this._parseNetlistContent(content);
          if (!elements || elements.length === 0) {
            console.warn("[OpenNetlistCommand] No valid elements found in netlist");
            alert("No valid circuit elements found in the selected file.");
            resolve({ undo: () => {
            } });
            return;
          }
          await this._loadElementsIntoCircuit(elements);
          this.circuitService.emit("update");
          this.circuitRenderer.render();
          resolve({
            undo: () => this.undo()
          });
        } catch (error) {
          console.error("[OpenNetlistCommand] Error loading netlist:", error);
          alert(`Error loading netlist file: ${error.message}`);
          resolve({ undo: () => {
          } });
        } finally {
          document.body.removeChild(fileInput);
        }
      });
      document.body.appendChild(fileInput);
      fileInput.click();
    });
  }
  /**
   * Read the content of the selected file
   * @param {File} file - The file to read
   * @returns {Promise<string>} The file content
   * @private
   */
  _readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }
  /**
   * Parse netlist content into Element instances
   * @param {string} content - The netlist file content
   * @returns {Promise<Element[]>} Array of parsed elements
   * @private
   */
  async _parseNetlistContent(content) {
    try {
      const elements = QucatNetlistAdapter.importFromString(content);
      return elements;
    } catch (error) {
      throw new Error(`Failed to parse netlist content: ${error.message}`);
    }
  }
  /**
   * Load the parsed elements into the circuit
   * @param {Element[]} elements - The elements to load
   * @private
   */
  async _loadElementsIntoCircuit(elements) {
    try {
      const currentElements = [...this.circuitService.circuit.elements];
      for (const element of currentElements) {
        this.circuitService.deleteElement(element.id);
      }
      for (const element of elements) {
        this.circuitService.addElement(element);
      }
    } catch (error) {
      throw new Error(`Failed to load elements into circuit: ${error.message}`);
    }
  }
  /**
   * Undo the open operation by restoring previous state
   */
  undo() {
    if (this.previousState) {
      this.circuitService.importState(this.previousState);
      this.circuitService.emit("update");
      this.circuitRenderer.render();
    } else {
    }
  }
};

// src/gui/commands/CopyNetlistToClipboardCommand.js
var CopyNetlistToClipboardCommand = class extends GUICommand {
  /**
   * @param {CircuitService} circuitService - The circuit service
   * @param {CircuitRenderer} circuitRenderer - The circuit renderer for UI updates
   * @param {(message: string, type: 'success'|'error') => void} notify - Notification callback
   */
  constructor(circuitService, circuitRenderer, notify) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.notify = notify || (() => {
    });
  }
  /**
   * Execute copy netlist to clipboard operation
   */
  execute() {
    try {
      const circuit = this.circuitService.circuit;
      if (!circuit || circuit.elements.length === 0) {
        console.warn("[CopyNetlistToClipboardCommand] No circuit elements to copy");
        alert("No circuit elements to copy. Please add some components first.");
        return { undo: () => {
        } };
      }
      const netlistContent = QucatNetlistAdapter.exportToString(circuit);
      this._copyToClipboard(netlistContent);
      return { undo: () => {
      } };
    } catch (error) {
      console.error("[CopyNetlistToClipboardCommand] Error copying netlist to clipboard:", error);
      alert(`Error copying netlist to clipboard: ${error.message}`);
      return { undo: () => {
      } };
    }
  }
  /**
   * Copy text to clipboard using the Clipboard API
   * Falls back to older execCommand method if needed
   * @param {string} content - The content to copy
   * @private
   */
  _copyToClipboard(content) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        console.log("[CopyNetlistToClipboardCommand] Netlist copied to clipboard");
        this._showSuccessNotification("Netlist copied to clipboard");
      }).catch((err) => {
        console.error("[CopyNetlistToClipboardCommand] Failed to copy to clipboard:", err);
        this._showErrorNotification("Failed to copy to clipboard");
      });
    } else {
      this._copyToClipboardFallback(content);
    }
  }
  /**
   * Fallback method for copying to clipboard using execCommand
   * @param {string} content - The content to copy
   * @private
   */
  _copyToClipboardFallback(content) {
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    try {
      textArea.select();
      const successful = document.execCommand("copy");
      if (successful) {
        console.log("[CopyNetlistToClipboardCommand] Netlist copied to clipboard (fallback method)");
        this._showSuccessNotification("Netlist copied to clipboard");
      } else {
        console.error("[CopyNetlistToClipboardCommand] execCommand failed");
        this._showErrorNotification("Failed to copy to clipboard");
      }
    } catch (err) {
      console.error("[CopyNetlistToClipboardCommand] Fallback copy failed:", err);
      this._showErrorNotification("Failed to copy to clipboard");
    } finally {
      document.body.removeChild(textArea);
    }
  }
  /**
   * Show success notification to user
   * @param {string} message - The message to display
   * @private
   */
  _showSuccessNotification(message) {
    this.notify(message, "success");
  }
  /**
   * Show error notification to user
   * @param {string} message - The message to display
   * @private
   */
  _showErrorNotification(message) {
    this.notify(message, "error");
  }
};

// src/gui/commands/PasteNetlistFromClipboardCommand.js
var PasteNetlistFromClipboardCommand = class extends GUICommand {
  /**
   * @param {import('../../application/CircuitService.js').CircuitService} circuitService
   * @param {import('../../gui/renderers/CircuitRenderer.js').CircuitRenderer} circuitRenderer
   * @param {(message: string, type: 'success'|'error') => void} notify - Notification callback
   */
  constructor(circuitService, circuitRenderer, notify) {
    super();
    this.circuitService = circuitService;
    this.circuitRenderer = circuitRenderer;
    this.notify = notify || (() => {
    });
    this.previousState = null;
  }
  /* ------------------------------------------------------------------ */
  /*  execute()                                                          */
  /* ------------------------------------------------------------------ */
  /**
   * Show the paste-dialog and — on confirmation — load the netlist.
   * Returns a Promise that resolves to `{ undo }` (same contract as
   * OpenNetlistCommand).
   */
  execute() {
    this.previousState = this.circuitService.exportState();
    return new Promise((resolve) => {
      this._showPasteDialog(
        (netlistText) => {
          try {
            const elements = QucatNetlistAdapter.importFromString(netlistText);
            if (!elements || elements.length === 0) {
              this._showErrorNotification("No valid circuit elements found in the pasted text.");
              resolve({ undo: () => {
              } });
              return;
            }
            this._loadElementsIntoCircuit(elements);
            this.circuitService.emit("update");
            this.circuitRenderer.render();
            this._showSuccessNotification(`Imported ${elements.length} element(s) from netlist.`);
            resolve({ undo: () => this.undo() });
          } catch (error) {
            console.error("[PasteNetlistFromClipboardCommand] Parse error:", error);
            this._showErrorNotification(`Invalid netlist: ${error.message}`);
            resolve({ undo: () => {
            } });
          }
        },
        () => {
          resolve({ undo: () => {
          } });
        }
      );
    });
  }
  /* ------------------------------------------------------------------ */
  /*  undo()                                                             */
  /* ------------------------------------------------------------------ */
  undo() {
    if (this.previousState) {
      this.circuitService.importState(this.previousState);
      this.circuitService.emit("update");
      this.circuitRenderer.render();
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Private helpers                                                    */
  /* ------------------------------------------------------------------ */
  /**
   * Clear the circuit and load parsed elements (same pattern as OpenNetlistCommand).
   * @param {import('../../domain/entities/Element.js').Element[]} elements
   * @private
   */
  _loadElementsIntoCircuit(elements) {
    const currentElements = [...this.circuitService.circuit.elements];
    for (const element of currentElements) {
      this.circuitService.deleteElement(element.id);
    }
    for (const element of elements) {
      this.circuitService.addElement(element);
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Paste-dialog                                                       */
  /* ------------------------------------------------------------------ */
  /**
   * Render a modal dialog containing a <textarea> and Import / Cancel buttons.
   *
   * @param {(text: string) => void} onImport  Called with the textarea value.
   * @param {() => void}             onCancel  Called when the dialog is dismissed.
   * @private
   */
  _showPasteDialog(onImport, onCancel) {
    if (typeof document === "undefined" || !document.body) {
      onCancel();
      return;
    }
    const overlay = document.createElement("div");
    overlay.style.cssText = `
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.45);
            display: flex; align-items: center; justify-content: center;
            z-index: 10000;
        `;
    const dialog = document.createElement("div");
    dialog.style.cssText = `
            background: #fff; border-radius: 8px;
            padding: 24px; width: 520px; max-width: 90vw;
            box-shadow: 0 8px 32px rgba(0,0,0,0.25);
            font-family: Arial, sans-serif;
        `;
    const title = document.createElement("h3");
    title.textContent = "Paste Netlist";
    title.style.cssText = "margin: 0 0 8px; font-size: 16px; color: #2c3e50;";
    const desc = document.createElement("p");
    desc.textContent = "Paste a QuCat netlist below (e.g. from a Jupyter cell) and click Import.";
    desc.style.cssText = "margin: 0 0 12px; font-size: 13px; color: #666;";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "R;1,0;2,0;1000;R_1\nC;2,0;3,0;1e-12;C_1";
    textarea.style.cssText = `
            width: 100%; height: 160px;
            padding: 10px; font-family: monospace; font-size: 13px;
            border: 1px solid #ccc; border-radius: 4px;
            resize: vertical; box-sizing: border-box;
        `;
    const btnBar = document.createElement("div");
    btnBar.style.cssText = "display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;";
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    btnCancel.style.cssText = `
            padding: 8px 18px; border: 1px solid #ccc; border-radius: 4px;
            background: #fff; cursor: pointer; font-size: 13px;
        `;
    const btnImport = document.createElement("button");
    btnImport.textContent = "Import";
    btnImport.style.cssText = `
            padding: 8px 18px; border: none; border-radius: 4px;
            background: #3498db; color: #fff; cursor: pointer; font-size: 13px;
        `;
    btnBar.append(btnCancel, btnImport);
    dialog.append(title, desc, textarea, btnBar);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    textarea.focus();
    const close = () => {
      if (overlay.parentNode) document.body.removeChild(overlay);
    };
    btnImport.addEventListener("click", () => {
      const text = textarea.value.trim();
      close();
      if (text) {
        onImport(text);
      } else {
        this._showErrorNotification("Netlist text is empty.");
        onCancel();
      }
    });
    btnCancel.addEventListener("click", () => {
      close();
      onCancel();
    });
    const onKeydown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        onCancel();
        document.removeEventListener("keydown", onKeydown, true);
      }
    };
    document.addEventListener("keydown", onKeydown, true);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        close();
        onCancel();
      }
    });
  }
  /* ------------------------------------------------------------------ */
  /*  Notifications (same pattern as CopyNetlistToClipboardCommand)     */
  /* ------------------------------------------------------------------ */
  /** @private */
  _showSuccessNotification(message) {
    this.notify(message, "success");
  }
  /** @private */
  _showErrorNotification(message) {
    this.notify(message, "error");
  }
};

// src/gui/components/Notification.js
var Notification = class _Notification {
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /**
   * Show a green success toast.
   * @param {import('../renderers/CircuitRenderer.js').CircuitRenderer} circuitRenderer
   * @param {string} message
   * @param {number} [duration=3000] ms before fade-out begins
   */
  static success(circuitRenderer, message, duration = 3e3) {
    _Notification._show(circuitRenderer, message, "#4caf50", duration);
  }
  /**
   * Show a red error toast.
   * @param {import('../renderers/CircuitRenderer.js').CircuitRenderer} circuitRenderer
   * @param {string} message
   * @param {number} [duration=3000]
   */
  static error(circuitRenderer, message, duration = 3e3) {
    _Notification._show(circuitRenderer, message, "#f44336", duration);
  }
  /* ------------------------------------------------------------------ */
  /*  Internal                                                           */
  /* ------------------------------------------------------------------ */
  /**
   * @param {import('../renderers/CircuitRenderer.js').CircuitRenderer} circuitRenderer
   * @param {string} message
   * @param {string} bgColor
   * @param {number} duration
   * @private
   */
  static _show(circuitRenderer, message, bgColor, duration) {
    const container = circuitRenderer?.canvas?.parentElement;
    if (!container) return;
    const el = document.createElement("div");
    el.textContent = message;
    el.style.cssText = `
            position: sticky; top: 12px; left: 12px;
            width: fit-content;
            background-color: ${bgColor}; color: white;
            padding: 12px 20px; border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 10001; font-family: Arial, sans-serif; font-size: 14px;
            pointer-events: none;
            opacity: 0; transition: opacity 0.3s ease-in;
        `;
    container.insertBefore(el, container.firstChild);
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, duration);
  }
};

// src/application/WireSplitService.js
init_Position();
var WireSplitService = class {
  /**
   * @param {CircuitService} circuitService - Service managing the circuit elements.
   * @param {ElementRegistry} elementRegistry - Registry for creating new wire elements.
   */
  constructor(circuitService, elementRegistry) {
    this.circuitService = circuitService;
    this.elementRegistry = elementRegistry;
  }
  /**
   * Attempts to split any wire in the circuit if the given position lies on a wire segment.
   * Skips the endnodes.
   *
   * @param {Position} node - The node potentially touching a wire body.
   * @returns {boolean} True if a wire was split; otherwise false.
   */
  trySplitAtNode(node) {
    for (const element of this.circuitService.getElements()) {
      if (element.type !== "wire") continue;
      if (!Array.isArray(element.nodes) || element.nodes.length !== 2) continue;
      const [start, end] = element.nodes;
      if (this._isOnSegment(node, start, end) && !node.equals(start) && !node.equals(end)) {
        this._splitWire(element, node);
        return true;
      }
    }
    return false;
  }
  /**
   * Attempts to split the provided wire at the given node, if the node lies on its body.
   * Used when a wire is actively being moved toward an existing node.
   *
   * @param {Element} wire - The wire being dragged.
   * @param {Position} node - The position possibly intersecting the wire's body.
   * @returns {boolean} True if the wire was split; otherwise false.
   */
  splitWireAtPointIfTouching(wire, node) {
    if (!Array.isArray(wire.nodes) || wire.nodes.length !== 2) return false;
    const [start, end] = wire.nodes;
    if (this._isOnSegment(node, start, end) && !node.equals(start) && !node.equals(end)) {
      this._splitWire(wire, node);
      return true;
    }
    return false;
  }
  /**
   * Determines whether node `p` lies on the segment from `a` to `b`.
   * Uses a cross product for collinearity and dot product for bounds.
   * Ignores floating node noise with a tolerance.
   *
   * @private
   * @param {Position} p - The node to test.
   * @param {Position} a - Start of the segment.
   * @param {Position} b - End of the segment.
   * @returns {boolean} True if node lies on segment a→b (excluding endnodes).
   */
  _isOnSegment(p, a, b) {
    const cross = (b.y - a.y) * (p.x - a.x) - (b.x - a.x) * (p.y - a.y);
    if (Math.abs(cross) > 1e-6) return false;
    const dot = (p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y);
    const lenSq = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
    return dot > 0 && dot < lenSq;
  }
  /**
   * Splits a wire into two segments at the given node. The original wire is deleted.
   *
   * @private
   * @param {Element} wire - The original wire to split.
   * @param {Position} splitPoint - The node where the wire is split.
   */
  _splitWire(wire, splitPoint) {
    this.circuitService.deleteElement(wire.id);
    const wireFactory = this.elementRegistry.get("wire");
    const wire1 = wireFactory(void 0, [wire.nodes[0], splitPoint], null, {});
    const wire2 = wireFactory(void 0, [splitPoint, wire.nodes[1]], null, {});
    this.circuitService.addElement(wire1);
    this.circuitService.addElement(wire2);
  }
};

// src/config/registry.js
if (ElementRegistry.getTypes().length === 0) {
  ElementRegistry.register("resistor", (id = generateId("R"), nodes, label = null, properties = new Properties({})) => {
    const defaultProps = { resistance: 1, orientation: 0 };
    const finalProps = properties instanceof Properties ? properties : new Properties(defaultProps);
    if (finalProps.values.orientation === void 0) {
      finalProps.values.orientation = 0;
    }
    return new Resistor(id, nodes, label, finalProps);
  });
  ElementRegistry.register("wire", (id = generateId("W"), nodes, label = null, properties = new Properties({})) => {
    const finalProps = properties instanceof Properties ? properties : new Properties({});
    return new Wire(id, nodes, label, finalProps);
  });
  ElementRegistry.register("capacitor", (id = generateId("C"), nodes, label = null, properties = new Properties({})) => {
    const defaultProps = { capacitance: 1e-12, orientation: 0 };
    const finalProps = properties instanceof Properties ? properties : new Properties(defaultProps);
    if (finalProps.values.orientation === void 0) {
      finalProps.values.orientation = 0;
    }
    return new Capacitor(id, nodes, label, finalProps);
  });
  ElementRegistry.register("inductor", (id = generateId("L"), nodes, label = null, properties = new Properties({})) => {
    const defaultProps = { inductance: 1e-9, orientation: 0 };
    const finalProps = properties instanceof Properties ? properties : new Properties(defaultProps);
    if (finalProps.values.orientation === void 0) {
      finalProps.values.orientation = 0;
    }
    return new Inductor(id, nodes, label, finalProps);
  });
  ElementRegistry.register("junction", (id = generateId("J"), nodes, label = null, properties = new Properties({})) => {
    const finalProps = properties instanceof Properties ? properties : new Properties({ orientation: 0 });
    if (finalProps.values.orientation === void 0) {
      finalProps.values.orientation = 0;
    }
    return new Junction(id, nodes, label, finalProps);
  });
  ElementRegistry.register("ground", (id = generateId("G"), nodes, label = null, properties = new Properties({})) => {
    const finalProps = properties instanceof Properties ? properties : new Properties({ orientation: 0 });
    if (finalProps.values.orientation === void 0) {
      finalProps.values.orientation = 0;
    }
    return new Ground(id, nodes, null, finalProps);
  });
}
var rendererFactory = new RendererFactory();
rendererFactory.register("resistor", ResistorRenderer);
rendererFactory.register("wire", WireRenderer);
rendererFactory.register("capacitor", CapacitorRenderer);
rendererFactory.register("inductor", InductorRenderer);
rendererFactory.register("junction", JunctionRenderer);
rendererFactory.register("ground", GroundRenderer);
function setupCommands(circuitService, circuitRenderer) {
  const wireSplitService = new WireSplitService(circuitService, ElementRegistry);
  if (!GUICommandRegistry.getTypes().includes("addElement")) {
    GUICommandRegistry.register(
      "addElement",
      (circuitService2, circuitRenderer2, elementRegistry, elementType) => new AddElementCommand(circuitService2, circuitRenderer2, elementRegistry, elementType)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("drawWire")) {
    GUICommandRegistry.register(
      "drawWire",
      () => new DrawWireCommand(circuitService, ElementRegistry, wireSplitService)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("dragElement")) {
    GUICommandRegistry.register(
      "dragElement",
      () => new DragElementCommand(circuitService, circuitRenderer, wireSplitService)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("selectElement")) {
    GUICommandRegistry.register(
      "selectElement",
      () => new SelectElementCommand(circuitService, circuitRenderer)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("multiSelectElement")) {
    GUICommandRegistry.register(
      "multiSelectElement",
      () => new MultiSelectElementCommand(circuitService, circuitRenderer)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("selectAll")) {
    GUICommandRegistry.register("selectAll", () => new SelectAllElementsCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("deleteSelection")) {
    GUICommandRegistry.register("deleteSelection", () => new DeleteElementCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("deleteAll")) {
    GUICommandRegistry.register("deleteAll", () => new DeleteAllCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("updateElementProperties")) {
    GUICommandRegistry.register("updateElementProperties", () => new UpdateElementPropertiesCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("copyElements")) {
    GUICommandRegistry.register("copyElements", () => new CopyElementsCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("pasteElements")) {
    GUICommandRegistry.register("pasteElements", () => new PasteElementsCommand(circuitService, circuitRenderer));
  }
  if (!GUICommandRegistry.getTypes().includes("deselectAll")) {
    GUICommandRegistry.register("deselectAll", () => ({
      execute: () => {
        circuitRenderer.clearSelection();
        circuitService.emit("update");
      }
    }));
  }
  if (!GUICommandRegistry.getTypes().includes("rotateRight")) {
    GUICommandRegistry.register("rotateRight", (circuitService2, circuitRenderer2, elementRegistry) => ({
      execute: () => {
        const before = circuitService2.exportState();
        const selectedElements = circuitRenderer2.getSelectedElements();
        if (!selectedElements || selectedElements.length === 0) {
          return { undo: () => {
          } };
        }
        if (selectedElements.length > 1) {
          return { undo: () => {
          } };
        }
        const elementIds = selectedElements.map((element) => element.id);
        circuitService2.rotateElements(elementIds, 90);
        return {
          undo: () => circuitService2.importState(before)
        };
      }
    }));
  }
  if (!GUICommandRegistry.getTypes().includes("rotateUp")) {
    GUICommandRegistry.register("rotateUp", (circuitService2, circuitRenderer2, elementRegistry) => ({
      execute: () => {
        const before = circuitService2.exportState();
        const selectedElements = circuitRenderer2.getSelectedElements();
        if (!selectedElements || selectedElements.length === 0) {
          return { undo: () => {
          } };
        }
        if (selectedElements.length > 1) {
          return { undo: () => {
          } };
        }
        const elementIds = selectedElements.map((element) => element.id);
        circuitService2.rotateElements(elementIds, 180);
        return {
          undo: () => circuitService2.importState(before)
        };
      }
    }));
  }
  if (!GUICommandRegistry.getTypes().includes("rotateLeft")) {
    GUICommandRegistry.register("rotateLeft", (circuitService2, circuitRenderer2, elementRegistry) => ({
      execute: () => {
        const before = circuitService2.exportState();
        const selectedElements = circuitRenderer2.getSelectedElements();
        if (!selectedElements || selectedElements.length === 0) {
          return { undo: () => {
          } };
        }
        if (selectedElements.length > 1) {
          return { undo: () => {
          } };
        }
        const elementIds = selectedElements.map((element) => element.id);
        circuitService2.rotateElements(elementIds, -90);
        return {
          undo: () => circuitService2.importState(before)
        };
      }
    }));
  }
  if (!GUICommandRegistry.getTypes().includes("rotateDown")) {
    GUICommandRegistry.register("rotateDown", (circuitService2, circuitRenderer2, elementRegistry) => ({
      execute: () => {
        const before = circuitService2.exportState();
        const selectedElements = circuitRenderer2.getSelectedElements();
        if (!selectedElements || selectedElements.length === 0) {
          return { undo: () => {
          } };
        }
        if (selectedElements.length > 1) {
          return { undo: () => {
          } };
        }
        const elementIds = selectedElements.map((element) => element.id);
        circuitService2.rotateElements(elementIds, 180);
        return {
          undo: () => circuitService2.importState(before)
        };
      }
    }));
  }
  const nudgeFactory = (dx, dy) => (circuitService2, circuitRenderer2) => ({
    execute: () => {
      const selected = circuitRenderer2.getSelectedElements();
      if (!selected || selected.length === 0) return { undo: () => {
      } };
      const before = circuitService2.exportState();
      const ids = selected.map((el) => el.id);
      circuitService2.nudgeElements(ids, dx, dy);
      return { undo: () => circuitService2.importState(before) };
    }
  });
  for (const [name, dx, dy] of [
    ["nudgeRight", GRID_SPACING, 0],
    ["nudgeLeft", -GRID_SPACING, 0],
    ["nudgeUp", 0, -GRID_SPACING],
    ["nudgeDown", 0, GRID_SPACING]
  ]) {
    if (!GUICommandRegistry.getTypes().includes(name)) {
      GUICommandRegistry.register(name, nudgeFactory(dx, dy));
    }
  }
  if (!GUICommandRegistry.getTypes().includes("rotateElement")) {
    GUICommandRegistry.register("rotateElement", (circuitService2, circuitRenderer2, elementRegistry) => ({
      execute: () => {
        const before = circuitService2.exportState();
        const selectedElements = circuitRenderer2.getSelectedElements();
        if (!selectedElements || selectedElements.length === 0) {
          return { undo: () => {
          } };
        }
        if (selectedElements.length > 1) {
          return { undo: () => {
          } };
        }
        const elementIds = selectedElements.map((element) => element.id);
        circuitService2.rotateElements(elementIds, 90);
        return {
          undo: () => circuitService2.importState(before)
        };
      }
    }));
  }
  if (!GUICommandRegistry.getTypes().includes("saveNetlist")) {
    GUICommandRegistry.register(
      "saveNetlist",
      () => new SaveNetlistCommand(circuitService, circuitRenderer)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("openNetlist")) {
    GUICommandRegistry.register(
      "openNetlist",
      () => new OpenNetlistCommand(circuitService, circuitRenderer)
    );
  }
  const notify = (message, type) => {
    if (type === "error") {
      Notification.error(circuitRenderer, message);
    } else {
      Notification.success(circuitRenderer, message);
    }
  };
  if (!GUICommandRegistry.getTypes().includes("copyNetlistToClipboard")) {
    GUICommandRegistry.register(
      "copyNetlistToClipboard",
      () => new CopyNetlistToClipboardCommand(circuitService, circuitRenderer, notify)
    );
  }
  if (!GUICommandRegistry.getTypes().includes("pasteNetlistFromClipboard")) {
    GUICommandRegistry.register(
      "pasteNetlistFromClipboard",
      () => new PasteNetlistFromClipboardCommand(circuitService, circuitRenderer, notify)
    );
  }
}

// src/application/CircuitService.js
init_Position();
init_Properties();
init_Label();
var CircuitService = class extends EventEmitter {
  /**
   * Constructs a new CircuitService.
   *
   * @param {Circuit} circuit - The circuit aggregate to manage.
   */
  constructor(circuit, elementRegistry) {
    super();
    this.circuit = circuit;
    this.elementRegistry = elementRegistry;
    this.on("commandExecuted", (event) => {
      if (event.type === "addElement") {
        try {
          const elementFactory = this.elementRegistry.get(event.elementType);
          if (!elementFactory) {
            throw new Error(
              ` No factory registered for element type: ${event.elementType}`
            );
          }
          if (!Array.isArray(event.nodes)) {
            throw new Error(" Nodes must be provided as an array.");
          }
          const nodes = event.nodes.map((node) => new Position(node.x, node.y));
          const properties = event.properties ? new Properties(event.properties) : new Properties();
          const newElement = elementFactory(
            void 0,
            // Auto-generate ID
            nodes,
            // Correct nodes
            null,
            // Label (default to null)
            properties
            // Properties (default to empty object)
          );
          this.addElement(newElement);
        } catch (error) {
          Logger.error(`Error creating element: ${error.message}`);
        }
      }
    });
  }
  /**
   * Adds an element to the circuit after validation.
   *
   * Delegates validation to the Circuit aggregate to ensure that the element
   * adheres to all circuit-level rules, such as uniqueness of element ID and
   * non-conflicting node positions.
   *
   * Emits an **"update" event** after successfully adding the element.
   *
   * @param {Element} element - The element to add.
   * @throws {Error} If the element violates circuit rules.
   */
  addElement(element) {
    if (!element.id) {
      const prefix = element.type.charAt(0).toUpperCase();
      element.id = generateId(prefix);
    }
    this.circuit.validateAddElement(element);
    this.circuit.elements.push(element);
    this.emit("update", { type: "addElement", element });
  }
  /**
   * Deletes an element from the circuit.
   *
   * Removes the element from the list of elements and updates any connections
   * involving the deleted element.
   *
   * Emits an **"update" event** after successfully deleting the element.
   *
   * @param {string} elementId - The unique ID of the element to delete.
   */
  deleteElement(elementId) {
    const element = this.circuit.elements.find((el) => el.id === elementId);
    if (!element) {
      return;
    }
    this.circuit.elements = this.circuit.elements.filter(
      (el) => el.id !== elementId
    );
    for (const [key, connectedElements] of this.circuit.connections.entries()) {
      const updatedConnections = connectedElements.filter(
        (el) => el.id !== elementId
      );
      if (updatedConnections.length === 0) {
        this.circuit.connections.delete(key);
      } else {
        this.circuit.connections.set(key, updatedConnections);
      }
    }
    this.emit("update", { type: "deleteElement", elementId });
  }
  /**
   * Connects two elements in the circuit if the connection is valid.
   *
   * Delegates validation to the Circuit aggregate and establishes the connection
   * if the rules are met.
   *
   * Emits an **"update" event** after successfully connecting the elements.
   *
   * @param {Element} element1 - The first element to connect.
   * @param {Element} element2 - The second element to connect.
   * @throws {Error} If the connection violates circuit rules.
   */
  connectElements(element1, element2) {
    this.circuit.validateConnection(element1, element2);
    this.circuit.connections.set(element1.id, [
      ...this.circuit.connections.get(element1.id) || [],
      element2
    ]);
    this.circuit.connections.set(element2.id, [
      ...this.circuit.connections.get(element2.id) || [],
      element1
    ]);
    this.emit("update", {
      type: "connectElements",
      elements: [element1, element2]
    });
  }
  /**
   * Finds all elements connected to a given element.
   *
   * Searches through the circuit's connections map to identify and return
   * all elements that share a connection with the specified element.
   *
   * @param {Element} element - The element whose connections to find.
   * @returns {Element[]} List of connected elements.
   */
  findConnections(element) {
    const connectedElements = [];
    for (const [key, elements] of this.circuit.connections.entries()) {
      if (elements.includes(element)) {
        connectedElements.push(...elements.filter((el) => el !== element));
      }
    }
    return connectedElements;
  }
  /**
   * Retrieves all elements in the circuit.
   *
   * This is a simple delegate method to provide read-only access
   * to the elements of the circuit aggregate.
   *
   * @returns {Element[]} The list of elements in the circuit.
   */
  getElements() {
    return [...this.circuit.elements];
  }
  /**
   * Gets a specific element by its ID.
   *
   * @param {string} elementId - The ID of the element to find.
   * @returns {Element|null} The element with the given ID, or null if not found.
   */
  getElementByID(elementId) {
    return this.circuit.elements.find((el) => el.id === elementId) || null;
  }
  /**
   * Updates properties and label of an existing element through the service.
   * This maintains proper aggregate boundary and ensures state consistency.
   *
   * @param {string} elementId - The ID of the element to update.
   * @param {Object} newProperties - Object containing new property values and label.
   * @returns {boolean} True if element was found and updated, false otherwise.
   */
  updateElementProperties(elementId, newProperties) {
    try {
      const element = this.getElementByID(elementId);
      if (!element) {
        console.error(`Element with ID ${elementId} not found`);
        return false;
      }
      if (newProperties.label !== void 0) {
        if (newProperties.label === null || newProperties.label === "") {
          element.label = null;
        } else {
          element.label = new Label(newProperties.label);
        }
      }
      Object.keys(newProperties).forEach((key) => {
        if (key !== "label") {
          element.getProperties().updateProperty(key, newProperties[key]);
        }
      });
      this.emit("update", { type: "updateElementProperties", elementId, newProperties });
      return true;
    } catch (error) {
      console.error("Error updating element properties:", error);
      return false;
    }
  }
  /**
  * Serializes the entire state of the circuit for undo/redo or persistence.
  *
  * @returns {string} A JSON string representing the circuit state.
  */
  exportState() {
    return JSON.stringify({
      elements: this.circuit.elements.map((el) => ({
        id: el.id,
        type: el.type,
        label: el.label ? el.label.value : null,
        //  Export label value, not Label object
        nodes: el.nodes.map((pos) => ({ x: pos.x, y: pos.y })),
        properties: { ...el.properties.values }
        //  flatten properties
      }))
    });
  }
  /**
   * Restores the state of the circuit from a previously exported snapshot.
   *
   * @param {string} snapshot - A JSON string created by exportState().
   */
  importState(snapshot) {
    const data = JSON.parse(snapshot);
    this.circuit.elements = [];
    const elementsById = {};
    for (const elData of data.elements) {
      const factory = this.elementRegistry.get(elData.type);
      if (!factory) throw new Error(`No factory for type ${elData.type}`);
      const nodes = elData.nodes.map((n) => new Position(n.x, n.y));
      const rawProps = elData.properties ?? {};
      const cleanProps = rawProps && typeof rawProps.values === "object" && rawProps.values !== null ? rawProps.values : rawProps;
      const properties = new Properties(cleanProps);
      const labelObj = elData.label ? new Label(elData.label) : null;
      const el = factory(elData.id, nodes, labelObj, properties);
      elementsById[el.id] = el;
      this.circuit.elements.push(el);
    }
    this.emit("update", { type: "restoredFromSnapshot" });
  }
  /**
   * Rotates a group of elements.
   * - Single element: node[0] is the fixed anchor, node[1] swings around it
   *   in 90° increments (QuCat convention). Result is snapped to grid.
   * - Multiple elements: rotates around the centre of their combined bounding box.
   * 
   * @param {string[]} elementIds - Array of element IDs to rotate.
   * @param {number} rotationAngleDegrees - The rotation angle in degrees (90, -90, 180, etc.).
   */
  rotateElements(elementIds, rotationAngleDegrees) {
    if (!elementIds || elementIds.length === 0) {
      console.warn("No elements provided for rotation");
      return;
    }
    const elements = elementIds.map(
      (id) => this.circuit.elements.find((el) => el.id === id)
    ).filter((el) => el !== void 0);
    if (elements.length === 0) {
      console.warn("No valid elements found for rotation");
      return;
    }
    const rotationAngle = rotationAngleDegrees * Math.PI / 180;
    const cos = Math.round(Math.cos(rotationAngle));
    const sin = Math.round(Math.sin(rotationAngle));
    if (elements.length === 1 && elements[0].nodes.length >= 2) {
      const el = elements[0];
      const anchor = el.nodes[0];
      for (let i = 1; i < el.nodes.length; i++) {
        const relX = el.nodes[i].x - anchor.x;
        const relY = el.nodes[i].y - anchor.y;
        const rotX = relX * cos - relY * sin;
        const rotY = relX * sin + relY * cos;
        el.nodes[i].x = Math.round((anchor.x + rotX) / GRID_SPACING) * GRID_SPACING;
        el.nodes[i].y = Math.round((anchor.y + rotY) / GRID_SPACING) * GRID_SPACING;
      }
    } else {
      const bb = this.calculateBoundingBox(elements);
      const cx = (bb.minX + bb.maxX) / 2;
      const cy = (bb.minY + bb.maxY) / 2;
      elements.forEach((element) => {
        element.nodes.forEach((node) => {
          const relX = node.x - cx;
          const relY = node.y - cy;
          node.x = Math.round((cx + relX * cos - relY * sin) / GRID_SPACING) * GRID_SPACING;
          node.y = Math.round((cy + relX * sin + relY * cos) / GRID_SPACING) * GRID_SPACING;
        });
      });
    }
    elements.forEach((element) => {
      const cur = element.properties?.values?.orientation || 0;
      const next = ((cur + rotationAngleDegrees) % 360 + 360) % 360;
      if (element.properties && element.properties.updateProperty) {
        element.properties.updateProperty("orientation", next);
      }
    });
    this.emit("update", { type: "rotateElements", elementIds, rotationAngleDegrees });
  }
  /**
   * Calculates the bounding box for a group of elements.
   * 
   * @param {Element[]} elements - Array of elements to calculate bounding box for.
   * @returns {Object} Bounding box with minX, minY, maxX, maxY properties.
   */
  calculateBoundingBox(elements) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    elements.forEach((element) => {
      element.nodes.forEach((node) => {
        minX = Math.min(minX, node.x);
        minY = Math.min(minY, node.y);
        maxX = Math.max(maxX, node.x);
        maxY = Math.max(maxY, node.y);
      });
    });
    return { minX, minY, maxX, maxY };
  }
  /**
   * Rotates a single element to a new absolute orientation.
   * Rotates around the midpoint of its two nodes and snaps to grid.
   * 
   * @param {string} elementId - The unique identifier of the element to rotate.
   * @param {number} newOrientation - The target orientation (0, 90, 180, or 270 degrees).
   */
  rotateElement(elementId, newOrientation) {
    const element = this.circuit.elements.find((el) => el.id === elementId);
    if (!element) return;
    const currentOrientation = element?.properties?.values?.orientation || 0;
    const rotationAngleDeg = newOrientation - currentOrientation;
    this.rotateElements([elementId], rotationAngleDeg);
  }
  /**
   * Nudges one or more elements by a delta (dx, dy) in pixel coordinates.
   * Each element's nodes are shifted by exactly (dx, dy).
   *
   * @param {string[]} elementIds - IDs of elements to nudge.
   * @param {number} dx - Horizontal shift in pixels (positive = right).
   * @param {number} dy - Vertical shift in pixels (positive = down).
   */
  nudgeElements(elementIds, dx, dy) {
    for (const id of elementIds) {
      const element = this.circuit.elements.find((el) => el.id === id);
      if (!element) continue;
      element.nodes = element.nodes.map(
        (node) => new Position(node.x + dx, node.y + dy)
      );
    }
    this.emit("update", { type: "nudgeElements", elementIds, dx, dy });
  }
  /**
   * Moves an element to a new position.
   * 
   * @param {string} elementId - The unique identifier of the element to move.
   * @param {Position} newPosition - The new position for the reference terminal.
   */
  moveElement(elementId, newPosition) {
    const element = this.circuit.elements.find((el) => el.id === elementId);
    if (!element) {
      console.warn(`Element with ID ${elementId} not found for move`);
      return;
    }
    Promise.resolve().then(() => (init_ElementService(), ElementService_exports)).then(({ ElementService: ElementService2 }) => {
      ElementService2.move(element, newPosition);
      this.emit("update", { type: "moveElement", elementId, newPosition });
    }).catch((error) => {
      console.error("Error importing ElementService for move:", error);
    });
  }
};

// src/utils/PerformanceUtils.js
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function(...args) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}
var RenderScheduler = class {
  constructor() {
    this.pendingRender = false;
    this.renderCallbacks = /* @__PURE__ */ new Set();
  }
  /**
   * Schedule a render callback to run on next frame
   * @param {Function} callback - Render function to call
   */
  scheduleRender(callback) {
    this.renderCallbacks.add(callback);
    if (!this.pendingRender) {
      this.pendingRender = true;
      requestAnimationFrame(() => {
        this.pendingRender = false;
        for (const cb of this.renderCallbacks) {
          try {
            cb();
          } catch (error) {
            console.error("Render callback error:", error);
          }
        }
        this.renderCallbacks.clear();
      });
    }
  }
  /**
   * Cancel a scheduled render callback
   * @param {Function} callback - Callback to cancel
   */
  cancelRender(callback) {
    this.renderCallbacks.delete(callback);
  }
  /**
   * Check if renders are currently pending
   * @returns {boolean} True if renders are scheduled
   */
  hasPendingRenders() {
    return this.pendingRender || this.renderCallbacks.size > 0;
  }
};
var PerformanceMonitor = class {
  constructor() {
    this.metrics = /* @__PURE__ */ new Map();
  }
  /**
   * Start timing an operation
   * @param {string} name - Operation name
   */
  startTiming(name) {
    this.metrics.set(name, performance.now());
  }
  /**
   * End timing and log duration
   * @param {string} name - Operation name
   * @returns {number} Duration in milliseconds
   */
  endTiming(name) {
    const startTime = this.metrics.get(name);
    if (startTime !== void 0) {
      const duration = performance.now() - startTime;
      this.metrics.delete(name);
      return duration;
    }
    return 0;
  }
  /**
   * Measure and log function execution time
   * @param {string} name - Operation name
   * @param {Function} fn - Function to measure
   * @returns {*} Function result
   */
  measure(name, fn) {
    this.startTiming(name);
    try {
      const result = fn();
      const duration = this.endTiming(name);
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && duration > 16) {
        console.warn(`Slow operation: ${name} took ${duration.toFixed(2)}ms`);
      }
      return result;
    } catch (error) {
      this.endTiming(name);
      throw error;
    }
  }
};
var globalRenderScheduler = new RenderScheduler();
var globalPerformanceMonitor = new PerformanceMonitor();

// src/utils/SpatialIndex.js
var BoundingBox = class _BoundingBox {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
   * Check if this box contains a point
   * @param {number} x - Point x coordinate
   * @param {number} y - Point y coordinate
   * @returns {boolean} True if point is inside box
   */
  containsPoint(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
  /**
   * Check if this box intersects with another box
   * @param {BoundingBox} other - Other bounding box
   * @returns {boolean} True if boxes intersect
   */
  intersects(other) {
    return !(other.x > this.x + this.width || other.x + other.width < this.x || other.y > this.y + this.height || other.y + other.height < this.y);
  }
  /**
   * Create bounding box from element nodes
   * @param {Array} nodes - Element nodes with x,y properties
   * @param {number} padding - Extra padding around element
   * @returns {BoundingBox} Calculated bounding box
   */
  static fromElement(element, padding = 20) {
    if (!element.nodes || element.nodes.length === 0) {
      return new _BoundingBox(0, 0, 0, 0);
    }
    const xs = element.nodes.map((node) => node.x);
    const ys = element.nodes.map((node) => node.y);
    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;
    return new _BoundingBox(minX, minY, maxX - minX, maxY - minY);
  }
};
var QuadTreeNode = class _QuadTreeNode {
  constructor(bounds, maxElements = 10, maxDepth = 5, depth = 0) {
    this.bounds = bounds;
    this.maxElements = maxElements;
    this.maxDepth = maxDepth;
    this.depth = depth;
    this.elements = [];
    this.children = null;
    this.divided = false;
  }
  /**
   * Insert an element into the quadtree
   * @param {Object} elementData - Object with element and boundingBox properties
   * @returns {boolean} True if successfully inserted
   */
  insert(elementData) {
    const { element, boundingBox } = elementData;
    if (!this.bounds.intersects(boundingBox)) {
      return false;
    }
    if (this.elements.length < this.maxElements && !this.divided) {
      this.elements.push(elementData);
      return true;
    }
    if (!this.divided && this.depth < this.maxDepth) {
      this.subdivide();
    }
    if (this.divided) {
      for (const child of this.children) {
        if (child.insert(elementData)) {
          return true;
        }
      }
    }
    this.elements.push(elementData);
    return true;
  }
  /**
   * Subdivide this node into four children
   */
  subdivide() {
    const { x, y, width, height } = this.bounds;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    this.children = [
      // Top-left
      new _QuadTreeNode(
        new BoundingBox(x, y, halfWidth, halfHeight),
        this.maxElements,
        this.maxDepth,
        this.depth + 1
      ),
      // Top-right
      new _QuadTreeNode(
        new BoundingBox(x + halfWidth, y, halfWidth, halfHeight),
        this.maxElements,
        this.maxDepth,
        this.depth + 1
      ),
      // Bottom-left
      new _QuadTreeNode(
        new BoundingBox(x, y + halfHeight, halfWidth, halfHeight),
        this.maxElements,
        this.maxDepth,
        this.depth + 1
      ),
      // Bottom-right
      new _QuadTreeNode(
        new BoundingBox(x + halfWidth, y + halfHeight, halfWidth, halfHeight),
        this.maxElements,
        this.maxDepth,
        this.depth + 1
      )
    ];
    this.divided = true;
    const elementsToRedistribute = [...this.elements];
    this.elements = [];
    for (const elementData of elementsToRedistribute) {
      this.insert(elementData);
    }
  }
  /**
   * Query elements at a specific point
   * @param {number} x - Query point x coordinate
   * @param {number} y - Query point y coordinate
   * @param {Array} results - Array to collect results
   * @returns {Array} Elements at the query point
   */
  queryPoint(x, y, results = []) {
    if (!this.bounds.containsPoint(x, y)) {
      return results;
    }
    for (const elementData of this.elements) {
      if (elementData.boundingBox.containsPoint(x, y)) {
        results.push(elementData);
      }
    }
    if (this.divided) {
      for (const child of this.children) {
        child.queryPoint(x, y, results);
      }
    }
    return results;
  }
  /**
   * Query elements within a bounding box
   * @param {BoundingBox} queryBounds - Bounding box to query
   * @param {Array} results - Array to collect results
   * @returns {Array} Elements within the query bounds
   */
  queryRange(queryBounds, results = []) {
    if (!this.bounds.intersects(queryBounds)) {
      return results;
    }
    for (const elementData of this.elements) {
      if (elementData.boundingBox.intersects(queryBounds)) {
        results.push(elementData);
      }
    }
    if (this.divided) {
      for (const child of this.children) {
        child.queryRange(queryBounds, results);
      }
    }
    return results;
  }
  /**
   * Clear all elements from the tree
   */
  clear() {
    this.elements = [];
    this.children = null;
    this.divided = false;
  }
  /**
   * Get total number of elements in this subtree
   * @returns {number} Total element count
   */
  getElementCount() {
    let count = this.elements.length;
    if (this.divided) {
      for (const child of this.children) {
        count += child.getElementCount();
      }
    }
    return count;
  }
};
var SpatialIndex = class {
  constructor(bounds, maxElements = 10, maxDepth = 5) {
    this.bounds = bounds;
    this.maxElements = maxElements;
    this.maxDepth = maxDepth;
    this.root = new QuadTreeNode(bounds, maxElements, maxDepth);
    this.elementMap = /* @__PURE__ */ new Map();
  }
  /**
   * Add or update an element in the spatial index
   * @param {Object} element - Circuit element
   * @param {BoundingBox} boundingBox - Optional precomputed bounding box
   */
  addElement(element, boundingBox = null) {
    this.removeElement(element);
    if (!boundingBox) {
      boundingBox = BoundingBox.fromElement(element);
    }
    const elementData = { element, boundingBox };
    this.root.insert(elementData);
    this.elementMap.set(element.id, elementData);
  }
  /**
   * Remove an element from the spatial index
   * @param {Object} element - Circuit element to remove
   */
  removeElement(element) {
    if (this.elementMap.has(element.id)) {
      this.elementMap.delete(element.id);
    }
  }
  /**
   * Find elements at a specific point
   * @param {number} x - Query point x coordinate
   * @param {number} y - Query point y coordinate
   * @returns {Array} Elements at the query point
   */
  findElementsAtPoint(x, y) {
    const candidates = this.root.queryPoint(x, y);
    return candidates.filter((data) => this.elementMap.has(data.element.id)).map((data) => data.element);
  }
  /**
   * Find elements within a bounding box
   * @param {BoundingBox} bounds - Query bounding box
   * @returns {Array} Elements within the bounds
   */
  findElementsInRange(bounds) {
    const candidates = this.root.queryRange(bounds);
    return candidates.filter((data) => this.elementMap.has(data.element.id)).map((data) => data.element);
  }
  /**
   * Update the spatial index with current elements
   * @param {Array} elements - All current circuit elements
   */
  rebuild(elements) {
    this.clear();
    for (const element of elements) {
      this.addElement(element);
    }
  }
  /**
   * Clear the spatial index
   */
  clear() {
    this.root.clear();
    this.elementMap.clear();
  }
  /**
   * Get statistics about the spatial index
   * @returns {Object} Index statistics
   */
  getStats() {
    return {
      totalElements: this.elementMap.size,
      treeElements: this.root.getElementCount(),
      bounds: this.bounds,
      maxDepth: this.maxDepth,
      maxElements: this.maxElements
    };
  }
  /**
   * Resize the spatial index bounds
   * @param {BoundingBox} newBounds - New bounds for the index
   */
  resize(newBounds) {
    const elements = Array.from(this.elementMap.values()).map((data) => data.element);
    this.bounds = newBounds;
    this.root = new QuadTreeNode(newBounds, this.maxElements, this.maxDepth);
    this.rebuild(elements);
  }
};
var AdaptiveSpatialIndex = class extends SpatialIndex {
  constructor(initialBounds, maxElements = 10, maxDepth = 5) {
    super(initialBounds, maxElements, maxDepth);
    this.lastRebuild = 0;
    this.rebuildThreshold = 100;
    this.changeCount = 0;
  }
  /**
   * Add element with automatic rebuilding
   */
  addElement(element, boundingBox = null) {
    super.addElement(element, boundingBox);
    this.changeCount++;
    this.checkRebuild();
  }
  /**
   * Remove element with automatic rebuilding
   */
  removeElement(element) {
    super.removeElement(element);
    this.changeCount++;
    this.checkRebuild();
  }
  /**
   * Check if rebuild is needed and perform if necessary
   */
  checkRebuild() {
    if (this.changeCount >= this.rebuildThreshold) {
      const elements = Array.from(this.elementMap.values()).map((data) => data.element);
      this.rebuild(elements);
      this.changeCount = 0;
      this.lastRebuild = Date.now();
    }
  }
  /**
   * Update bounds based on viewport and zoom level
   * @param {number} offsetX - Viewport offset X
   * @param {number} offsetY - Viewport offset Y
   * @param {number} scale - Zoom scale
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   */
  updateViewport(offsetX, offsetY, scale, canvasWidth, canvasHeight) {
    const logicalLeft = -offsetX / scale;
    const logicalTop = -offsetY / scale;
    const logicalWidth = canvasWidth / scale;
    const logicalHeight = canvasHeight / scale;
    const margin = Math.max(logicalWidth, logicalHeight) * 0.5;
    const newBounds = new BoundingBox(
      logicalLeft - margin,
      logicalTop - margin,
      logicalWidth + 2 * margin,
      logicalHeight + 2 * margin
    );
    const boundsChanged = Math.abs(newBounds.x - this.bounds.x) > margin / 4 || Math.abs(newBounds.y - this.bounds.y) > margin / 4 || Math.abs(newBounds.width - this.bounds.width) > margin / 2 || Math.abs(newBounds.height - this.bounds.height) > margin / 2;
    if (boundsChanged) {
      this.resize(newBounds);
    }
  }
};

// src/gui/renderers/CircuitRenderer.js
var CircuitRenderer = class {
  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {CircuitService} circuitService - The service managing circuit elements.
   * @param {RendererFactory} rendererFactory - The factory responsible for creating element renderers.
   * @param {Function} isCommandActive - Function that returns true if there's an active command
   */
  constructor(canvas, circuitService, rendererFactory2, isCommandActive = null) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.circuitService = circuitService;
    this.rendererFactory = rendererFactory2;
    this.isCommandActive = isCommandActive;
    this.renderers = new Map(
      Array.from(rendererFactory2.registry.entries()).map(([type, RendererClass]) => [
        type,
        new RendererClass(this.context)
      ])
    );
    for (const renderer of this.renderers.values()) {
      if (typeof renderer.initImageIfNeeded === "function") {
        renderer.initImageIfNeeded();
      }
    }
    this.draggedElement = null;
    this.offset = { x: 0, y: 0 };
    this.scale = 1.5;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isPanning = false;
    this.startPanPosition = { x: 0, y: 0 };
    this.hoveredElement = null;
    this.selectedElements = /* @__PURE__ */ new Set();
    this.selectedElement = null;
    this.renderScheduled = false;
    this.lastHoverCheck = 0;
    this.HOVER_CHECK_THROTTLE = 16;
    const initialBounds = new BoundingBox(-1e3, -1e3, 2e3, 2e3);
    this.spatialIndex = new AdaptiveSpatialIndex(initialBounds, 10, 5);
    this.spatialIndexNeedsUpdate = true;
    this.throttledHoverCheck = throttle(
      this.checkElementHovers.bind(this),
      this.HOVER_CHECK_THROTTLE
    );
    this.zoom = this.zoom.bind(this);
    this.startPan = this.startPan.bind(this);
    this.pan = this.pan.bind(this);
    this.stopPan = this.stopPan.bind(this);
    this.gridSpacing = 10;
    this.gridColor = "gray";
    this.gridLineWidth = 0.5;
    this.showGrid = false;
    this._boundPerformRender = () => this.performRender();
    this.circuitService.on("elementAdded", () => this.invalidateSpatialIndex());
    this.circuitService.on("elementDeleted", () => this.invalidateSpatialIndex());
    this.circuitService.on("elementMoved", () => this.invalidateSpatialIndex());
    this.circuitService.on("circuitCleared", () => this.invalidateSpatialIndex());
  }
  /**
   * Clears the canvas by resetting its drawing context.
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  /**
   * Optimized render method with scheduling to prevent excessive re-renders
   */
  render() {
    globalRenderScheduler.scheduleRender(this._boundPerformRender);
  }
  /**
   * Actual render implementation - called by scheduler
   */
  performRender() {
    globalPerformanceMonitor.startTiming("circuit-render");
    this.clearCanvas();
    this.context.save();
    this.context.translate(this.offsetX, this.offsetY);
    this.context.scale(this.scale, this.scale);
    if (this.showGrid) {
      this.drawGrid();
    }
    this.circuitService.getElements().forEach((element) => {
      if (!this.renderers.has(element.type)) {
        const renderer2 = this.rendererFactory.create(element.type, this.context);
        if (!renderer2) {
          Logger.warn(`No renderer found for element type: ${element.type}`);
          return;
        }
        this.renderers.set(element.type, renderer2);
      }
      const renderer = this.renderers.get(element.type);
      const isHovered = this.hoveredElement === element;
      const isSelected = this.selectedElements.has(element) || this.selectedElement === element;
      if (renderer.renderElementWithStates) {
        renderer.renderElementWithStates(element, isHovered, isSelected);
      } else if (renderer.renderElementWithHover) {
        renderer.renderElementWithHover(element, isHovered);
      } else {
        renderer.renderElement(element);
      }
    });
    this.context.restore();
    this.renderSelectionBox();
    const renderDuration = globalPerformanceMonitor.endTiming("circuit-render");
  }
  /**
  * Draws a grid composed of gray vertical and horizontal lines.
  * The grid spacing is configurable (this.gridSpacing).
  */
  drawGrid() {
    const ctx = this.context;
    const spacing = this.gridSpacing;
    const dotRadius = 0.8;
    ctx.fillStyle = this.gridColor;
    const logicalWidth = this.canvas.width / this.scale;
    const logicalHeight = this.canvas.height / this.scale;
    const startX = -this.offsetX / this.scale;
    const startY = -this.offsetY / this.scale;
    const firstX = Math.floor(startX / spacing) * spacing;
    const firstY = Math.floor(startY / spacing) * spacing;
    for (let x = firstX; x <= startX + logicalWidth; x += spacing) {
      for (let y = firstY; y <= startY + logicalHeight; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  /**
   * Toggle grid visibility.
   * @param {boolean} visible - Whether the dot-grid should be displayed.
   */
  setShowGrid(visible) {
    this.showGrid = !!visible;
    this.render();
  }
  /**
   * Optimized zoom handler with batched rendering
   */
  zoom(event) {
    event.preventDefault();
    const scaleFactor = 1.1;
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const zoomDirection = event.deltaY > 0 ? 1 / scaleFactor : scaleFactor;
    const newScale = this.scale * zoomDirection;
    if (newScale < 1) {
      return;
    }
    if (newScale > 3) {
      return;
    }
    this.offsetX = mouseX - (mouseX - this.offsetX) * zoomDirection;
    this.offsetY = mouseY - (mouseY - this.offsetY) * zoomDirection;
    this.scale = newScale;
    this.render();
    this.emitPanEvent();
  }
  /**
   * Throttled pan event emission to prevent event spam
   */
  emitPanEvent() {
    if (!this.panEventThrottled) {
      this.panEventThrottled = throttle(() => {
        this.circuitService.emit("pan", {
          offsetX: this.offsetX,
          offsetY: this.offsetY
        });
      }, 50);
    }
    this.panEventThrottled();
  }
  /**
   * Starts panning when mouse is pressed.
   * @param {MouseEvent} event - The mouse event.
   */
  startPan(event) {
    if (event.button !== 1) return;
    this.isPanning = true;
    this.startPan.x = event.clientX - this.offsetX;
    this.startPan.y = event.clientY - this.offsetY;
  }
  /**
   * Optimized panning with scheduled rendering
   */
  pan(event) {
    if (!this.isPanning) return;
    this.offsetX = event.clientX - this.startPan.x;
    this.offsetY = event.clientY - this.startPan.y;
    this.render();
    this.emitPanEvent();
  }
  /**
   * Stops panning when the mouse button is released.
   */
  stopPan() {
    this.isPanning = false;
  }
  /**
   * Optimized mouse movement handler with throttling
   */
  handleMouseMove(event) {
    if (this.isPanning) return;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const logicalX = (mouseX - this.offsetX) / this.scale;
    const logicalY = (mouseY - this.offsetY) / this.scale;
    this.throttledHoverCheck(logicalX, logicalY);
  }
  /**
   * Handles double-click events for property editing
   */
  handleDoubleClick(event) {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const logicalX = (mouseX - this.offsetX) / this.scale;
    const logicalY = (mouseY - this.offsetY) / this.scale;
    const clickedElement = this.findElementAtPosition(logicalX, logicalY);
    if (clickedElement && this.onElementDoubleClick) {
      this.onElementDoubleClick(clickedElement);
    } else if (!clickedElement) {
    } else if (!this.onElementDoubleClick) {
    }
  }
  /**
   * Find element at the given position using the same logic as hover detection
   */
  findElementAtPosition(x, y) {
    const elements = this.circuitService.getElements();
    if (!elements) return null;
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      if (element.type === "wire") continue;
      const renderer = this.renderers.get(element.type);
      if (renderer?.isPointInBounds) {
        const [start, end] = element.nodes;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        if (renderer.isPointInBounds(x, y, midX, midY, element)) return element;
      }
    }
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      if (element.type !== "wire") continue;
      const renderer = this.renderers.get(element.type);
      if (renderer?.checkHover && renderer.checkHover(element, x, y)) return element;
    }
    return null;
  }
  /**
   * Set callback for element double-click events
   */
  setElementDoubleClickCallback(callback) {
    this.onElementDoubleClick = callback;
  }
  /**
   * Optimized hover detection with spatial indexing and performance monitoring
   */
  checkElementHovers(mouseX, mouseY) {
    if (this.isCommandActive && this.isCommandActive()) {
      if (this.hoveredElement) {
        this.hoveredElement = null;
        this.render();
      }
      return;
    }
    globalPerformanceMonitor.startTiming("hover-check");
    this.updateSpatialIndex();
    let newHoveredElement = null;
    const candidateElements = this.spatialIndex.findElementsAtPoint(mouseX, mouseY);
    if (candidateElements && candidateElements.length > 0) {
      const elements = this.circuitService.getElements();
      const elementIndices = /* @__PURE__ */ new Map();
      elements.forEach((element, index) => {
        elementIndices.set(element.id, index);
      });
      candidateElements.sort((a, b) => {
        const indexA = elementIndices.get(a.id) || 0;
        const indexB = elementIndices.get(b.id) || 0;
        return indexB - indexA;
      });
      for (const element of candidateElements) {
        const renderer = this.renderers.get(element.type);
        if (renderer) {
          let isHovered = false;
          if (element.type === "wire" && renderer.checkHover) {
            isHovered = renderer.checkHover(element, mouseX, mouseY);
          } else if (renderer.isPointInBounds) {
            const [start, end] = element.nodes;
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            isHovered = renderer.isPointInBounds(mouseX, mouseY, midX, midY, element);
          }
          if (isHovered) {
            newHoveredElement = element;
            break;
          }
        }
      }
    }
    if (this.hoveredElement !== newHoveredElement) {
      this.hoveredElement = newHoveredElement;
      this.render();
    }
    const hoverDuration = globalPerformanceMonitor.endTiming("hover-check");
    if (hoverDuration > 5) {
    }
  }
  /**
   * Quick viewport check to skip elements that are clearly not visible
   * @param {Object} element - Element to check
   * @returns {boolean} True if element might be visible
   */
  isElementInViewport(element) {
    if (!element.nodes || element.nodes.length === 0) return true;
    const xs = element.nodes.map((node) => node.x);
    const ys = element.nodes.map((node) => node.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const viewportLeft = -this.offsetX / this.scale;
    const viewportTop = -this.offsetY / this.scale;
    const viewportRight = (this.canvas.width - this.offsetX) / this.scale;
    const viewportBottom = (this.canvas.height - this.offsetY) / this.scale;
    const margin = 50;
    return !(maxX + margin < viewportLeft || minX - margin > viewportRight || maxY + margin < viewportTop || minY - margin > viewportBottom);
  }
  /**
   * Clear all hover states
   */
  clearAllHovers() {
    if (this.hoveredElement) {
      this.hoveredElement = null;
      this.render();
    }
  }
  /**
   * Set the selected element with optimized rendering.
   * Also syncs the selectedElements Set so both states are consistent.
   */
  setSelectedElement(element) {
    const changed = this.selectedElement !== element || this.selectedElements.size > 0;
    this.selectedElement = element;
    this.selectedElements.clear();
    if (element) {
      this.selectedElements.add(element);
    }
    if (changed) {
      this.render();
    }
  }
  /**
   * Clear the current selection with optimized rendering
   */
  clearSelection() {
    const hadSelection = this.selectedElement !== null || this.selectedElements.size > 0;
    this.selectedElement = null;
    this.selectedElements.clear();
    if (hadSelection) {
      this.render();
    }
  }
  /**
   * Add element to multiple selection with optimized rendering
   */
  addToSelection(element) {
    if (element && !this.selectedElements.has(element)) {
      this.selectedElements.add(element);
      this.render();
    }
  }
  /**
   * Update spatial index with current elements and viewport
   */
  updateSpatialIndex() {
    const elements = this.circuitService.getElements();
    this.spatialIndex.updateViewport(
      this.offsetX,
      this.offsetY,
      this.scale,
      this.canvas.width,
      this.canvas.height
    );
    if (this.spatialIndexNeedsUpdate) {
      this.spatialIndex.rebuild(elements);
      this.spatialIndexNeedsUpdate = false;
    }
  }
  /**
   * Mark spatial index for update (call when elements change)
   */
  invalidateSpatialIndex() {
    this.spatialIndexNeedsUpdate = true;
  }
  /**
   * Add element to spatial index
   */
  addElementToSpatialIndex(element) {
    this.spatialIndex.addElement(element);
  }
  /**
   * Remove element from spatial index
   */
  removeElementFromSpatialIndex(element) {
    this.spatialIndex.removeElement(element);
  }
  /**
   * Cleanup method to remove event listeners and prevent memory leaks
   */
  dispose() {
    globalRenderScheduler.cancelRender(this._boundPerformRender);
    this.renderers.clear();
    this.selectedElements.clear();
    this.hoveredElement = null;
    this.selectedElement = null;
  }
  /**
   * Remove element from multiple selection
   * @param {Object} element - The element to remove from selection
   */
  removeFromSelection(element) {
    if (this.selectedElements.has(element)) {
      this.selectedElements.delete(element);
      this.render();
    }
  }
  /**
   * Set multiple selected elements.
   * Also clears selectedElement (singular) so both states are consistent.
   * @param {Array|Set} elements - The elements to select
   */
  setSelectedElements(elements) {
    this.selectedElement = null;
    this.selectedElements.clear();
    if (Array.isArray(elements)) {
      elements.forEach((element) => this.selectedElements.add(element));
    } else if (elements instanceof Set) {
      this.selectedElements = new Set(elements);
    }
    this.render();
  }
  /**
   * Get all currently selected elements
   * @returns {Array} Array of selected elements
   */
  getSelectedElements() {
    const result = Array.from(this.selectedElements);
    if (this.selectedElement && !this.selectedElements.has(this.selectedElement)) {
      result.push(this.selectedElement);
    }
    return result;
  }
  /**
   * Check if an element is selected
   * @param {Object} element - The element to check
   * @returns {boolean} True if the element is selected
   */
  isElementSelected(element) {
    return this.selectedElements.has(element) || this.selectedElement === element;
  }
  /**
   * Determines if a point is inside an element's boundary.
   * @param {number} x - The X-coordinate of the point.
   * @param {number} y - The Y-coordinate of the point.
   * @param {Object} element - The circuit element to check.
   * @returns {boolean} True if the point is within the element's boundary.
   */
  isInsideElement(x, y, element) {
    const [start] = element.nodes;
    const size = 50;
    return x >= start.x && x <= start.x + size && y >= start.y && y <= start.y + size;
  }
  /**
   * Set selection box data for rendering
   * @param {Object|null} selectionBox - Selection box with startX, startY, endX, endY or null
   */
  setSelectionBox(selectionBox) {
    this.selectionBox = selectionBox;
  }
  /**
   * Render selection box overlay (in screen coordinates)
   * @private
   */
  renderSelectionBox() {
    if (!this.selectionBox) return;
    const { startX, startY, endX, endY } = this.selectionBox;
    const screenStartX = startX * this.scale + this.offsetX;
    const screenStartY = startY * this.scale + this.offsetY;
    const screenEndX = endX * this.scale + this.offsetX;
    const screenEndY = endY * this.scale + this.offsetY;
    const ctx = this.context;
    ctx.save();
    ctx.strokeStyle = "#007ACC";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    const width = screenEndX - screenStartX;
    const height = screenEndY - screenStartY;
    ctx.strokeRect(screenStartX, screenStartY, width, height);
    ctx.fillStyle = "rgba(0, 122, 204, 0.1)";
    ctx.fillRect(screenStartX, screenStartY, width, height);
    ctx.restore();
  }
  /**
   * Render bounding box around selected elements with rotation center
   * @private
   */
  renderSelectionBoundingBox() {
    const selectedElements = this.getSelectedElements();
    if (selectedElements.length < 1) return;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    selectedElements.forEach((element) => {
      element.nodes.forEach((node) => {
        minX = Math.min(minX, node.x);
        minY = Math.min(minY, node.y);
        maxX = Math.max(maxX, node.x);
        maxY = Math.max(maxY, node.y);
      });
    });
    const screenMinX = minX * this.scale + this.offsetX;
    const screenMinY = minY * this.scale + this.offsetY;
    const screenMaxX = maxX * this.scale + this.offsetX;
    const screenMaxY = maxY * this.scale + this.offsetY;
    const centerX = (screenMinX + screenMaxX) / 2;
    const centerY = (screenMinY + screenMaxY) / 2;
    const ctx = this.context;
    ctx.save();
    ctx.strokeStyle = "#FF6B35";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    const width = screenMaxX - screenMinX;
    const height = screenMaxY - screenMinY;
    const padding = 10;
    ctx.strokeRect(
      screenMinX - padding,
      screenMinY - padding,
      width + 2 * padding,
      height + 2 * padding
    );
    ctx.setLineDash([]);
    ctx.strokeStyle = "#FF6B35";
    ctx.fillStyle = "#FF6B35";
    ctx.lineWidth = 2;
    const crossSize = 8;
    ctx.beginPath();
    ctx.moveTo(centerX - crossSize, centerY);
    ctx.lineTo(centerX + crossSize, centerY);
    ctx.moveTo(centerX, centerY - crossSize);
    ctx.lineTo(centerX, centerY + crossSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  /**
   * Centers the logical coordinate system (0,0) in the middle of the canvas.
   * This provides an intuitive coordinate origin for circuit design.
   */
  reCenter() {
    const rect = this.canvas.getBoundingClientRect();
    const canvasCenterX = rect.width / 2;
    const canvasCenterY = rect.height / 2;
    this.offsetX = canvasCenterX;
    this.offsetY = canvasCenterY;
    this.render();
  }
  /**
   * Centers the scroll position of the canvas container to align with logical center
   */
  centerScrollPosition() {
    const canvasContainer = this.canvas.parentElement;
    if (!canvasContainer) {
      console.warn("[CircuitRenderer] No canvas container found for scroll centering");
      return;
    }
    const containerRect = canvasContainer.getBoundingClientRect();
    const scrollLeft = (this.canvas.clientWidth - containerRect.width) / 2;
    const scrollTop = (this.canvas.clientHeight - containerRect.height) / 2;
    canvasContainer.scrollLeft = Math.max(0, scrollLeft);
    canvasContainer.scrollTop = Math.max(0, scrollTop);
  }
};

// src/gui/commands/CommandHistory.js
var CommandHistory = class {
  /**
   * Initializes a new instance of CommandHistory.
   * Sets up empty history and future stacks.
   */
  constructor() {
    this.history = [];
    this.future = [];
  }
  /**
   * Executes a command and stores pre-command snapshot.
   * Clears future stack.
   *
   * @param {Object} command
   * @param {CircuitService} circuitService
   */
  executeCommand(command, circuitService) {
    const snapshot = circuitService.exportState();
    command.execute(circuitService);
    this.history.push({ snapshot, command });
    this.future = [];
  }
  /**
   * Reverts to the previous circuit state.
   * @param {CircuitService} circuitService
   */
  undo(circuitService) {
    if (this.history.length === 0) return;
    const { snapshot, command } = this.history.pop();
    const redoSnapshot = circuitService.exportState();
    circuitService.importState(snapshot);
    this.future.push({ snapshot: redoSnapshot, command });
  }
  /**
   * Reapplies the previously undone command.
   * @param {CircuitService} circuitService
   */
  redo(circuitService) {
    if (this.future.length === 0) return;
    const { snapshot, command } = this.future.pop();
    const undoSnapshot = circuitService.exportState();
    circuitService.importState(snapshot);
    this.history.push({ snapshot: undoSnapshot, command });
  }
  clear() {
    this.history = [];
    this.future = [];
  }
};

// src/config/gui.config.js
var gui_config_default = {
  "components": {
    "wire": {
      "menuLabel": "Wire",
      "shortcut": "W",
      "menuArg": "Wire",
      "propertyPanel": {
        "title": "Wire Properties",
        "description": "Ideal conducting wire",
        "helpText": "Wires have no configurable electrical parameters",
        "fields": []
      }
    },
    "junction": {
      "menuLabel": "Junction",
      "shortcut": "J",
      "propertyPanel": {
        "title": "Specify label and/or Josephson inductance (in units of Henry)",
        "description": "Note that L = (hbar/2e)**2/[Josephson Energy in Joules]",
        "helpText": "",
        "fields": [
          {
            "key": "inductance",
            "label": "Inductance",
            "type": "number",
            "unit": "H",
            "placeholder": ""
          },
          {
            "key": "label",
            "label": "Label",
            "type": "text",
            "unit": "",
            "placeholder": ""
          }
        ]
      }
    },
    "inductor": {
      "menuLabel": "Inductor",
      "shortcut": "L",
      "propertyPanel": {
        "title": "Specify label and/or inductance (in units of Henry)",
        "description": "Note that L = (hbar/2e)**2/[Josephson Energy in Joules]",
        "helpText": "",
        "fields": [
          {
            "key": "inductance",
            "label": "Inductance",
            "type": "number",
            "unit": "H",
            "placeholder": ""
          },
          {
            "key": "label",
            "label": "Label",
            "type": "text",
            "unit": "",
            "placeholder": ""
          }
        ]
      }
    },
    "capacitor": {
      "menuLabel": "Capacitor",
      "shortcut": "C",
      "propertyPanel": {
        "title": "Specify label and/or capacitance (in units of Farad)",
        "description": "",
        "helpText": "",
        "fields": [
          {
            "key": "capacitance",
            "label": "Capacitance",
            "type": "number",
            "unit": "F",
            "placeholder": ""
          },
          {
            "key": "label",
            "label": "Label",
            "type": "text",
            "unit": "",
            "placeholder": ""
          }
        ]
      }
    },
    "resistor": {
      "menuLabel": "Resistor",
      "shortcut": "R",
      "propertyPanel": {
        "title": "Specify label and/or resistance (in units of Ohm)",
        "description": "",
        "helpText": "",
        "fields": [
          {
            "key": "resistance",
            "label": "Resistance",
            "type": "number",
            "unit": "\u03A9",
            "placeholder": ""
          },
          {
            "key": "label",
            "label": "Label",
            "type": "text",
            "unit": "",
            "placeholder": ""
          }
        ]
      }
    },
    "ground": {
      "menuLabel": "Ground",
      "shortcut": "G",
      "propertyPanel": {
        "title": "Ground Properties",
        "description": "Reference point (0V)",
        "helpText": "Ground has no configurable electrical parameters",
        "fields": []
      }
    }
  },
  "menus": [
    {
      "label": "File",
      "items": [
        {
          "id": "openNetlist",
          "label": "Open Netlist...",
          "shortcut": "Ctrl+O",
          "action": {
            "kind": "command",
            "name": "openNetlist"
          }
        },
        {
          "id": "saveNetlist",
          "label": "Save Netlist...",
          "shortcut": "Ctrl+S",
          "action": {
            "kind": "command",
            "name": "saveNetlist"
          }
        },
        {
          "id": "copyNetlistToClipboard",
          "label": "Copy Netlist",
          "shortcut": "Ctrl+Shift+C",
          "action": {
            "kind": "command",
            "name": "copyNetlistToClipboard"
          }
        },
        {
          "id": "pasteNetlistFromClipboard",
          "label": "Paste Netlist...",
          "shortcut": "Ctrl+Shift+V",
          "action": {
            "kind": "command",
            "name": "pasteNetlistFromClipboard"
          }
        },
        {
          "type": "separator"
        },
        {
          "id": "deleteAll",
          "label": "Clear All",
          "shortcut": "Ctrl+Shift+Del",
          "action": {
            "kind": "command",
            "name": "deleteAll"
          }
        }
      ]
    },
    {
      "label": "Edit",
      "items": [
        {
          "id": "selectAll",
          "label": "Select All",
          "shortcut": "Ctrl+A",
          "action": {
            "kind": "command",
            "name": "selectAll"
          }
        },
        {
          "id": "deselectAll",
          "label": "Deselect All",
          "shortcut": "Ctrl+D",
          "action": {
            "kind": "command",
            "name": "deselectAll"
          }
        },
        {
          "type": "separator"
        },
        {
          "id": "copyElements",
          "label": "Copy",
          "shortcut": "Ctrl+C",
          "action": {
            "kind": "command",
            "name": "copyElements"
          }
        },
        {
          "id": "pasteElements",
          "label": "Paste",
          "shortcut": "Ctrl+V",
          "action": {
            "kind": "command",
            "name": "pasteElements"
          }
        },
        {
          "type": "separator"
        },
        {
          "id": "edit.undo",
          "label": "Undo",
          "shortcut": "Ctrl+Z",
          "action": {
            "kind": "history",
            "op": "undo"
          }
        },
        {
          "id": "edit.redo",
          "label": "Redo",
          "shortcut": "Ctrl+Y",
          "action": {
            "kind": "history",
            "op": "redo"
          }
        },
        {
          "type": "separator"
        },
        {
          "id": "deleteSelection",
          "label": "Delete",
          "shortcut": "Del",
          "action": {
            "kind": "command",
            "name": "deleteSelection"
          }
        },
        {
          "id": "nudgeRight",
          "label": "Move Right",
          "shortcut": "Right",
          "action": {
            "kind": "command",
            "name": "nudgeRight"
          }
        },
        {
          "id": "nudgeLeft",
          "label": "Move Left",
          "shortcut": "Left",
          "action": {
            "kind": "command",
            "name": "nudgeLeft"
          }
        },
        {
          "id": "nudgeUp",
          "label": "Move Up",
          "shortcut": "Up",
          "action": {
            "kind": "command",
            "name": "nudgeUp"
          }
        },
        {
          "id": "nudgeDown",
          "label": "Move Down",
          "shortcut": "Down",
          "action": {
            "kind": "command",
            "name": "nudgeDown"
          }
        },
        {
          "id": "rotateElement",
          "label": "Rotate Element",
          "shortcut": "Ctrl+E",
          "action": {
            "kind": "command",
            "name": "rotateElement"
          }
        },
        {
          "id": "rotateElementRight",
          "label": "Rotate Right",
          "shortcut": "Ctrl+Right",
          "action": {
            "kind": "command",
            "name": "rotateRight"
          }
        },
        {
          "id": "rotateElementLeft",
          "label": "Rotate Left",
          "shortcut": "Ctrl+Left",
          "action": {
            "kind": "command",
            "name": "rotateLeft"
          }
        },
        {
          "id": "rotateElementUp",
          "label": "Rotate Up",
          "shortcut": "Ctrl+Up",
          "action": {
            "kind": "command",
            "name": "rotateUp"
          }
        },
        {
          "id": "rotateElementDown",
          "label": "Rotate Down",
          "shortcut": "Ctrl+Down",
          "action": {
            "kind": "command",
            "name": "rotateDown"
          }
        }
      ]
    },
    {
      "label": "Insert",
      "items": [
        {
          "id": "insert.wire",
          "component": "wire"
        },
        {
          "id": "insert.junction",
          "component": "junction"
        },
        {
          "id": "insert.inductor",
          "component": "inductor"
        },
        {
          "id": "insert.capacitor",
          "component": "capacitor"
        },
        {
          "id": "insert.resistor",
          "component": "resistor"
        },
        {
          "id": "insert.ground",
          "component": "ground"
        }
      ]
    },
    {
      "label": "View",
      "items": [
        {
          "id": "view.zoomIn",
          "label": "Zoom in",
          "shortcut": "Ctrl+scroll",
          "action": {
            "kind": "renderer",
            "op": "zoomStep",
            "args": [
              -1
            ]
          }
        },
        {
          "id": "view.zoomOut",
          "label": "Zoom out",
          "shortcut": "Ctrl+scroll",
          "action": {
            "kind": "renderer",
            "op": "zoomStep",
            "args": [
              1
            ]
          }
        },
        {
          "id": "view.recenter",
          "label": "Re-center",
          "shortcut": "Ctrl+R",
          "action": {
            "kind": "renderer",
            "op": "recenter"
          }
        }
      ]
    }
  ]
};

// src/config/menu.bindings.js
function expandMenuItems(config) {
  const { components, menus } = config;
  return menus.flatMap(
    (m) => (m.items ?? []).filter((i) => i && (i.id || i.component)).map((i) => {
      if (i.component) {
        const componentDef = components[i.component];
        if (!componentDef) return null;
        const elementArg = componentDef.menuArg || i.component;
        return {
          id: i.id,
          label: componentDef.menuLabel,
          shortcut: componentDef.shortcut,
          action: { kind: "command", name: "addElement", args: [elementArg] }
        };
      }
      return i;
    }).filter(Boolean)
  );
}
var expandedItems = expandMenuItems(gui_config_default);
var ACTIONS = Object.fromEntries(
  expandedItems.filter((i) => i.id).map((i) => [i.id, i.action ?? { kind: "todo", note: "no action in config" }])
);
var KEYMAP = Object.fromEntries(
  expandedItems.filter((i) => i.shortcut && i.id && !i.disabled).map((i) => [i.shortcut, i.id])
);

// src/gui/property_panel/PropertyPanel.js
var PropertyPanel = class {
  constructor() {
    this.isVisible = false;
    this.currentElement = null;
    this.onSave = null;
    this.onCancel = null;
    this.panelElement = null;
    this.overlayElement = null;
    this.boundKeyDownHandler = null;
  }
  /**
   * Configuration is loaded statically via import at build time
   * No runtime fetch needed - fully embedded in bundle
   * @private
   */
  getConfig() {
    return gui_config_default;
  }
  /**
   * Show the property panel for editing an element
   * @param {Element} element - The element to edit
   * @param {Function} onSave - Callback when properties are saved (element, newProperties) => void
   * @param {Function} onCancel - Callback when editing is cancelled
   */
  show(element, onSave, onCancel) {
    if (this.isVisible) {
      this.hide();
    }
    this.currentElement = element;
    this.onSave = onSave;
    this.onCancel = onCancel;
    this.isVisible = true;
    this.createPanelHTML();
    this.setupEventListeners();
    this.focusFirstInput();
  }
  /**
   * Hide the property panel
   */
  hide() {
    if (this.boundKeyDownHandler) {
      document.removeEventListener("keydown", this.boundKeyDownHandler, true);
      this.boundKeyDownHandler = null;
    }
    if (this.overlayElement && this.overlayElement.parentNode) {
      this.overlayElement.parentNode.removeChild(this.overlayElement);
    }
    this.isVisible = false;
    this.currentElement = null;
    this.onSave = null;
    this.onCancel = null;
    this.panelElement = null;
    this.overlayElement = null;
  }
  /**
   * Create the HTML structure for the property panel
   * @private
   */
  createPanelHTML() {
    this.overlayElement = document.createElement("div");
    this.overlayElement.className = "property-panel-overlay";
    this.panelElement = document.createElement("div");
    this.panelElement.className = "property-panel";
    const content = this.generateContentForElement(this.currentElement);
    this.panelElement.innerHTML = content;
    this.overlayElement.appendChild(this.panelElement);
    document.body.appendChild(this.overlayElement);
    this.addStyles();
  }
  /**
   * Generate HTML content based on element type
   * @param {Element} element - The element to create content for
   * @returns {string} HTML content
   * @private
   */
  generateContentForElement(element) {
    const elementType = element.type || element.constructor.name.toLowerCase();
    const properties = element.getProperties();
    const currentLabel = element.label ? element.label.value || element.label : "";
    const config = this.getConfig().components?.[elementType]?.propertyPanel;
    if (!config) {
      console.warn(`[PropertyPanel] No configuration found for element type: "${elementType}"`);
      console.warn(`[PropertyPanel] Available configurations:`, Object.keys(this.guiConfig?.components || {}));
      return this.generateFallbackContent(elementType, currentLabel);
    }
    const propertyFields = config.fields.map((field) => {
      const currentValue = field.key === "label" ? currentLabel : properties.values[field.key] || "";
      const inputType = field.type === "text" ? "text" : "number";
      const stepAttribute = inputType === "number" ? 'step="any"' : "";
      return `
                <div class="property-field">
                    <label for="${field.key}">${field.label}${field.unit ? ` (${field.unit})` : ""}</label>
                    <input type="${inputType}"
                           id="${field.key}"
                           name="${field.key}"
                           value="${currentValue}"
                           ${stepAttribute}
                           placeholder="${field.placeholder || ""}">
                </div>
            `;
    }).join("");
    return `
            <div class="property-panel-header">
                <h3>Circuit Editor</h3>
            </div>
            <div class="property-panel-content">
                <div class="property-panel-title">
                    <em>${config.title}</em>
                    ${config.description && config.description.trim() ? `<div class="property-description">${config.description}</div>` : ""}
                    ${config.helpText && config.helpText.trim() ? `<div class="help-text">${config.helpText}</div>` : ""}
                </div>
                ${propertyFields}
            </div>
            <div class="property-panel-actions">
                <button type="button" class="cancel-btn">Cancel</button>
                <button type="button" class="ok-btn">OK</button>
            </div>
        `;
  }
  /**
   * Generate fallback content for unknown element types
   * @param {string} elementType - The element type name
   * @param {string} currentLabel - Current label value
   * @returns {string} HTML content
   * @private
   */
  generateFallbackContent(elementType, currentLabel) {
    const availableConfigs = Object.keys(this.getConfig().components || {});
    console.warn(`[PropertyPanel] No configuration found for element type: "${elementType}"`);
    console.warn(`[PropertyPanel] Available configurations:`, availableConfigs);
    return `
            <div class="property-panel-header">
                <h3>Circuit Editor</h3>
            </div>
            <div class="property-panel-content">
                <div class="property-panel-title">
                    <em>Configure ${elementType} properties</em>
                </div>
                <div class="property-field">
                    <label for="label">Label</label>
                    <input type="text" id="label" name="label" 
                           value="${currentLabel}" 
                           placeholder="Enter element label">
                </div>
            </div>
            <div class="property-panel-actions">
                <button type="button" class="cancel-btn">Cancel</button>
                <button type="button" class="ok-btn">OK</button>
            </div>
        `;
  }
  /**
   * Setup event listeners for the panel
   * @private
   */
  setupEventListeners() {
    const okBtn = this.panelElement.querySelector(".ok-btn");
    okBtn.addEventListener("click", () => this.handleSave());
    const cancelBtn = this.panelElement.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", () => this.handleCancel());
    this.boundKeyDownHandler = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.boundKeyDownHandler, true);
    this.overlayElement.addEventListener("click", (event) => {
      if (event.target === this.overlayElement) {
        this.handleCancel();
      }
    });
  }
  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event
   * @private
   */
  handleKeyDown(event) {
    if (!this.isVisible) return;
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      this.handleCancel();
    } else if (event.key === "Enter" && !event.shiftKey) {
      const activeElement = document.activeElement;
      const isTextarea = activeElement && activeElement.tagName === "TEXTAREA";
      if (!isTextarea) {
        event.preventDefault();
        this.handleSave();
      }
    }
  }
  /**
   * Handle save action
   * @private
   */
  handleSave() {
    const newProperties = this.collectFormData();
    const hasLabel = newProperties.label && newProperties.label.trim() !== "";
    const hasProperties = Object.keys(newProperties).some(
      (key) => key !== "label" && newProperties[key] !== void 0 && newProperties[key] !== ""
    );
    if (!hasLabel && !hasProperties) {
      this.showValidationWarning();
      return;
    }
    if (this.onSave) {
      this.onSave(this.currentElement, newProperties);
    }
    this.hide();
  }
  /**
   * Show validation warning dialog
   * @private
   */
  showValidationWarning() {
    this.addWarningStyles();
    const warningOverlay = document.createElement("div");
    warningOverlay.className = "property-panel-warning-overlay";
    warningOverlay.style.display = "none";
    const warningDialog = document.createElement("div");
    warningDialog.className = "property-panel-warning-dialog";
    warningDialog.innerHTML = `
            <div class="warning-header">
                <h4>\u26A0\uFE0F Incomplete Properties</h4>
            </div>
            <div class="warning-content">
                <p>Please specify at least one of the following:</p>
                <ul>
                    <li>A label for the component</li>
                    <li>A property value (resistance, capacitance, etc.)</li>
                </ul>
                <p>This ensures the component can be properly identified and used in the circuit.</p>
            </div>
            <div class="warning-actions">
                <button type="button" class="warning-ok-btn">OK</button>
            </div>
        `;
    warningOverlay.appendChild(warningDialog);
    document.body.appendChild(warningOverlay);
    requestAnimationFrame(() => {
      warningOverlay.style.display = "";
      warningOverlay.offsetHeight;
      requestAnimationFrame(() => {
        warningOverlay.classList.add("property-panel-warning-overlay-visible");
      });
    });
    const okBtn = warningDialog.querySelector(".warning-ok-btn");
    okBtn.addEventListener("click", () => {
      document.body.removeChild(warningOverlay);
      const labelInput = this.panelElement.querySelector("#label");
      if (labelInput) {
        labelInput.focus();
      }
    });
    warningOverlay.addEventListener("click", (event) => {
      if (event.target === warningOverlay) {
        document.body.removeChild(warningOverlay);
      }
    });
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        document.removeEventListener("keydown", handleEscape);
        if (document.body.contains(warningOverlay)) {
          document.body.removeChild(warningOverlay);
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
  }
  /**
   * Handle cancel action
   * @private
   */
  handleCancel() {
    if (this.onCancel) {
      this.onCancel();
    }
    this.hide();
  }
  /**
   * Collect form data into properties object
   * @returns {Object} Properties object with updated values
   * @private
   */
  collectFormData() {
    const properties = {};
    const labelInput = this.panelElement.querySelector("#label");
    if (labelInput && labelInput.value.trim()) {
      properties.label = labelInput.value.trim();
    } else {
      properties.label = null;
    }
    const inputs = this.panelElement.querySelectorAll("input:not(#label), select");
    inputs.forEach((input) => {
      const key = input.name;
      const value = input.value.trim();
      if (key && value !== "") {
        if (input.type === "number") {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            properties[key] = numValue;
          }
        } else if (input.type === "select-one" || input.tagName === "SELECT") {
          properties[key] = parseInt(value) || value;
        } else {
          properties[key] = value;
        }
      }
    });
    return properties;
  }
  /**
   * Focus the first input field
   * @private
   */
  focusFirstInput() {
    const firstPropertyInput = this.panelElement.querySelector('.property-field input[type="number"]');
    const labelInput = this.panelElement.querySelector("#label");
    if (firstPropertyInput) {
      firstPropertyInput.focus();
      firstPropertyInput.select();
    } else if (labelInput) {
      labelInput.focus();
      labelInput.select();
    }
  }
  /**
   * Add CSS styles to the page if not already present
   * @private
   */
  addStyles() {
    if (document.getElementById("property-panel-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "property-panel-styles";
    style.textContent = `
            /* Use the same font family as MenuBar for consistency */
            .property-panel-overlay,
            .property-panel,
            .property-panel * {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
            }

            .property-panel-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .property-panel {
                background: white;
                border-radius: 14px;
                box-shadow: 0 14px 40px rgba(0,0,0,.28), 0 6px 16px rgba(0,0,0,.25);
                width: 400px;
                max-width: 90vw;
                max-height: 90vh;
                overflow: auto;
                position: relative;
                border: 1px solid #d0d0d0;
            }

            .property-panel-header {
                background: linear-gradient(#ecf3fb, #dbe6f4);
                padding: 12px 20px;
                border-bottom: 1px solid #c5d2e2;
                border-radius: 14px 14px 0 0;
            }

            .property-panel-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: #161616;
            }

            .property-panel-content {
                padding: 20px;
            }

            .property-panel-title {
                margin-bottom: 20px;
                font-style: italic;
                color: #555;
                font-size: 14px;
                line-height: 1.4;
            }

            .property-description {
                margin-top: 8px;
                margin-bottom: 8px;
                font-size: 13px;
                color: #333;
                font-style: normal;
                font-family: 'Courier New', monospace;
            }

            .help-text {
                margin-top: 8px;
                font-size: 13px;
                color: #6c757d;
                font-style: normal;
            }

            .property-field {
                margin-bottom: 15px;
            }

            .property-field:last-of-type {
                margin-bottom: 0;
            }

            .property-field label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                color: #161616;
                font-size: 14px;
            }

            .property-field input,
            .property-field select {
                width: 100%;
                padding: 8px 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 14px;
                box-sizing: border-box;
                transition: border-color 0.2s;
                background: white;
            }

            .property-field input:focus,
            .property-field select:focus {
                outline: none;
                border-color: #007bff;
            }

            .field-help {
                display: block;
                margin-top: 4px;
                font-size: 12px;
                color: #6c757d;
                font-style: italic;
            }

            .property-panel-actions {
                padding: 15px 20px;
                border-top: 1px solid #c5d2e2;
                text-align: right;
                background: linear-gradient(#ecf3fb, #dbe6f4);
                border-radius: 0 0 14px 14px;
            }

            .property-panel-actions button {
                padding: 8px 16px;
                border: 1px solid #c5d2e2;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                font-size: 14px;
                margin-left: 8px;
                transition: all 0.2s ease;
                font-family: inherit;
            }

            .property-panel-actions button:hover {
                background: rgba(0,0,0,.08);
            }

            .property-panel-actions .ok-btn {
                background: #007bff;
                color: white;
                border-color: #007bff;
            }

            .property-panel-actions .ok-btn:hover {
                background: #0056b3;
                border-color: #0056b3;
            }

            .property-panel-actions .cancel-btn:hover {
                background: rgba(0,0,0,.08);
            }
        `;
    document.head.appendChild(style);
  }
  /**
   * Add warning dialog styles
   * @private
   */
  addWarningStyles() {
    if (document.querySelector("#property-panel-warning-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "property-panel-warning-styles";
    style.textContent = `
            .property-panel-warning-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1001;
                visibility: hidden;
                opacity: 0;
            }
            
            .property-panel-warning-overlay-visible {
                visibility: visible;
                opacity: 1;
                transition: opacity 0.15s ease-out;
            }

            .property-panel-warning-dialog {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                max-width: 400px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid #e0e0e0;
                transform: scale(0.95);
            }
            
            .property-panel-warning-overlay-visible .property-panel-warning-dialog {
                transform: scale(1);
                transition: transform 0.15s ease-out;
            }

            .warning-header {
                padding: 20px 20px 0 20px;
                border-bottom: 1px solid #f0f0f0;
                margin-bottom: 20px;
            }

            .warning-header h4 {
                margin: 0 0 15px 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                font-size: 18px;
                font-weight: 600;
                color: #d73a49;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .warning-content {
                padding: 0 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #161616;
            }

            .warning-content ul {
                margin: 10px 0;
                padding-left: 20px;
            }

            .warning-content li {
                margin-bottom: 5px;
            }

            .warning-actions {
                padding: 20px;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                border-top: 1px solid #f0f0f0;
                margin-top: 20px;
            }

            .warning-ok-btn {
                padding: 8px 16px;
                background: #007bff;
                color: white;
                border: 2px solid #007bff;
                border-radius: 6px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s ease;
                min-width: 80px;
            }

            .warning-ok-btn:hover {
                background: #0056b3;
                border-color: #0056b3;
            }
        `;
    document.head.appendChild(style);
  }
  /**
   * Check if the panel is currently visible
   * @returns {boolean}
   */
  isOpen() {
    return this.isVisible;
  }
};
var propertyPanel = new PropertyPanel();

// src/gui/adapters/GUIAdapter.js
var GUIAdapter = class {
  /**
   * @constructor
   * @param {?HTMLElement} _controls Deprecated. Kept for signature compatibility; not used.
   * @param {!HTMLCanvasElement} canvas Canvas for circuit rendering.
   * @param {!CircuitService} circuitService Core domain service (aggregate orchestration, emits "update").
   * @param {!ElementRegistry} elementRegistry Registry of circuit components (DI).
   * @param {!RendererFactory} rendererFactory Factory for creating renderers (DI).
   * @param {!GUICommandRegistry} guiCommandRegistry Registry for GUI commands (DI).
   */
  constructor(_controls, canvas, circuitService, elementRegistry, rendererFactory2, guiCommandRegistry) {
    this.canvas = canvas;
    this.circuitService = circuitService;
    this.elementRegistry = elementRegistry;
    this.circuitRenderer = new CircuitRenderer(
      canvas,
      circuitService,
      rendererFactory2,
      () => this.activeCommand !== null
      // Function to check if there's an active command
    );
    this.guiCommandRegistry = guiCommandRegistry;
    this.eventTarget = _controls?.closest?.(".jsc-root") || document;
    this.commandHistory = new CommandHistory();
    this.activeCommand = null;
    this.hasDragged = false;
    this.mouseDownPos = { x: 0, y: 0 };
    this.wireDrawingMode = false;
    this.placingElement = null;
    this.selectionBox = null;
    this.isSelecting = false;
    this.currentMousePos = { x: 0, y: 0 };
    this._onMenuAction = null;
    this._onKeydown = null;
    this._onWheel = null;
    this._onImageLoaded = null;
  }
  /**
   * **🚀 Initialization Method** - Sets up the complete adapter with all bindings.
   *
   * Establishes the hexagonal architecture connections:
   * - Menu system → action handling
   * - Keyboard shortcuts → action routing
   * - Mouse/touch interactions → command execution
   * - Event system → automatic UI updates
   *
   * **Extension Points Initialized:**
   * - Menu action bindings (config-driven)
   * - Keyboard shortcut mapping
   * - Canvas interaction handlers
   * - Property panel integration
   * - Domain event listeners for UI updates
   *
   * Call this after creating the adapter to activate all functionality.
   *
   * @example
   * const adapter = new GUIAdapter(canvas, circuitService, elementRegistry,
   *                                rendererFactory, commandRegistry);
   * adapter.initialize(); // Activates all interactions
   */
  initialize() {
    this.bindMenu();
    this.bindShortcuts(KEYMAP);
    this.bindWheelZoom();
    this.bindImageLoadEvents();
    this.setupCanvasInteractions();
    this.setupPropertyPanel();
    this.circuitService.on("update", () => this.circuitRenderer.render());
    this.circuitRenderer.render();
  }
  /**
   * Unhook global listeners (useful for hot-reload/tests).
   */
  dispose() {
    if (this._onMenuAction) this.eventTarget.removeEventListener("ui:action", this._onMenuAction);
    if (this._onKeydown) document.removeEventListener("keydown", this._onKeydown);
    if (this._onWheel) this.canvas.removeEventListener("wheel", this._onWheel);
    if (this._onImageLoaded) document.removeEventListener("renderer:imageLoaded", this._onImageLoaded);
  }
  /* ---------------------------------------------------------------------- */
  /*                               BINDERS                                  */
  /* ---------------------------------------------------------------------- */
  /**
   * Bind config-driven menubar events to action handling.
   * The MenuBar emits: CustomEvent('ui:action', { detail: { id } }).
   */
  bindMenu() {
    this._onMenuAction = (e) => this.handleAction(e.detail.id);
    this.eventTarget.addEventListener("ui:action", this._onMenuAction);
  }
  /**
   * Bind global keyboard shortcuts to the same action ids from config.
   * @param {!Object<string,string>} keymap Map of "Ctrl+X" → "action.id"
   */
  bindShortcuts(keymap) {
    const signature = (e) => {
      const ctrl = e.ctrlKey || e.metaKey ? "Ctrl+" : "";
      const shift = e.shiftKey ? "Shift+" : "";
      let key = e.key;
      const arrowMap = {
        "ArrowRight": "Right",
        "ArrowLeft": "Left",
        "ArrowUp": "Up",
        "ArrowDown": "Down"
      };
      const specialKeyMap = {
        "Delete": "Del",
        "Backspace": "Del"
        // Both Del and Backspace should trigger delete
      };
      if (arrowMap[key]) {
        key = arrowMap[key];
      } else if (specialKeyMap[key]) {
        key = specialKeyMap[key];
      } else if (key.length === 1) {
        key = key.toUpperCase();
      }
      return ctrl + shift + key;
    };
    this._onKeydown = (e) => {
      if (e.key === "Escape" && this.wireDrawingMode) {
        this.resetCursor();
        e.preventDefault();
        return;
      }
      if (e.key === "Escape" && this.placingElement) {
        this.circuitService.deleteElement(this.placingElement.id);
        this.placingElement = null;
        this.circuitRenderer.setSelectedElements([]);
        e.preventDefault();
        return;
      }
      if (this.placingElement && e.ctrlKey) {
        let rotationAngle = 0;
        if (e.key === "ArrowRight") {
          rotationAngle = 90;
          e.preventDefault();
        } else if (e.key === "ArrowLeft") {
          rotationAngle = -90;
          e.preventDefault();
        } else if (e.key === "ArrowUp") {
          rotationAngle = 180;
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          rotationAngle = 180;
          e.preventDefault();
        }
        if (rotationAngle !== 0) {
          this.rotatePlacingElement(rotationAngle);
          return;
        }
      }
      const sig = signature(e);
      const id = keymap[sig];
      if (!id) return;
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      e.preventDefault();
      this.handleAction(id);
    };
    document.addEventListener("keydown", this._onKeydown);
  }
  /**
   * Convert Ctrl+wheel into renderer zoom steps (declarative equivalent).
   * Leaves normal scrolling alone if Ctrl is not pressed.
   */
  bindWheelZoom() {
    this._onWheel = (event) => this.circuitRenderer.zoom(event);
    this.canvas.addEventListener("wheel", this._onWheel);
  }
  /**
   * Bind renderer image load events to trigger re-renders when images finish loading.
   */
  bindImageLoadEvents() {
    this._onImageLoaded = (event) => {
      this.circuitRenderer.render();
    };
    document.addEventListener("renderer:imageLoaded", this._onImageLoaded);
  }
  /* ---------------------------------------------------------------------- */
  /*                          ACTION ROUTING (DECLARATIVE)                  */
  /* ---------------------------------------------------------------------- */
  /**
   * **🎯 Primary Action Handler** - Main extension point for custom actions.
   *
   * Routes semantic action IDs from configuration to appropriate handlers.
   * This is where developers can intercept and customize user interactions.
   *
   * **Action Flow:**
   * 1. UI emits semantic action ID (from menu.config.yaml)
   * 2. GUIAdapter maps ID to action specification
   * 3. Executes appropriate command, renderer operation, or history action
   *
   * **Extension Pattern:**
   * Add new actions in menu.config.yaml, register commands in GUICommandRegistry.
   *
   * @param {string} id - Action identifier (e.g., "edit.undo", "insert.resistor")
   *
   * @example
   * // Programmatic action triggering
   * guiAdapter.handleAction('insert.resistor');
   * guiAdapter.handleAction('edit.undo');
   *
   * @example
   * // Custom action handling (extend via configuration)
   * // In menu.config.yaml:
   * // actions:
   * //   'custom.optimize': { kind: 'command', name: 'optimizeCircuit' }
   * guiAdapter.handleAction('custom.optimize');
   */
  handleAction(id) {
    const spec = ACTIONS[id];
    if (!spec) {
      console.warn("[GUIAdapter] Unhandled action id:", id);
      return;
    }
    if (spec.kind === "disabled") {
      console.warn(`[GUIAdapter] '${id}' is disabled.`);
      return;
    }
    this._exec(spec);
    if (spec.kind !== "command") {
      this.circuitRenderer.render();
    }
  }
  /**
   * Execute a declarative action spec (from YAML/JSON).
   * @param {!ActionSpec} spec
   * @private
   */
  _exec(spec) {
    switch (spec.kind) {
      case "command": {
        if (spec.name === "addElement" && spec.args && spec.args[0] === "Wire") {
          this.wireDrawingMode = true;
          this.setCrosshairCursor();
          return;
        }
        if (spec.name === "addElement" && this.wireDrawingMode && spec.args && spec.args[0] !== "Wire") {
          this.resetCursor();
        }
        const args = spec.args ?? [];
        const cmd = this.guiCommandRegistry.get(
          spec.name,
          this.circuitService,
          this.circuitRenderer,
          this.elementRegistry,
          ...args
        );
        if (!cmd) {
          console.warn("[GUIAdapter] Missing command:", spec.name, args);
          return;
        }
        if (spec.name === "addElement" && cmd.setMousePosition && this.currentMousePos) {
          cmd.setMousePosition(this.currentMousePos);
        }
        this.commandHistory.executeCommand(cmd, this.circuitService);
        break;
      }
      case "history": {
        if (spec.op === "undo") this.commandHistory.undo(this.circuitService);
        else if (spec.op === "redo") this.commandHistory.redo(this.circuitService);
        else console.warn("[GUIAdapter] Unknown history op:", spec.op);
        break;
      }
      case "renderer": {
        if (spec.op === "zoomStep") {
          this._zoomStep(spec.args?.[0] ?? 1);
          break;
        }
        if (spec.op === "recenter") {
          this._recenterView();
          break;
        }
        if (typeof this.circuitRenderer[spec.op] === "function") {
          this.circuitRenderer[spec.op](...spec.args ?? []);
        } else {
          console.warn("[GUIAdapter] Unknown renderer op:", spec.op);
        }
        break;
      }
      case "todo": {
        console.warn("[GUIAdapter] TODO:", spec.note ?? "(no note)");
        break;
      }
      case "disabled": {
        break;
      }
      default: {
        console.warn(
          "[GUIAdapter] Unknown action kind:",
          /** @type {*} */
          spec.kind,
          spec
        );
      }
    }
  }
  /**
   * Renderer zoom helper; mimics your existing `zoom(event)` API.
   * @param {number} sign +1 for out, -1 for in
   * @private
   */
  _zoomStep(sign) {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const evtLike = {
      deltaY: sign > 0 ? 100 : -100,
      ctrlKey: true,
      offsetX: centerX,
      offsetY: centerY,
      preventDefault() {
      }
    };
    this.circuitRenderer.zoom(evtLike);
  }
  /**
   * Recenter the view; prefers a renderer method if available, otherwise resets transform.
   * @private
   */
  _recenterView() {
    if (typeof this.circuitRenderer.reCenter === "function") {
      this.circuitRenderer.reCenter();
      return;
    }
    this.circuitRenderer.scale = 1;
    this.circuitRenderer.offsetX = 0;
    this.circuitRenderer.offsetY = 0;
  }
  /* ---------------------------------------------------------------------- */
  /*                        CANVAS INTERACTIONS (UNCHANGED)                  */
  /* ---------------------------------------------------------------------- */
  /**
   * Sets up mouse events for interaction on the canvas: pan (MMB), drag, draw, placement.
   * Note: Ctrl+wheel zoom is handled by bindWheelZoom(); regular wheel is left to the page.
   */
  setupCanvasInteractions() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button === 1) {
        this.canvas.style.cursor = "grabbing";
        this.circuitRenderer.startPan(event);
        return;
      }
      const { offsetX, offsetY } = this.getTransformedMousePosition(event);
      if (event.button === 0 && this.placingElement) {
        const snappedX = GRID_CONFIG.snapToGrid(offsetX);
        const snappedY = GRID_CONFIG.snapToGrid(offsetY);
        const currentOrientation = this.placingElement.properties?.values?.orientation || 0;
        const angleRad = currentOrientation * Math.PI / 180;
        let centerX = snappedX;
        let centerY = snappedY;
        if (this.placingElement.type === "ground") {
          const visualOffset = GRID_CONFIG.componentSpanPixels / 2 + 20;
          centerX += visualOffset * Math.cos(angleRad);
          centerY += visualOffset * Math.sin(angleRad);
        }
        const nodePositions = GRID_CONFIG.calculateNodePositions(centerX, centerY, angleRad);
        this.placingElement.nodes[0].x = nodePositions.start.x;
        this.placingElement.nodes[0].y = nodePositions.start.y;
        this.placingElement.nodes[1].x = nodePositions.end.x;
        this.placingElement.nodes[1].y = nodePositions.end.y;
        this.circuitService.emit("update", {
          type: "finalizePlacement",
          element: this.placingElement
        });
        const placedElement = this.placingElement;
        this.placingElement = null;
        this.circuitRenderer.setSelectedElements([placedElement]);
        this.handleElementDoubleClick(placedElement, true);
        return;
      }
      if (event.button === 0) {
        if (this.wireDrawingMode) {
          this.activeCommand = this.guiCommandRegistry.get(
            "drawWire",
            this.circuitService,
            this.elementRegistry
          );
        } else {
          const element = this.findElementAt(offsetX, offsetY);
          if (element) {
            const alreadySelected = this.circuitRenderer.isElementSelected(element);
            if (!alreadySelected) {
              const selectCommand = this.guiCommandRegistry.get("selectElement");
              if (selectCommand) selectCommand.execute(element);
            }
            this.activeCommand = this.guiCommandRegistry.get("dragElement", this.circuitService);
          } else {
            this.circuitRenderer.clearSelection();
            this.startSelectionBox(offsetX, offsetY);
            this.activeCommand = null;
          }
        }
        if (this.activeCommand) {
          const before = this.circuitService.exportState();
          this.activeCommand.start(offsetX, offsetY);
          this.activeCommand.beforeSnapshot = before;
        }
        this.hasDragged = false;
        this.mouseDownPos = { x: offsetX, y: offsetY };
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      this.circuitRenderer.pan(event);
      this.circuitRenderer.handleMouseMove(event);
      const { offsetX, offsetY } = this.getTransformedMousePosition(event);
      this.currentMousePos.x = offsetX;
      this.currentMousePos.y = offsetY;
      if (this.placingElement) {
        const snappedX = GRID_CONFIG.snapToGrid(offsetX);
        const snappedY = GRID_CONFIG.snapToGrid(offsetY);
        const currentOrientation = this.placingElement.properties?.values?.orientation || 0;
        const angleRad = currentOrientation * Math.PI / 180;
        let centerX = snappedX;
        let centerY = snappedY;
        if (this.placingElement.type === "ground") {
          const visualOffset = GRID_CONFIG.componentSpanPixels / 2 + 20;
          centerX += visualOffset * Math.cos(angleRad);
          centerY += visualOffset * Math.sin(angleRad);
        }
        const nodePositions = GRID_CONFIG.calculateNodePositions(centerX, centerY, angleRad);
        this.placingElement.nodes[0].x = nodePositions.start.x;
        this.placingElement.nodes[0].y = nodePositions.start.y;
        this.placingElement.nodes[1].x = nodePositions.end.x;
        this.placingElement.nodes[1].y = nodePositions.end.y;
        this.circuitService.emit("update", {
          type: "movePreview",
          element: this.placingElement
        });
        return;
      }
      if (this.isSelecting) {
        this.updateSelectionBox(offsetX, offsetY);
        return;
      }
      if (this.activeCommand) {
        const dx = offsetX - this.mouseDownPos.x;
        const dy = offsetY - this.mouseDownPos.y;
        if (Math.sqrt(dx * dx + dy * dy) > 2) {
          this.hasDragged = true;
        }
        this.activeCommand.move(offsetX, offsetY);
      }
    });
    this.canvas.addEventListener("mouseup", (event) => {
      if (event.button === 1) {
        this.canvas.style.cursor = "default";
        this.circuitRenderer.stopPan();
        return;
      }
      const { offsetX, offsetY } = this.getTransformedMousePosition(event);
      if (this.isSelecting) {
        this.finalizeSelection();
        return;
      }
      if (this.activeCommand) {
        const before = this.activeCommand.beforeSnapshot;
        const wasWireDrawing = this.activeCommand.constructor.name === "DrawWireCommand";
        if (!this.hasDragged && this.activeCommand.cancel) {
          this.activeCommand.cancel();
        } else {
          this.activeCommand.stop();
          const after = this.circuitService.exportState();
          if (this.hasStateChanged(before, after)) {
            this.circuitService.importState(before);
            const snapshotCommand = {
              execute: () => this.circuitService.importState(after),
              undo: () => this.circuitService.importState(before)
            };
            this.commandHistory.executeCommand(snapshotCommand, this.circuitService);
          }
        }
        if (wasWireDrawing && this.wireDrawingMode) {
          this.resetCursor();
        }
        this.activeCommand = null;
      }
    });
    this.circuitService.on("startPlacing", ({ element }) => {
      this.placingElement = element;
      this.circuitRenderer.setSelectedElements([element]);
      const snappedX = GRID_CONFIG.snapToGrid(this.currentMousePos.x);
      const snappedY = GRID_CONFIG.snapToGrid(this.currentMousePos.y);
      const currentOrientation = element.properties?.values?.orientation || 0;
      const angleRad = currentOrientation * Math.PI / 180;
      let centerX = snappedX;
      let centerY = snappedY;
      if (element.type === "ground") {
        const visualOffset = GRID_CONFIG.componentSpanPixels / 2 + 20;
        centerX += visualOffset * Math.cos(angleRad);
        centerY += visualOffset * Math.sin(angleRad);
      }
      const nodePositions = GRID_CONFIG.calculateNodePositions(centerX, centerY, angleRad);
      element.nodes[0].x = nodePositions.start.x;
      element.nodes[0].y = nodePositions.start.y;
      element.nodes[1].x = nodePositions.end.x;
      element.nodes[1].y = nodePositions.end.y;
      this.circuitService.emit("update", {
        type: "movePreview",
        element
      });
      if (this.wireDrawingMode && element.type !== "wire") {
        this.resetCursor();
      }
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.circuitRenderer.stopPan();
      this.circuitRenderer.clearAllHovers();
    });
    this.canvas.addEventListener("dblclick", (event) => {
      this.circuitRenderer.handleDoubleClick(event);
    });
  }
  /**
   * Sets up property panel integration with double-click handling.
   */
  setupPropertyPanel() {
    this.circuitRenderer.setElementDoubleClickCallback((element) => {
      this.handleElementDoubleClick(element);
    });
  }
  /**
   * Handles double-click on circuit elements to open property panel.
   * @param {Object} element - The clicked circuit element
   * @param {boolean} isNewlyPlaced - Whether this element was just placed (true) or is being edited (false)
   */
  handleElementDoubleClick(element, isNewlyPlaced = false) {
    if (!element) return;
    if (element.type === "ground") {
      return;
    }
    this.propertyPanel = new PropertyPanel();
    this.propertyPanel.show(
      element,
      // onSave callback
      (element2, updatedProperties) => {
        const command = this.guiCommandRegistry.get("updateElementProperties");
        if (command) {
          command.setData(element2.id, updatedProperties);
          this.commandHistory.executeCommand(command, this.circuitService);
        }
      },
      // onCancel callback
      () => {
        if (isNewlyPlaced) {
          this.circuitService.deleteElement(element.id);
          this.circuitRenderer.setSelectedElements([]);
        }
      }
    );
  }
  /**
   * **📐 Coordinate Transformation** - Converts screen to world coordinates.
   *
   * Essential for mouse interactions on the canvas. Accounts for:
   * - Canvas position in viewport
   * - Renderer pan offset
   * - Renderer zoom scale
   *
   * Use this for all mouse position calculations in extensions.
   *
   * @param {!MouseEvent} event - Mouse event from canvas
   * @returns {{offsetX:number, offsetY:number}} World coordinates
   *
   * @example
   * canvas.addEventListener('click', (event) => {
   *   const { offsetX, offsetY } = adapter.getTransformedMousePosition(event);
   *   // Use world coordinates for element placement, hit testing, etc.
   * });
   */
  getTransformedMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      offsetX: (event.clientX - rect.left - this.circuitRenderer.offsetX) / this.circuitRenderer.scale,
      offsetY: (event.clientY - rect.top - this.circuitRenderer.offsetY) / this.circuitRenderer.scale
    };
  }
  /**
   * **🎯 Element Selection Logic** - Smart element detection at coordinates.
   *
   * Implements intelligent selection priorities:
   * 1. **Node Proximity**: Elements with nodes near click point rank higher
   * 2. **Type Priority**: Non-wire elements preferred over wires
   * 3. **Hit Testing**: Uses element-specific intersection algorithms
   *
   * This method is crucial for user experience - determines which element
   * responds to clicks when multiple elements overlap.
   *
   * **Extension Point**: Override for custom selection behavior.
   *
   * @param {number} worldX - World X coordinate
   * @param {number} worldY - World Y coordinate
   * @returns {?Object} Best matching element or null
   *
   * @example
   * // Custom selection logic
   * const element = adapter.findElementAt(mouseX, mouseY);
   * if (element?.type === 'myCustomType') {
   *   // Handle custom element interaction
   * }
   */
  findElementAt(worldX, worldY) {
    return this.circuitRenderer.findElementAtPosition(worldX, worldY);
  }
  /**
   * Hit-test for a line-like element with an "aura".
   * @param {number} x
   * @param {number} y
   * @param {!Object} element
   * @returns {boolean}
   */
  isInsideElement(x, y, element) {
    if (element.nodes.length < 2) return false;
    const aura = 10;
    const [start, end] = element.nodes;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    if (length < 1e-6) return Math.hypot(x - start.x, y - start.y) <= aura;
    const distance = Math.abs(dy * x - dx * y + end.x * start.y - end.y * start.x) / length;
    if (distance > aura) return false;
    const minX = Math.min(start.x, end.x) - aura;
    const maxX = Math.max(start.x, end.x) + aura;
    const minY = Math.min(start.y, end.y) - aura;
    const maxY = Math.max(start.y, end.y) + aura;
    return !(x < minX || x > maxX || y < minY || y > maxY);
  }
  /**
   * Shallow state delta check for snapshotting (undo batching).
   * @param {string|Object} before JSON string or object
   * @param {string|Object} after JSON string or object
   * @returns {boolean}
   */
  hasStateChanged(before, after) {
    before = typeof before === "string" ? JSON.parse(before) : before;
    after = typeof after === "string" ? JSON.parse(after) : after;
    if (!before || !after) return true;
    if (before.elements.length !== after.elements.length) return true;
    for (let i = 0; i < before.elements.length; i++) {
      const a = before.elements[i];
      const b = after.elements[i];
      if (a.id !== b.id || a.type !== b.type) return true;
      if (JSON.stringify(a.nodes) !== JSON.stringify(b.nodes)) return true;
    }
    return false;
  }
  /**
   * Start selection box drawing
   * @param {number} x World X coordinate
   * @param {number} y World Y coordinate
   * @private
   */
  startSelectionBox(x, y) {
    this.isSelecting = true;
    this.selectionBox = {
      startX: x,
      startY: y,
      endX: x,
      endY: y
    };
  }
  /**
   * Update selection box during drag
   * @param {number} x World X coordinate
   * @param {number} y World Y coordinate
   * @private
   */
  updateSelectionBox(x, y) {
    if (!this.selectionBox) return;
    this.selectionBox.endX = x;
    this.selectionBox.endY = y;
    this.circuitRenderer.setSelectionBox(this.selectionBox);
    this.circuitRenderer.render();
  }
  /**
   * Finalize selection and select elements within box
   * @private
   */
  finalizeSelection() {
    if (!this.selectionBox) return;
    const { startX, startY, endX, endY } = this.selectionBox;
    const left = Math.min(startX, endX);
    const right = Math.max(startX, endX);
    const top = Math.min(startY, endY);
    const bottom = Math.max(startY, endY);
    const boxWidth = right - left;
    const boxHeight = bottom - top;
    const isJustClick = boxWidth <= 5 && boxHeight <= 5;
    const selectedElements = this.circuitService.getElements().filter((element) => {
      return this.isElementInBox(element, left, top, right, bottom);
    });
    if (selectedElements.length > 0) {
      const multiSelectCommand = this.guiCommandRegistry.get("multiSelectElement");
      if (multiSelectCommand) {
        multiSelectCommand.execute(selectedElements);
      }
    } else if (isJustClick) {
      const deselectAllCommand = this.guiCommandRegistry.get("deselectAll");
      if (deselectAllCommand) {
        deselectAllCommand.execute();
      }
    }
    this.isSelecting = false;
    this.selectionBox = null;
    this.circuitRenderer.setSelectionBox(null);
    this.circuitRenderer.render();
  }
  /**
   * Check if an element is within the selection box
   * @param {Object} element Circuit element
   * @param {number} left Left boundary
   * @param {number} top Top boundary  
   * @param {number} right Right boundary
   * @param {number} bottom Bottom boundary
   * @returns {boolean}
   * @private
   */
  isElementInBox(element, left, top, right, bottom) {
    if (!element.nodes || element.nodes.length === 0) return false;
    return element.nodes.some((node) => {
      return node.x >= left && node.x <= right && node.y >= top && node.y <= bottom;
    });
  }
  /**
   * Set crosshair cursor for wire drawing mode
   * @private
   */
  setCrosshairCursor() {
    if (this.canvas && this.canvas.style) {
      this.canvas.style.cursor = "crosshair";
    }
  }
  /**
   * Reset cursor to default and deactivate wire drawing mode
   * @private
   */
  resetCursor() {
    if (this.canvas && this.canvas.style) {
      this.canvas.style.cursor = "default";
    }
    this.wireDrawingMode = false;
  }
  /**
   * Rotate the element currently being placed
   * @param {number} angle - Rotation angle in degrees (90, -90, 180, etc.)
   * @private
   */
  rotatePlacingElement(angle) {
    if (!this.placingElement) return;
    if (!this.placingElement.properties) {
      console.warn("[GUIAdapter] Element missing properties, cannot set orientation");
    } else {
      if (!this.placingElement.properties.values) {
        this.placingElement.properties.values = {};
      }
      const cur = this.placingElement.properties.values.orientation || 0;
      this.placingElement.properties.values.orientation = ((cur + angle) % 360 + 360) % 360;
    }
    const anchor = this.placingElement.nodes[0];
    const angleRad = angle * Math.PI / 180;
    const cos = Math.round(Math.cos(angleRad));
    const sin = Math.round(Math.sin(angleRad));
    for (let i = 1; i < this.placingElement.nodes.length; i++) {
      const relX = this.placingElement.nodes[i].x - anchor.x;
      const relY = this.placingElement.nodes[i].y - anchor.y;
      this.placingElement.nodes[i].x = GRID_CONFIG.snapToGrid(anchor.x + relX * cos - relY * sin);
      this.placingElement.nodes[i].y = GRID_CONFIG.snapToGrid(anchor.y + relX * sin + relY * cos);
    }
    this.circuitService.emit("update", {
      type: "rotatePlacingElement",
      element: this.placingElement
    });
  }
};

// src/gui/menu/MenuBar.js
var MENU_CSS = `
/* ---------- ALIGNMENT: one parent controls width ---------- */
.circuit-stage{
  width: min(100%, 1200px);   /* change/remove max as you like */
  margin: 0 auto;             /* center the block */
  display: flex;
  flex-direction: column;     /* menu on top, canvas below */
}
.circuit-stage > .menubar,
.circuit-stage > #circuitCanvas{
  width: 100%;
  box-sizing: border-box;     /* borders included in width */
}
#circuitCanvas{
  display:block;
  height:600px;               /* set your desired height */
  background:#fff;
  border:1px solid #d0d0d0;
  border-top:none;            /* seamless join with the menu */
  border-radius:0 0 10px 10px;
  position: relative; z-index: 1;  /* sits under open panels */
}

/* ---------- Menu (unchanged except: position RELATIVE, not sticky) ---------- */
/* Stacking: menu above canvas, but panels only hit-test when open */
.menubar { position: relative; z-index: 2; }
.menu-panel {
  position: absolute; top: 100%; left: 0;
  min-width: 280px;
  display: none; pointer-events: none; z-index: 10;
}
.menu-button[aria-expanded="true"] .menu-panel {
  display: block; pointer-events: auto;
}

/* Theme tokens */
:root{
  --mb-dark:#2b2b2b; --mb-fg:#f7f7f7;
  --mb-panel-bg: linear-gradient(#ecf3fb, #dbe6f4);
  --mb-panel-fg:#161616; --mb-sep:#c5d2e2;
  --mb-hover: rgba(0,0,0,.08);
  --mb-shadow: 0 14px 40px rgba(0,0,0,.28), 0 6px 16px rgba(0,0,0,.25);
  --mb-radius: 10px; --mb-item-h: 28px;
  --font: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji";
}

/* Menubar strip (relative, not sticky) */
.menubar{
  position: relative;
  display:flex; align-items:center; gap:4px;
  height:30px; padding:0 8px;
  background:var(--mb-dark); color:var(--mb-fg);
  font-family:var(--font); user-select:none; font-size:13px;
  border:1px solid #d0d0d0; border-bottom:none; border-radius:10px 10px 0 0;
}
.menubar .app-name{ font-weight:600; margin-right:4px; opacity:.9; }

/* Top-level buttons */
.menu-button{
  position:relative; height:100%;
  display:flex; align-items:center; padding:0 8px;
  border-radius:6px; cursor:default; outline:none;
}
.menu-button[aria-expanded="true"], .menu-button:focus{ background:rgba(255,255,255,.1); }

/* Dropdown panel */
.menu-panel{
  background:var(--mb-panel-bg); color:var(--mb-panel-fg);
  border-radius:var(--mb-radius); box-shadow:var(--mb-shadow);
  padding:5px 0; transform: translateY(4px);
}

/* Items */
.menu-item{
  height:var(--mb-item-h); display:grid; grid-template-columns:1fr auto;
  align-items:center; gap:14px; padding:0 12px; font-size:13px;
  white-space:nowrap;
}
.menu-item[aria-disabled="true"]{ opacity:.45; pointer-events:none; }
.menu-item[data-type="separator"]{ height:6px; padding:3px 0; }
.menu-item[data-type="separator"]::after{
  content:""; display:block; height:1px; background:var(--mb-sep); margin:0 8px;
}
.menu-item:hover, .menu-item[aria-selected="true"]{ background:var(--mb-hover); }
.menu-item .shortcut{ opacity:.7; font-variant-numeric: tabular-nums; font-size:12px; }
.menu-item .label{ display:flex; align-items:center; gap:6px; }
.menu-item .check{ width:14px; display:inline-block; text-align:center; }
`;
function ensureStyleInjected() {
  if (document.getElementById("qucat-menubar-style")) return;
  const style = document.createElement("style");
  style.id = "qucat-menubar-style";
  style.textContent = MENU_CSS;
  document.head.appendChild(style);
}
var MenuBar = class {
  /**
   * @param {!HTMLElement} mount Root element where the menubar is rendered.
   */
  constructor(mount, { eventTarget: eventTarget2 = document } = {}) {
    this.mount = mount;
    this.buttons = [];
    this.eventTarget = eventTarget2;
    this.openIndex = -1;
    ensureStyleInjected();
    this._bindGlobalClosers();
  }
  /**
   * Renders the menubar using a config object.
   * Safe to call multiple times; it re-renders from scratch.
   * @param {!MenuConfig} cfg
   * @return {void}
   */
  renderFromConfig(cfg) {
    this.mount.classList.add("menubar");
    this.mount.innerHTML = "";
    this.buttons = [];
    this.eventTarget = eventTarget;
    if (cfg.brand) {
      const b = document.createElement("div");
      b.className = "app-name";
      b.textContent = cfg.brand;
      this.mount.appendChild(b);
    }
    this.buttons = cfg.menus.map((menu, i) => this._addMenu(menu, i));
  }
  /**
   * @param {!MenuGroup} menu
   * @param {number} idx
   * @return {!HTMLElement} The menu button element.
   * @private
   */
  _addMenu(menu, idx) {
    const btn = document.createElement("div");
    btn.className = "menu-button";
    btn.tabIndex = 0;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("role", "menuitem");
    btn.textContent = menu.label;
    const panel = document.createElement("div");
    panel.className = "menu-panel";
    panel.setAttribute("role", "menu");
    panel.innerHTML = menu.items.map((it) => this.itemHTML(it)).join("");
    btn.appendChild(panel);
    btn.addEventListener("click", (e) => {
      if (e.target === btn) this.toggle(idx);
    });
    btn.addEventListener("mouseenter", () => {
      if (this.openIndex !== -1 && this.openIndex !== idx) this.open(idx);
    });
    panel.addEventListener("click", (ev) => {
      const el = ev.target.closest(".menu-item");
      if (!el || el.dataset.type === "separator") return;
      if (el.getAttribute("aria-disabled") === "true") return;
      this.closeAll();
      this.eventTarget.dispatchEvent(new CustomEvent("ui:action", { detail: { id: el.dataset.id }, bubbles: true }));
    });
    panel.addEventListener("keydown", (ev) => this._panelKeyNav(ev, panel));
    this.mount.appendChild(btn);
    return btn;
  }
  /**
   * Returns the HTML string for a menu item or separator.
   * @param {MenuItem|MenuSeparator} it
   * @return {string}
   */
  itemHTML(it) {
    if (
      /** @type {MenuSeparator} */
      it.type === "separator"
    ) {
      return `<div class="menu-item" role="separator" data-type="separator"></div>`;
    }
    const item = (
      /** @type {MenuItem} */
      it
    );
    const disabled = !!item.disabled;
    const shortcut = item.shortcut ? `<span class="shortcut">${item.shortcut}</span>` : "";
    const check = item.checked ? `<span class="check">\u2022</span>` : `<span class="check"></span>`;
    return `<div class="menu-item" role="menuitem" tabindex="0" data-id="${item.id}" data-type="item" aria-disabled="${disabled}">
              <div class="label">${check}<span>${item.label}</span></div>${shortcut}
            </div>`;
  }
  /**
   * Toggles a specific menu by index.
   * @param {number} i
   * @return {void}
   */
  toggle(i) {
    this.openIndex === i ? this.closeAll() : this.open(i);
  }
  /**
   * Opens a specific menu by index and focuses its first item.
   * @param {number} i
   * @return {void}
   */
  open(i) {
    this.closeAll();
    this.openIndex = i;
    const btn = this.buttons[i];
    if (!btn) return;
    btn.setAttribute("aria-expanded", "true");
    this._focusFirst(btn.querySelector(".menu-panel"));
  }
  /**
   * Closes any open menu.
   * @return {void}
   */
  closeAll() {
    this.openIndex = -1;
    this.buttons.forEach((b) => b.setAttribute("aria-expanded", "false"));
  }
  /**
   * Enables/disables and/or checks/unchecks a specific item at runtime.
   * @param {string} id
   * @param {{disabled?: boolean, checked?: boolean}} patch
   * @return {void}
   */
  update(id, patch) {
    const el = this.mount.querySelector(`.menu-item[data-id="${id}"]`);
    if (!el) return;
    if ("disabled" in patch) el.setAttribute("aria-disabled", String(!!patch.disabled));
    if ("checked" in patch) {
      const dot = el.querySelector(".check");
      if (patch.checked && dot && !dot.textContent) dot.textContent = "\u2022";
      if (!patch.checked && dot && dot.textContent) dot.textContent = "";
    }
  }
  /**
   * Focus helpers & keyboard navigation
   * @param {!Element} panel
   * @return {void}
   * @private
   */
  _focusFirst(panel) {
    const first = panel?.querySelector('.menu-item[data-type="item"]');
    if (
      /** @type {?HTMLElement} */
      first
    ) first.focus();
  }
  /**
   * @param {!Element} panel
   * @param {number} dir +1 next, -1 prev
   * @private
   */
  _focusNext(panel, dir) {
    const items = [...panel.querySelectorAll('.menu-item[data-type="item"]')];
    const idx = items.indexOf(document.activeElement);
    const next = items[(idx + (dir > 0 ? 1 : items.length - 1)) % items.length];
    if (
      /** @type {?HTMLElement} */
      next
    ) next.focus();
  }
  /**
   * Handles keyboard navigation within an open menu panel.
   * - ArrowUp/ArrowDown: move through items
   * - ArrowLeft/ArrowRight: switch menus
   * - Enter: activate focused item
   * - Esc: close menus
   * - Type-ahead: jump to first item starting with typed letter
   * @param {!KeyboardEvent} ev
   * @param {!Element} panel
   * @private
   */
  _panelKeyNav(ev, panel) {
    switch (ev.key) {
      case "ArrowDown":
        ev.preventDefault();
        this._focusNext(panel, 1);
        break;
      case "ArrowUp":
        ev.preventDefault();
        this._focusNext(panel, -1);
        break;
      case "Enter":
        ev.preventDefault();
        /** @type {?HTMLElement} */
        document.activeElement?.click();
        break;
      case "Escape":
        this.closeAll();
        break;
      case "ArrowLeft":
        this.open(Math.max(0, this.openIndex - 1));
        break;
      case "ArrowRight":
        this.open(Math.min(this.buttons.length - 1, this.openIndex + 1));
        break;
      default:
        if (ev.key.length === 1) {
          const k = ev.key.toLowerCase();
          const items = [...panel.querySelectorAll('.menu-item[data-type="item"]')];
          const found = items.find((it) => it.textContent.trim().toLowerCase().startsWith(k));
          if (
            /** @type {?HTMLElement} */
            found
          ) found.focus();
        }
    }
  }
  /** @private */
  _bindGlobalClosers() {
    document.addEventListener("click", (e) => {
      if (!this.mount.contains(e.target)) this.closeAll();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAll();
    });
  }
};

// src/gui/menu/initMenu.js
function expandComponentReferences(guiConfig) {
  const { components, menus } = guiConfig;
  const expandedMenus = menus.map((menu) => ({
    ...menu,
    items: menu.items.map((item) => {
      if (item.component) {
        const componentDef = components[item.component];
        if (!componentDef) {
          console.warn(`[initMenu] Component "${item.component}" not found`);
          return item;
        }
        const elementArg = componentDef.menuArg || item.component;
        return {
          id: item.id,
          label: componentDef.menuLabel,
          shortcut: componentDef.shortcut,
          action: { kind: "command", name: "addElement", args: [elementArg] }
        };
      }
      return item;
    })
  }));
  return { ...guiConfig, menus: expandedMenus };
}
function initMenu({ mount = document.getElementById("menubar"), eventTarget: eventTarget2 = document } = {}) {
  const expandedConfig = expandComponentReferences(gui_config_default);
  const menu = new MenuBar(mount, { eventTarget: eventTarget2 });
  menu.renderFromConfig(expandedConfig);
  return menu;
}

// src/gui/appShell.js
var APP_SHELL_STYLE_ID = "jscircuit-app-shell-style";
var APP_SHELL_CSS = `
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
function ensureAppShellStyles(documentRef = document) {
  if (documentRef.getElementById(APP_SHELL_STYLE_ID)) return;
  const style = documentRef.createElement("style");
  style.id = APP_SHELL_STYLE_ID;
  style.textContent = APP_SHELL_CSS;
  documentRef.head.appendChild(style);
}
function renderAppShell(root, { height = "680px", theme = "light", subtitle = "Notebook-ready circuit editor for QuCat netlists." } = {}) {
  ensureAppShellStyles(root.ownerDocument);
  root.classList.add("jsc-root");
  root.dataset.theme = theme;
  root.innerHTML = `
    <div class="jsc-shell" style="--jsc-height: ${height};">
      <div class="jsc-toolbar">
        <div class="jsc-toolbar__title">
          <strong>JSCircuit</strong>
          <span>${subtitle}</span>
        </div>
        <div class="jsc-toolbar__actions" aria-hidden="true">
          <span class="jsc-toolbar__pill">\u2318 / Ctrl shortcuts</span>
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
    stage: root.querySelector(".jsc-shell"),
    controls: root.querySelector(".controls"),
    canvas: root.querySelector("#circuitCanvas"),
    menubar: root.querySelector("#menubar")
  };
}

// src/gui/createJSCircuitApp.js
function fitCanvasHiDPIOnce(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const cssW = Math.max(1, Math.round(rect.width));
  const cssH = Math.max(1, Math.round(rect.height));
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
}
function setupHiDPICanvas(canvas, onResize) {
  const ctx = canvas.getContext("2d");
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width));
    const cssH = Math.max(1, Math.round(rect.height));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize?.();
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("resize", resize, { passive: true });
  resize();
  return () => {
    ro.disconnect();
    window.removeEventListener("resize", resize);
  };
}
function setupPostMessageBridge({ app, allowPostMessage }) {
  if (!allowPostMessage) return () => {
  };
  const onMessage = (event) => {
    if (event.origin !== window.location.origin && !event.origin.includes("github.io") && !event.origin.includes("localhost")) {
      return;
    }
    const data = event.data;
    if (data.type === "loadCircuit" && data.netlist) {
      app.loadNetlist(data.netlist, { zoomToFit: true }).catch((error) => {
        Logger.error("[Documentation] Failed to load example circuit:", error);
      });
    }
  };
  window.addEventListener("message", onMessage);
  window.parent?.postMessage({ type: "appReady" }, "*");
  return () => window.removeEventListener("message", onMessage);
}
function createJSCircuitApp(root, options = {}) {
  const {
    height = "680px",
    theme = "light",
    subtitle,
    initialNetlist = null,
    allowPostMessage = false,
    onCircuitChange = null
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
  globalPerformanceMonitor.startTiming("app-initialization");
  setupCommands(circuitService, guiAdapter.circuitRenderer);
  guiAdapter.initialize();
  const cleanupResize = setupHiDPICanvas(canvas, () => {
    guiAdapter.circuitRenderer.reCenter();
    guiAdapter.circuitRenderer.centerScrollPosition();
    guiAdapter.circuitRenderer.render();
  });
  guiAdapter.circuitRenderer.reCenter();
  guiAdapter.circuitRenderer.centerScrollPosition();
  stage.classList.add("ready");
  globalPerformanceMonitor.endTiming("app-initialization");
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
    if (typeof onCircuitChange === "function") {
      onCircuitChange({
        netlist: QucatNetlistAdapter.exportToString(circuitService.circuit),
        snapshot: circuitService.exportState(),
        elementCount: circuitService.getElements().length
      });
    }
  };
  circuitService.on("update", () => {
    if (circuitService.getElements().length > 0) {
      root.querySelector(".jsc-empty-state")?.setAttribute("hidden", "hidden");
    } else {
      root.querySelector(".jsc-empty-state")?.removeAttribute("hidden");
    }
    emitCircuitChange();
  });
  const cleanupBridge = setupPostMessageBridge({ app: { loadNetlist }, allowPostMessage });
  async function loadNetlist(netlist, { zoomToFit = false } = {}) {
    const openCommand = GUICommandRegistry.get("openNetlist", circuitService, guiAdapter.circuitRenderer);
    if (!openCommand) {
      throw new Error("OpenNetlist command is not available");
    }
    openCommand.previousState = circuitService.exportState();
    const elements = await openCommand._parseNetlistContent(netlist);
    await openCommand._loadElementsIntoCircuit(elements);
    circuitService.emit("update");
    if (zoomToFit) {
      setTimeout(() => {
        guiAdapter.circuitRenderer.zoomToFit();
        guiAdapter.circuitRenderer.render();
      }, 50);
    }
  }
  function exportNetlist() {
    if (circuitService.getElements().length === 0) return "";
    return QucatNetlistAdapter.exportToString(circuitService.circuit);
  }
  function setTheme(nextTheme = "light") {
    root.dataset.theme = nextTheme;
  }
  function destroy() {
    cleanupResize();
    cleanupBridge();
    guiAdapter.dispose();
    root.innerHTML = "";
  }
  if (initialNetlist) {
    loadNetlist(initialNetlist, { zoomToFit: true }).catch((error) => {
      Logger.error("[JSCircuit] Failed to load initial netlist", error);
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
    destroy
  };
}

// src/gui/anywidget-frontend.js
function normalizeTheme(modelTheme) {
  if (modelTheme === "dark" || modelTheme === "light") return modelTheme;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
var anywidget_frontend_default = {
  render({ model, el }) {
    const app = createJSCircuitApp(el, {
      height: model.get("height") || "680px",
      theme: normalizeTheme(model.get("theme")),
      subtitle: model.get("subtitle") || "Interactive QuCat editor packaged as an anywidget.",
      initialNetlist: model.get("netlist") || null,
      onCircuitChange: ({ netlist, snapshot, elementCount }) => {
        if (model.get("netlist") !== netlist) {
          model.set("netlist", netlist);
        }
        if (model.get("snapshot") !== snapshot) {
          model.set("snapshot", snapshot);
        }
        if (model.get("element_count") !== elementCount) {
          model.set("element_count", elementCount);
        }
        model.save_changes();
      }
    });
    let isApplyingRemoteState = false;
    const syncFromModel = async () => {
      if (isApplyingRemoteState) return;
      isApplyingRemoteState = true;
      try {
        const snapshot = model.get("snapshot");
        const netlist = model.get("netlist");
        const height = model.get("height") || "680px";
        const theme = normalizeTheme(model.get("theme"));
        const subtitle = model.get("subtitle") || "Interactive QuCat editor packaged as an anywidget.";
        el.querySelector(".jsc-shell")?.style.setProperty("--jsc-height", height);
        const subtitleNode = el.querySelector(".jsc-toolbar__title span");
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
    model.on("change:netlist", syncFromModel);
    model.on("change:snapshot", syncFromModel);
    model.on("change:height", syncFromModel);
    model.on("change:theme", syncFromModel);
    model.on("change:subtitle", syncFromModel);
    return () => {
      model.off("change:netlist", syncFromModel);
      model.off("change:snapshot", syncFromModel);
      model.off("change:height", syncFromModel);
      model.off("change:theme", syncFromModel);
      model.off("change:subtitle", syncFromModel);
      app.destroy();
    };
  }
};
export {
  anywidget_frontend_default as default
};
