import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EquirectangularReflectionMapping } from 'three';

import CanvasLoader from "../Loader";

const hdrEquirect = new RGBELoader().load("./assets/gradients/heart_gradient.hdr", () => {
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
      scale={isLandscape ? 12 : 7}
      position={[0, isLandscape ? -8 : -4.7, 0]}
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
      <div id="text-behind" className="sm:rotate-0 rotate-90">Moses<br />Trinity</div>
      <div id="text-front" className="sm:rotate-0 rotate-90">Moses<br />Trinity</div>
      <div id="text-behind-blur" className="sm:rotate-0 rotate-90">Moses<br />Trinity</div>
      <Canvas
        ref={canvasRef}
        className="canvas-container"
        frameloop='always'
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [10, 5, 10], fov: 25 }}
      >
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={3} maxPolarAngle={1.6} minPolarAngle={1.3} enableDamping={true} dampingFactor={0.85} enablePan={false} />
        <Suspense fallback={<CanvasLoader />}>
          <Environment map={hdrEquirect} />
          <HeartObject />
        </Suspense>
        <Preload all />
      </Canvas>

    </div>
  );
}


export default Heart;