import * as THREE from 'three';
import { createNoise4D } from 'simplex-noise';

interface IVertices {
  [index: string]: {
    x: number;
    y: number;
    z: number;
  };
}

const noise4D = createNoise4D();

function getNoise(x, y, z, t) {
  return noise4D(x, y, z, t);
}

var primary_color: number = 0x555555;
var secondary_color: number = 0x999999;

let renderer;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 500);
const geometry = new THREE.PlaneGeometry(400, 400, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: primary_color,
  wireframe: true,
});

scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(secondary_color, 10, 30);

const positionAttribute = geometry.getAttribute('position');
const point = new THREE.Vector3();
const vertices: IVertices = {};

// Go thru all points and collect points on same vertex with a hashmap
for (let i = 0; i < positionAttribute.count; i++) {
  point.fromBufferAttribute(positionAttribute, i);
  const key = [point.x, point.y, point.z].join(',');
  if (!vertices[key]) {
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
  // Modify all points on same vertex with same deformation
  const { x, y, z } = vertices[key];
  positionAttribute.setXYZ(i, x, y, z);
}

const landscape = new THREE.Mesh(geometry, material);
landscape.rotation.x = (-90 * Math.PI) / 180;
// landscape.position.y = -0.1;

scene.add(landscape);
camera.position.z = 5;
camera.lookAt(landscape.position);

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

var mouse = new THREE.Vector2(),
  INTERSECTED;
function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}
function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchstart', onDocumentTouchStart, false);
window.addEventListener('touchmove', onDocumentTouchMove, false);

const uSpeed = 0.00005;
var run = true;
var animate = function () {
  if (run == true) {
    requestAnimationFrame(animate);

    let posX;
    let posY;
    let RotateY, RotateX, CameraPosY;

    if (mouse.x > 0.3) {
      posX = 0.3;
    } else if (mouse.x < -0.3) {
      posX = -0.3;
    } else {
      posX = mouse.x;
    }

    if (mouse.y > 0.3) {
      posY = 0.3;
    } else if (mouse.y < -0.3) {
      posY = -0.3;
    } else {
      posY = mouse.y;
    }

    RotateY = (posX * 8 - camera.rotation.y) * uSpeed;
    RotateX = (-(posY * 2) - camera.rotation.x) * uSpeed;
    CameraPosY = (-(mouse.y * 20) - camera.rotation.y) * uSpeed;

    if (RotateY > 0.0005) {
      RotateY = 0.0005;
    } else if (RotateY < -0.0005) {
      RotateY = -0.0005;
    }

    if (RotateX > 0.0000199) {
      RotateX = 0.0000199;
    } else if (RotateX < -0.0000199) {
      RotateX = -0.0000199;
    }

    if (CameraPosY > 0.00444) {
      CameraPosY = 0.00444;
    } else if (CameraPosY < -0.00444) {
      CameraPosY = -0.00444;
    }

    landscape.rotation.y -= RotateY;
    landscape.rotation.x -= RotateX;
    if (camera.position.y > 10) {
      camera.position.y -= 0.005;
    } else if (camera.position.y < -10) {
      camera.position.y += 0.005;
    } else {
      camera.position.y -= CameraPosY;
    }

    camera.lookAt(landscape.position);

    // console.log("RotateY: ", RotateY);
    // console.log("RotateX: ", RotateX);
    // console.log("CameraPosY: ", CameraPosY);

    // console.log("camera.psoition: ", camera.position);

    renderer.render(scene, camera);
  }
};

export const startScene = ( el : HTMLCanvasElement ) => {
  run = true;
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
};

export const updateScene = (theme) => {
  switch (theme) {
    case 'internet':
      material.color.r = 88;
      material.color.g = 0;
      material.color.b = 0;
      break;
    case 'computer':
      material.color.r = 0;
      material.color.g = 88;
      material.color.b = 0;
      break;
    case 'protocol':
      material.color.r = 0;
      material.color.g = 0;
      material.color.b = 88;
      break;
    default:
      break;
  }
  renderer.render(scene, camera);
};

export const stopScene = () => {
  run = false;
};

window.addEventListener('resize', resize);
