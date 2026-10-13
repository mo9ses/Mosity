import "./index.css";
import { mountHero } from "./components/hero";
import { mountAbout } from "./components/about";
import { mountTime } from "./components/time";
import { mountWorks } from "./components/works";

const root = document.getElementById("root")!;
const wrapper = document.createElement("div");
wrapper.className = "page-wrapper";

mountHero(wrapper);
mountAbout(wrapper);
mountTime(wrapper);
mountWorks(wrapper);
root.appendChild(wrapper);
