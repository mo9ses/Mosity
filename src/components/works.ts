import { styles } from "../styles";
import { collections } from "../config";
import { animateOnView } from "../utils/motion";
import { sectionWrapper } from "../hoc/sectionWrapper";
import { applyTilt } from "../utils/tilt";

function buildCard(description: string, image: string): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";

  const imgWrap = document.createElement("div");
  imgWrap.className = "card-img-wrap";

  const img = document.createElement("img");
  img.src = `/assets/pictures/${image}.jpg`;
  img.alt = "collection image";
  img.className = "card-img";

  imgWrap.appendChild(img);

  const textWrap = document.createElement("div");
  textWrap.className = "card-text-wrap";

  const p = document.createElement("p");
  p.className = "card-text";
  p.textContent = description;

  textWrap.appendChild(p);
  card.appendChild(imgWrap);
  card.appendChild(textWrap);

  applyTilt(card, { max: 45, speed: 450 });
  return card;
}

function buildWorks(): HTMLElement {
  const fragment = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = styles.sectionHeadText;
  heading.textContent = "A Collection Of Us";
  animateOnView(heading, "slideDown");

  const subPara = document.createElement("p");
  subPara.className = "works-sub-text";
  subPara.textContent = "This is a collection some of my favorite moments with you. Not because they're perfect, but because they're ours. Every picture here is a memory I wouldn't trade for anything.";
  animateOnView(subPara, "fadeIn", 0.1);

  const grid = document.createElement("div");
  grid.className = "cards-grid";

  collections.forEach(({ description, image }) => {
    const wrapper = document.createElement("div");
    animateOnView(wrapper, "fadeUp");
    wrapper.appendChild(buildCard(description, image));
    grid.appendChild(wrapper);
  });

  fragment.appendChild(heading);
  fragment.appendChild(subPara);
  fragment.appendChild(grid);
  return fragment;
}

export function mountWorks(parent: HTMLElement): void {
  sectionWrapper(parent, "projects", buildWorks());
}
