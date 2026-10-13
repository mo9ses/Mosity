import { sectionWrapper } from "../hoc/sectionWrapper";
import { animateOnView } from "../utils/motion";

const START = new Date("2026-01-06T00:00:00");

interface Stat {
  label: string;
  getValue: (ms: number) => string;
}

const stats: Stat[] = [
  {
    label: "Together",
    getValue: (_ms) => {
      const start = START;
      const now = new Date(Date.now());
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      const parts: string[] = [];
      if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
      if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
      if (days > 0 || parts.length === 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
      return parts.join(", ");
    },
  },
  {
    label: "Months",
    getValue: (_ms) => {
      const start = START;
      const now = new Date(Date.now());
      const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      return `${months.toLocaleString()} month${months !== 1 ? "s" : ""}`;
    },
  },
  {
    label: "Days",
    getValue: (ms) => {
      const days = Math.floor(ms / 86400000);
      return `${days.toLocaleString()} day${days !== 1 ? "s" : ""}`;
    },
  },
  {
    label: "Hours",
    getValue: (ms) => {
      const hours = Math.floor(ms / 3600000);
      return `${hours.toLocaleString()} hour${hours !== 1 ? "s" : ""}`;
    },
  },
  {
    label: "Minutes",
    getValue: (ms) => {
      const mins = Math.floor(ms / 60000);
      return `${mins.toLocaleString()} minute${mins !== 1 ? "s" : ""}`;
    },
  },
  {
    label: "Seconds",
    getValue: (ms) => {
      const secs = Math.floor(ms / 1000);
      return `${secs.toLocaleString()} second${secs !== 1 ? "s" : ""}`;
    },
  },
];

export function mountTime(parent: HTMLElement): void {
  const fragment = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = "section-head-text";
  heading.textContent = "Our  Time Together";
  animateOnView(heading, "slideDown");

  const grid = document.createElement("div");
  grid.className = "time-grid";

  const valueEls: HTMLElement[] = [];

  stats.forEach(({ label }) => {
    const card = document.createElement("div");
    card.className = "time-card";
    animateOnView(card, "fadeUp");

    const valueEl = document.createElement("p");
    valueEl.className = "time-value";

    const labelEl = document.createElement("p");
    labelEl.className = "time-label";
    labelEl.textContent = label;

    card.appendChild(valueEl);
    card.appendChild(labelEl);
    grid.appendChild(card);
    valueEls.push(valueEl);
  });

  function tick(): void {
    const ms = Date.now() - START.getTime();
    stats.forEach(({ getValue }, i) => {
      valueEls[i].textContent = getValue(ms);
    });
  }

  tick();
  setInterval(tick, 1000);

  fragment.appendChild(heading);
  fragment.appendChild(grid);
  sectionWrapper(parent, "time", fragment);
}
