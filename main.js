import * as THREE from 'three'
import { createScene } from './src/scene.js'
import Body from './src/body.js'
import { applyGravity } from './src/physics.js'

const { scene, camera, renderer, controls } = createScene()

const G = 1
const dt = 0.02

//sun and planet
const sun  = new Body(1000, new THREE.Vector3(0, 0, 0), 0xffaa00)
const planet = new Body(10, new THREE.Vector3(30, 0, 0), 0x3399ff)
planet.velocity = new THREE.Vector3(0, 7, 0)

scene.add(sun.mesh)
scene.add(planet.mesh)

// render loop
function animate(){
  requestAnimationFrame(animate) //call animate again next frame
  applyGravity(planet, sun, G, dt)
  controls.update()
  renderer.render(scene, camera)
}
animate()


