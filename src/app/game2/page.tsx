"use client";

import { useEffect, useRef } from "react";

export default function Platformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // === Game state ===
    const gravity = 0.5;
    let gameOver = false;
    
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
      r: false,
    };

    interface Platform {
      x: number;
      y: number;
      width: number;
      height: number;
    }

    interface Enemy {
      x: number;
      y: number;
      width: number;
      height: number;
      vx: number;
      platformX: number;
      platformWidth: number;
    }

    let platforms: Platform[] = [];
    let enemies: Enemy[] = [];

    // Initial platforms
    platforms.push({ x: 50, y: 400, width: 200, height: 20 });
    
    // Add enemy to initial platform
    enemies.push({
      x: 100,
      y: 360,
      width: 30,
      height: 30,
      vx: 1,
      platformX: 50,
      platformWidth: 200,
    });

    // === Input ===
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") keys.up = true;
      if (e.key === "r" || e.key === "R") keys.r = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") keys.up = false;
      if (e.key === "r" || e.key === "R") keys.r = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // === Reset game ===
    const resetGame = () => {
      gameOver = false;
      player.x = 100;
      player.y = 100;
      player.vx = 0;
      player.vy = 0;
      player.onGround = false;
      
      // Reset platforms and enemies
      platforms = [{ x: 50, y: 400, width: 200, height: 20 }];
      enemies = [{
        x: 100,
        y: 360,
        width: 30,
        height: 30,
        vx: 1,
        platformX: 50,
        platformWidth: 200,
      }];
    };

    // === Collision detection ===
    const checkCollision = (rect1: any, rect2: any) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    // === Main loop ===
    const loop = () => {
      if (gameOver) {
        // Game over screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#fff";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = "24px Arial";
        ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 20);
        
        if (keys.r) {
          resetGame();
        }
        
        requestAnimationFrame(loop);
        return;
      }

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

      // Update enemies
      for (let enemy of enemies) {
        enemy.x += enemy.vx;
        
        // Reverse direction at platform edges
        if (enemy.x <= enemy.platformX || enemy.x + enemy.width >= enemy.platformX + enemy.platformWidth) {
          enemy.vx = -enemy.vx;
        }
        
        // Check collision with player
        if (checkCollision(player, enemy)) {
          gameOver = true;
        }
      }

      // Procedurally generate more platforms as you move right
      const farthest = Math.max(...platforms.map((p) => p.x + p.width));
      if (player.x + 400 > farthest) {
        const lastY = platforms[platforms.length - 1].y;
        const newWidth = 100 + Math.random() * 100;
        const newGap = 50 + Math.random() * 100;
        const newY = lastY + (Math.random() < 0.5 ? -40 : 40);
        const newPlatform = {
          x: farthest + newGap,
          y: Math.min(Math.max(newY, 200), canvas.height - 50),
          width: newWidth,
          height: 20,
        };
        platforms.push(newPlatform);
        
        // Add enemy to new platform (50% chance)
        if (Math.random() < 0.5) {
          enemies.push({
            x: newPlatform.x + 20,
            y: newPlatform.y - 30,
            width: 30,
            height: 30,
            vx: Math.random() < 0.5 ? 1 : -1,
            platformX: newPlatform.x,
            platformWidth: newPlatform.width,
          });
        }
      }

      // Check if player fell off screen
      if (player.y > canvas.height) {
        gameOver = true;
      }

      // === Draw ===
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera follow
      const camX = player.x - canvas.width / 2;
      ctx.save();
      ctx.translate(-camX, 0);

      // Draw platforms
      ctx.fillStyle = "#333";
      for (let plat of platforms) {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
      }

      // Draw enemies
      ctx.fillStyle = "#f00";
      for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
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
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="block w-full h-screen fixed top-0 left-0 z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}