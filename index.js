/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A Line component for A-Frame.
 */
AFRAME.registerComponent('aline', {
    schema: {
        color: {
            default: '#333'
        },

        path: {
            default: [
                {
                    x: -0.5,
                    y: 0,
                    z: 0
                }, {
                    x: 0.5,
                    y: 0,
                    z: 0
                }
            ],

            // Deserialize path in the form of comma-separated vec3s: `0 0 0, 1 1 1, 2 0 3`.
            parse: function(value) {
                return value.split(',').map(AFRAME.utils.coordinates.parse);
            },

            // Serialize array of vec3s in case someone does
            // setAttribute('line', 'path', [...]).
            stringify: function(data) {
                return data.map(AFRAME.utils.coordinates.stringify).join(',');
            }
        }
    },

    /**
   * Set if component needs multiple instancing.
   */
    multiple: true,

    /**
   * Called once when component is attached. Generally for initial setup.
   */
    init: function() {},

    /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
    update: function(oldData) {

        // Set color with material.
        var material = new THREE.LineBasicMaterial({color: this.data.color});

        // Add vertices to geometry.
        var geometry = new THREE.Geometry();
        this.data.path.forEach(function(vec3) {
            geometry.vertices.push(new THREE.Vector3(vec3.x, vec3.y, vec3.z));
        });

        // Apply mesh.
        this.el.setObject3D('mesh', new THREE.Line(geometry, material));
    },

    /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
    remove: function() {
        this.el.removeObject3D('mesh');
    },

    /**
   * Called on each scene tick.
   */
    // tick: function (t) { },

    /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
    pause: function() {},

    /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
    play: function() {}
});
