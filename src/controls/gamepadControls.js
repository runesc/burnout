import gameControl from '@/systems/gamepad/gamecontrol'
import { Vector3 } from 'three'


const createControls = (car, camera, helper) => {



    gameControl.on('connect', (gamepad) => {
        console.log('A new gamepad was connected!')
      })
    
    gameControl.on('disconnect', (gamepad) => {
        console.log('A gamepad was disconnect!')
    })


    gameControl
    .on('connect', function(gp) {
      var counter = 0
      for (let x = 0; x < Math.min(17, gp.buttons); x++) {
        gp.on('button' + x, function() {
            console.log(x)
            if(x === 7){
                car.position.y += 1
            }
            if(x === 6){
                car.position.y -= 1
            }
        });
      }
      for (let x = 0; x < Math.min(2, gp.axes); x++) {
        const directions = ['up', 'down', 'right', 'left'];
        for (let d = 0; d < directions.length; d++) {
          gp.on(directions[d] + x, function() {

            if(directions[d] === "right" && x === 1){
                car.rotation.y -= 0.1
            }
            if(directions[d] === "left" && x === 1){
                car.rotation.y += 0.1
            }
            if(directions[d] === "up" && x === 1 && car.rotation.x <= 1){
                car.rotation.x += 0.01
            }
            if(directions[d] === "down" && x === 1 && car.rotation.x >= -2){
                car.rotation.x -= 0.01
            }

            /*Right joystick */
            if(directions[d] === "right" && x === 0){
                const oldObjectPosition = new Vector3();
                car.getWorldPosition(oldObjectPosition);
                car.position.x += 5

                const newObjectPosition = new Vector3();
                car.getWorldPosition(newObjectPosition);

                const delta = newObjectPosition.clone().sub(oldObjectPosition);

                camera.position.add(delta);
            }
            if(directions[d] === "left" && x === 0){
                const oldObjectPosition = new Vector3();
                car.getWorldPosition(oldObjectPosition);
                car.position.x -= 5

                const newObjectPosition = new Vector3();
                car.getWorldPosition(newObjectPosition);

                const delta = newObjectPosition.clone().sub(oldObjectPosition);

                camera.position.add(delta);
            }

            if(directions[d] === "up" && x === 0){
                const oldObjectPosition = new Vector3();
                car.getWorldPosition(oldObjectPosition);
                car.position.z += 5

                const newObjectPosition = new Vector3();
                car.getWorldPosition(newObjectPosition);

                const delta = newObjectPosition.clone().sub(oldObjectPosition);

                camera.position.add(delta);

            }
            if(directions[d] === "down" && x === 0){
                const oldObjectPosition = new Vector3();
                car.getWorldPosition(oldObjectPosition);
                car.position.z -= 5

                const newObjectPosition = new Vector3();
                car.getWorldPosition(newObjectPosition);

                const delta = newObjectPosition.clone().sub(oldObjectPosition);

                camera.position.add(delta);
            }
          });
        }
      }
    })
}

export { createControls }
