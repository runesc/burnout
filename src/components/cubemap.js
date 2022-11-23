import { CubeTextureLoader, sRGBEncoding } from 'three'
import { globalLoader } from '@/loaders/loadingManager'

// Import env textures
import px from '@/textures/envmap/px.png'
import nx from '@/textures/envmap/nx.png'
import py from '@/textures/envmap/py.png'
import ny from '@/textures/envmap/ny.png'
import pz from '@/textures/envmap/pz.png'
import nz from '@/textures/envmap/nz.png'

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