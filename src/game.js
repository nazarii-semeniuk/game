import { PerspectiveCamera, Scene, WebGLRenderer, Color, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Terrain } from './js/Terrain.js';

// Debug
import { GUI } from 'dat.gui';
const gui = new GUI();

const scene = new Scene();
scene.background = new Color('skyblue');

const TerrainCreator = new Terrain(scene);
scene.add(TerrainCreator.createTerrain());

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.y = 5;
camera.position.z = 0;
camera.position.x = -13;
camera.lookAt(0 ,0 ,0);

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.enablePan = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 20;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.minPolarAngle = Math.PI / 4;
orbitControls.update();

const geometry = new BoxGeometry(1, 2, 1);
const material = new MeshBasicMaterial( { color: new Color('orange') } );
const cube = new Mesh(geometry, material);
scene.add(cube);






const animate = () => {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();