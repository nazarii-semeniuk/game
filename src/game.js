import { Scene, WebGLRenderer, Color } from 'three';
import { Player } from './js/Player.js';
import { Terrain } from './js/Terrain.js';

// Debug
import Stats from 'stats.js';

const stats = new Stats();
document.body.appendChild(stats.domElement);

const scene = new Scene();
scene.background = new Color('skyblue');

const terrain = new Terrain(scene);
terrain.createTerrain();

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const player = new Player(scene, renderer);


const animate = () => {
    stats.begin();

    player.update();

    renderer.render(scene, player.camera);

    stats.end();

    requestAnimationFrame(animate);
}

animate();