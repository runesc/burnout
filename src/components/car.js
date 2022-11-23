import { BoxGeometry, SphereGeometry, MeshNormalMaterial, Mesh, Vector3 } from 'three'
import * as CANNON from 'cannon-es'


const createVehicle = (world, scene, camera) => {
    // get texture

    const carBody = new CANNON.Body({
        mass: 5,
        position: new CANNON.Vec3(0, 6, 0),
        shape: new CANNON.Box(new CANNON.Vec3(40, 0.5, 20)),
    });

    const vehicle = new CANNON.RigidVehicle({
        chassisBody: carBody,
    });

    const mass = 1;
    const axisWidth = 40;
    const wheelShape = new CANNON.Sphere(1);
    const wheelMaterial = new CANNON.Material('wheel');
    const down = new CANNON.Vec3(0, -1, 0);

    const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody1.addShape(wheelShape);
    wheelBody1.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody1,
        position: new CANNON.Vec3(-38, 0, axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody2.addShape(wheelShape);
    wheelBody2.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody2,
        position: new CANNON.Vec3(-38, 0, -axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody3.addShape(wheelShape);
    wheelBody3.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody3,
        position: new CANNON.Vec3(38, 0, axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody4.addShape(wheelShape);
    wheelBody4.angularDamping = 0.4;
    vehicle.addWheel({
        body: wheelBody4,
        position: new CANNON.Vec3(38, 0, -axisWidth / 2),
        axis: new CANNON.Vec3(0, 0, 1),
        direction: down,
    });

    vehicle.addToWorld(world)

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

    const boxGeometry = new BoxGeometry(80, 1, 40);
    const boxMaterial = new MeshNormalMaterial();
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const sphereGeometry1 = new SphereGeometry(1);
    const sphereMaterial1 = new MeshNormalMaterial();
    const sphereMesh1 = new Mesh(sphereGeometry1, sphereMaterial1);
    scene.add(sphereMesh1);

    const sphereGeometry2 = new SphereGeometry(1);
    const sphereMaterial2 = new MeshNormalMaterial();
    const sphereMesh2 = new Mesh(sphereGeometry2, sphereMaterial2);
    scene.add(sphereMesh2);

    const sphereGeometry3 = new SphereGeometry(1);
    const sphereMaterial3 = new MeshNormalMaterial();
    const sphereMesh3 = new Mesh(sphereGeometry3, sphereMaterial3);
    scene.add(sphereMesh3);

    const sphereGeometry4 = new SphereGeometry(1);
    const sphereMaterial4 = new MeshNormalMaterial();
    const sphereMesh4 = new Mesh(sphereGeometry4, sphereMaterial4);
    scene.add(sphereMesh4);

    boxGeometry.tick = (delta) => {
        
        boxMesh.position.copy(carBody.position);
        boxMesh.quaternion.copy(carBody.quaternion);
        sphereMesh1.position.copy(wheelBody1.position);
        sphereMesh1.quaternion.copy(wheelBody1.quaternion);
        sphereMesh2.position.copy(wheelBody2.position);
        sphereMesh2.quaternion.copy(wheelBody2.quaternion);
        sphereMesh3.position.copy(wheelBody3.position);
        sphereMesh3.quaternion.copy(wheelBody3.quaternion);
        sphereMesh4.position.copy(wheelBody4.position);
        sphereMesh4.quaternion.copy(wheelBody4.quaternion);

    }
    return boxGeometry
}

export { createVehicle }