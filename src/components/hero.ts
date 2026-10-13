import { mountHeartCanvas } from "./heart";

export function mountHero(parent: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "hero";

  const scrollLink = document.createElement("a");
  scrollLink.href = "#about";
  scrollLink.className = "hero-scroll-link";
  section.appendChild(scrollLink);

  mountHeartCanvas(section);

  const indicator = document.createElement("div");
  indicator.id = "downthing";
  indicator.className = "hero-indicator";

  const indicatorLink = document.createElement("a");
  indicatorLink.href = "#about";

  const pill = document.createElement("div");
  pill.className = "scroll-pill";

  const dot = document.createElement("div");
  dot.className = "scroll-dot";

  pill.appendChild(dot);
  indicatorLink.appendChild(pill);
  indicator.appendChild(indicatorLink);
  section.appendChild(indicator);

  parent.appendChild(section);
}
