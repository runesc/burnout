import { BoxGeometry, MeshNormalMaterial, Mesh, CylinderGeometry, TextureLoader, MeshBasicMaterial } from 'three'
import { createControls } from '@/controls/gamepad'
import * as CANNON from 'cannon-es'
import wheel from '@/textures/wheels/wheel.png'

const createVehicle = (world, scene, camera) => {
    // get texture

    const carBody = new CANNON.Body({
        mass: 5,
        position: new CANNON.Vec3(0, 6, 0),
        shape: new CANNON.Box(new CANNON.Vec3(4, 0.5, 2)),
    });

    const vehicle = new CANNON.RigidVehicle({
        chassisBody: carBody,
    });

    const mass = 8;
    const axisWidth = 5;
    const radiusTop = 0.5
    const radiusBottom = 0.5
    const height = 2
    const numSegments = 12
    const wheelMaterial = new CANNON.Material('wheel');
    const down = new CANNON.Vec3(0, -1, 0);

    var options = {
        radius: 1,
        directionLocal: new CANNON.Vec3(0, 0, -1),
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 5,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: new CANNON.Vec3(0, 1, 0),
        chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true
    };
    const wheelShape = new CANNON.Cylinder(options.radius, options.radius, options.radius / 2, 20);
    const q = new CANNON.Quaternion();

    const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
    q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
    wheelBody1.addShape(wheelShape, new CANNON.Vec3(), q);
    wheelBody1.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody1,
        position: new CANNON.Vec3(-2, -1, axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody2.addShape(wheelShape, new CANNON.Vec3(), q);
    wheelBody2.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody2,
        position: new CANNON.Vec3(-2, -1, -axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody3.addShape(wheelShape, new CANNON.Vec3(), q);
    wheelBody3.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody3,
        position: new CANNON.Vec3(2, -1, axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody4.addShape(wheelShape, new CANNON.Vec3(), q);
    wheelBody4.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody4,
        position: new CANNON.Vec3(2, -1, -axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    vehicle.addToWorld(world)

    const controls = createControls(vehicle)

    document.addEventListener('keydown', (event) => {
        const maxSteerVal = Math.PI / 8;
        const maxForce = 150;

        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                vehicle.setWheelForce(maxForce, 0);
                vehicle.setWheelForce(maxForce, 1);
                break;

            case 's':
            case 'ArrowDown':
                vehicle.setWheelForce(-maxForce / 2, 0);
                vehicle.setWheelForce(-maxForce / 2, 1);
                break;

            case 'a':
            case 'ArrowLeft':
                vehicle.setSteeringValue(maxSteerVal, 0);
                vehicle.setSteeringValue(maxSteerVal, 1);
                break;

            case 'd':
            case 'ArrowRight':
                vehicle.setSteeringValue(-maxSteerVal, 0);
                vehicle.setSteeringValue(-maxSteerVal, 1);
                break;
        }
    });

    // reset car force to zero when key is released
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                vehicle.setWheelForce(0, 0);
                vehicle.setWheelForce(0, 1);
                break;

            case 's':
            case 'ArrowDown':
                vehicle.setWheelForce(0, 0);
                vehicle.setWheelForce(0, 1);
                break;

            case 'a':
            case 'ArrowLeft':
                vehicle.setSteeringValue(0, 0);
                vehicle.setSteeringValue(0, 1);
                break;

            case 'd':
            case 'ArrowRight':
                vehicle.setSteeringValue(0, 0);
                vehicle.setSteeringValue(0, 1);
                break;
        }
    });

    const boxGeometry = new BoxGeometry(8, 1, 4);
    const boxMaterial = new MeshNormalMaterial();
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const texture = new TextureLoader().load(wheel);

    const wheelGeometry = new CylinderGeometry(options.radius, options.radius, options.radius / 2, 20);
    const sphereMaterial = new MeshBasicMaterial({
        map: texture
    });


    const sphereMesh1 = new Mesh(wheelGeometry, sphereMaterial);
    const sphereMesh2 = new Mesh(wheelGeometry, sphereMaterial);
    const sphereMesh3 = new Mesh(wheelGeometry, sphereMaterial);
    const sphereMesh4 = new Mesh(wheelGeometry, sphereMaterial);
    

    console.log(sphereMesh1)


    scene.add(sphereMesh1, sphereMesh2, sphereMesh3, sphereMesh4);



    boxGeometry.tick = (delta) => {

        boxMesh.position.copy(carBody.position);
        boxMesh.quaternion.copy(carBody.quaternion);
        sphereMesh1.position.copy(wheelBody1.position);
        sphereMesh2.position.copy(wheelBody2.position);
        sphereMesh3.position.copy(wheelBody3.position);
        sphereMesh4.position.copy(wheelBody4.position);

        sphereMesh1.rotation.x = Math.PI/2
        sphereMesh1.rotation.z = wheelBody1.quaternion.x

        //sphereMesh1.rotation.z = wheelBody1.quaternion.z
        




        sphereMesh2.rotation.x =Math.PI/2
        sphereMesh3.rotation.x =Math.PI/2
        sphereMesh4.rotation.x =Math.PI/2

        


    }
    return boxGeometry
}

export { createVehicle }