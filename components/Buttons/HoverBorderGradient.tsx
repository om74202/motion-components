'use client'

import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

type RGB = [number, number, number];
type LineSegment = {
  kind: "line";
  len: number;
  lx: number;
  ly: number;
  dx: number;
  dy: number;
};
type ArcSegment = {
  kind: "arc";
  len: number;
  ax: number;
  ay: number;
  sa: number;
};
type BorderSegment = LineSegment | ArcSegment;

function getCircularDistance(a: number, b: number) {
  const distance = Math.abs(a - b);
  return distance > 0.5 ? 1 - distance : distance;
}

function buildSampler(width: number, height: number, radius: number) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  const arc = (Math.PI / 2) * safeRadius;
  const segments: BorderSegment[] = [
    { kind: "line", len: width - 2 * safeRadius, lx: safeRadius, ly: 0, dx: 1, dy: 0 },
    { kind: "arc", len: arc, ax: width - safeRadius, ay: safeRadius, sa: -Math.PI / 2 },
    { kind: "line", len: height - 2 * safeRadius, lx: width, ly: safeRadius, dx: 0, dy: 1 },
    { kind: "arc", len: arc, ax: width - safeRadius, ay: height - safeRadius, sa: 0 },
    { kind: "line", len: width - 2 * safeRadius, lx: width - safeRadius, ly: height, dx: -1, dy: 0 },
    { kind: "arc", len: arc, ax: safeRadius, ay: height - safeRadius, sa: Math.PI / 2 },
    { kind: "line", len: height - 2 * safeRadius, lx: 0, ly: height - safeRadius, dx: 0, dy: -1 },
    { kind: "arc", len: arc, ax: safeRadius, ay: safeRadius, sa: Math.PI },
  ];
  const perimeter = segments.reduce((sum, segment) => sum + segment.len, 0);
  const horizontal = width - 2 * safeRadius;
  const vertical = height - 2 * safeRadius;
  const anchorOffsets = [
    horizontal / 2,
    horizontal + arc + vertical / 2,
    horizontal + arc + vertical + arc + horizontal / 2,
    horizontal + arc + vertical + arc + horizontal + arc + vertical / 2,
  ];
  const anchors = anchorOffsets.map((offset) => offset / perimeter);

  const sample = (progress: number) => {
    let distance = ((((progress % 1) + 1) % 1) * perimeter) || 0;

    for (const segment of segments) {
      if (distance <= segment.len) {
        if (segment.kind === "line") {
          return {
            x: segment.lx + segment.dx * distance,
            y: segment.ly + segment.dy * distance,
          };
        }

        const angle = segment.sa + (distance / segment.len) * (Math.PI / 2);
        return {
          x: segment.ax + safeRadius * Math.cos(angle),
          y: segment.ay + safeRadius * Math.sin(angle),
        };
      }

      distance -= segment.len;
    }

    return { x: safeRadius, y: 0 };
  };

  return { sample, anchors };
}

