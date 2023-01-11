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
            let new_offset = this.el.components.material.material.map.offset.y + this.data["offsetSpeed"] * timeDelta / 1000;

            if (new_offset >= this.data["maxOffset"]) {
                new_offset = this.data["minOffset"];
            }

            this.el.components.material.material.map.offset.y = new_offset;

            let new_emissive = 0;
            if (new_offset <= 0) {
                new_emissive = this.map_range(new_offset, this.data["minOffset"], 0, this.data["minEmissive"], this.data["maxEmissive"]);
            } else {
                new_emissive = this.map_range(new_offset, 0, this.data["maxOffset"], this.data["maxEmissive"], this.data["minEmissive"]);
            }

            if (new_emissive > this.data["maxEmissive"])
                new_emissive = this.data["maxEmissive"];
            if (new_emissive < this.data["minEmissive"])
                new_emissive = this.data["minEmissive"];
            this.el.components.material.material.emissiveIntensity = new_emissive;
        }
    },
    map_range: function (current, in_min, in_max, out_min, out_max) {
        let scale = (out_max - out_min) / (in_max - in_min)
        let offset = -in_min * (out_max - out_min) / (in_max - in_min) + out_min
        return current * scale + offset
    }
});