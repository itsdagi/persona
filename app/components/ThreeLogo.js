'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeLogo({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null; 

    // Orthographic camera for isometric view
    const aspect = 1;
    const d = 6;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    // Camera looking from the front-left-top corner to see Left(Orange), Top(Orange), Front(Black)
    camera.position.set(-10, 10, 10);
    camera.lookAt(0, 0, 0); 
    camera.zoom = 1.0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add to DOM first so we can grab client size
    const wrapper = mountRef.current;
    wrapper.appendChild(renderer.domElement);

    const resize = () => {
       if (wrapper) {
           const width = wrapper.clientWidth;
           const height = wrapper.clientHeight || width; // fallback to square
           renderer.setSize(width, height);
           const aspect = width / height;
           camera.left = -d * aspect;
           camera.right = d * aspect;
           camera.top = d;
           camera.bottom = -d;
           camera.updateProjectionMatrix();
       }
    };
    resize();
    window.addEventListener('resize', resize);
    
    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(-10, 20, 10);
    scene.add(dirLight);

    // 3. Define the 'P' Shape
    const pShape = new THREE.Shape();
    // Outer perimeter (Clockwise)
    pShape.moveTo(0, 0);
    pShape.lineTo(0, 10);
    pShape.lineTo(6.5, 10);
    pShape.lineTo(6.5, 4);
    pShape.lineTo(2.5, 4);
    pShape.lineTo(2.5, 0);
    pShape.lineTo(0, 0);
    
    // Inner hole (Counter-Clockwise)
    const hole = new THREE.Path();
    hole.moveTo(2.5, 5.5);
    hole.lineTo(4.5, 5.5);
    hole.lineTo(4.5, 8.5);
    hole.lineTo(2.5, 8.5);
    hole.lineTo(2.5, 5.5);
    pShape.holes.push(hole);

    // Extrude
    const extrudeSettings = {
      depth: 3, 
      bevelEnabled: false, 
    };
    const geometry = new THREE.ExtrudeGeometry(pShape, extrudeSettings);

    // Center geometry
    geometry.computeBoundingBox();
    const bx = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const by = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const bz = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
    geometry.translate(-bx/2, -by/2, -bz/2);

    // Materials: 0 = Front/Back (Black), 1 = Sides (Orange)
    const frontMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0a0a0c, 
      roughness: 0.5,
    }); 
    const sideMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6524, 
      roughness: 0.3,
    });

    const mesh = new THREE.Mesh(geometry, [frontMaterial, sideMaterial]);
    
    // Group to hold animation offsets
    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);
    
    // 4. Animation loop & Interaction
    let animationFrame;
    let time = 0;
    
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const handleMouseMove = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        // Bouncy interaction
        targetRotationY = x * 0.4;
        targetRotationX = y * 0.4;
    };
    
    const handleMouseLeave = () => {
        targetRotationX = 0;
        targetRotationY = 0;
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    // A nice initial pop-in scale animation
    group.scale.set(0, 0, 0);

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      time += 0.05;
      
      // Floating bounce effect
      group.position.y = Math.sin(time * 0.7) * 0.4;
      
      // Smooth scale intro
      group.scale.x += (1 - group.scale.x) * 0.1;
      group.scale.y += (1 - group.scale.y) * 0.1;
      group.scale.z += (1 - group.scale.z) * 0.1;
      
      // Smooth rotational spring to target
      mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.15;
      mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.15;
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (wrapper) {
          wrapper.removeEventListener('mousemove', handleMouseMove);
          wrapper.removeEventListener('mouseleave', handleMouseLeave);
          if (wrapper.contains(renderer.domElement)) {
              wrapper.removeChild(renderer.domElement);
          }
      }
      cancelAnimationFrame(animationFrame);
      geometry.dispose();
      frontMaterial.dispose();
      sideMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
