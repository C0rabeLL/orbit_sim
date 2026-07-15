import * as THREE from 'three'
import { createScene } from './src/scene.js'
import Body from './src/body.js'
import { applyPhysics } from './src/physics.js'
import { createUI, updateUI } from './src/ui.js'
import { PRESETS } from './src/presets.js'

const { scene, camera, renderer, controls } = createScene()

const bodies = []
const G = 1
let dt = 0.02

function loadPreset(name) {
  for (const body of bodies) scene.remove(body.mesh)
  bodies.length = 0

  for (const d of PRESETS[name]) {
    const body = new Body(d.mass, new THREE.Vector3(...d.pos), d.color)
    body.velocity = new THREE.Vector3(...d.v)
    bodies.push(body)
    scene.add(body.mesh)
  }
}

const PARAMS = {
    pause: false,
    speed: 1,
    presets: 'Sun-Planet-Moon',
}

function reset() {
  loadPreset(PARAMS.presets)
}

const { pane, controlF, bodyF } = createUI(PARAMS, reset, loadPreset)
loadPreset(PARAMS.presets)
// render loop
function animate() {
  requestAnimationFrame(animate) //call animate again next frame
  if(!PARAMS.pause) {
    const steps = Math.floor(PARAMS.speed)
    const frac = PARAMS.speed - steps
    for (let i = 0; i < steps; i++){ applyPhysics(bodies, G, dt, scene)}
    applyPhysics(bodies, G, dt * frac, scene)
  }
  controls.update()
  pane.refresh() 
  renderer.render(scene, camera)
}

animate()

//clicking
const raycaster = new THREE.Raycaster()
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const point = new THREE.Vector3()
let selected = null

renderer.domElement.addEventListener('click', (event) => {
  const rect = renderer.domElement.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  //console.log(x.toFixed(2), y.toFixed(2))

  const mouse = new THREE.Vector2(x, y)
  raycaster.setFromCamera(mouse, camera)

  const meshes = bodies.map(b => b.mesh)
  const hits = raycaster.intersectObjects(meshes)
  //console.log(hits.length)

  if (hits.length > 0) {
    const hitMesh = hits[0].object
    const body = bodies.find(b => b.mesh === hitMesh)
    selected = body
    updateUI(body, bodyF)
  }
  else{
    raycaster.ray.intersectPlane(plane, point)
    const body = new Body(50, point.clone(), 0xffffff)
    bodies.push(body)
    scene.add(body.mesh)
  }
})



