"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function Platformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const gravity = 0.5;
  let gameOver = false;
  let score = 0;

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

  let keys = { left: false, right: false, up: false, r: false };

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
    alive: boolean;
  }

  interface Collectible {
    x: number;
    y: number;
    width: number;
    height: number;
    collected: boolean;
  }

  let platforms: Platform[] = [];
  let enemies: Enemy[] = [];
  let collectibles: Collectible[] = [];

  platforms.push({ x: 50, y: 400, width: 200, height: 20 });
  
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

  const resetGame = () => {
    gameOver = false;
    score = 0;
    player.x = 100;
    player.y = 100;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
    platforms = [{ x: 50, y: 400, width: 200, height: 20 }];
    enemies = [];
    collectibles = [];
  };

  const checkCollision = (a: any, b: any) => (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );

  const loop = () => {
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);
      ctx.font = "24px Arial";
      ctx.fillText("Score: " + Math.floor(score), canvas.width / 2, canvas.height / 2);
      ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 40);

      if (keys.r) resetGame();

      requestAnimationFrame(loop);
      return;
    }

    if (keys.left) player.vx = -player.speed;
    else if (keys.right) player.vx = player.speed;
    else player.vx = 0;

    if (keys.up && player.onGround) {
      player.vy = -player.jumpPower;
      player.onGround = false;
    }

    player.vy += gravity;
    player.x += player.vx;
    player.y += player.vy;
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

    for (let enemy of enemies) {
      if (!enemy.alive) continue;

      enemy.x += enemy.vx;
      if (enemy.x <= enemy.platformX || enemy.x + enemy.width >= enemy.platformX + enemy.platformWidth) {
        enemy.vx = -enemy.vx;
      }

      // Stomp mechanic
      if (
        player.vy > 0 &&
        player.y + player.height <= enemy.y + 10 &&
        checkCollision(player, enemy)
      ) {
        enemy.alive = false;
        player.vy = -player.jumpPower / 1.5;
        score += 100;
      } else if (checkCollision(player, enemy)) {
        gameOver = true;
      }
    }

    for (let collect of collectibles) {
      if (!collect.collected && checkCollision(player, collect)) {
        collect.collected = true;
        score += 50;
      }
    }

    const farthest = Math.max(...platforms.map(p => p.x + p.width));
    if (farthest) {
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

      if (Math.random() < 0.5) {
        enemies.push({
          x: newPlatform.x + 20,
          y: newPlatform.y - 30,
          width: 30,
          height: 30,
          vx: Math.random() < 0.5 ? 1 : -1,
          platformX: newPlatform.x,
          platformWidth: newPlatform.width,
          alive: true,
        });
      }

      if (Math.random() < 0.7) {
        collectibles.push({
          x: newPlatform.x + newPlatform.width / 2 - 10,
          y: newPlatform.y - 20,
          width: 20,
          height: 20,
          collected: false,
        });
      }
    }

    if (player.y > canvas.height) gameOver = true;

    score += 0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const camX = player.x - canvas.width / 2;
    ctx.save();
    ctx.translate(-camX, 0);

    // Background
    ctx.fillStyle = "#eef";
    ctx.fillRect(camX, 0, canvas.width, canvas.height);

    // Platforms
    ctx.fillStyle = "#333";
    for (let plat of platforms) {
      ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    }

    // Enemies
    ctx.fillStyle = "#f00";
    for (let enemy of enemies) {
      if (enemy.alive) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      }
    }

    // Collectibles
    ctx.fillStyle = "gold";
    for (let c of collectibles) {
      if (!c.collected) {
        ctx.beginPath();
        ctx.arc(c.x + c.width / 2, c.y + c.height / 2, 10, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Player
    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.restore();

    // Score HUD
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + Math.floor(score), 20, 40);

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
    <div className="max-h-screen">
    <Header />
    <canvas 
      ref={canvasRef} 
      className="block w-full h-screen fixed top-0 left-0 z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
    </div>
  );
}