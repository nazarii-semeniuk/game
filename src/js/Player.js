import { PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Player {
    constructor(scene, renderer) {
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
        this.player;
        this.camera;

        this.spawn();
        this.camera();
        this.controls();
    }

    spawn() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial( { color: new Color('orange') } );
        this.player = new Mesh(geometry, material);
        this.scene.add(this.player);
    }

    camera() {
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );

        const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.enablePan = true;
        orbitControls.minDistance = 5;
        orbitControls.maxDistance = 20;
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        orbitControls.minPolarAngle = Math.PI / 4;
        orbitControls.update();
    }

    controls() {
        window.addEventListener('keydown', (e) => {
            if (this.keys[e.key] !== undefined) {
                this.keys[e.key] = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if (this.keys[e.key] !== undefined) {
                this.keys[e.key] = false;
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