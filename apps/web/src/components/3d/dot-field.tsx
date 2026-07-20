"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = false,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17",
  className,
  style,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const dotGrid = useMemo(() => {
    if (!size.width || !size.height) {
      return [];
    }

    const cols = Math.ceil(size.width / dotSpacing) + 1;
    const rows = Math.ceil(size.height / dotSpacing) + 1;
    const points = [] as Array<{ x: number; y: number }>;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        points.push({ x: col * dotSpacing, y: row * dotSpacing });
      }
    }

    return points;
  }, [size.width, size.height, dotSpacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper || !size.width || !size.height) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, size.width * dpr);
    canvas.height = Math.max(1, size.height * dpr);
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pointer = { x: size.width / 2, y: size.height / 2, active: false };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      pointer.x = clamp(x, 0, rect.width);
      pointer.y = clamp(y, 0, rect.height);
      pointer.active = inside;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerLeave);
    window.addEventListener("pointercancel", handlePointerLeave);

    let frame = 0;
    let animationFrame = 0;
    let running = true;

    const draw = () => {
      if (!running) return;

      context.clearRect(0, 0, size.width, size.height);

      const gradient = context.createLinearGradient(0, 0, size.width, size.height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      context.fillStyle = gradient;
      context.fillRect(0, 0, size.width, size.height);

      if (glowRadius > 0 && pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, glowRadius);
        glow.addColorStop(0, `${glowColor}80`);
        glow.addColorStop(1, `${glowColor}00`);
        context.fillStyle = glow;
        context.fillRect(0, 0, size.width, size.height);
      }

      context.globalCompositeOperation = "source-over";

      dotGrid.forEach((point) => {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const distance = Math.hypot(dx, dy);
        let offsetX = 0;
        let offsetY = 0;

        if (pointer.active && distance < cursorRadius) {
          const force = (1 - distance / cursorRadius) * cursorForce * bulgeStrength;
          const ratio = distance === 0 ? 0 : force / distance;
          const direction = bulgeOnly ? 1 : -1;
          offsetX = dx * ratio * direction;
          offsetY = dy * ratio * direction;
        }

        const wave = waveAmplitude * Math.sin((point.x + point.y) * 0.03 + frame * 0.05);
        const x = point.x + offsetX;
        const y = point.y + offsetY + wave;

        const alpha = 0.2 + 0.25 * Math.sin((point.x + point.y) * 0.04 + frame * 0.07);
        context.fillStyle = `rgba(255,255,255,${clamp(alpha, 0.15, 0.65)})`;
        context.beginPath();
        context.arc(x, y, dotRadius, 0, Math.PI * 2);
        context.fill();
      });

      if (sparkle) {
        context.globalCompositeOperation = "lighter";
        for (let i = 0; i < 10; i += 1) {
          const x = Math.random() * size.width;
          const y = Math.random() * size.height;
          const radius = Math.random() * 1.5 + 0.5;
          const shine = context.createRadialGradient(x, y, 0, x, y, radius * 5);
          shine.addColorStop(0, "rgba(255,255,255,0.9)");
          shine.addColorStop(1, "rgba(255,255,255,0)");
          context.fillStyle = shine;
          context.beginPath();
          context.arc(x, y, radius * 3, 0, Math.PI * 2);
          context.fill();
        }
      }

      frame += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("pointercancel", handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [size.width, size.height, dotGrid, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, glowColor, dotRadius]);

  return (
    <div ref={wrapperRef} className={className} style={style}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
