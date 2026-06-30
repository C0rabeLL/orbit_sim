import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function createScene(){
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // camera
    const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // matches the window
    0.1, // near clip
    1000 // far clip
    )
    camera.position.z = 50

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement) // put canvas on page

    //control
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    return { scene, camera, renderer, controls } 
}
