import { Scene, BoxGeometry, MeshBasicMaterial, Color, Mesh } from "three";
import { PlayerInfo } from "./types/PlayerInfo";
export default class Player {
    
    private scene: Scene;
    private player: Mesh;
    public id: string;
    
    constructor(scene: Scene, playerInfo: PlayerInfo) {
        this.scene = scene;
        this.id = playerInfo.id;

        this.player = this.createPlayer(playerInfo.x, playerInfo.y, playerInfo.z);
    }

    private createPlayer(x: number, y: number, z: number) {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial( { color: new Color('orange') } );
        const player = new Mesh(geometry, material);
        player.position.set(x, y, z);
        this.scene.add(player);
        console.log('spawned player')
        return player;
    }

    public updatePlayerPosition(x: number, y: number, z: number) {
        this.player.position.set(x, y, z);
    }

    public removePlayer() {
        this.scene.remove(this.player);
    }

}