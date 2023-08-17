import { Scene, PlaneGeometry, TextureLoader, RepeatWrapping, Texture, MeshBasicMaterial, Mesh, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Terrain {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public async create() {

        const geometry = new PlaneGeometry(100, 100);
        const texture = await this.loadTexture('/assets/textures/grass.jpg');
        const material = new MeshBasicMaterial({
            map: texture
        });
        const plane = new Mesh(geometry, material);
        
        plane.rotation.x = - Math.PI / 2;
        plane.position.set(0, -0.5, 0);

        const tree = await this.loadGLTFModel('/assets/models/tree.glb');

        const treesCoordinatesAndScale = this.generateTreesCoordsAndScale(100);

        for(let i = 0; i < treesCoordinatesAndScale.length; i++) {
            const treeClone = tree.clone();
            treeClone.position.set(treesCoordinatesAndScale[i][0], -0.5, treesCoordinatesAndScale[i][1]);
            treeClone.scale.set(treesCoordinatesAndScale[i][2], treesCoordinatesAndScale[i][2], treesCoordinatesAndScale[i][2]);
            this.scene.add(treeClone);
        }

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

    private loadGLTFModel(url: string): Promise<Group> {
        const loader = new GLTFLoader();
        return new Promise(resolve => {
            loader.load(url, (gltf) => {
                resolve(gltf.scene);
            }, undefined, (error) => {
                console.error(error);
            });
        })
    }

    private generateTreesCoordsAndScale(count: number) {
        const coordsAndScale = [];
        for(let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 70) - 35;
            const z = Math.floor(Math.random() * 70) - 35;
            const scale = Math.random() * 0.5 + 0.1;
            coordsAndScale.push([x, z, scale]);
        }
        return coordsAndScale;
    }

}