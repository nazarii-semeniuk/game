import { Scene, WebGLRenderer, Color, AmbientLight, DirectionalLight } from 'three';
import Player from './ts/Player';
import Hero from './ts/Hero';
import Terrain from './ts/Terrain';
import { PlayerInfo } from './ts/types/PlayerInfo'
import WebSockets from './ts/WebSockets';
import { WebsocketMessage } from './ts/types/WebsocketMessage';

let id: string;
const playersOnline: Player[] = [];

let scene: Scene;
let renderer: WebGLRenderer;
let terrain: Terrain;

WebSockets.onOpen(() => {

    scene = new Scene();
    scene.background = new Color('skyblue');

    const directLight = new DirectionalLight(0xffffff, 1);
    directLight.position.set(0, 10, 0).normalize();
    scene.add(directLight);

    const ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);

    terrain = new Terrain(scene);
    terrain.create();

    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

});

WebSockets.onMessage((data: WebsocketMessage) => {

    if (data.type === 'playerInit') {
        id = data.player.id;
        if(data.playersOnline && data.playersOnline.length > 0) {
            data.playersOnline.filter((player: PlayerInfo) => {
                return player.id !== id;
            }).forEach((player: PlayerInfo) => {
                playersOnline.push(new Player(scene, player));
            });
        }

        const hero = new Hero(scene);

        hero.setUpdateCallback((x: number, y: number, z: number) => {
            WebSockets.send({
                type: 'playerMove',
                player: {
                    id,
                    x,
                    y,
                    z
                }
            });
        });

        const animate = () => {

            hero.update();

            renderer.render(scene, hero.camera);

            requestAnimationFrame(animate);
        }

        animate();
    }

    if(data.type === 'playerMove') {
        const player = playersOnline.find((player: Player) => player.id === data.player.id);
        if(player && player.id !== id) {
            player.updatePlayerPosition(data.player.x, data.player.y, data.player.z);
        }
    }

    if(data.type === 'playerJoin') {
        if(data.player.id !== id) {
            playersOnline.push(new Player(scene, data.player));
        }
    }

    if(data.type === 'playerLeave') {
        const player = playersOnline.find((player: Player) => player.id === data.player.id);
        if(player) {
            player.removePlayer();
            playersOnline.splice(playersOnline.indexOf(player), 1);
        }
    }

});