import React, { useEffect, useRef } from "react";

/**
 * =====================================================================
 * NetworkCanvas Component
 * =====================================================================
 * This component renders an interactive, lightweight HTML5 Canvas animation
 * simulating network nodes, data packets, and interconnecting topology lines.
 * It provides a visual representation of computer networking and infrastructure
 * without compromising text legibility or performance.
 */
export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions based on parent container size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Number of nodes adapted to screen width for performance
    const nodeCount = Math.floor(Math.min(canvas.width, 1400) / 28);
    const nodes = [];

    // Initialize node coordinates, velocities, and radii
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45, // Subtle, slow drift speed
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        color: i % 4 === 0 ? "rgba(56, 189, 248, 0.7)" : "rgba(6, 182, 212, 0.5)" // Cyan & Blue tones
      });
    }

    // Main animation loop to draw nodes and interconnecting network lines
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Maximum distance for drawing a line between two nodes
      const maxDistance = 120;

      // Update positions and draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move node
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce gently off canvas borders
        if (nodeA.x < 0 || nodeA.x > canvas.width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > canvas.height) nodeA.vy *= -1;

        // Draw connections to nearby nodes (simulating network hops)
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Line opacity decreases as distance increases
            const alpha = (1 - distance / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw the network node point
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up event listeners and animation frame on unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  );
}
