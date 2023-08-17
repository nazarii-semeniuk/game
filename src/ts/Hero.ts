import { PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Color, Scene, WebGLRenderer, Vector3, Object3D } from 'three';

type ActiveKeys = {
    w: boolean;
    s: boolean;
    a: boolean;
    d: boolean;
}

export default class Player {
    private scene: Scene;
    private keys: ActiveKeys;
    private speed: number;
    private velocity: number;
    private player: Mesh;
    
    private lastUpdate: number;

    private updateCallback?: (x: number, y: number, z: number) => void;

    private a: Vector3;
    private b: Vector3;
    private dir: Vector3;
    private goal: Object3D;
    private temp: Vector3;
    private follow: Object3D;

    public camera: PerspectiveCamera;

    constructor(scene: Scene) {
        this.scene = scene;
        this.keys = {
            w: false,
            s: false,
            a: false,
            d: false
        }
        this.speed = 0.0;
        this.velocity = 0.0;

        this.a = new Vector3();
        this.b = new Vector3();
        this.dir = new Vector3();
        this.goal = new Object3D();
        this.temp = new Vector3();
        this.follow = new Object3D();
        this.follow.position.z = -5;

        this.player = this.createPlayer();
        this.camera = this.createCamera();
        this.goal.add(this.camera);
        this.camera.lookAt(this.player.position);

        this.activateKeysListener();
        
        this.lastUpdate = new Date().getTime();
    }

    createPlayer() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial( { color: new Color('orange') } );
        const player = new Mesh(geometry, material);
        player.add(this.follow);
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
        camera.position.set(0, 3, 0);
        return camera;
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
            this.player.rotateY(0.06);
        } else if(this.keys.d) {
            this.player.rotateY(-0.06);
        }

        this.a.lerp(this.player.position, 0.4);
        this.b.copy(this.goal.position);
    
        this.dir.copy( this.a ).sub( this.b ).normalize();
        const dis = this.a.distanceTo( this.b ) - 5;
        this.goal.position.addScaledVector( this.dir, dis );
        this.goal.position.lerp(this.temp, 0.02);
        this.temp.setFromMatrixPosition(this.follow.matrixWorld);
        
        this.camera.lookAt( this.player.position );

        if(this.updateCallback !== undefined && (this.keys.w || this.keys.s || this.keys.a || this.keys.d) && new Date().getTime() - this.lastUpdate > 10) {
            this.lastUpdate = new Date().getTime();
            this.updateCallback(this.player.position.x, this.player.position.y, this.player.position.z);
        }
    }

    setUpdateCallback(callback: (x: number, y: number, z: number) => void) {
        this.updateCallback = callback;
    }

}