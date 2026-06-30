import * as THREE from 'three'

export default class Body {
    constructor(mass, position, color) {
        this.mass = mass
        this.position = position
        this.velocity = new THREE.Vector3(0, 0, 0)

        const geometry = new THREE.SphereGeometry(Math.cbrt(mass), 32, 32)
        const material = new THREE.MeshBasicMaterial({ color })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.copy(this.position)
    }

    updateMesh() {
        this.mesh.position.copy(this.position)
    }
}