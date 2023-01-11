import "../Components/aframe-model-controls-component.js";

AFRAME.registerComponent('a-interactive-model-nested-entity-', {
  schema: {
    model: { type: 'string' },
    position: { type: 'string', default: '0 0 0' },
    rotation: { type: 'string', default: '0 0 0' },
    scale: { type: 'string', default: '0 0 0' }
  },
  init: function () {
    let nested = document.createElement('a-entity');
    nested.setAttribute('gltf-model', this.data.model);
    nested.setAttribute('position', this.data.position);
    nested.setAttribute('rotation', this.data.rotation);
    nested.setAttribute('scale', this.data.scale);
    this.el.appendChild(nested);
  }
});

AFRAME.registerPrimitive('a-interactive-model', {
  defaultComponents: {
    'a-interactive-model-nested-entity-': {},
    'touch-control': {}
  },

  mappings: {
    model: 'a-interactive-model-nested-entity-.model',
    'nested-position': 'a-interactive-model-nested-entity-.position',
    'nested-rotation': 'a-interactive-model-nested-entity-.rotation',
    'nested-scale': 'a-interactive-model-nested-entity-.scale',
    'rotation-sensibility': 'touch-control.rotationSensibility',
    'max-rotation-x': 'touch-control.maxRotationX',
    'max-rotation-y': 'touch-control.maxRotationY',
    'min-rotation-x': 'touch-control.minRotationX',
    'min-rotation-y': 'touch-control.minRotationY',
    'zoom-sensibility': 'touch-control.zoomSensibility',
    'max-zoom': 'touch-control.maxZoom',
    'min-zoom': 'touch-control.minZoom',
  }
});