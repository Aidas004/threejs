import React, { useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import './App.css'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
function App() {
  
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd)
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(0,25,25)
    const canvas = document.getElementById('threeJs')
    const renderer = new THREE.WebGL1Renderer({canvas, antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    const hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 1 );
    scene.add(hemiLight);
    renderer.toneMapping = THREE.ReinhardToneMapping
      renderer.toneMappingExposure = 2.3
    const spotLight = new THREE.SpotLight(0xffa95c, 4 );
    spotLight.castShadow = true
    spotLight.position.set( 100, 1000, 100 );
    scene.add(spotLight)
    new GLTFLoader().load('/scene.gltf', result => {
      const model = result.scene

      // gltfScene.scene.rotation.y = Math.PI / 8
      // gltfScene.scene.position.y = 3
      // gltfScene.scene.scale.set(18, 18, 18)
      scene.add(model)
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    const stats = Stats()
    document.body.appendChild(stats.dom)


    const animate = () => {
      stats.update()
      controls.update()
      renderer.render(scene, camera)
      spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
      )
      window.requestAnimationFrame(animate)
    }
    animate()

  }, [])

  return (
      <canvas id='threeJs'/>
  )
}

export default App
