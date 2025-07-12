"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Header from "@/components/Header";

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || !mountRef.current) return;

    // Scene setup 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00df81);

    const aspect = window.innerWidth / window.innerHeight;
    const d = 20; // zoom

    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000
    );

    camera.position.set(20, 15, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Snake
    const snakeMaterial = new THREE.MeshBasicMaterial({ color: 0x03624c });
    const snakeSegments: THREE.Mesh[] = [];

    const segmentSize = 1;
    let snakeLength = 3;
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
    const foodMaterial = new THREE.MeshBasicMaterial({ color: 0xc22c63});
    const food = new THREE.Mesh(foodGeometry, foodMaterial);
    food.position.set(
      Math.floor(Math.random() * 25 - 5),
      0,
      Math.floor(Math.random() * 25 - 5)
    );
    scene.add(food);

    // Plane/Grid
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf1f6f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Movement
    let direction = new THREE.Vector3(1, 0, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "W":
        case "w":
          if (!(direction.x === 0 && direction.z === 1)) {
            direction.set(0, 0, -1);
          }
          event.preventDefault();
          break;
        case "ArrowDown":
        case "S":
        case "s":
          if (!(direction.x === 0 && direction.z === -1)) {
            direction.set(0, 0, 1);
          }
          event.preventDefault();
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          if (!(direction.x === 1 && direction.z === 0)) {
            direction.set(-1, 0, 0);
          }
          event.preventDefault();
          break;
        case "ArrowRight":
        case "D":
        case "d":
          if (!(direction.x === -1 && direction.z === 0)) {
            direction.set(1, 0, 0);
          }
          event.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let clock = new THREE.Clock();
    let accumulator = 0;

    let speed = 0.2;
    let isGameOver = false;

    const animate = () => {
      if (isGameOver) return;
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      accumulator += delta;

      speed = Math.max(0.05, speed - delta * 0.005);

      if (accumulator > speed) {
        const newHeadPos = snakeSegments[0].position.clone().add(direction);

        for (let i = snakeSegments.length - 1; i > 0; i--) {
          snakeSegments[i].position.copy(snakeSegments[i - 1].position);
        }
        snakeSegments[0].position.copy(newHeadPos);

        if (
          newHeadPos.x < -25 || newHeadPos.x > 25 ||
          newHeadPos.z < -25 || newHeadPos.z > 25
        ) {
          isGameOver = true;
          alert("Game Over! You went out of bounds.");
          window.location.reload();
          return;
        }


        if (snakeSegments[0].position.distanceTo(food.position) < 1) {
          
          score += 1;
          const scoreElement = document.getElementById("score");
          if (scoreElement) {
            scoreElement.innerText = `Score: ${score}`;
          }

          const newSegment = new THREE.Mesh(
            new THREE.BoxGeometry(segmentSize, segmentSize, segmentSize),
            snakeMaterial
          );
          const tail = snakeSegments[snakeSegments.length - 1];
          newSegment.position.copy(tail.position);
          scene.add(newSegment);
          snakeSegments.push(newSegment);

          food.position.set(
            Math.floor(Math.random() * 25 - 5),
            0,
            Math.floor(Math.random() * 25 - 5)
          );
        }

        for (let i = 1; i < snakeSegments.length; i++) {
          if (snakeSegments[0].position.distanceTo(snakeSegments[i].position) < 0.5) {
            isGameOver = true;
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [gameStarted]); // Depend on gameStarted!

  return (
    <>
      <Header />
      {!gameStarted && (
        <div
          style={{
            position: "fixed", 
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#000000cc",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999, 
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
            Snake Game Instructions
          </h1>
          <p>Use Arrow keys or WASD to move the snake.</p>
          <p>Avoid colliding with yourself. Eat red food to grow!</p>
          <button
            onClick={() => setGameStarted(true)}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              fontSize: "18px",
              background: "#032221",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            OK, Start Game
          </button>
        </div>

      )}

      <div
        id="score"
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          fontSize: "24px",
          fontFamily: "sans-serif",
          color: "#f1f7f6",
          background: "#0b453a",
          padding: "10px",
          borderRadius: "8px",
          zIndex: 10,
        }}
      >
        Score: 0
      </div>


      <div ref={mountRef} className="w-full min-h-screen" />
    </>
  );
}
