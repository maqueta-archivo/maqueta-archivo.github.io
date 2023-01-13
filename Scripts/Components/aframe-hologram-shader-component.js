AFRAME.registerComponent('hologram-shader', {
    schema: {
        'offsetSpeed': { type: 'number', default: 0.25 },
        'minEmissive': { type: 'number', default: 0.3 },
        'maxEmissive': { type: 'number', default: 1 },
        'minOffset': { type: 'number', default: -1 },
        'maxOffset': { type: 'number', default: 1 }
    },
    tick: function (time, timeDelta) {
        if (this.el.components.material && this.el.components.material.material && this.el.components.material.material.map) {
            let newOffset = this.el.components.material.material.map.offset.y + this.data["offsetSpeed"] * timeDelta / 1000;

            if (newOffset >= this.data["maxOffset"]) {
                newOffset = this.data["minOffset"];
            }

            this.el.components.material.material.map.offset.y = newOffset;

            let newEmissive = 0;
            if (newOffset <= 0) {
                newEmissive = this.mapRange(newOffset, this.data["minOffset"], 0, this.data["minEmissive"], this.data["maxEmissive"]);
            } else {
                newEmissive = this.mapRange(newOffset, 0, this.data["maxOffset"], this.data["maxEmissive"], this.data["minEmissive"]);
            }

            if (newEmissive > this.data["maxEmissive"])
                newEmissive = this.data["maxEmissive"];
            if (newEmissive < this.data["minEmissive"])
                newEmissive = this.data["minEmissive"];
            this.el.components.material.material.emissiveIntensity = newEmissive;
        }
    },
    mapRange: function (current, inMin, inMax, outMin, outMax) {
        let scale = (outMax - outMin) / (inMax - inMin)
        let offset = -inMin * (outMax - outMin) / (inMax - inMin) + outMin
        return current * scale + offset
    }
});