import { PlaneGeometry, MeshBasicMaterial, Mesh, TextureLoader } from 'three'
import * as CANNON from 'cannon-es'

import silverLake from '@/textures/tracks/silverLake.png'


const createMap = (world, scene) => {
    // set physics
    const groundBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        // infinte geometric plane
        shape: new CANNON.Plane(),
    });
    // rotate ground body by 90 degrees
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    /* Set map and textures */
    const texture = new TextureLoader().load(silverLake);

    const mapa = new Mesh(new PlaneGeometry(8000, 8000), new MeshBasicMaterial({
        color: "white",
        map: texture
    }))
    mapa.rotation.x = -Math.PI/2
    scene.add(mapa)

    mapa.tick = (delta) => {

    }
    return mapa
}

export { createMap }