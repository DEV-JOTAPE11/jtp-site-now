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

      /* O canvas cobre a página inteira (altura = scrollHeight, ~9400px no
         desktop), mas só ~900px disso estão na tela. Redesenhar tudo a 45fps
         custava ~84 mil pontos de path e um clear de 18 megapixels por frame
         — a thread principal nunca ficava ociosa. Como o desenho é função
         pura de (x, y, time), recortar para a faixa visível produz
         exatamente os mesmos pixels onde o olho está.

         Estas medidas ficam em cache e só são refeitas em resize: ler
         getBoundingClientRect() por frame reintroduziria layout forçado. */
      let canvasTop = 0;
      let viewportHeight = window.innerHeight;
      let scrollY = window.scrollY;

      const measure = () => {
        canvasTop = canvas.getBoundingClientRect().top + window.scrollY;
        viewportHeight = window.innerHeight;
        scrollY = window.scrollY;
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

      /* Desenha o intervalo vertical [top, bottom) do canvas. Todos os
         parâmetros visuais (step, gridSize, cores, opacidades, amplitudes,
         número de orbs) são idênticos ao desenho de página inteira — o que
         muda é só o recorte. O clip garante que nada pinte fora da área que
         acabou de ser limpa, senão sobrariam rastros nas bordas. */
      const draw = (rawTop: number, rawBottom: number) => {
        /* Alinhar a faixa a pixels inteiros não é cosmético: com um rect
           fracionário o Skia troca o clip rápido por um clip antisserrilhado
           e passa a multiplicar a cobertura de tudo que é desenhado dentro,
           o que muda alguns milhares de pixels das linhas translúcidas. Com
           os limites inteiros o resultado é bit a bit idêntico ao desenho de
           página inteira (verificado com getImageData). */
        const top = Math.floor(rawTop);
        const bottom = Math.ceil(rawBottom);
        const bandHeight = bottom - top;
        if (bandHeight <= 0) return;

        const gridSize = isMobile ? 160 : 120;
        const step = isMobile ? 8 : 4;
        const columns = Math.ceil(canvas.width / gridSize) + 2;
        const rows = Math.ceil(canvas.height / gridSize) + 2;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, top, canvas.width, bandHeight);
        ctx.clip();
        ctx.clearRect(0, top, canvas.width, bandHeight);

        /* Alinhar o início ao múltiplo de `step` faz a polilinha amostrar
           exatamente os mesmos vértices do desenho completo; sem isso os
           pontos sairiam deslocados e a onda mudaria de forma. */
        const yStart = Math.max(0, Math.floor(top / step) * step - step);
        const yEnd = Math.min(canvas.height, bottom + step);

        for (let col = 0; col <= columns; col += 1) {
          const baseX = col * gridSize;
          ctx.beginPath();

          for (let y = yStart; y <= yEnd; y += step) {
            const wave =
              Math.sin(y * 0.008 + time * 0.4 + col * 0.5) * 8 +
              Math.sin(y * 0.015 + time * 0.2 + col * 0.3) * 4;
            const x = baseX + wave;

            if (y === yStart) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.strokeStyle = "hsla(210, 70%, 50%, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        /* Só as linhas horizontais cuja base cai na faixa. A folga de 16px
           cobre a amplitude máxima da onda (8 + 4, arredondado para cima). */
        const rowStart = Math.max(0, Math.floor((top - 16) / gridSize));
        const rowEnd = Math.min(rows, Math.ceil((bottom + 16) / gridSize));

        for (let row = rowStart; row <= rowEnd; row += 1) {
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
          /* Descarta o traçado inteiro quando ele não alcança a faixa. A
             folga de 120px cobre o halo: shadowBlur 12 + o fillRect do
             gradiente radial, que chega a raio*10 (~70px). */
          let minY = Infinity;
          let maxY = -Infinity;
          for (const point of path.points) {
            if (point.y < minY) minY = point.y;
            if (point.y > maxY) maxY = point.y;
          }
          if (maxY + 120 < top || minY - 120 > bottom) return;

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

          if (driftY + orb.r < top || driftY - orb.r > bottom) return;

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

        ctx.restore();
      };

      /* Meio viewport de folga acima e abaixo: o que entra na tela durante o
         scroll já foi pintado no frame anterior. */
      const drawVisibleBand = () => {
        const margin = viewportHeight * 0.5;
        const offset = scrollY - canvasTop;
        draw(
          Math.max(0, offset - margin),
          Math.min(canvas.height, offset + viewportHeight + margin)
        );
      };

      const update = (now: number) => {
        if (disposed) return;

        const delta = now - lastFrame;
        if (delta < targetInterval) {
          animationId = window.requestAnimationFrame(update);
          return;
        }
        lastFrame = now - (delta % targetInterval);

        drawVisibleBand();

        time += 0.016;
        animationId = window.requestAnimationFrame(update);
      };

      const startLoop = () => {
        if (animationId || disposed || reducedMotion) return;
        /* Recuar um intervalo faz o primeiro frame após a retomada desenhar
           de imediato, sem esperar o throttle. */
        lastFrame = performance.now() - targetInterval;
        animationId = window.requestAnimationFrame(update);
      };

      const stopLoop = () => {
        if (!animationId) return;
        window.cancelAnimationFrame(animationId);
        animationId = 0;
      };

      const resize = () => {
        const width = window.innerWidth;
        const height = document.documentElement.scrollHeight;

        /* Escrever em canvas.width/height limpa o bitmap inteiro, e o
           redesenho por faixa não repinta o que está fora da tela. Só
           reatribui quando muda de fato — o ResizeObserver dispara também
           em situações que não alteram dimensão nenhuma. */
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          measure();
          /* Sem loop rodando ninguém repintaria o canvas recém-limpo. */
          if (reducedMotion) draw(0, canvas.height);
          return;
        }

        measure();
      };

      const handleScroll = () => {
        /* Só guarda a posição; quem desenha é o rAF, no máximo uma vez por
           frame. Nada de setState aqui. */
        scrollY = window.scrollY;
      };

      const handleVisibility = () => {
        if (document.hidden) {
          stopLoop();
        } else {
          startLoop();
        }
      };

      resize();

      if (reducedMotion) {
        /* Uma passada na página inteira: como não há loop, o que não for
           pintado agora ficaria vazio ao rolar. */
        draw(0, canvas.height);
      } else {
        startLoop();
      }

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(document.documentElement);
      window.addEventListener("resize", resize);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        stopLoop();
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("visibilitychange", handleVisibility);
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
