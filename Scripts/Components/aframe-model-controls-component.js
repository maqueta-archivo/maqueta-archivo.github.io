import "../Libraries/Hammer/hammer.min.js";

const hammertime = new Hammer(document.querySelector('a-scene'));
const pinch = new Hammer.Pinch();
hammertime.add(pinch); // add it to the Manager instance

AFRAME.registerComponent("touch-control", {
    schema: {
        rotationSensibility: { type: 'number', default: 2 },
        maxRotationX: { type: 'number', default: Number.POSITIVE_INFINITY },
        maxRotationY: { type: 'number', default: Number.POSITIVE_INFINITY },
        minRotationX: { type: 'number', default: Number.NEGATIVE_INFINITY },
        minRotationY: { type: 'number', default: Number.NEGATIVE_INFINITY },
        zoomSensibility: { type: 'number', default: 1 },
        maxZoom: { type: 'number', default: Number.POSITIVE_INFINITY },
        minZoom: { type: 'number', default: 0 },
        target: { type: 'string' }
    },
    init: function () {
        this.model = this.el;

        hammertime.on('pan', (ev) => {
            if (this.model.object3D.visible) {
                let rotation = this.model.getAttribute("rotation")
                switch (ev.direction) {
                    case 2:
                        rotation.z = rotation.z - this.data.rotationSensibility;
                        if (rotation.z < this.data.minRotationY) {
                            rotation.z = this.data.minRotationY;
                        }
                        break;
                    case 4:
                        if (rotation.z > this.data.maxRotationY) {
                            rotation.z = this.data.maxRotationY;
                        }
                        rotation.z = rotation.z + this.data.rotationSensibility;
                        break;
                    case 8:
                        rotation.x = rotation.x - this.data.rotationSensibility;
                        if (rotation.x < this.data.minRotationX) {
                            rotation.x = this.data.minRotationX;
                        }
                        break;
                    case 16:
                        rotation.x = rotation.x + this.data.rotationSensibility;
                        if (rotation.x > this.data.maxRotationX) {
                            rotation.x = this.data.maxRotationX;
                        }
                        break;

                    default:
                        break;
                }
                this.model.setAttribute("rotation", rotation);
            }
        });

        hammertime.on("pinch", (ev) => {
            if (this.model.object3D.visible) {
                let scale = this.model.getAttribute("scale")

                scale.x = scale.x * ev.scale * this.data.zoomSensibility;
                scale.y = scale.y * ev.scale * this.data.zoomSensibility;
                scale.z = scale.z * ev.scale * this.data.zoomSensibility;

                if (scale.x > this.data["maxZoom"]) {
                    scale.x = this.data["maxZoom"];
                }
                if (scale.x < this.data["minZoom"]) {
                    scale.x = this.data["minZoom"];
                }
                if (scale.y > this.data["maxZoom"]) {
                    scale.y = this.data["maxZoom"];
                }
                if (scale.y < this.data["minZoom"]) {
                    scale.y = this.data["minZoom"];
                }
                if (scale.z > this.data["maxZoom"]) {
                    scale.z = this.data["maxZoom"];
                }
                if (scale.z < this.data["minZoom"]) {
                    scale.z = this.data["minZoom"];
                }

                this.model.setAttribute("scale", scale);
            }
        });

        this.target = document.querySelector(this.data["target"]);
        this.target.addEventListener('targetFound', event => {
            this.model.setAttribute("rotation", "0 0 0");
            this.model.setAttribute("scale", "1 1 1");
        });
    }
})

