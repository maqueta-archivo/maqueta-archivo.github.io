AFRAME.registerComponent("trigger-visibility", {
    schema: {
        entity: { type: 'string' }
    },
    init: function () {
        this.entity = document.querySelector(this.data["entity"]);
        this.el.addEventListener('targetFound', event => {
            this.entity.setAttribute('visible', true);
        });
        this.el.addEventListener('targetLost', event => {
            this.entity.setAttribute('visible', false);
        });
    }
});