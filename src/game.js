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

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial( { color: new Color('orange') } );
const cube = new Mesh(geometry, material);
scene.add(cube);

const keys = {
    w: false,
    s: false,
    a: false,
    d: false 
}

window.addEventListener('keydown', (e) => {
    if ( keys[ e.key ] !== undefined ) {
        keys[ e.key ] = true;
    }
})

window.addEventListener('keyup', (e) => {
    if ( keys[ e.key ] !== undefined ) {
        keys[ e.key ] = false;
    }
})

let speed;
let velocity = 0.0;

const animate = () => {

    speed = 0.0;
    if(keys.w) {
        speed = 0.1;
    } else if(keys.s) {
        speed = -0.1;
    }

    velocity += ( speed - velocity ) * 0.3;

    cube.translateZ(velocity);

    if(keys.a) {
        cube.rotateY(0.05);
    } else if(keys.d) {
        cube.rotateY(-0.05);
    }

    camera.lookAt(cube.position);

    camera.position.y = cube.position.y + 3;
    camera.position.z = cube.position.z + -6;
    camera.position.x = cube.position.x;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();