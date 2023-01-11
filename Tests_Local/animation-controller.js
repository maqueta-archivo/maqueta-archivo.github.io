function getObject3DWorldDistance(obj1, obj2){
    return obj1.getWorldPosition().distanceTo(obj2.getWorldPosition());
}

const threshold = 2000;

let isPlaying = false;
let raccoonVisible = false;
let bearVisible = false;

const raccoonTarget = document.querySelector('#raccoonEntity');
const bearTarget = document.querySelector('#bearEntity');

const raccoonModel = document.querySelector("#raccoonModel");
const bearModel = document.querySelector("#bearModel");

raccoonTarget.addEventListener("targetFound", event => {
    raccoonVisible = true;
});
raccoonTarget.addEventListener("targetLost", event => {
    raccoonVisible = false;
});

bearTarget.addEventListener("targetFound", event => {
    bearVisible = true;
});
bearTarget.addEventListener("targetLost", event => {
    bearVisible = false;
});

setInterval(()=>{
    if(raccoonVisible && bearVisible){
        if (getObject3DWorldDistance(raccoonModel.object3D, bearModel.object3D) < threshold){
            raccoonModel.setAttribute('animation-mixer', {timeScale: 1});
            bearModel.setAttribute('animation-mixer', {timeScale: 1});
            isPlaying = true;
        }else{
            raccoonModel.setAttribute('animation-mixer', {timeScale: 0});
            bearModel.setAttribute('animation-mixer', {timeScale: 0});
            isPlaying = false;
            console.log(getObject3DWorldDistance(raccoonModel.object3D, bearModel.object3D));
        }
    }
    
},500);