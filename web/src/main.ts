import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

async function main() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // scene.background = new THREE.Color(0x52130b);

  camera.position.set(0, 6, 0);
  // camera.up.set(0, 0, 0);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(canvas.width, canvas.height);

  const loader = new GLTFLoader();
  const diceGltf = await loader.loadAsync("/dice.glb");
  const diceModel = diceGltf.scene;
  const dices: THREE.Group[] = [];

  const boardGltf = await loader.loadAsync("/board.glb");
  const board = boardGltf.scene;
  board.scale.set(1, 1, 1);
  board.position.set(0, -5, 5);
  scene.add(board);

  for (let i = 0; i < 5; i++) {
    const dice = diceModel.clone();
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const dice = new THREE.Mesh(geometry, material);

    dice.position.set(-2 + i * 1, -2, 5);
    dice.scale.set(0.4, 0.4, 0.4);
    dices.push(dice);
    scene.add(dice);
  }

  const light = new THREE.AmbientLight(0xeeeeff); // soft white light
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffee, 2);
  scene.add(directionalLight);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    dices.forEach((dice) => {
      dice.rotation.x += 0.01;
      dice.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  }

  animate();
}

window.onload = main;
