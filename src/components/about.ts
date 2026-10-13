import { styles } from "../styles";
import { animateOnView } from "../utils/motion";
import { sectionWrapper } from "../hoc/sectionWrapper";

function buildAbout(): HTMLElement {
  const fragment = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = styles.sectionHeadText;
  heading.textContent = "What You Mean To Me.";
  animateOnView(heading, "slideDown");

  const text = "Trinity, I cannot put into words how much you mean to me. It feels like we started dating yesterday, but we've already been through so much together and made so many memories. I enjoy spending my time with you and I can't wait to make more memories with you.";

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
        cursor.remove();
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
