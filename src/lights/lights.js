import { DirectionalLight, AmbientLight } from 'three'

const createLights = () => {
    const ambientLight = new AmbientLight(
      'white', // bright sky color
      '#9b7653', // dim ground color
      0.53 // intensity
    )

    const sunLight = new DirectionalLight('white', 3.88)
    sunLight.position.set(0,0,0)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 1024
    sunLight.shadow.mapSize.height = 1024
  
    return { ambientLight, sunLight }
  }
  export { createLights }