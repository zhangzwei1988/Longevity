"use client";

import { useEffect, useMemo, useState } from "react";

const navigation = [
  ["top", "首页"],
  ["vision", "健年的理念"],
  ["problem", "你的困境"],
  ["product", "产品"],
  ["method", "方法"],
  ["experience", "首批体验"],
] as const;

const groups: Record<string, string> = {
  top: "top",
  vision: "vision",
  problem: "problem",
  timeline: "problem",
  shortboard: "product",
  product: "product",
  case: "product",
  method: "method",
  process: "method",
  fit: "method",
  origin: "method",
  experience: "experience",
  faq: "experience",
  footer: "experience",
};

export default function PageNavigator() {
  const [activeId, setActiveId] = useState("top");
  const [pages, setPages] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".paged-site");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-page]"));
    const ratios = new Map<string, number>();

    setPages(sections.map((section) => ({
      id: section.id,
      title: section.dataset.pageTitle || section.id,
    })));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => ratios.set(entry.target.id, entry.intersectionRatio));
      const visible = sections.reduce((best, section) => {
        const ratio = ratios.get(section.id) || 0;
        return ratio > best.ratio ? { id: section.id, ratio } : best;
      }, { id: "top", ratio: 0 });
      if (visible.ratio > 0) setActiveId(visible.id);
    }, { root: scroller, threshold: [0.2, 0.45, 0.65, 0.85] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(0, pages.findIndex((page) => page.id === activeId));
  const activeGroup = groups[activeId] || activeId;
  const pageNumber = useMemo(() => String(activeIndex + 1).padStart(2, "0"), [activeIndex]);
  const pageTotal = String(pages.length).padStart(2, "0");

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="健年首页">
          <span className="brand-seal">健</span>
          <span><strong>健年</strong><small>HEALTHSPAN</small></span>
        </a>
        <nav aria-label="主导航">
          {navigation.map(([id, label]) => (
            <a className={activeGroup === id ? "active" : ""} href={`#${id}`} aria-current={activeGroup === id ? "page" : undefined} key={id}>{label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#experience">首批体验</a>
      </header>

      {pages.length > 0 && (
        <aside className="page-rail" aria-label="章节导航">
          <div className="page-count"><strong>{pageNumber}</strong><span>/ {pageTotal}</span></div>
          <div className="page-dots">
            {pages.map((page, index) => (
              <a className={index === activeIndex ? "active" : ""} href={`#${page.id}`} aria-label={`前往：${page.title}`} title={page.title} key={page.id}><span /></a>
            ))}
          </div>
          <span className="page-title">{pages[activeIndex]?.title}</span>
        </aside>
      )}
    </>
  );
}
