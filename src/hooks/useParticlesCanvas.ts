"use client";

import { useEffect } from "react";

interface GlowPath {
  opacity: number;
  points: Array<{ x: number; y: number }>;
}

export function useParticlesCanvas(): void {
  useEffect(() => {
    let animationId = 0;
    let disposed = false;

    const start = () => {
      const canvas = document.getElementById(
        "particles-canvas"
      ) as HTMLCanvasElement | null;
      if (!canvas || disposed) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /* Com movimento reduzido o fundo é desenhado uma única vez, no mesmo
         estado inicial (time = 0), em vez de rodar o rAF continuamente:
         mesma imagem, sem o custo de CPU por frame. */
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let time = 0;
      const isMobile = window.innerWidth < 768;
      const targetInterval = isMobile ? 1000 / 30 : 1000 / 45;
      let lastFrame = 0;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
      };

      const buildGlowPaths = (): GlowPath[] => {
        const width = canvas.width;
        const height = canvas.height;

        return [
          {
            points: [
              { x: width * 0.55, y: height * 0.06 },
              { x: width * 0.65, y: height * 0.12 },
              { x: width * 0.72, y: height * 0.05 },
              { x: width * 0.8, y: height * 0.1 },
              { x: width * 0.88, y: height * 0.03 },
            ],
            opacity: 0.5,
          },
          {
            points: [
              { x: width * 0.02, y: height * 0.35 },
              { x: width * 0.12, y: height * 0.42 },
              { x: width * 0.2, y: height * 0.33 },
              { x: width * 0.28, y: height * 0.4 },
              { x: width * 0.36, y: height * 0.3 },
            ],
            opacity: 0.45,
          },
        ];
      };

      const update = (now: number) => {
        if (disposed) return;

        if (document.hidden) {
          animationId = window.requestAnimationFrame(update);
          return;
        }

        const delta = now - lastFrame;
        if (delta < targetInterval) {
          animationId = window.requestAnimationFrame(update);
          return;
        }
        lastFrame = now - (delta % targetInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gridSize = isMobile ? 160 : 120;
        const step = isMobile ? 8 : 4;
        const columns = Math.ceil(canvas.width / gridSize) + 2;
        const rows = Math.ceil(canvas.height / gridSize) + 2;

        for (let col = 0; col <= columns; col += 1) {
          const baseX = col * gridSize;
          ctx.beginPath();

          for (let y = 0; y <= canvas.height; y += step) {
            const wave =
              Math.sin(y * 0.008 + time * 0.4 + col * 0.5) * 8 +
              Math.sin(y * 0.015 + time * 0.2 + col * 0.3) * 4;
            const x = baseX + wave;

            if (y === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.strokeStyle = "hsla(210, 70%, 50%, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        for (let row = 0; row <= rows; row += 1) {
          const baseY = row * gridSize;
          ctx.beginPath();

          for (let x = 0; x <= canvas.width; x += step) {
            const wave =
              Math.sin(x * 0.008 + time * 0.3 + row * 0.5) * 8 +
              Math.sin(x * 0.015 + time * 0.15 + row * 0.3) * 4;
            const y = baseY + wave;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.strokeStyle = "hsla(210, 70%, 50%, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        buildGlowPaths().forEach((path, pathIndex) => {
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.2 + pathIndex * 1.8);
          const strokeOpacity = path.opacity * (0.6 + 0.4 * pulse);

          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          for (let i = 1; i < path.points.length; i += 1) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
          }

          ctx.strokeStyle = `hsla(210, 100%, 62%, ${strokeOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `hsla(210, 70%, 50%, ${strokeOpacity * 0.8})`;
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;

          path.points.forEach((point, pointIndex) => {
            const pointPulse =
              0.3 +
              0.7 *
                Math.sin(time * 2.5 + pathIndex * 2 + pointIndex * 1.3);
            const radius = 4 + 3 * pointPulse;

            const glow = ctx.createRadialGradient(
              point.x,
              point.y,
              0,
              point.x,
              point.y,
              radius * 10
            );
            glow.addColorStop(
              0,
              `hsla(210, 100%, 62%, ${path.opacity * pointPulse * 0.9})`
            );
            glow.addColorStop(
              0.3,
              `hsla(210, 70%, 50%, ${path.opacity * pointPulse * 0.4})`
            );
            glow.addColorStop(1, "transparent");

            ctx.fillStyle = glow;
            ctx.fillRect(
              point.x - radius * 10,
              point.y - radius * 10,
              radius * 20,
              radius * 20
            );

            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(210, 100%, 62%, ${path.opacity * (0.6 + 0.4 * pointPulse)})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(point.x, point.y, radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(0, 20%, 98%, ${path.opacity * pointPulse})`;
            ctx.fill();
          });
        });

        const orbs = isMobile
          ? [
              { cx: canvas.width * 0.2, cy: canvas.height * 0.15, r: 200 },
              { cx: canvas.width * 0.8, cy: canvas.height * 0.3, r: 250 },
              { cx: canvas.width * 0.5, cy: canvas.height * 0.5, r: 300 },
            ]
          : [
              { cx: canvas.width * 0.2, cy: canvas.height * 0.15, r: 200 },
              { cx: canvas.width * 0.8, cy: canvas.height * 0.3, r: 250 },
              { cx: canvas.width * 0.5, cy: canvas.height * 0.5, r: 300 },
              { cx: canvas.width * 0.3, cy: canvas.height * 0.7, r: 220 },
              { cx: canvas.width * 0.7, cy: canvas.height * 0.85, r: 180 },
            ];

        orbs.forEach((orb, index) => {
          const driftX = orb.cx + Math.sin(time * 0.2 + index * 1.5) * 40;
          const driftY = orb.cy + Math.cos(time * 0.15 + index * 1.2) * 30;
          const radial = ctx.createRadialGradient(
            driftX,
            driftY,
            0,
            driftX,
            driftY,
            orb.r
          );

          radial.addColorStop(0, "hsla(210, 70%, 50%, 0.06)");
          radial.addColorStop(0.5, "hsla(210, 70%, 50%, 0.02)");
          radial.addColorStop(1, "transparent");

          ctx.fillStyle = radial;
          ctx.fillRect(
            driftX - orb.r,
            driftY - orb.r,
            orb.r * 2,
            orb.r * 2
          );
        });

        time += 0.016;
        if (reducedMotion) return;
        animationId = window.requestAnimationFrame(update);
      };

      resize();
      animationId = window.requestAnimationFrame(update);

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(document.documentElement);
      window.addEventListener("resize", resize);

      return () => {
        window.cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resize);
        resizeObserver.disconnect();
      };
    };

    let cleanup: (() => void) | undefined;

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => {
        if (!disposed) {
          cleanup = start();
        }
      });
      return () => {
        disposed = true;
        window.cancelIdleCallback(idleId);
        cleanup?.();
      };
    } else {
      const timeoutId = setTimeout(() => {
        if (!disposed) {
          cleanup = start();
        }
      }, 100);
      return () => {
        disposed = true;
        clearTimeout(timeoutId);
        cleanup?.();
      };
    }
  }, []);
}
