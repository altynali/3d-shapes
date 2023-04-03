import React, { useRef } from "react"
import RotatingShapes from "./components/RotatingShapes"
import Cube from "./components/Cube"
import Sphere from "./components/Sphere"
import Cylinder from "./components/Cylinder"
import * as THREE from "three"

export type ShapeProps = {
  size: number
}

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 10

const App: React.FC = () => {
  const getRandomInt = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const size = getRandomInt(1, 5)

  return (
    <div>
      <h1>Shapes in one canvas</h1>
      <RotatingShapes />

      <h1>Shapes in separate canvases and components</h1>
      <Cube size={size} />
      <Sphere size={size} />
      <Cylinder size={size} />
    </div>
  )
}

export default App
