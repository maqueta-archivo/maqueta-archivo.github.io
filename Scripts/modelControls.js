import "./hammer.min.js";

var scene = document.querySelector('#scene');
var EdificioModel = document.querySelector('#GlobalEdificio');

var hammertime = new Hammer(scene);
var pinch = new Hammer.Pinch();
hammertime.add(pinch); // add it to the Manager instance

hammertime.on('pan', (ev) => {
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
            if(rotation.x < -30){
                rotation.x = -30;
            }
            console.log("up");
            break;
        case 16:
            rotation.x = rotation.x + 4
            if(rotation.x > 30){
                rotation.x = 30;
            }
            console.log("down");
            break;
        
        default:
            break;
    }
    EdificioModel.setAttribute("rotation", rotation)
});

hammertime.on("pinch", (ev) => {
    let scale = EdificioModel.getAttribute("scale")

    scale.x = scale.x * ev.scale;
    scale.y = scale.y * ev.scale;
    scale.z = scale.z * ev.scale;

    if(scale.x > 1){
        scale.x = 1;
    }
    if(scale.x < 0.2){
        scale.x = 0.2;
    }
    if(scale.y > 1){
        scale.y = 1;
    }
    if(scale.y < 0.2){
        scale.y = 0.2;
    }
    if(scale.z > 1){
        scale.z = 1;
    }
    if(scale.z < 0.2){
        scale.z = 0.2;
    }

    EdificioModel.setAttribute("scale", scale);
});