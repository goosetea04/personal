"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfc);

    const aspect = window.innerWidth / window.innerHeight;
    const d = 20; // how zoomed in/out you want

    const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
    );

    // Position camera at an angle for isometric look
    camera.position.set(20, 10, 15);
    camera.lookAt(0, 0, 0);

    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Snake 
    const snakeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const snakeSegments: THREE.Mesh[] = [];

    const segmentSize = 1;
    let snakeLength = 5;
    for (let i = 0; i < snakeLength; i++) {
      const segment = new THREE.Mesh(
        new THREE.BoxGeometry(segmentSize, segmentSize, segmentSize),
        snakeMaterial
      );
      segment.position.x = -i * segmentSize;
      scene.add(segment);
      snakeSegments.push(segment);
    }

    // Food 
    let score = 0;
    const foodGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const foodMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const food = new THREE.Mesh(foodGeometry, foodMaterial);
    food.position.set(
      Math.floor(Math.random() * 20 - 10),
      0,
      Math.floor(Math.random() * 20 - 10)
    );
    scene.add(food);

    // Plane/Grid 
    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Make it horizontal
    scene.add(plane);



    // Movement 
    let direction = new THREE.Vector3(1, 0, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "W":
        case "w":
          console.log(direction)
          if (direction.x === 0 && direction.y === 0 && direction.z === 1) {
            console.log(direction)
          } else {
            direction.set(0, 0, -1);
            console.log(direction)
          }
          break;
        case "ArrowDown":
        case "S":
        case "s":
          if (direction.x === 0 && direction.y === 0 && direction.z === -1) {
          } else {
            direction.set(0, 0, 1);
          }
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          if (direction.x === 1 && direction.y === 0 && direction.z === 0) {
          } else {
            direction.set(-1, 0, 0);
          }
          break;
        case "ArrowRight":
        case "D":
        case "d":
          if (direction.x === -1 && direction.y === 0 && direction.z === 0) {
          } else {
            direction.set(1, 0, 0);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let clock = new THREE.Clock();
    let speed = 5; // units per second
    let accumulator = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      accumulator += delta;

      if (accumulator > 0.2) {
       
        const newHeadPos = snakeSegments[0].position.clone().add(direction);

        for (let i = snakeSegments.length - 1; i > 0; i--) {
            snakeSegments[i].position.copy(snakeSegments[i - 1].position);
        }
        snakeSegments[0].position.copy(newHeadPos);

        if (snakeSegments[0].position.distanceTo(food.position) < 1) {
          // Increase score
          score += 1;
          const scoreElement = document.getElementById("score");
          if (scoreElement) {
            scoreElement.innerText = `Score: ${score}`;
          }

          // Grow snake
          const newSegment = new THREE.Mesh(
            new THREE.BoxGeometry(segmentSize, segmentSize, segmentSize),
            snakeMaterial
          );
          const tail = snakeSegments[snakeSegments.length - 1];
          newSegment.position.copy(tail.position);
          scene.add(newSegment);
          snakeSegments.push(newSegment);

          // Reposition food
          food.position.set(
            Math.floor(Math.random() * 10 - 5),
            0,
            Math.floor(Math.random() * 10 - 5)
          );
        }


        for (let i = 1; i < snakeSegments.length; i++) {
            if (snakeSegments[0].position.distanceTo(snakeSegments[i].position) < 0.5) {
            alert("Game Over! You collided with yourself.");
            window.location.reload();
            break;
            }
        }

        accumulator = 0;
        }


      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div
        id="score"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          fontFamily: "sans-serif",
          color: "#333",
          background: "#ffffffaa",
          padding: "10px",
          borderRadius: "8px",
          zIndex: 10,
        }}
      >
        Score: 0
      </div>

      <div ref={mountRef} className="w-full h-screen" />
    </>
  );
}
