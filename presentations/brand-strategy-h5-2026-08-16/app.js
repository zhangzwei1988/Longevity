const deck = document.getElementById("deck");
const slides = [...document.querySelectorAll(".slide")];
const currentPage = document.getElementById("currentPage");
const railTitle = document.getElementById("railTitle");
const railDots = document.getElementById("railDots");
const deckHelp = document.getElementById("deckHelp");
const nextButton = document.getElementById("nextButton");

let activeIndex = 0;
let helpTimer;

const pad = (number) => String(number).padStart(2, "0");

const showSlide = (index, options = {}) => {
  const boundedIndex = Math.max(0, Math.min(slides.length - 1, index));
  const adjacent = Math.abs(boundedIndex - activeIndex) <= 1;
  const behavior = options.immediate || !adjacent ? "auto" : "smooth";
  deck.scrollTo({ top: slides[boundedIndex].offsetTop, behavior });
};

const setActiveSlide = (index) => {
  activeIndex = index;
  const slide = slides[index];
  currentPage.textContent = pad(index + 1);
  railTitle.textContent = slide.dataset.title || "";
  document.body.classList.toggle("on-dark", slide.classList.contains("dark-slide"));
  [...railDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
    dot.setAttribute("aria-current", dotIndex === index ? "page" : "false");
  });
  nextButton.textContent = index === slides.length - 1 ? "↑" : "↓";
  nextButton.setAttribute("aria-label", index === slides.length - 1 ? "返回第一页" : "下一页");
};

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "rail-dot";
  dot.setAttribute("aria-label", `第 ${index + 1} 页：${slide.dataset.title || ""}`);
  dot.addEventListener("click", () => showSlide(index, { immediate: true }));
  railDots.appendChild(dot);
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = slides.indexOf(visible.target);
    if (index >= 0) setActiveSlide(index);
  },
  { root: deck, threshold: [0.45, 0.62, 0.8] },
);

slides.forEach((slide) => observer.observe(slide));

const hideHelpSoon = () => {
  window.clearTimeout(helpTimer);
  helpTimer = window.setTimeout(() => deckHelp.classList.add("is-hidden"), 2600);
};

const handleNavigationKey = (event) => {
  const forwardKeys = ["ArrowDown", "ArrowRight", "PageDown", " "];
  const backKeys = ["ArrowUp", "ArrowLeft", "PageUp"];
  if (forwardKeys.includes(event.key)) {
    event.preventDefault();
    showSlide(activeIndex + 1);
  } else if (backKeys.includes(event.key)) {
    event.preventDefault();
    showSlide(activeIndex - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    showSlide(0, { immediate: true });
  } else if (event.key === "End") {
    event.preventDefault();
    showSlide(slides.length - 1, { immediate: true });
  }
};

document.addEventListener("keydown", handleNavigationKey);
deck.addEventListener("scroll", hideHelpSoon, { passive: true });

nextButton.addEventListener("click", () => {
  if (activeIndex === slides.length - 1) showSlide(0, { immediate: true });
  else showSlide(activeIndex + 1);
});

setActiveSlide(0);
hideHelpSoon();
