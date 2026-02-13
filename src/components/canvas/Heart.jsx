import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EquirectangularReflectionMapping } from 'three';

import CanvasLoader from "../Loader";

const hdrEquirect = new RGBELoader().load("./assets/gradients/ml_gradient_freebie_02.hdr", () => {
  hdrEquirect.mapping = EquirectangularReflectionMapping;
});


const HeartObject = () => {
  const Heart = useGLTF("./assets/heart.glb");
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function checkOrientation() {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <mesh
      scale={isLandscape ? 12 : 5}
      position={[0, isLandscape ? -8 : -3.5, 0]}
    >
      <primitive
        object={Heart.scene}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  )
}

const Heart = () => {
  const canvasRef = useRef(null);

  return (
    <div className="headline-container">
      <div id="text-behind">Moses<br />Trinity</div>
      <div id="text-front">Moses<br />Trinity</div>
      <div id="text-behind-blur">Moses<br />Trinity</div>
      <Canvas
        ref={canvasRef}
        className="canvas-container"
        frameloop='always'
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [10, 5, 10], fov: 25 }}
      >
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1} maxPolarAngle={1.6} minPolarAngle={1.3} enableDamping={true} dampingFactor={0.85} enablePan={false} />
        <Suspense fallback={<CanvasLoader />}>
          <Environment map={hdrEquirect} />
          {/* <ambientLight intensity={1} /> */}
          {/* <directionalLight
            castShadow
            intensity={3}
            position={[5, 10, 7.5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-bias={-0.0001}
          /> */}
          <HeartObject />
        </Suspense>
        <Preload all />
      </Canvas>

    </div>
  );
}


export default Heart;