import * as THREE from "three";
import {scene} from "./scene";

const effectController = {
    ka: 0.17,
    hue: 0.121,
    saturation: 0.73,
    lightness: 0.66,

    lhue: 0.4,
    lsaturation: 0.5,
    llightness: 1.0,

    lx: 0,
    ly: 1000,
    lz: 0,
};

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
ambientLight.color.setHSL(effectController.hue, effectController.saturation, effectController.lightness * effectController.ka);
// scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light.position.set(effectController.lx, effectController.ly, effectController.lz);
light.color.setHSL(effectController.lhue, effectController.lsaturation, effectController.llightness);
//scene.add(light);

export {light, ambientLight};