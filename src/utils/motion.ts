type AnimationType = "fadeIn" | "slideDown" | "fadeUp";

export function animateOnView(el: HTMLElement, type: AnimationType, delay = 0): void {
  el.style.opacity = "0";
  el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;

  if (type === "slideDown") el.style.transform = "translateY(-50px)";
  else if (type === "fadeUp") el.style.transform = "translateY(40px)";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(el);
}
