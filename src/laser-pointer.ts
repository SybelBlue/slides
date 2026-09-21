import type { RevealPlugin } from "reveal.js";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

const trailDuration = 400;

export default function LaserPointer(): RevealPlugin {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return { id: "laser-pointer" };

  const trail: TrailPoint[] = [];
  let active = false;
  let position: { x: number; y: number } | null = null;
  let animationFrame = 0;

  const resizeCanvas = (): void => {
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * pixelRatio);
    canvas.height = Math.round(window.innerHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    requestDraw();
  };

  const draw = (now: number): void => {
    animationFrame = 0;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (!active || !position) return;

    while (trail.length && now - trail[0].time >= trailDuration) {
      trail.shift();
    }

    context.lineCap = "round";
    context.lineJoin = "round";

    for (let index = 1; index < trail.length; index++) {
      const previous = trail[index - 1];
      const current = trail[index];
      const strength = 1 - (now - current.time) / trailDuration;

      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(current.x, current.y);
      context.lineWidth = 1 + 6 * strength;
      context.strokeStyle = `rgba(255, 52, 52, ${0.75 * strength})`;
      context.shadowColor = "#ff3434";
      context.shadowBlur = 15 * strength;
      context.stroke();
    }

    context.beginPath();
    context.arc(position.x, position.y, 4, 0, Math.PI * 2);
    context.fillStyle = "#ff3434";
    context.shadowColor = "#ff3434";
    context.shadowBlur = 16;
    context.fill();

    context.beginPath();
    context.arc(position.x, position.y, 1.5, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.shadowBlur = 0;
    context.fill();

    if (trail.length) requestDraw();
  };

  const requestDraw = (): void => {
    if (active && position && !animationFrame) {
      animationFrame = requestAnimationFrame(draw);
    }
  };

  const movePointer = (event: PointerEvent): void => {
    if (event.pointerType === "touch") return;

    position = { x: event.clientX, y: event.clientY };

    if (active) {
      canvas.hidden = false;
      trail.push({ ...position, time: performance.now() });
      if (trail.length > 80) trail.shift();
      requestDraw();
    }
  };

  const hidePointer = (): void => {
    position = null;
    trail.length = 0;
    canvas.hidden = true;
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  return {
    id: "laser-pointer",
    init(deck) {
      canvas.className = "presentation-laser-pointer";
      canvas.setAttribute("aria-hidden", "true");
      canvas.hidden = true;
      document.body.append(canvas);
      resizeCanvas();

      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", movePointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", hidePointer);

      deck.addKeyBinding(
        { keyCode: 76, key: "L", description: "Toggle laser pointer" },
        () => {
          active = !active;
          document.body.classList.toggle("laser-pointer-active", active);

          if (active && position) {
            canvas.hidden = false;
            trail.push({ ...position, time: performance.now() });
            requestDraw();
          } else {
            hidePointer();
          }
        },
      );
    },
    destroy() {
      hidePointer();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", movePointer);
      document.documentElement.removeEventListener("pointerleave", hidePointer);
      document.body.classList.remove("laser-pointer-active");
      canvas.remove();
    },
  };
}
