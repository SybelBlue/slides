import type { RevealPlugin } from "reveal.js";

export default function LaserPointer(): RevealPlugin {
  const pointer = document.createElement("div");
  let active = false;
  let hasPosition = false;

  const movePointer = (event: PointerEvent): void => {
    if (event.pointerType === "touch") return;

    pointer.style.left = `${event.clientX}px`;
    pointer.style.top = `${event.clientY}px`;
    hasPosition = true;
    pointer.hidden = !active;
  };

  const hidePointer = (): void => {
    pointer.hidden = true;
    hasPosition = false;
  };

  return {
    id: "laser-pointer",
    init(deck) {
      pointer.className = "presentation-laser-pointer";
      pointer.setAttribute("aria-hidden", "true");
      pointer.hidden = true;
      document.body.append(pointer);

      window.addEventListener("pointermove", movePointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", hidePointer);

      deck.addKeyBinding(
        { keyCode: 76, key: "L", description: "Toggle laser pointer" },
        () => {
          active = !active;
          document.body.classList.toggle("laser-pointer-active", active);
          pointer.hidden = !active || !hasPosition;
        },
      );
    },
    destroy() {
      window.removeEventListener("pointermove", movePointer);
      document.documentElement.removeEventListener("pointerleave", hidePointer);
      document.body.classList.remove("laser-pointer-active");
      pointer.remove();
    },
  };
}
