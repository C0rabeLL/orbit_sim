import * as THREE from 'three'

export default class Body {
    constructor(mass, position, color) {
        this.mass = mass
        this.position = position
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acceleration = new THREE.Vector3(0, 0, 0)

        this.trail = []
        this.maxTrail = 1000
        const trailGeom = new THREE.BufferGeometry()
        trailGeom.setAttribute('position',
            new THREE.BufferAttribute(new Float32Array(this.maxTrail * 3), 3))
        this.trailLine = new THREE.Line(trailGeom, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }))

        const radius = 0.6 * Math.cbrt(mass)

        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshBasicMaterial({ color })
        
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.copy(this.position)
    }

    updateMesh() {
        this.mesh.position.copy(this.position)
    }

    updateTrail() {
        this.trail.push(this.position.clone(this.position))
        if (this.trail.length > this.maxTrail) this.trail.shift()

        const arr = this.trailLine.geometry.attributes.position.array
        for (let i = 0; i < this.trail.length; i++) {
            arr[i*3]     = this.trail[i].x
            arr[i*3 + 1] = this.trail[i].y
            arr[i*3 + 2] = this.trail[i].z
        }
        this.trailLine.geometry.attributes.position.needsUpdate = true
        this.trailLine.geometry.setDrawRange(0, this.trail.length)
    }
}