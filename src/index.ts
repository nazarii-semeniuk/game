import { Scene, WebGLRenderer, Color } from 'three';
import Player from './ts/Player';
import Hero from './ts/Hero';
import Terrain from './ts/Terrain';
import { PlayerInfo } from './ts/types/PlayerInfo'
import WebSockets from './ts/WebSockets';

let id: string;
const playersOnline: Player[] = [];

let scene: Scene;
let renderer: WebGLRenderer;
let terrain: Terrain;

WebSockets.onOpen(() => {

    scene = new Scene();
    scene.background = new Color('skyblue');

    terrain = new Terrain(scene);
    terrain.create();

    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

});

WebSockets.onMessage((data: any) => {

    if (data.type === 'init') {
        id = data.id;
        data.players.forEach((player: PlayerInfo) => {
            playersOnline.push(new Player(scene, player));
        });

        const hero = new Hero(scene);
        hero.setUpdateCallback((x: number, y: number, z: number) => {
            WebSockets.send({
                type: 'move',
                id,
                x,
                y,
                z
            });
        });

        const animate = () => {

            hero.update();

            renderer.render(scene, hero.camera);

            requestAnimationFrame(animate);
        }

        animate();
    }

    if(data.type === 'move') {
        const player = playersOnline.find((player: Player) => player.id === data.player.id);
        if(player && player.id !== id) {
            player.updatePlayerPosition(data.player.x, data.player.y, data.player.z);
        }
    }

    if(data.type === 'join') {
        playersOnline.push(new Player(scene, data.player));
    }

    if(data.type === 'leave') {
        const player = playersOnline.find((player: Player) => player.id === data.id);
        if(player) {
            player.removePlayer();
            playersOnline.splice(playersOnline.indexOf(player), 1);
        }
    }

});