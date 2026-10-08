import { useEffect, useRef } from 'react';

interface Stream {
  xPercent: number;
  yOffset: number;
  speed: number;
  length: number;
  chars: string[];
  opacity: number;
}

// Terary digits ONLY: 0, 1, and 2
const TERNARY_DIGITS = ['0', '1', '2'];

const getRandomTernaryChar = () => TERNARY_DIGITS[Math.floor(Math.random() * TERNARY_DIGITS.length)];

export default function TernaryCodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dense matrix ternary data streams distributed across the entire screen
    const columnsData: number[] = [
      0.02, 0.05, 0.09, 0.13, 0.17, 0.21, 0.25, 0.29, 0.33, 0.37,
      0.41, 0.45, 0.49, 0.53, 0.57, 0.61, 0.65, 0.69, 0.73, 0.77,
      0.81, 0.86, 0.91, 0.96
    ];
    
    let streams: Stream[] = columnsData.map((xPercent, i) => {
      const length = 20 + (i % 6) * 5;
      return {
        xPercent,
        yOffset: (i * 90 + (i % 4) * 160) % 1000,
        // Continuous, asynchronous downward speeds
        speed: 0.38 + (i % 5) * 0.12,
        length,
        chars: Array.from({ length: 54 }, () => getRandomTernaryChar()),
        opacity: 0.25 + (i % 4) * 0.12,
      };
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const charHeight = 18;
    const fontSize = 11;

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.66, 2.5); // normalized frame delta
      lastTime = now;

      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px "Space Mono", monospace`;
      ctx.textAlign = 'center';

      streams.forEach((stream) => {
        const x = width * stream.xPercent;
        const totalStreamHeight = stream.length * charHeight;

        // Render characters
        for (let j = 0; j < stream.length; j++) {
          const char = stream.chars[j];
          let y = (stream.yOffset + j * charHeight) % (height + totalStreamHeight);
          y = y - totalStreamHeight / 2;

          if (y > -20 && y < height + 20) {
            // Slight gradient fade towards top & bottom of stream
            const progress = j / stream.length;
            const fade = Math.sin(progress * Math.PI);
            const alpha = Math.max(0.25, Math.min(0.85, (stream.opacity + 0.15) * fade));

            // Satin gold color with subtle glow for front-most layer presence
            ctx.shadowColor = 'rgba(223, 183, 92, 0.45)';
            ctx.shadowBlur = 3;
            ctx.fillStyle = `rgba(212, 163, 62, ${alpha})`;
            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;
          }
        }

        // Animate downward continuously unless prefers-reduced-motion
        if (!prefersReducedMotion) {
          stream.yOffset += stream.speed * dt;
          if (stream.yOffset > height + totalStreamHeight) {
            stream.yOffset = -totalStreamHeight;
            // Regenerate random ternary stream characters
            for (let k = 0; k < stream.chars.length; k++) {
              stream.chars[k] = getRandomTernaryChar();
            }
          }
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[35]"
      style={{ opacity: 0.95 }}
    />
  );
}
