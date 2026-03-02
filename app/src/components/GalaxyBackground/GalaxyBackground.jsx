import { useEffect, useRef } from "react";
import * as THREE from "three";

const GalaxyBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA (campo de visão maior)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ==============================
    // PARTICLES
    // ==============================
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 🔥 ESPALHAMENTO REAL DE TELA
     const spread = 20;

    positions[i3]     = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread;


      color.setHSL(0.85, 1, Math.random() * 0.6 + 0.4);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const textureLoader = new THREE.TextureLoader();
const heartTexture = textureLoader.load("/heart2.png");

const material = new THREE.PointsMaterial({
  size: 0.09,              // tamanho do coração
  map: heartTexture,       // textura do coração
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ==============================
    // ANIMATION
    // ==============================
    const animate = () => {
      points.rotation.y += 0.0003;
    points.position.y = Math.sin(Date.now() * 0.0003) * 0.3;


      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // ==============================
    // RESIZE
    // ==============================
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default GalaxyBackground;
