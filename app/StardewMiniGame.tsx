"use client";
import React, { useRef, useEffect } from "react";
import { FARMER_SPRITE, CROP_SPRITE, TILE_SPRITE } from "./minigameAssets";

// Simple Stardew Valley-inspired mini game: move a farmer with arrow keys, collect crops
const TILE_SIZE = 32;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 6;
const INITIAL_FARMER = { x: 1, y: 1 };
const INITIAL_CROPS = [
  { x: 4, y: 2 },
  { x: 7, y: 4 },
  { x: 2, y: 5 },
];

function randomCrop() {
  return {
    x: Math.floor(Math.random() * GRID_WIDTH),
    y: Math.floor(Math.random() * GRID_HEIGHT),
  };
}

export default function StardewMiniGame() {
  const canvasRef = useRef(null);
  const [farmer, setFarmer] = React.useState(INITIAL_FARMER);
  const [crops, setCrops] = React.useState(INITIAL_CROPS);
  const [score, setScore] = React.useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let { x, y } = farmer;
      if (e.key === "ArrowUp") y = Math.max(0, y - 1);
      if (e.key === "ArrowDown") y = Math.min(GRID_HEIGHT - 1, y + 1);
      if (e.key === "ArrowLeft") x = Math.max(0, x - 1);
      if (e.key === "ArrowRight") x = Math.min(GRID_WIDTH - 1, x + 1);
      setFarmer({ x, y });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [farmer]);

  useEffect(() => {
    // Check for crop collection
    const collected = crops.findIndex(c => c.x === farmer.x && c.y === farmer.y);
    if (collected !== -1) {
      setScore(score + 1);
      setCrops(crops => {
        const newCrops = crops.slice();
        newCrops.splice(collected, 1);
        // Add a new crop at a random location
        newCrops.push(randomCrop());
        return newCrops;
      });
    }
  }, [farmer, crops, score]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load images
    const tileImg = new window.Image();
    tileImg.src = TILE_SPRITE;
    const farmerImg = new window.Image();
    farmerImg.src = FARMER_SPRITE;
    const cropImg = new window.Image();
    cropImg.src = CROP_SPRITE;

    // Draw everything after all images are loaded
    const draw = () => {
      // Draw tiles
      for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
          ctx.drawImage(tileImg, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
      // Draw crops
      crops.forEach(crop => {
        ctx.drawImage(cropImg, crop.x * TILE_SIZE, crop.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      });
      // Draw farmer
      ctx.drawImage(farmerImg, farmer.x * TILE_SIZE, farmer.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };

    // Wait for all images to load before drawing
    let loaded = 0;
    [tileImg, farmerImg, cropImg].forEach(img => {
      img.onload = () => {
        loaded++;
        if (loaded === 3) draw();
      };
    });
  }, [farmer, crops]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-xl font-bold mb-2 text-cyan-300">Mini Farm Game</h2>
      <canvas
        ref={canvasRef}
        width={TILE_SIZE * GRID_WIDTH}
        height={TILE_SIZE * GRID_HEIGHT}
        className="border border-cyan-700 rounded bg-gray-900"
        tabIndex={0}
        aria-label="Stardew Valley inspired mini game"
      />
      <div className="mt-2 text-cyan-200">Score: {score}</div>
      <div className="text-xs text-gray-400 mt-1">Use arrow keys to move and collect crops!</div>
    </div>
  );
}
