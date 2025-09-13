import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbit controls to spin model around
const controls = new OrbitControls(camera, renderer.domElement);

//add light to see model
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
hemiLight.position.set(0, 20, 1000);
scene.add(hemiLight);

//load model from media directory
const loader = new GLTFLoader();
loader.load( 'media/models/skull.glb', function(gltf) {
    console.log('GLTF Loaded: ', gltf);
    scene.add(gltf.scene);
}, undefined, function ( error ) {
    console.error( error );
});

//render loop
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate()