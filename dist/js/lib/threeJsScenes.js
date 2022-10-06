import { OBJLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/OBJLoader';

// Esto iría en el objloader.

// Individual scene.

class ThreeJsScene {
    constructor(options){
        //Defaults
        Object.assign(this, {
            format: 'obj',
            width: 500,
            height: 500,
        });

        Object.assign(this, options);

        console.log('ThreeJsScene Object:');
        console.log(this);

        this.setupScene();
        this.loadModelToScene(this.modelPath, this.scene);
        this.appendScene();
    }

    setupScene() {
        //Camera
        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 0.5;
        this.camera.position.y = 0.1;

        //Scene
        this.scene = new THREE.Scene();
        this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this.light.position.z = 10;
        this.scene.add(this.light);

        //Renderer
        this.renderer = new THREE.WebGLRenderer( {
            antialias: false,
            alpha: true //DEBUG: Black background for debugging. Enable after testing
        } );
        this.renderer.setSize( this.width, this.height );
        this.renderer.setAnimationLoop( this.animation.bind(this) );
    }

    appendScene() {
        this.containerElement.appendChild(this.renderer.domElement);
    }

    animation(time) {
        if(this.model){
            this.model.rotation.y += 0.01;
            this.model.rotation.x += 0.005;
        }
        this.renderer.render( this.scene, this.camera );
    }

    loadModelToScene(modelPath, scene) {
        let objModel;

        const loader = new OBJLoader();
        const _this = this;
        loader.load(
            modelPath,
            function (object) {
                console.log('object added');
                objModel = object;
                objModel.scale.x = objModel.scale.y = objModel.scale.z = 0.1;
                objModel.position.y = 0.1;
                scene.add(object);
                _this.model = object;
            },
            function (error) {
                console.log(error);
            }
        );
    }
}



// Scene collection, registered to global App object

class ThreeJsScenes {
    constructor(){
        this.scenes = {};
    }

    addScene(options) {
        const {name, containerElement, format, modelPath, width, height} = options;
        const scene = new ThreeJsScene({containerElement, format, modelPath, width, height});
        this.scenes[name] = scene;
    }
}



App.loadedModules.threeJsScenes = new ThreeJsScenes();

console.log('three Obj loader registrado');