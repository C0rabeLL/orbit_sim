import * as THREE from 'three'

export function applyPhysics(bodies, G, dt, scene) {
    //update accelerations
    for (const A of bodies) {
        A.acceleration.set(0, 0, 0)
        for (const B of bodies) {
            if (A === B) continue

            //A to B
            const r = B.position.clone().sub(A.position.clone())
            const distance = r.length()
            const a_A = G * B.mass / (distance * distance)
            A.acceleration.addScaledVector(r.normalize(), a_A)
        }
    }
    //integration
    for (const body of bodies) {
        body.velocity.addScaledVector(body.acceleration, dt)
        body.position.addScaledVector(body.velocity, dt)
        body.updateMesh()
    }
    //swallow A
    for (let i = bodies.length - 1; i >= 0; i--) {
    const A = bodies[i]
    for (const B of bodies) {
        if (A === B) continue
        if (B.mass > A.mass * 100 &&
            A.position.distanceTo(B.position) < 0.6 * Math.cbrt(B.mass)) {
            B.mass += A.mass
            scene.remove(A.mesh)
            scene.remove(A.trailLine)
            bodies.splice(i, 1)
            showMessage('A body got swallowed')
            break
        }
    }
}
}

function showMessage(text) {
    const el = document.createElement('div')
    el.textContent = text
    el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);color:white;font-family:sans-serif;background:rgba(0,0,0,0.6);padding:8px 16px;border-radius:8px;'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2000)
}