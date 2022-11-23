import { WebGLRenderer, sRGBEncoding } from 'three'

const createRenderer = (canvas) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
    powerPreference: 'high-performance',
  })


  // setup native renderer
  renderer.shadowMap.enabled = true
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = sRGBEncoding
  renderer.colorManagement = true
  renderer.gammaOutput = true
  renderer.gammaFactor = 1

  return renderer
}

export { createRenderer }