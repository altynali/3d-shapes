import React, { useEffect, useRef } from "react"
import * as THREE from "three"

function RotatingShapes(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  const getRandomInt = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }
  useEffect(() => {
    const size = getRandomInt(2, 5)

    let animationFrameId: number
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()

    const cubeGeometry = new THREE.BoxGeometry(size)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: "red",
      wireframe: true,
    })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

    const sphereGeometry = new THREE.SphereGeometry(size, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: "green",
      wireframe: true,
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.x = 8

    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, size, 32)
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: "blue",
      wireframe: true,
    })
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    cylinderMesh.position.x = -8

    scene.add(cubeMesh)
    scene.add(sphereMesh)
    scene.add(cylinderMesh)

    camera.position.z = 10

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    const animate = () => {
      cubeMesh.rotation.x += 0.02
      cubeMesh.rotation.y += 0.02
      sphereMesh.rotation.x += 0.001
      sphereMesh.rotation.y += 0.001
      cylinderMesh.rotation.x += 0.05
      cylinderMesh.rotation.y += 0.05

      renderer.render(scene, camera)

      if (containerRef?.current) {
        const rect = containerRef?.current?.getBoundingClientRect()

        renderer.setSize(rect.width, window.innerHeight)
      }

      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} />
}

export default RotatingShapes
