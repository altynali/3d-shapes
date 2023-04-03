import React, { FC, useEffect, useRef } from "react"
import * as THREE from "three"
import { ShapeProps, camera } from "../App"

const Sphere: FC<ShapeProps> = ({ size }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const renderer = new THREE.WebGLRenderer()

    const sphereGeometry = new THREE.SphereGeometry(size, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: "green",
      wireframe: true,
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

    scene.add(sphereMesh)

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    const animate = () => {
      sphereMesh.rotation.x += 0.001
      sphereMesh.rotation.y += 0.001

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

export default Sphere
