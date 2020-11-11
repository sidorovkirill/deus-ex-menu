import * as THREE from 'three';
import {scene, camera, cameraControls} from './scene';
import renderer from './renderer';
import {light, ambientLight} from './light';
import {createField, createVertices, animate} from "./field";
import {calcDistance} from "./utils";

const verticesLength = 15000;
const width = 16000;
const height = 16000;
const deep = 70;

const mouse = { x : 0, y : 0 };
let buttonIsPushed = false;
let actualVerticle = null;

scene.add(light);
//scene.add(ambientLight);

const vertices = createVertices(width, height, deep, verticesLength);

const field = createField(vertices, width, height);
scene.add(field);

// const pivot = createPivotSphere();
// scene.add(pivot);
//
// renderer.domElement.addEventListener( 'mousemove', raycast, false );
// renderer.domElement.addEventListener( 'mousedown', () => changeButtonStatus(true), false );
// renderer.domElement.addEventListener( 'mouseup', () => changeButtonStatus(false), false );


//renderer.render(scene, camera);

animate(vertices, field);
