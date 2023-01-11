import "../Libraries/Hammer/hammer.min.js";

const hammertime = new Hammer(document.querySelector('a-scene'));
const pinch = new Hammer.Pinch();
hammertime.add(pinch); // add it to the Manager instance

AFRAME.registerComponent("touch-control", {
    schema: {
        rotationSensibility: { type: 'number', default: 2 },
        zoomSensibility: { type: 'number', default: 1 }
    },
    init: function () {
        this.model = this.el;
        hammertime.on('pan', (ev) => {
            if (this.model.object3D.visible) {
                let rotation = this.model.getAttribute("rotation")
                switch (ev.direction) {
                    case 2:
                        rotation.z = rotation.z - this.data.rotationSensibility;
                        break;
                    case 4:
                        rotation.z = rotation.z + this.data.rotationSensibility;
                        break;
                    case 8:
                        rotation.x = rotation.x - this.data.rotationSensibility;
                        if (rotation.x < -30) {
                            rotation.x = -30;
                        }
                        break;
                    case 16:
                        rotation.x = rotation.x + this.data.rotationSensibility;
                        if (rotation.x > 30) {
                            rotation.x = 30;
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

                if (scale.x > 1.5) {
                    scale.x = 1.5;
                }
                if (scale.x < 0.5) {
                    scale.x = 0.5;
                }
                if (scale.y > 1.5) {
                    scale.y = 1.5;
                }
                if (scale.y < 0.5) {
                    scale.y = 0.5;
                }
                if (scale.z > 1.5) {
                    scale.z = 1.5;
                }
                if (scale.z < 0.5) {
                    scale.z = 0.5;
                }

                this.model.setAttribute("scale", scale);
            }
        });
    }
})

