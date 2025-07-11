"use client";

import { useEffect, useRef } from "react";

export default function Game2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // === Game state ===
    const gravity = 0.5;
    const player = {
      x: 100,
      y: 100,
      width: 40,
      height: 40,
      vx: 0,
      vy: 0,
      speed: 5,
      jumpPower: 12,
      onGround: false,
    };

    let keys = {
      left: false,
      right: false,
      up: false,
    };

    interface Platform {
      x: number;
      y: number;
      width: number;
      height: number;
    }

    let platforms: Platform[] = [];

    // Initial platforms
    platforms.push({ x: 50, y: 400, width: 200, height: 20 });

    // === Input ===
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") keys.up = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") keys.up = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // === Main loop ===
    const loop = () => {
      // Move left/right
      if (keys.left) player.vx = -player.speed;
      else if (keys.right) player.vx = player.speed;
      else player.vx = 0;

      // Jump
      if (keys.up && player.onGround) {
        player.vy = -player.jumpPower;
        player.onGround = false;
      }

      // Apply gravity
      player.vy += gravity;

      // Update position
      player.x += player.vx;
      player.y += player.vy;

      // Platform collisions
      player.onGround = false;
      for (let plat of platforms) {
        if (
          player.x < plat.x + plat.width &&
          player.x + player.width > plat.x &&
          player.y + player.height < plat.y + 10 &&
          player.y + player.height + player.vy >= plat.y
        ) {
          player.y = plat.y - player.height;
          player.vy = 0;
          player.onGround = true;
        }
      }

      // Procedurally generate more platforms as you move right
      const farthest = Math.max(...platforms.map((p) => p.x + p.width));
      if (player.x + 400 > farthest) {
        const lastY = platforms[platforms.length - 1].y;
        const newWidth = 100 + Math.random() * 100;
        const newGap = 50 + Math.random() * 100;
        const newY = lastY + (Math.random() < 0.5 ? -40 : 40);
        platforms.push({
          x: farthest + newGap,
          y: Math.min(Math.max(newY, 200), canvas.height - 50),
          width: newWidth,
          height: 20,
        });
      }

      // === Draw ===
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera follow
      const camX = player.x - 200;
      ctx.save();
      ctx.translate(-camX, 0);

      // Draw platforms
      ctx.fillStyle = "#333";
      for (let plat of platforms) {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
      }

      // Draw player
      ctx.fillStyle = "#00f";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      ctx.restore();

      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-screen" />;
}
