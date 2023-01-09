import "./hammer.min.js";

var scene = document.querySelector('#scene');
var TargetEdificio = document.querySelector('#TargetEdificio');
var EdificioModel = document.querySelector('#GlobalEdificio');

var visible = false;

var hammertime = new Hammer(scene);
var pinch = new Hammer.Pinch();
hammertime.add(pinch); // add it to the Manager instance

hammertime.on('pan', (ev) => {
    if (visible) {
        let rotation = EdificioModel.getAttribute("rotation")
        switch (ev.direction) {
            case 2:
                rotation.z = rotation.z - 4
                console.log("left");
                break;
            case 4:
                rotation.z = rotation.z + 4
                console.log("rigth");
                break;
            case 8:
                rotation.x = rotation.x - 4
                if (rotation.x < -30) {
                    rotation.x = -30;
                }
                console.log("up");
                break;
            case 16:
                rotation.x = rotation.x + 4
                if (rotation.x > 30) {
                    rotation.x = 30;
                }
                console.log("down");
                break;

            default:
                break;
        }
        EdificioModel.setAttribute("rotation", rotation)
    }
});

hammertime.on("pinch", (ev) => {
    if (visible) {
        let scale = EdificioModel.getAttribute("scale")

        scale.x = scale.x * ev.scale;
        scale.y = scale.y * ev.scale;
        scale.z = scale.z * ev.scale;

        if (scale.x > 1.5) {
            scale.x = 1.5;
        }
        if (scale.x < 0.5) {
            scale.x = 0.5;
        }
        if (scale.y > 1) {
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

        var DebugText = document.querySelector('#DebugText');
        DebugText.setAttribute("text","value: " + ev.scale);
    }
});
DebugText.setAttribute("text","value: " + EdificioModel.getAttribute("scale").x);

TargetEdificio.addEventListener("targetFound", event => {
    visible = true;
});
TargetEdificio.addEventListener("targetLost", event => {
    visible = false;
});