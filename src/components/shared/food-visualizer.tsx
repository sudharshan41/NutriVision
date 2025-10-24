"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FoodVisualizerProps {
  foodItem: string;
}

const FoodVisualizer = ({ foodItem }: FoodVisualizerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // Geometry based on food item
    let geometry: THREE.BufferGeometry;
    let material: THREE.MeshStandardMaterial;

    switch (foodItem.toLowerCase()) {
      case 'apple':
        geometry = new THREE.SphereGeometry(1, 32, 32);
        material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        break;
      case 'salmon':
        geometry = new THREE.BoxGeometry(3, 0.5, 1.5);
        material = new THREE.MeshStandardMaterial({ color: 0xffa07a });
        break;
      case 'chicken breast':
        geometry = new THREE.CapsuleGeometry(1, 1, 4, 8);
        material = new THREE.MeshStandardMaterial({ color: 0xffdead });
        break;
      case 'quinoa':
      case 'soup':
        geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
        material = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
        break;
      case 'salad':
         geometry = new THREE.SphereGeometry(1.5, 32, 32);
         material = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.8 });
         break;
      case 'toast':
        geometry = new THREE.BoxGeometry(2.5, 0.3, 2.5);
        material = new THREE.MeshStandardMaterial({ color: 0xd2b48c });
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshStandardMaterial({ color: 0x90ee90 });
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [foodItem]);

  return <div ref={mountRef} className="h-full w-full" />;
};

export default FoodVisualizer;
