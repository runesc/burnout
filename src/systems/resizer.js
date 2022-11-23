const setSize = (camera, renderer, effectComposer) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    effectComposer.setSize(window.innerWidth, window.innerHeight)
    // set pixel ratio  for retina display
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

class Resizer {

    /*
        Set camera aspect, renderer and effet composer size and finally set render pixel ratio
        when window size change re-set size
    */

    constructor(camera, renderer, effectComposer) {
        setSize(camera, renderer, effectComposer)

        window.addEventListener('resize', () => {
            setSize(camera, renderer, effectComposer)
        })
    }
}

export { Resizer }