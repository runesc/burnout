import * as dat from 'dat.gui'
import {
  NoToneMapping,
  LinearToneMapping,
  ReinhardToneMapping,
  ACESFilmicToneMapping,
  LinearEncoding,
  sRGBEncoding,
  RGBEEncoding,
  RGBM7Encoding,
  RGBM16Encoding,
  RGBDEncoding,
  GammaEncoding,
  LogLuvEncoding,
  CineonToneMapping,
} from 'three'

const createGUIController = (e) => {
  const { ambientLight, sunLight, camera, renderer, bloomPass } = e
  const gui = new dat.GUI()

  // Renderer controls
  gui
    .add(renderer, 'toneMapping', {
      No: NoToneMapping,
      Linear: LinearToneMapping,
      Cineon: CineonToneMapping,
      Reinhard: ReinhardToneMapping,
      ACESFilmic: ACESFilmicToneMapping,
    })
    .onFinishChange(() => {
      renderer.toneMapping = Number(renderer.toneMapping)
    })
    .name('toneMapping')
  gui
    .add(renderer, 'outputEncoding', {
      LinearEncoding,
      sRGBEncoding,
      RGBEEncoding,
      RGBM7Encoding,
      RGBM16Encoding,
      RGBDEncoding,
      GammaEncoding,
      LogLuvEncoding,
    })
    .onFinishChange(() => {
      renderer.outputEncoding = Number(renderer.outputEncoding)
    })
    .name('outputEncoding')

  //* Camera controls
  gui.add(camera.position, 'x', -50, 100, 0.01).name('Cam X').listen()
  gui.add(camera.position, 'y', -50, 100, 0.01).name('Cam Y').listen()
  gui.add(camera.position, 'z', -100, 100, 0.01).name('Cam Z').listen()

  gui.add(camera.rotation, 'x', -10, 10, 0.01).name('Cam ROT X').listen()
  gui.add(camera.rotation, 'y', -10, 10, 0.01).name('Cam ROT Y').listen()
  gui.add(camera.rotation, 'z', -10, 10, 0.01).name('Cam ROT Z').listen()

  //* Ambient light controls
  gui.add(ambientLight, 'intensity', 0, 10, 0.01).name('Ambient light').listen()

  //* sun light controls
  gui.add(sunLight, 'intensity', 0, 10, 0.01).name('Sun light').listen()
  gui.add(sunLight.position, 'x', -50, 200, 0.01).name('Sun X').listen()
  gui.add(sunLight.position, 'y', -50, 200, 0.01).name('Sun Y').listen()
  gui.add(sunLight.position, 'z', -50, 200, 0.01).name('Sun Z').listen()

  // Bloom Pass
  /*gui.add(bloomPass, 'enabled')
  gui.add(bloomPass, 'strength').min(0).max(2).step(0.001)
  gui.add(bloomPass, 'radius').min(0).max(2).step(0.001)
  gui.add(bloomPass, 'threshold').min(0).max(1).step(0.001)*/ 
}
export { createGUIController }