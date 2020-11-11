import * as THREE from "three";
import Delaunay from "delaunay-fast";
import renderer from "./renderer";
import {camera, scene} from "./scene";

let count = 0;
const waveLength = 100;
const waveSpeed = 0.3;
const waveHeight = 50;

export const createVertices = (width, height, deep, verticesLength) => {
    const vertices = [];
    let x, y, z;

    for (let i = 0; i < verticesLength; i++) {
        x = Math.random() * width;
        z = Math.random() * height;
        y = Math.random() * deep;

        vertices.push([Math.ceil(x), Math.ceil(y), Math.ceil(z)]);
    }

    return vertices;
};

export const createField  = (vertices, width, height) => {
    const flatVertices = vertices.map(([x, y, z]) => [x, z]);

    const geometry = new THREE.Geometry();
    vertices.forEach(([x, y, z]) => geometry.vertices.push(new THREE.Vector3(x, y, z)));

    console.time("triangulate");
    let triangles = Delaunay.triangulate(flatVertices);
    console.timeEnd("triangulate");

    for (let i = 0; i < triangles.length; i += 3) {
        geometry.faces.push(new THREE.Face3(triangles[i], triangles[i+1], triangles[i+2]));
    }

    geometry.computeFaceNormals();

    geometry.translate(- width / 2, 0, - height / 2);


    //const material = new THREE.MeshPhongMaterial( { color: 0xffffff} );

    // const material = new THREE.MeshLambertMaterial( {
    //     color: 0xffffff,
    //     vertexColors: THREE.FaceColors,
    //     shininess: 150
    // });

    // var uniforms = {};
    // uniforms.resolution = {type:'v2',value:new THREE.Vector2(window.innerWidth,window.innerHeight)};
    // uniforms.time = {type:'f',value: new Date().getTime()};
    //var material = new THREE.ShaderMaterial({uniforms:uniforms,fragmentShader: shaderCode});

    //const material = new THREE.MeshPhongMaterial( { color: 0xffffff} );
    // const material = new THREE.MeshLambertMaterial( {
    //     color: 0xffffff,
    //     vertexColors: THREE.FaceColors,
    // });
    const material = new THREE.MeshStandardMaterial({color: 0xe98300, metalness: 5.0, roughness: 0.5, name: 'red'});

    const field = new THREE.Mesh( geometry, material);
    field.name = 'field';
    return field;
};

export const animate = (vertices, field) => {
    requestAnimationFrame(() => animate(vertices, field));
    render(vertices, field);
};

const render = (vertices, field) => {
    vertices.forEach((vertice, i) => {
        const {x, y, z} = field.geometry.vertices[i];
        console.log();
        field.geometry.vertices[i].y = (Math.sin((x / waveLength + count) * waveSpeed) * waveHeight) + (Math.sin((z / waveLength + count) * waveSpeed) * waveHeight) + vertice[1];
    });
    field.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
    count += 0.1;
};

