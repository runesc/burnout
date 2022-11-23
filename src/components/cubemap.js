import { CubeTextureLoader, sRGBEncoding } from 'three'
import { globalLoader } from '@/loaders/loadingManager'

// Import env textures
import px from '@/textures/envmap/px.jpg'
import nx from '@/textures/envmap/nx.jpg'
import py from '@/textures/envmap/py.jpg'
import ny from '@/textures/envmap/ny.jpg'
import pz from '@/textures/envmap/pz.jpg'
import nz from '@/textures/envmap/nz.jpg'

const createCubeEnvMap = async () => {
  const gLoader = globalLoader()
  const cubeTextureLoader = new CubeTextureLoader(gLoader)
  const environmentMap = await cubeTextureLoader.loadAsync([
    px,
    nx,
    py,
    ny,
    pz,
    nz,
  ])
  environmentMap.encoding = sRGBEncoding
  environmentMap.needsUpdate = true
  return environmentMap
}

export { createCubeEnvMap }