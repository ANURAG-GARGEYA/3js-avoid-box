import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {Box} from './Box.js'

 

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer= new THREE.WebGL1Renderer();
const controls=new OrbitControls(camera,renderer.domElement);

const velocity=0.01;
renderer.shadowMap.enabled=true;
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


//cube
const Cubematerial =new THREE.MeshLambertMaterial({color:0x00ff00});
const cube= new Box({width:1,height:1,depth:1,color:0x00ff00,velocity:{x:0,y:-0.01,z:0}});
cube.castShadow=true;

//light
const dirLight= new THREE.DirectionalLight(0xffffff,1)
dirLight.castShadow=true;

const planeMaterial =new THREE.MeshLambertMaterial({color:0x0000ff});
const ground=new Box({width:5,height:0.1,depth:10,color:0x0000ff,position:{x:0,y:-2,z:0}});



ground.receiveShadow=true;


ground.position.y=-2;

scene.add(ground);
scene.add(cube);
scene.add(dirLight);

dirLight.position.set(0,3,2);


camera.position.z=5;


controls.target.set(0,0,0);
controls.update();

function animate()
{
    requestAnimationFrame(animate);
    cube.update(ground);
    controls.update();
    console.log(cube.height,ground.height);
    renderer.render(scene,camera);
}

animate();

