import { PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Color, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type ActiveKeys = {
    w: boolean;
    s: boolean;
    a: boolean;
    d: boolean;
}

export default class Player {
    private scene: Scene;
    private renderer: WebGLRenderer;
    private keys: ActiveKeys;
    private speed: number;
    private velocity: number;
    private player: Mesh;
    private orbitControls: OrbitControls;
    public camera: PerspectiveCamera;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.keys = {
            w: false,
            s: false,
            a: false,
            d: false
        }
        this.speed = 0.0;
        this.velocity = 0.0;

        this.player = this.createPlayer();
        this.camera = this.createCamera();
        this.orbitControls = this.createOrbitControls(this.camera, this.renderer);
        this.activateKeysListener();
    }

    createPlayer() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial( { color: new Color('orange') } );
        const player = new Mesh(geometry, material);
        this.scene.add(player);
        return player;
    }

    createCamera() {
        const camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        return camera;
    }

    createOrbitControls(camera: PerspectiveCamera, renderer: WebGLRenderer) {
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.enablePan = true;
        orbitControls.minDistance = 5;
        orbitControls.maxDistance = 20;
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        orbitControls.minPolarAngle = Math.PI / 4;
        orbitControls.update();
        return orbitControls;
    }

    activateKeysListener() {
        window.addEventListener('keydown', (e) => {
            if (this.keys[e.key as keyof ActiveKeys] !== undefined) {
                this.keys[e.key as keyof ActiveKeys] = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if (this.keys[e.key as keyof ActiveKeys] !== undefined) {
                this.keys[e.key as keyof ActiveKeys] = false;
            }
        })
    }

    update() {
        this.speed = 0.0;
        if(this.keys.w) {
            this.speed = 0.1;
        } else if(this.keys.s) {
            this.speed = -0.1;
        }
    
        this.velocity += ( this.speed - this.velocity ) * 0.3;
    
        this.player.translateZ(this.velocity);
    
        if(this.keys.a) {
            this.player.rotateY(0.05);
        } else if(this.keys.d) {
            this.player.rotateY(-0.05);
        }
    
        this.camera.lookAt(this.player.position);
    
        this.camera.position.y = this.player.position.y + 3;
        this.camera.position.z = this.player.position.z + -6;
        this.camera.position.x = this.player.position.x;
    }

}