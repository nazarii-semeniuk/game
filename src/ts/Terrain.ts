import { Scene, PlaneGeometry, TextureLoader, RepeatWrapping, Texture, MeshBasicMaterial, Mesh } from 'three';

export default class Terrain {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public async create() {

        const geometry = new PlaneGeometry(100, 100);
        const texture = await this.loadTexture('/assets/grass.jpg');
        const material = new MeshBasicMaterial({
            map: texture
        });
        const plane = new Mesh(geometry, material);
        
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = -0.5;

        this.scene.add(plane);

    }

    private loadTexture(url: string): Promise<Texture> {
        const loader = new TextureLoader();
        return new Promise(resolve => {
            loader.load(url, (texture) => {
                texture.wrapS = RepeatWrapping;
                texture.wrapT = RepeatWrapping;
                texture.repeat.set(10, 10);
                resolve(texture)
            });
        })
    }

}