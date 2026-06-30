import * as THREE from 'three'

export function applyGravity(planet, sun, G, dt) {
    //distance and direction(planet to sun)
    const r = sun.position.clone().sub(planet.position.clone())
    const distance = r.length()
    const direction = r.clone().normalize()

    //acceleration
    const a = G * sun.mass / (distance * distance)
    const a_v = direction.multiplyScalar(a)

    //update planet attributes
    planet.velocity.add(a_v.clone().multiplyScalar(dt))
    planet.position.add(planet.velocity.clone().multiplyScalar(dt))

    planet.updateMesh()
}