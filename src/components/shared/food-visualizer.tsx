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
    camera.position.set(0, 2, 5);
    camera.lookAt(0,0,0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Geometry based on food item
    let foodObject: THREE.Object3D;

    switch (foodItem.toLowerCase()) {
      case 'apple':
        const appleGeometry = new THREE.SphereGeometry(1, 32, 32);
        const appleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.4 });
        foodObject = new THREE.Mesh(appleGeometry, appleMaterial);
        break;
      case 'salmon':
        const salmonGeometry = new THREE.BoxGeometry(3, 0.5, 1.5);
        const salmonMaterial = new THREE.MeshStandardMaterial({ color: 0xffa07a, roughness: 0.6 });
        foodObject = new THREE.Mesh(salmonGeometry, salmonMaterial);
        foodObject.rotation.x = -Math.PI / 8;
        break;
      case 'chicken breast':
        const chickenGeometry = new THREE.CapsuleGeometry(1, 1.5, 4, 16);
        const chickenMaterial = new THREE.MeshStandardMaterial({ color: 0xffdead, roughness: 0.7 });
        foodObject = new THREE.Mesh(chickenGeometry, chickenMaterial);
        foodObject.rotation.z = Math.PI / 2;
        foodObject.rotation.y = Math.PI / 4;
        break;
      case 'quinoa':
      case 'soup':
      case 'salad':
        const bowl = new THREE.Group();
        const bowlShape = new THREE.Shape();
        bowlShape.moveTo(-2.5, 0);
        bowlShape.absarc(0, 0, 2.5, Math.PI, 0, false);
        bowlShape.lineTo(2, 0);
        bowlShape.absarc(0, 0, 2, 0, Math.PI, true);
        const bowlGeometry = new THREE.LatheGeometry(bowlShape.getPoints(32), 32);
        const bowlMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, roughness: 0.2 });
        const bowlMesh = new THREE.Mesh(bowlGeometry, bowlMaterial);
        bowl.add(bowlMesh);
        
        const contentsGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
        let contentsMaterial;
        if (foodItem === 'soup') {
            contentsMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.8 });
        } else if (foodItem === 'salad') {
            contentsMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.9 });
        } else { // quinoa
            contentsMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.9 });
        }
        const contentsMesh = new THREE.Mesh(contentsGeometry, contentsMaterial);
        contentsMesh.position.y = 0.25;
        bowl.add(contentsMesh);
        foodObject = bowl;
        foodObject.position.y = 0.5;
        break;
      case 'toast':
        const toastGeometry = new THREE.BoxGeometry(2.5, 0.3, 2.5);
        const toastMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.8 });
        foodObject = new THREE.Mesh(toastGeometry, toastMaterial);
        break;
      default:
        const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
        const defaultMaterial = new THREE.MeshStandardMaterial({ color: 0x90ee90 });
        foodObject = new THREE.Mesh(defaultGeometry, defaultMaterial);
    }

    scene.add(foodObject);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      foodObject.rotation.y += 0.005;
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
