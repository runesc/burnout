import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const createOrbitControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas)
  return controls
}

export { createOrbitControls }