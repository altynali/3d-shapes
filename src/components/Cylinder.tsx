import React, { FC, useEffect, useRef } from "react"
import * as THREE from "three"
import { ShapeProps, camera } from "../App"

const Cylinder: FC<ShapeProps> = ({ size }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const renderer = new THREE.WebGLRenderer()

    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, size, 32)
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: "blue",
      wireframe: true,
    })
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)

    scene.add(cylinderMesh)


    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    const animate = () => {
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

export default Cylinder
