AFRAME.registerComponent('update-resize', {
    schema: {
    },
    init: function () {
        window.onresize = function () {
            if (document.querySelector('a-scene') &&
                document.querySelector('a-scene').systems !== undefined &&
                document.querySelector('a-scene').systems['mindar-image-system']) {

                document.querySelector('a-scene').systems['mindar-image-system'].pause()
                document.querySelector('video').remove();
                Array.from(document.querySelectorAll('[mindar-image-target]')).forEach((element, index) => {
                    element.components['mindar-image-target'].updateWorldMatrix(null,)
                });
                document.querySelector('a-scene').systems['mindar-image-system']._startVideo()
            }

        }
    }
});