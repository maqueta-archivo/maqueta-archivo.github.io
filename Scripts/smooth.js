AFRAME.registerComponent("smooth", {
    init: function () {
        this.target = this.el;
        this.prevPosition = null;
        this.prevRotation = null;
      },
      tick: function() {
        // if marker is visible
        if (this.el.object3D.visible) {
          // also make the object-to-smooth visible
          this.target.setAttribute('visible', 'true')
          // if we know about the previous position
          if(this.prevPosition) {
            // smooth position
            this.target.object3D.position.lerp(this.prevPosition, 0.1)
    
            // smooth rotation
            let rot = this.target.object3D.rotation.toVector3().lerp(this.prevRotation, 0.1)
            this.target.object3D.rotation.setFromVector3(rot)
          } 
          // we don't know about the previous position
          else { 
            // initial values to start with
            var initialPosition = this.el.getAttribute('position')
            var initialRotation = this.el.getAttribute('rotation')
            // TODO This does not take into account the initial `position` and `rotation` values of the target, so everything starts at the marker with 0 0 0
            this.target.setAttribute('position', initialPosition)
            this.target.setAttribute('rotation', initialRotation)
          }
          // cache position for next tick
          this.prevPosition = this.el.object3D.position
          this.prevRotation = this.el.object3D.rotation
        } 
        // marker is not visible
        else { 
          // also make the object-to-smooth invisible
          this.target.setAttribute('visible', 'false')
          // reset the cache position
          this.prevPosition = null;
          this.prevRotation = null;
        }
      }
    })