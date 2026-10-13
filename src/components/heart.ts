import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function mountHeartCanvas(parent: HTMLElement): void {
  const container = document.createElement("div");
  container.className = "headline-container";

  const textBehind = document.createElement("div");
  textBehind.id = "text-behind";
  textBehind.innerHTML = "Moses<br>Trinity";

  const textFront = document.createElement("div");
  textFront.id = "text-front";
  textFront.innerHTML = "Moses<br>Trinity";

  const textBlur = document.createElement("div");
  textBlur.id = "text-behind-blur";
  textBlur.innerHTML = "Moses<br>Trinity";

  const textEls = [textBehind, textFront, textBlur];
  const mobilePortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)");

  function applyTextRotation(mobile: boolean): void {
    textEls.forEach(el => {
      el.style.transform = mobile ? "rotate(90deg)" : "";
    });
  }

  applyTextRotation(mobilePortrait.matches);
  mobilePortrait.addEventListener("change", (e) => applyTextRotation(e.matches));

  const canvas = document.createElement("canvas");
  canvas.className = "canvas-container";

  const loaderEl = document.createElement("div");
  loaderEl.className = "canvas-loader-overlay";
  loaderEl.innerHTML = `<span class="canvas-loader"></span><p class="canvas-loader-text">Loading...</p>`;

  container.appendChild(textBehind);
  container.appendChild(textFront);
  container.appendChild(textBlur);
  container.appendChild(canvas);
  container.appendChild(loaderEl);
  parent.appendChild(container);

  // Renderer — alpha:true so the canvas is transparent and page bg shows through
  const renderer = new THREE.WebGLRenderer({ canvas, preserveDrawingBuffer: true, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
  camera.position.set(10, 5, 10);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;
  controls.maxPolarAngle = 1.6;
  controls.minPolarAngle = 1.3;
  controls.enableDamping = true;
  controls.dampingFactor = 0.85;
  controls.enablePan = false;

  // HDR environment
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader().load("/assets/gradients/heart_gradient.hdr", (texture: THREE.DataTexture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
  });

  // GLB model
  const pivot = new THREE.Object3D();
  scene.add(pivot);

  function updateScale(): void {
    const landscape = window.innerWidth > window.innerHeight;
    pivot.scale.setScalar(landscape ? 12 : 7);
    pivot.position.y = landscape ? -8 : -4.7;
  }

  new GLTFLoader().load("/assets/heart.glb", (gltf: GLTF) => {
    pivot.add(gltf.scene);
    updateScale();
    loaderEl.remove();
  });

  // Resize — deferred so parent is in the DOM and has real dimensions
  function resize(): void {
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    updateScale();
  }

  requestAnimationFrame(resize);
  window.addEventListener("resize", resize);

  // Animate
  function animate(): void {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
