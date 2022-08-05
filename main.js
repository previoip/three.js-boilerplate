import * as THREE from 'three'
import { OrbitControls  } from 'https://unpkg.com/three@0.132.2/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'https://unpkg.com/three@0.132.2/examples/jsm/libs/dat.gui.module'
import Stats from 'https://unpkg.com/three@0.132.2/examples/jsm/libs/stats.module'

const body = document.body;
const canvas = body.children.canvas;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const camera = new THREE.PerspectiveCamera( 75, body.clientWidth / body.clientHeight, .1, 10000 );
const stats = new Stats();
const axesHelper = new THREE.AxesHelper( 10 );
const gridHelper = new THREE.GridHelper( 10, 10 );
const control = new OrbitControls( camera, renderer.domElement );
const scene = new THREE.Scene();
const gui = new GUI()

function main() {

  { // misc
    body.appendChild( stats.dom );
    camera.position.set(5,5,5);
    renderer.setPixelRatio( window.devicePixelRatio );
    control.update();
    updateRenderer();
  }

  { // helpers
    scene.add( gridHelper );
    scene.add( axesHelper );
  }

  { // default cube is back!
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshMatcapMaterial();
    const cube = new THREE.Mesh( geometry, material );
    cube.position.y = .5
    scene.add( cube );
  }

  { // gui
    const guiCamera = gui.addFolder('Camera')
    guiCamera.add(camera, 'fov', 1, 179)
      .onChange( ()=>{ camera.updateProjectionMatrix() } )
      .listen();
    guiCamera.add({r: ()=>{ camera.fov = 75; camera.updateProjectionMatrix() }}, 'r')
      .name( 'reset' )
      .listen();
  }

  function loop() {

    { // render
      stats.update();
      render();
      requestAnimationFrame( loop )  ;
    }

  }; loop();
}; main();

function updateRenderer() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
}

function render() {
  renderer.render( scene, camera )
}

window.addEventListener( 'resize', ()=>{
  updateRenderer()
})