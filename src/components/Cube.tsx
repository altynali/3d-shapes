import React, { FC, useEffect, useRef } from "react"
import * as THREE from "three"
import { ShapeProps, camera } from "../App"

const Cube: FC<ShapeProps> = ({ size }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const renderer = new THREE.WebGLRenderer()

    const cubeGeometry = new THREE.BoxGeometry(size)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: "red",
      wireframe: true,
    })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cubeMesh)

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    const animate = () => {
      cubeMesh.rotation.x += 0.02
      cubeMesh.rotation.y += 0.02

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

export default Cube
