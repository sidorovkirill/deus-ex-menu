import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import renderer from "./renderer";

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(-600, 550, 1300);
camera.lookAt(0, 0, 0);

const cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.addEventListener('change', () => {
    renderer.render(scene, camera)
});

export {scene, camera, cameraControls};