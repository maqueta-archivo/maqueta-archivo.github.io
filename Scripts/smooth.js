AFRAME.registerComponent("smooth", {
    init: function () {
        this.target = this.el;
        this.prevPosition = new THREE.Vector3();
        this.prevRotation = new THREE.Quaternion();
        this.prevScale = new THREE.Vector3();
    },
    tick: function () {
        // if marker is visible
        if (this.el.object3D.visible) {
            // also make the object-to-smooth visible
            this.target.setAttribute('visible', 'true')
            // if we know about the previous position
            if (this.prevPosition !== undefined) {
                // smooth position
                let newWorldPosition = new THREE.Vector3();
                this.el.object3D.getWorldPosition(newWorldPosition);
                newWorldPosition.lerp(this.prevPosition, 0.1);
                this.el.object3D.worldToLocal(newWorldPosition);
                this.el.object3D.position.copy(newWorldPosition);

                // smooth rotation
                let newWorldRotation = new THREE.Quaternion();
                this.el.object3D.getWorldQuaternion(newWorldRotation);
                newWorldRotation.slerp(this.prevRotation, 0.1);
                let newWorldRotationEuler = new THREE.Euler().setFromQuaternion(newWorldRotation);
                let parentWolrdRotation = new THREE.Quaternion();
                this.el.object3D.parent.getWorldQuaternion(parentWolrdRotation);
                let parentWolrdRotationEuler = new THREE.Euler().setFromQuaternion(parentWolrdRotation);

                let newLocalEuler = new THREE.Euler();
                newLocalEuler.x = newWorldRotationEuler.x * -parentWolrdRotationEuler.x;
                newLocalEuler.y = newWorldRotationEuler.y * -parentWolrdRotationEuler.y;
                newLocalEuler.z = newWorldRotationEuler.z * -parentWolrdRotationEuler.z;
                newLocalEuler.order = newWorldRotationEuler.order;
                this.el.object3D.rotation.copy(newLocalEuler)
            }
            // cache position for next tick
            this.el.object3D.getWorldPosition(this.prevPosition);
            this.el.object3D.getWorldQuaternion(this.prevRotation);
            this.el.object3D.getWorldScale(this.prevScale);
        }
        // marker is not visible
        else {
            // also make the object-to-smooth invisible
            this.target.setAttribute('visible', 'false')
            // reset the cache position
            this.prevPosition = new THREE.Vector3();
            this.prevRotation = new THREE.Quaternion();
            this.prevScale = new THREE.Vector3();
        }
    }
})