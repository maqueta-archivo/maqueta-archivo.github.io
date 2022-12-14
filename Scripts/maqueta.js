let last_time = Date.now();

let offset_update = 0.25;
let min_emissive = 0.3;
let max_emissive = 1;
let min_offset = -1;
let max_offset = 1;

function mapRange(current, in_min, in_max, out_min, out_max) {
    let scale = (out_max - out_min) / (in_max - in_min)
    let offset = -in_min * (out_max - out_min) / (in_max - in_min) + out_min
    return current * scale + offset
}
function updateShader() {
    let now = Date.now();
    let dt = (now - last_time) / 1000;
    last_time = now;

    if (document.getElementById("maqueta").components.material && document.getElementById("maqueta").components.material.material && document.getElementById("maqueta").components.material.material.map) {
        let new_offset = document.getElementById("maqueta").components.material.material.map.offset.y + offset_update * dt;

        if (new_offset >= max_offset) {
            new_offset = min_offset;
        }

        document.getElementById("maqueta").components.material.material.map.offset.y = new_offset;

        let new_emissive = 0;
        if (new_offset <= 0) {
            new_emissive = mapRange(new_offset, -1, 0, 0, 1);
        } else {
            new_emissive = mapRange(new_offset, 0, 1, 1, 0);
        }

        if (new_emissive > 1)
            new_emissive = 1;
        if (new_emissive < 0)
            new_emissive = 0;
        document.getElementById("maqueta").components.material.material.emissiveIntensity = new_emissive;
    }
    setTimeout(() => { updateShader(); }, 5);

}
setTimeout(() => { updateShader(); }, 5);

//setTimeout(() => { document.getElementById("scene").components.inspector.openInspector(); }, 2000);