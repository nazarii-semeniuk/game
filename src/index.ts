import { Scene, WebGLRenderer, Color } from 'three';
import Player from './ts/Player';
import Terrain from './ts/Terrain';

const scene = new Scene();
scene.background = new Color('skyblue');

const terrain = new Terrain(scene);
terrain.create();

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const player = new Player(scene, renderer);

const animate = () => {

    player.update();

    renderer.render(scene, player.camera);

    requestAnimationFrame(animate);
}

animate();