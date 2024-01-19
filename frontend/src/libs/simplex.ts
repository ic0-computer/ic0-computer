import * as THREE from 'three';
import { createNoise4D } from 'simplex-noise';
import type { NoiseFunction4D } from 'simplex-noise';

interface IVertices {
  [index: string]: {
    x: number;
    y: number;
    z: number;
  };
}

// 4D noise value
const noise4D: NoiseFunction4D = createNoise4D();

function getNoise(x: number, y: number, z: number, t: number): number {
  return noise4D(x, y, z, t);
}

// WebGLRenderer instance
let renderer: THREE.WebGLRenderer;

// Scene, camera, and geometry setup
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  500,
);
const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(400, 400, 100, 100);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x555555,
  wireframe: true,
});

// Set scene background and fog
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x999999, 10, 30);

// Access the position attribute of the geometry
const positionAttribute = geometry.getAttribute('position');
const point: THREE.Vector3 = new THREE.Vector3();
const vertices: IVertices = {};

// Iterate through all points and collect points on the same vertex with a hashmap
for (let i = 0; i < positionAttribute.count; i++) {
  point.fromBufferAttribute(positionAttribute, i);
  const key = [point.x, point.y, point.z].join(',');
  if (!vertices[key]) {
    // Add noise to the z-coordinate based on different frequency factors
    vertices[key] = {
      x: point.x,
      y: point.y,
      z:
        point.z +
        getNoise(point.x * 0.01, point.y * 0.01, point.z * 0.01, 0) * 30 +
        getNoise(point.x * 0.03, point.y * 0.03, point.z * 0.03, 0) * 5 +
        getNoise(point.x * 0.1, point.y * 0.125, point.z * 0.125, 0),
    };
  }
  // Modify all points on the same vertex with the same deformation
  const { x, y, z } = vertices[key];
  positionAttribute.setXYZ(i, x, y, z);
}

// Create a mesh using the geometry and material
const landscape: THREE.Mesh = new THREE.Mesh(geometry, material);
landscape.rotation.x = (-90 * Math.PI) / 180;
scene.add(landscape);

// Set camera position and look at the landscape
camera.position.z = 5;
camera.lookAt(landscape.position);

// Resize function to handle window resize events
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// Vector2 for mouse coordinates and INTERSECTED variable
const mouse: THREE.Vector2 = new THREE.Vector2();

// Event handler for mouse movement
function onMouseMove(event: MouseEvent) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Event handlers for touch events
function onDocumentTouchStart(event: TouchEvent) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

function onDocumentTouchMove(event: TouchEvent) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

// Add event listeners for mouse and touch events
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchstart', onDocumentTouchStart, false);
window.addEventListener('touchmove', onDocumentTouchMove, false);

// Animation parameters
const uSpeed: number = 0.00005;
const dampingFactor = 0.95;
let run: boolean = true;

// Animation function
const animate = () => {
  if (run) {
    requestAnimationFrame(animate);

    let posX: number;
    let posY: number;
    let RotateY: number, RotateX: number, CameraPosY: number;

    // Clamp mouse coordinates to a certain range
    posX = Math.min(0.3, Math.max(-0.3, mouse.x));
    posY = Math.min(0.3, Math.max(-0.3, mouse.y));

    // Calculate rotation and position changes based on mouse movement
    RotateY = (posX * 8 - camera.rotation.y) * uSpeed;
    RotateX = (-(posY * 2) - camera.rotation.x) * uSpeed;
    CameraPosY = (-(mouse.y * 20) - camera.rotation.y) * uSpeed;

    RotateY = Math.max(-0.0005, Math.min(0.0005, RotateY)) * dampingFactor;
    RotateX = Math.max(-0.0000199, Math.min(0.0000199, RotateX)) * dampingFactor;
    CameraPosY = Math.max(-0.00444, Math.min(0.00444, CameraPosY)) * dampingFactor;

    // Apply rotation and position changes
    landscape.rotation.y -= RotateY;
    landscape.rotation.x -= RotateX;
    if (camera.position.y > 10) {
      camera.position.y -= 0.005;
    } else if (camera.position.y < -10) {
      camera.position.y += 0.005;
    } else {
      camera.position.y -= CameraPosY;
    }

    // Update camera's look-at position
    camera.lookAt(landscape.position);

    // Render the scene
    renderer.render(scene, camera);
  }
};

// Start the scene
export const startScene = (el: HTMLCanvasElement) => {
  run = true;
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
};

// Stop the scene
export const stopScene = () => {
  run = false;
};

window.addEventListener('resize', resize);
