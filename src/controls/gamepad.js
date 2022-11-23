import gameControl from '@/controls/gamepad/gamecontrol'

const createControls = (vehicle) => {

    const maxSteerVal = Math.PI / 8;
    const maxForce = 150;

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
                vehicle.setWheelForce(maxForce, 0);
                vehicle.setWheelForce(maxForce, 1);
            }
            if(x === 6){
                vehicle.setWheelForce(-maxForce / 2, 0);
                vehicle.setWheelForce(-maxForce / 2, 1);
            }
        });
      }
      for (let x = 0; x < Math.min(2, gp.axes); x++) {
        const directions = ['up', 'down', 'right', 'left'];
        for (let d = 0; d < directions.length; d++) {
          gp.on(directions[d] + x, function() {

            /*Right joystick */
            if(directions[d] === "right" && x === 0){
                vehicle.setSteeringValue(-maxSteerVal, 0);
                vehicle.setSteeringValue(-maxSteerVal, 1);
            }
            if(directions[d] === "left" && x === 0){
                vehicle.setSteeringValue(maxSteerVal, 0);
                vehicle.setSteeringValue(maxSteerVal, 1);
            }


          });
        }
      }
    })


}

export { createControls }
