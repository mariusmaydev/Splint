// import * as THREE from 'three';
// import { GLTFLoader } from '@THREE_MODULES_DIR/loaders/GLTFLoader.js';

// import { DRACOLoader } from '@THREE_MODULES_DIR/loaders/DRACOLoader.js';
// // const 
// THREE.Cache.enabled = true
// const draco = new DRACOLoader();
//       draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
// const gltfLoader = new GLTFLoader();
//       gltfLoader.setDRACOLoader(draco);
// export default class ModelLoader {
//     static load(url){
//         return gltfLoader.loadAsync(url, function(){});
//     }
// }
// export const Lmanager = new THREE.LoadingManager();
// Lmanager.onStart = function ( url, itemsLoaded, itemsTotal ) {

// 	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

// };

// Lmanager.onLoad = function ( ) {

// 	console.log( 'Loading complete!');

// };


// Lmanager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

// 	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

// };

// Lmanager.onError = function ( url ) {

// 	console.log( 'There was an error loading ' + url );

// };

// // const loader = new THREE.OBJLoader( manager );
// // loader.load( 'file.obj', function ( object ) {

// // 	//

// // } );

// // Blob or File objects created when dragging files into the webpage.
// const blobs = {'fish.gltf': blob1, 'diffuse.png': blob2, 'normal.png': blob3};

// const manager = new THREE.LoadingManager();

// // Initialize loading manager with URL callback.
// const objectURLs = [];
// manager.setURLModifier( ( url ) => {

// 	url = URL.createObjectURL( blobs[ url ] );

// 	objectURLs.push( url );

// 	return url;

// } );

// // Load as usual, then revoke the blob URLs.
// const loader = new THREE.GLTFLoader( manager );
// loader.load( 'fish.gltf', (gltf) => {

// 	scene.add( gltf.scene );

// 	objectURLs.forEach( ( url ) => URL.revokeObjectURL( url ) );

// });