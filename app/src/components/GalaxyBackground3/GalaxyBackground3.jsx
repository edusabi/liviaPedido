import { useEffect, useRef } from "react";
import * as THREE from "three";

const GalaxyBackground3 = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // --- 1. SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050505"); 

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- 2. GERAR TEXTURA DE CORAÇÃO (A Mágica acontece aqui) ---
    const getHeartTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext("2d");

      // Limpa o canvas
      context.clearRect(0, 0, 32, 32);

      // Desenha o formato do coração usando curvas de Bézier
      context.beginPath();
      const x = 16, y = 16; // Centro
      
      // Topo do coração (cova)
      context.moveTo(x, y - 6); 
      
      // Lado esquerdo
      context.bezierCurveTo(x, y - 12, x - 14, y - 12, x - 14, y - 2);
      context.bezierCurveTo(x - 14, y + 8, x - 2, y + 10, x, y + 14);
      
      // Lado direito
      context.bezierCurveTo(x + 2, y + 10, x + 14, y + 8, x + 14, y - 2);
      context.bezierCurveTo(x + 14, y - 12, x, y - 12, x, y - 6);

      // Preenchimento BRANCO (para poder ser colorido pelo Three.js depois)
      context.fillStyle = "white";
      
      // Adiciona um leve brilho (glow) para ficar bonito
      context.shadowColor = "white";
      context.shadowBlur = 4;
      
      context.fill();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // --- 3. PARTICULAS ---
    const particlesCount = 200; // Aumentei um pouco a quantidade
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount); 

    const color = new THREE.Color();

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Posições (Espalhadas na tela)
      positions[i3] = (Math.random() - 0.5) * 60;     // X
      positions[i3 + 1] = (Math.random() - 0.5) * 60; // Y
      positions[i3 + 2] = (Math.random() - 0.5) * 30; // Z

      // Tamanho dos corações
      sizes[i] = Math.random() * 2 + 0.5;

      // Velocidade
      speeds[i] = Math.random() * 0.02 + 0.005;

      // Cores: Rosa, Roxo e Branco
      const randomType = Math.random();
      if (randomType > 0.6) {
        color.setHex(0xff007f); // Rosa Choque
      } else if (randomType > 0.3) {
        color.setHex(0xff0000); // Roxo
      } else {
        color.setHex(0xffffff); // Branco Brilhante
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: .5, // Tamanho base um pouco maior para ver o formato do coração
      map: getHeartTexture(), // Usa a nova textura
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- 4. ANIMAÇÃO ---
    const animate = () => {
      const positionsAttribute = geometry.attributes.position;
      
      for (let i = 0; i < particlesCount; i++) {
        // Sobe (Y)
        positionsAttribute.array[i * 3 + 1] += speeds[i];

        // Balança (X)
        positionsAttribute.array[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.01;

        // Reset quando sai da tela
        if (positionsAttribute.array[i * 3 + 1] > 30) {
          positionsAttribute.array[i * 3 + 1] = -30;
          positionsAttribute.array[i * 3] = (Math.random() - 0.5) * 60;
        }
      }
      
      positionsAttribute.needsUpdate = true;
      particles.rotation.y += 0.001; // Gira o cenário levemente

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- RESIZE ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
          mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default GalaxyBackground3;