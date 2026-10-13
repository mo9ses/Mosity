interface TiltOptions {
  max?: number;
  speed?: number;
}

export function applyTilt(el: HTMLElement, { max = 25, speed = 400 }: TiltOptions = {}): void {
  el.style.transition = `transform ${speed}ms ease`;
  el.style.transformStyle = "preserve-3d";
  el.style.willChange = "transform";

  el.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -y * max;
    const rotateY = x * max;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}
