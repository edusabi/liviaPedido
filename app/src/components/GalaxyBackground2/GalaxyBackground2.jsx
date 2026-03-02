import { useEffect, useRef } from "react";
import * as THREE from "three";

const GalaxyBackground2 = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // --- 1. SETUP BÁSICO ---
    const scene = new THREE.Scene();
    
    // Fog (Neblina) para dar profundidade e fundir as estrelas distantes com o preto
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Posicionamos a câmera um pouco acima e inclinada para ver a espiral
    camera.position.set(0, 6, 2); 
    camera.lookAt(0, -5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- 2. PARÂMETROS DA GALÁXIA ---
    // Mude estes valores para brincar com o formato!
    const parameters = {
      count: 15000,     // Quantidade de estrelas (mais denso)
      size: 0.025,       // Tamanho das estrelas
      radius: 10,        // Raio total da galáxia
      branches: 3,      // Quantos "braços" a espiral tem
      spin: 1,          // O quanto ela se enrola
      randomness: 0.2,  // Dispersão (para não ficar linhas perfeitas)
      randomnessPower: 3,
      insideColor: '#ff69b4', // Teste com VERDE NEON
    outsideColor: '#ff69b4' // Teste com AZUL PURO
    };

    let geometry = null;
    let material = null;
    let points = null;

    // --- 3. FUNÇÃO GERADORA DE GALÁXIA ---
    const generateGalaxy = () => {
      // Limpeza se já existir (bom para hot-reload)
      if(points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for(let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Raio da estrela atual (distância do centro)
        const radius = Math.random() * parameters.radius;

        // Ângulo do braço (3 braços divididos por 2PI)
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

        // Criando aleatoriedade para espalhar as estrelas ao redor dos braços
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

        // Posição final combinando a espiral com a aleatoriedade
        positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY * 0.5; // Achatar no eixo Y (formato de disco)
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Cores (Mixando cor interna e externa baseada na distância/raio)
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3]     = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Material das estrelas
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true, // Estrelas longe ficam menores
        depthWrite: false,
        blending: THREE.AdditiveBlending, // Faz elas brilharem quando sobrepostas
        vertexColors: true
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    // --- 4. ANIMAÇÃO ---
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Girar a galáxia inteira lentamente
      points.rotation.y = elapsedTime * 0.05; 
      
      // Leve movimento de "ondas" na câmera ou galáxia (opcional)
      points.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- 5. REDIMENSIONAMENTO ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if(points) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }
      renderer.dispose();
      mount.removeChild(renderer.domElement);
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
        background: "#000", // Fundo preto absoluto para contraste
        pointerEvents: "none",
      }}
    />
  );
};

export default GalaxyBackground2;