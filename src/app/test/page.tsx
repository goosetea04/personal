"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface ExtendedWindow extends Window {
  // We include both because we are checking for both
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
}

export default function AudioVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // Refs for Audio API
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Ref for Three.js Animation Frame
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 15, 60);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- POST PROCESSING ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // Bloom Strength
      0.4, // Radius
      0.85 // Threshold
    );
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- OBJECTS ---
    const coreGeom = new THREE.IcosahedronGeometry(10, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      emissive: 0x004444,
      wireframe: true,
      shininess: 100
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    const heartGeom = new THREE.SphereGeometry(4, 32, 32);
    const heartMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const heart = new THREE.Mesh(heartGeom, heartMat);
    scene.add(heart);

    const gridHelper = new THREE.GridHelper(200, 40, 0x00ffff, 0x002222);
    gridHelper.position.y = -20;
    scene.add(gridHelper);

    // Particles
    const partCount = 1500;
    const partGeom = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++) {
      partPos[i] = (Math.random() - 0.5) * 200;
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.2,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(partGeom, partMat);
    scene.add(particles);

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0x101010));
    const spotLight = new THREE.SpotLight(0x00ffff, 2);
    spotLight.position.set(0, 50, 0);
    scene.add(spotLight);

    // --- ANIMATION LOOP ---
    let time = 0;
    const animate = (): void => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.005;

      let avg = 0;
      let bass = 0;

      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            avg += dataArrayRef.current[i];
            if (i < 10) bass += dataArrayRef.current[i];
        }
        avg /= dataArrayRef.current.length;
        bass /= 10;
        }

      const audioScale = 1 + (avg / 255) * 1.5;
      const bassScale = 1 + (bass / 255) * 2;

      core.rotation.y += 0.005;
      core.rotation.z += 0.003;
      core.scale.set(bassScale, bassScale, bassScale);
      
      heart.scale.set(audioScale, audioScale, audioScale);
      heartMat.color.setHSL(0.5, 1, 0.3 + (avg / 255));

      gridHelper.position.z = (time * 50) % 5;
      particles.rotation.y -= 0.0005;

      camera.position.x = Math.sin(time * 0.5) * 5;
      camera.lookAt(0, 0, 0);

      composer.render();
    };

    animate();

    const handleResize = (): void => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      heartGeom.dispose();
      heartMat.dispose();
      partGeom.dispose();
      partMat.dispose();
    };
  }, []);

  const startAudio = async (): Promise<void> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Cast window to our extended interface safely
        const Win = window as unknown as ExtendedWindow;
        const AudioContextClass = Win.AudioContext || Win.webkitAudioContext;
        
        if (!AudioContextClass) {
        throw new Error('Web Audio API not supported');
        }

        audioContextRef.current = new AudioContextClass();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 512;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        
        dataArrayRef.current = new Uint8Array(new ArrayBuffer(bufferLength));
        
        source.connect(analyserRef.current);
        setIsActive(true);
        setError('');
    } catch (err) {
        setError('Microphone access denied or unsupported browser.');
        console.error(err);
    }
    };

  const stopAudio = (): void => {
  if (audioContextRef.current) {
    // Only call close if it's not null
    audioContextRef.current.close().catch(console.error);
    audioContextRef.current = null;
  }
  analyserRef.current = null;
  dataArrayRef.current = null; // No longer errors out
  setIsActive(false);
};

  return (
    <div className="w-full h-screen bg-[#020205] relative overflow-hidden">
      {/* HUD Frame */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-cyan-500/5 z-20" />
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-cyan-400 text-xs tracking-[0.5em] uppercase mb-2 font-bold opacity-70">
            System.Visualizer_v2
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>

        <button
          onClick={isActive ? stopAudio : startAudio}
          className={`group relative px-8 py-3 rounded-full transition-all duration-300 pointer-events-auto border ${
            isActive ? 'bg-red-500/10 border-red-500/50' : 'bg-cyan-500/10 border-cyan-500/50'
          }`}
        >
          <span className={`relative text-xs font-bold tracking-widest ${isActive ? 'text-red-400' : 'text-cyan-400'}`}>
            {isActive ? 'TERMINATE_LINK' : 'ESTABLISH_LINK'}
          </span>
        </button>

        {error && (
          <p className="text-red-400 text-[10px] tracking-widest uppercase bg-red-900/20 px-4 py-1 rounded border border-red-500/30">
            {error}
          </p>
        )}
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}