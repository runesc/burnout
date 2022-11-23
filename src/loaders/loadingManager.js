import { LoadingManager } from 'three'

const percentageSpan = document.querySelector('.percentage-span')
const progressBar = document.querySelector('.progress-bar')
const cover = document.querySelector('.cover')

let contador = 0

const globalLoader = () => {
  const loadingManager = new LoadingManager(
    // Loaded
    () => {}
    ,

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      // Calculate the progress and update the loadingBarElement
      let progressRatio = itemsLoaded / itemsTotal
      progressRatio = parseInt(progressRatio * 100, 10)

      //! Eliminar esta linea en el futuro

      // Preloader
      progressBar.style.width = `${progressRatio}%`
      if (itemUrl.endsWith('.glb') || itemUrl.startsWith('blob:')) {
        percentageSpan.innerHTML = `Cargando escena... (${progressRatio}%)`
      } else {
        percentageSpan.innerHTML = `Aplicando texturas... (${progressRatio}%)`
      }
    }
  )
  return loadingManager
}

export { globalLoader }