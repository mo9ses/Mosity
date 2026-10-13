import { styles } from "../styles";
import { animateOnView } from "../utils/motion";
import { sectionWrapper } from "../hoc/sectionWrapper";

function buildAbout(): HTMLElement {
  const fragment = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = styles.sectionHeadText;
  heading.textContent = "What You Mean To Me.";
  animateOnView(heading, "slideDown");

  const text = "Trinity, you mean so much to me and I'm so glad I met you. You are the most beautiful girl in the world and I love spending time with you. There is absolutely nothing I would change about you other than your last name. I will always love you and care for you.";

  const para = document.createElement("p");
  para.className = "about-text";

  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "|";
  para.appendChild(cursor);

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    let i = 0;
    const interval = setInterval(() => {
      para.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        cursor.className = "typewriter-cursor typewriter-cursor--done";
      }
    }, 30);
  }, { threshold: 0.5 });

  observer.observe(para);

  fragment.appendChild(heading);
  fragment.appendChild(para);
  return fragment;
}

export function mountAbout(parent: HTMLElement): void {
  sectionWrapper(parent, "about", buildAbout());
}
