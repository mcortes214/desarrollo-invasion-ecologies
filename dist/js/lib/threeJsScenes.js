import { OBJLoader } from './OBJLoader.js';

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
        this.light.intensity = 1.3;
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
            //Solo rotar horizontalmente
            this.model.rotation.y += 0.01;
            // this.model.rotation.x += 0.005;
        }
        this.renderer.render( this.scene, this.camera );
    }


    //Función nueva (funcional, pero experimental - al final NO se usa)
    // https://stackoverflow.com/questions/39850083/three-js-objloader-texture
    // loadModelToScene(modelPath, scene) {
    //     let objModel;
    //     const _this = this;

    //     let modelPathParts = modelPath.split('/');
    //     let modelName = modelPathParts.pop().split('.')[0];
    //     let resourcePath = modelPathParts.join('/');
    //     let OBJFile = `${resourcePath}/${modelName}.obj`;
    //     let MTLFile = `${resourcePath}/${modelName}.mtl`;
    //     let JPGFile = `${resourcePath}/${modelName}.jpg`;

    //     new THREE.MTLLoader()
    //     .load(MTLFile, function (materials) {
    //         materials.preload();
    //         new THREE.OBJLoader()
    //             .setMaterials(materials)
    //             .load(OBJFile, function (object) {
    //                 console.log('object added');
    //                 objModel = object;
    //                 objModel.scale.x = objModel.scale.y = objModel.scale.z = 0.3;
    //                 objModel.position.y = 0.1;

    //                 var texture = new THREE.TextureLoader().load(JPGFile);           
    //                 object.traverse(function (child) {   // aka setTexture
    //                     if (child instanceof THREE.Mesh) {
    //                         child.material.map = texture;
    //                     }
    //                 });
    //                 scene.add(object);
    //                 _this.model = object;
    //             },
    //             function (error) {
    //                 console.log(error);
    //             });
    //     });
    // }



// Función vieja (estable)
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

    clearScenes(name) {
        console.log(this.scenes);
        for(let registeredScene in this.scenes){
            const scene = this.scenes[registeredScene].scene;
            console.log('scene:', scene);
            //Remove all objects from scene
            while (scene.children.length > 0){
                scene.remove(scene.children[scene.children.length - 1]);
            }
            //Remove loaded model from memory
            THREE.Cache.clear();
            //Delete references to the scene, to allow for garbage collection
            registeredScene = undefined;
        }
    }
}



// App.loadedModules.threeJsScenes = new ThreeJsScenes();
export default ThreeJsScenes;