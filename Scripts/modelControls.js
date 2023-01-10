import "./Libraries/Hammer/hammer.min.js";

var scene = document.querySelector('#scene');
var TargetEdificio = document.querySelector('#TargetEdificio');
var EdificioModel = document.querySelector('#GlobalEdificio');

var visible = false;

const rotationSensibility = 2;
const zoomSensibility = 1;

var hammertime = new Hammer(scene);
var pinch = new Hammer.Pinch();
hammertime.add(pinch); // add it to the Manager instance

hammertime.on('pan', (ev) => {
    if (visible) {
        let rotation = EdificioModel.getAttribute("rotation")
        switch (ev.direction) {
            case 2:
                rotation.z = rotation.z - rotationSensibility;
                console.log("left");
                break;
            case 4:
                rotation.z = rotation.z + rotationSensibility;
                console.log("rigth");
                break;
            case 8:
                rotation.x = rotation.x - rotationSensibility;
                if (rotation.x < -30) {
                    rotation.x = -30;
                }
                console.log("up");
                break;
            case 16:
                rotation.x = rotation.x + rotationSensibility;
                if (rotation.x > 30) {
                    rotation.x = 30;
                }
                console.log("down");
                break;

            default:
                break;
        }
        EdificioModel.setAttribute("rotation", rotation);
    }
});

hammertime.on("pinch", (ev) => {
    if (visible) {
        let scale = EdificioModel.getAttribute("scale")

        scale.x = scale.x * ev.scale * zoomSensibility;
        scale.y = scale.y * ev.scale * zoomSensibility;
        scale.z = scale.z * ev.scale * zoomSensibility;

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

        EdificioModel.setAttribute("scale", scale);
    }
});

TargetEdificio.addEventListener("targetFound", event => {
    visible = true;
});
TargetEdificio.addEventListener("targetLost", event => {
    visible = false;
});