import * as THREE from 'three'
import { createScene } from './src/scene.js'
import Body from './src/body.js'

const { scene, camera, renderer, controls } = createScene()

//sun and planet
const sun  = new Body(1000, new THREE.Vector3(0, 0, 0), 0xffaa00)
const planet = new Body(10, new THREE.Vector3(30, 0, 0), 0x3399ff)

scene.add(sun.mesh)
scene.add(planet.mesh)

// render loop
function animate(){
  requestAnimationFrame(animate) //call animate again next frame
  controls.update()
  renderer.render(scene, camera)
}
animate()


