import { styles } from "../styles";

export function sectionWrapper(parent: HTMLElement, idName: string, content: HTMLElement): void {
  const section = document.createElement("section");
  section.className = styles.padding;

  const anchor = document.createElement("span");
  anchor.className = "hash-span";
  anchor.id = idName;
  anchor.innerHTML = "&nbsp;";

  section.appendChild(anchor);
  section.appendChild(content);
  parent.appendChild(section);
}
