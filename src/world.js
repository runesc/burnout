
import { createGUIController } from '@/controls/guiControls'
import {createOrbitControls } from '@/controls/orbit'
import { createLights } from '@/lights/lights'
import { createScene } from '@/components/scene'
import { createCubeEnvMap } from '@/components/cubemap'
import { createCamera } from '@/components/camera'

import { createRenderer } from '@/systems/renderer'
import { Resizer } from '@/systems/resizer'
import { Loop } from '@/systems/loop'

import { createEffectComposer } from '@/postprocesing/composer'

import { AxesHelper} from 'three'

import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger';

import {createMap} from '@/components/map'
import {createVehicle} from '@/components/car'

let container, scene, renderer, loop, controls, camera

class World {

    // Create an instance of the World app
    constructor(cont) {
        camera = createCamera()
        container = cont
        scene = createScene()
        renderer = createRenderer(container)
    }

    // Load Scene
    async init() {

        const { ambientLight, sunLight } = createLights()
        const envMap = await createCubeEnvMap()
        scene.environment = envMap
        scene.background = envMap

        const axes = new AxesHelper(100)
        scene.add(axes)

        /* World */
        const world = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0),
        });
        const cannonDebugger = new CannonDebugger(scene, world);
        const map = createMap(world, scene)
        const vehicle = createVehicle(world, scene, camera)



        const orbit = createOrbitControls(camera, container)
        const effectComposer = createEffectComposer(renderer, scene, camera)
        const resizer = new Resizer(camera, renderer, effectComposer)
        //! This function only runs on development environment
        if (true) {
            createGUIController({
                ambientLight,
                sunLight,
                camera,
                renderer
            })
            const gui = document.querySelector('.dg')
            gui.style.zIndex = 100

            // start animations
            loop = new Loop(camera, scene, renderer, effectComposer, world, cannonDebugger)
            loop.updatables.push(vehicle)

            // add to scene
            scene.add(ambientLight, ambientLight)
        }
    }

    start() {
        loop.start()
    }

    // Stop the animation loop
    stop() {
        loop.stop()
    }

}

export { World }
