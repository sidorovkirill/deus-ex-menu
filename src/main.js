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

scene.background = new THREE.CubeTextureLoader()
    .setPath( 'textures/' )
    .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );

const vertices = createVertices(width, height, deep, verticesLength);

const field = createField(vertices, width, height);
scene.add(field);


const bulbGeometry = new THREE.SphereBufferGeometry( 10, 16, 8 );
const bulbLight = new THREE.PointLight( 0xe98300, 2, 2000, 2 );

const bulbMat = new THREE.MeshStandardMaterial( {
    emissive: 0xe98300,
    emissiveIntensity: 1,
    color: 0x000000
} );
bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
bulbLight.position.set( 0, 1000, 0 );
bulbLight.castShadow = true;
scene.add( bulbLight );


const hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
scene.add( hemiLight );



// const pivot = createPivotSphere();
// scene.add(pivot);
//
// renderer.domElement.addEventListener( 'mousemove', raycast, false );
// renderer.domElement.addEventListener( 'mousedown', () => changeButtonStatus(true), false );
// renderer.domElement.addEventListener( 'mouseup', () => changeButtonStatus(false), false );


//renderer.render(scene, camera);

animate(vertices, field);