function useAnimatedBorder({
  buttonRef,
  canvasRef,
  color,
  speed,
  radius,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: RGB;
  speed: number;
  radius: number;
}) {
  const state = useRef({
    progress: 0,
    hovered: false,
    spreadOrigin: 0,
    spreadAmount: 0,
    sampler: null as ReturnType<typeof buildSampler>["sample"] | null,
    anchors: [] as number[],
    animationFrame: 0,
  });

  const drawSegment = useCallback(
    (
      context: CanvasRenderingContext2D,
      sampler: NonNullable<(typeof state.current)["sampler"]>,
      start: number,
      end: number,
      strokeStyle: string,
      lineWidth: number,
      shadowBlur = 0
    ) => {
      const from = sampler(start);
      const to = sampler(end);
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.shadowBlur = shadowBlur;
      context.shadowColor = strokeStyle;
      context.stroke();
    },
    []
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const sampler = state.current.sampler;
    if (!canvas || !sampler) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height } = canvas;
    const { progress, hovered, spreadOrigin } = state.current;
    const [red, green, blue] = color;

    context.clearRect(0, 0, width, height);

    const targetSpread = hovered ? 0.5 : 0;
    state.current.spreadAmount += (targetSpread - state.current.spreadAmount) * 0.1;
    if (hovered && targetSpread - state.current.spreadAmount < 0.002) {
      state.current.spreadAmount = 0.5;
    }
    if (!hovered && state.current.spreadAmount < 0.002) {
      state.current.spreadAmount = 0;
    }
    const spread = state.current.spreadAmount;

    const segments = 320;
    const segmentStep = 1 / segments;

    for (let index = 0; index < segments; index++) {
      const start = index / segments;
      drawSegment(
        context,
        sampler,
        start,
        start + segmentStep,
        `rgba(${red}, ${green}, ${blue}, 0.14)`,
        1.4
      );
    }

    if (spread > 0.002) {
      for (let index = 0; index < segments; index++) {
          const current = index / segments;
        const distance = getCircularDistance(current, spreadOrigin);

        if (distance <= spread) {
          const edge = Math.min(1, (spread - distance) / 0.08);
          const alpha = 0.2 + edge * 0.75;
          const widthScale = 1 + edge * 1.8;
          const glow = 3 + edge * 1;

          drawSegment(
            context,
            sampler,
            current,
            current + segmentStep,
            `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`,
            widthScale,
            glow
          );
        }
      }
    }

    if (!hovered) {
      const trailSteps = 96;
      const trailLength = 0.18;

      for (let index = 0; index < trailSteps; index++) {
        const factor = index / trailSteps;
        const current = ((progress - factor * trailLength) % 1 + 1) % 1;
        const alpha = 0.14 + factor * 0.7;
        const lineWidth = 0.7 + factor * 1;
        const glow = 4 + factor * 10;

        drawSegment(
          context,
          sampler,
          current,
          current + 0.004,
          `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`,
          lineWidth,
          glow
        );
      }
    }

    context.shadowBlur = 0;
  }, [canvasRef, color, drawSegment]);

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;
    const currentState = state.current;

    const syncSize = () => {
      const { width, height } = button.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      const geometry = buildSampler(width, height, radius);
      currentState.sampler = geometry.sample;
      currentState.anchors = geometry.anchors;
      draw();
    };

    const animate = () => {
      if (!currentState.hovered) {
        currentState.progress = (currentState.progress + speed) % 1;
      }
      draw();
      currentState.animationFrame = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(button);
    syncSize();

    const handlePointerEnter = () => {
      currentState.hovered = true;
      const nearestAnchor =
        currentState.anchors.reduce((closest, anchor) => {
          return getCircularDistance(anchor, currentState.progress) <
            getCircularDistance(closest, currentState.progress)
            ? anchor
            : closest;
        }, currentState.anchors[0] ?? currentState.progress) ?? currentState.progress;
      currentState.spreadOrigin = nearestAnchor;
    };

    const handlePointerLeave = () => {
      currentState.hovered = false;
    };

    button.addEventListener("pointerenter", handlePointerEnter);
    button.addEventListener("pointerleave", handlePointerLeave);
    currentState.animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(currentState.animationFrame);
      resizeObserver.disconnect();
      button.removeEventListener("pointerenter", handlePointerEnter);
      button.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [buttonRef, canvasRef, draw, radius, speed]);
}

export const HoverBorderGradient = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accent: RGB = [108, 92, 231];

  useAnimatedBorder({
    buttonRef,
    canvasRef,
    color: accent,
    speed: 0.0024,
    radius: 999,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative inline-flex"
    >
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.985 }}
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:cursor-pointer"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-full"
        />
        <span className="absolute inset-[1.5px] rounded-full bg-neutral-950" />
        <span
          className="absolute inset-[8px] rounded-full opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(${accent.join(",")}, 0.08), transparent 74%)`,
          }}
        />
        <span className="relative z-20 inline-flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          Om Mishra
        </span>
      </motion.button>
    </motion.div>
  );
};
