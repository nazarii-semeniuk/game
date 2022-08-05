import { MeshBasicMaterial, Mesh, PlaneGeometry, TextureLoader, RepeatWrapping } from 'three';

export class Terrain {
    constructor(scene) {
        this.scene = scene;
    }

    async createTerrain() {
        const geometry = new PlaneGeometry(100, 100);
        const texture = await this.loadTexture();
        const material = new MeshBasicMaterial({
            map: texture
        });
        const plane = new Mesh(geometry, material);

        
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = -0.5;
        console.log(plane);

        this.scene.add(plane);
    }

    loadTexture() {
        const loader = new TextureLoader();
        return new Promise(resolve => {
            loader.load('/static/grass.jpg', (texture) => {
                texture.wrapS = RepeatWrapping;
                texture.wrapT = RepeatWrapping;
                texture.repeat.set(10, 10);
                resolve(texture)
            });
        })
    }
}