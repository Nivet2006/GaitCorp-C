"use client";

import { useEffect } from "react";
import {
  animate,
  stagger,
  onScroll,
  createTimeline,
  spring,
  splitText,
  utils,
} from "animejs";
import type { JSAnimation } from "animejs";

type Revertible = { revert: () => void };

const revertibles: Revertible[] = [];

function track<T extends Revertible>(item: T): T {
  revertibles.push(item);
  return item;
}

function queryAll<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

const springPop = spring({ stiffness: 180, damping: 14, mass: 0.8 });
const springSoft = spring({ stiffness: 120, damping: 18, mass: 1 });
const springBounce = spring({ stiffness: 260, damping: 12, bounce: 0.35 });

function initScrollReveals() {
  const variants: Record<
    string,
    { from: Record<string, number | string>; to: Record<string, number | string> }
  > = {
    "anime-reveal": {
      from: { opacity: 0, y: 80 },
      to: { opacity: 1, y: 0 },
    },
    "anime-reveal-left": {
      from: { opacity: 0, x: -120, rotate: -4 },
      to: { opacity: 1, x: 0, rotate: 0 },
    },
    "anime-reveal-right": {
      from: { opacity: 0, x: 120, rotate: 4 },
      to: { opacity: 1, x: 0, rotate: 0 },
    },
    "anime-reveal-scale": {
      from: { opacity: 0, scale: 0.6 },
      to: { opacity: 1, scale: 1 },
    },
    "anime-reveal-rotate": {
      from: { opacity: 0, rotateX: -90, y: 40 },
      to: { opacity: 1, rotateX: 0, y: 0 },
    },
    "anime-reveal-blur": {
      from: { opacity: 0, y: 50, filter: "blur(12px)" },
      to: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    "anime-pop": {
      from: { opacity: 0, scale: 0.3, rotate: -12 },
      to: { opacity: 1, scale: 1, rotate: 0 },
    },
    "anime-flip": {
      from: { opacity: 0, rotateY: -90, scale: 0.85 },
      to: { opacity: 1, rotateY: 0, scale: 1 },
    },
  };

  Object.entries(variants).forEach(([className, { from, to }]) => {
    queryAll<HTMLElement>(`.${className}`).forEach((el, i) => {
      el.style.transformOrigin = "center center";
      el.style.perspective = "1000px";

      animate(el, { ...from, duration: 0 });

      track(
        onScroll({
          target: el,
          enter: "bottom 88%",
          leave: "top 12%",
          onEnter: () => {
            animate(el, {
              ...to,
              duration: 1100,
              delay: (i % 5) * 60,
              ease: className.includes("pop") || className.includes("flip")
                ? springBounce
                : springSoft,
            });
          },
        })
      );
    });
  });
}

function initStaggerGroups() {
  queryAll<HTMLElement>(".anime-stagger").forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    if (!children.length) return;

    animate(children, {
      opacity: 0,
      y: 60,
      scale: 0.92,
      autoplay: false,
    });

    track(
      onScroll({
        target: group,
        enter: "bottom 85%",
        onEnter: () => {
          animate(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            delay: stagger(80, { from: "first" }),
            duration: 900,
            ease: springSoft,
          });
        },
      })
    );
  });
}

function initSplitText() {
  queryAll<HTMLElement>(".anime-split").forEach((el) => {
    const splitter = track(splitText(el, { chars: true }));
    const chars = splitter.chars as HTMLElement[];
    if (!chars.length) return;

    animate(chars, {
      opacity: 0,
      y: 80,
      rotateZ: () => utils.random(-15, 15),
      autoplay: false,
    });

    track(
      onScroll({
        target: el,
        enter: "bottom 88%",
        onEnter: () => {
          animate(chars, {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            delay: stagger(25, { from: "center" }),
            duration: 800,
            ease: springBounce,
          });
        },
      })
    );
  });
}

function initFloaters() {
  queryAll<HTMLElement>(".anime-float").forEach((el, i) => {
    const yRange = 12 + (i % 4) * 6;
    const duration = 2800 + (i % 5) * 400;

    track(
      animate(el, {
        translateY: [
          { to: -yRange },
          { to: yRange },
          { to: -yRange },
        ],
        translateX: [
          { to: (i % 2 === 0 ? 1 : -1) * 4 },
          { to: (i % 2 === 0 ? -1 : 1) * 4 },
          { to: (i % 2 === 0 ? 1 : -1) * 4 },
        ],
        rotate: [
          { to: -3 },
          { to: 3 },
          { to: -3 },
        ],
        duration,
        loop: true,
        ease: "inOutSine",
      })
    );
  });
}

function initGlowPulse() {
  queryAll<HTMLElement>(".anime-glow").forEach((el, i) => {
    track(
      animate(el, {
        boxShadow: [
          { to: "0 0 20px rgba(237,29,36,0.15)" },
          { to: "0 0 40px rgba(237,29,36,0.45)" },
          { to: "0 0 20px rgba(237,29,36,0.15)" },
        ],
        scale: [
          { to: 1 },
          { to: 1.04 },
          { to: 1 },
        ],
        duration: 2400 + i * 200,
        loop: true,
        ease: "inOutQuad",
      })
    );
  });
}

function initSpinners() {
  queryAll<HTMLElement>(".anime-spin").forEach((el, i) => {
    track(
      animate(el, {
        rotate: 360,
        duration: 12000 + i * 2000,
        loop: true,
        ease: "linear",
      })
    );
  });

  queryAll<HTMLElement>(".anime-spin-reverse").forEach((el, i) => {
    track(
      animate(el, {
        rotate: -360,
        duration: 9000 + i * 1500,
        loop: true,
        ease: "linear",
      })
    );
  });
}

function initParallax() {
  queryAll<HTMLElement>(".anime-parallax").forEach((el) => {
    const depth = parseFloat(el.dataset.animeDepth ?? "0.3");
    const anim = animate(el, {
      y: `${depth * -100}%`,
      autoplay: false,
      ease: "linear",
    });

    track(
      onScroll({
        target: el.parentElement ?? el,
        sync: 12,
      }).link(anim)
    );
  });
}

function initWaveText() {
  queryAll<HTMLElement>(".anime-wave").forEach((el) => {
    const text = el.textContent ?? "";
    el.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      el.appendChild(span);
    });

    const spans = Array.from(el.querySelectorAll("span"));
    track(
      animate(spans, {
        y: [
          { to: -8 },
          { to: 0 },
          { to: -8 },
        ],
        duration: 1200,
        delay: stagger(60, { from: "center" }),
        loop: true,
        ease: "inOutSine",
      })
    );
  });
}

function initShimmer() {
  queryAll<HTMLElement>(".anime-shimmer").forEach((el) => {
    el.style.position = "relative";
    el.style.overflow = "hidden";

    const shimmer = document.createElement("div");
    shimmer.className = "anime-shimmer-bar pointer-events-none absolute inset-0";
    shimmer.style.background =
      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)";
    shimmer.style.transform = "translateX(-120%)";
    el.appendChild(shimmer);

    track(
      animate(shimmer, {
        translateX: "220%",
        duration: 2200,
        loop: true,
        loopDelay: 800,
        ease: "inOutQuad",
      })
    );
  });
}

function initOrbit() {
  queryAll<HTMLElement>(".anime-orbit").forEach((container) => {
    const dots = queryAll<HTMLElement>(".anime-orbit-dot", container);
    dots.forEach((dot, i) => {
      const angle = (i / dots.length) * 360;
      track(
        animate(dot, {
          rotate: [angle, angle + 360],
          duration: 8000 + i * 500,
          loop: true,
          ease: "linear",
          modifier: (v: number) => {
            const rad = (v * Math.PI) / 180;
            const r = parseFloat(container.dataset.animeRadius ?? "60");
            dot.style.transform = `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`;
            return v;
          },
        })
      );
    });
  });
}

function initSvgDraw() {
  queryAll<SVGPathElement>(".anime-draw path, path.anime-draw").forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const anim = animate(path, {
      strokeDashoffset: 0,
      autoplay: false,
      duration: 2000,
      ease: "inOutQuart",
    });

    track(
      onScroll({
        target: path.closest("svg") ?? path,
        enter: "bottom 90%",
        onEnter: () => anim.play(),
      })
    );
  });
}

function initCounters() {
  queryAll<HTMLElement>(".anime-counter").forEach((el) => {
    const target = parseFloat(el.dataset.animeTarget ?? el.textContent ?? "0");
    const suffix = el.dataset.animeSuffix ?? "";
    let played = false;

    track(
      onScroll({
        target: el,
        enter: "bottom 88%",
        onEnter: () => {
          if (played) return;
          played = true;
          const obj = { val: 0 };
          track(
            animate(obj, {
              val: target,
              duration: 2000,
              ease: "outExpo",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            })
          );
        },
      })
    );
  });
}

function initGlitch() {
  queryAll<HTMLElement>(".anime-glitch").forEach((el) => {
    track(
      animate(el, {
        translateX: [
          { to: 0 },
          { to: -3 },
          { to: 3 },
          { to: -2 },
          { to: 0 },
        ],
        skewX: [
          { to: 0 },
          { to: -2 },
          { to: 2 },
          { to: 0 },
        ],
        duration: 400,
        loop: true,
        loopDelay: 3000,
        ease: "steps(4)",
      })
    );
  });
}

function initMagneticHover() {
  queryAll<HTMLElement>(".anime-magnetic").forEach((el) => {
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      animate(el, {
        translateX: x * 0.25,
        translateY: y * 0.25,
        duration: 400,
        ease: springSoft,
      });
    };
    const onLeave = () => {
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 600,
        ease: springBounce,
      });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    revertibles.push({
      revert: () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      },
    });
  });
}

function initHeroTimeline() {
  const hero = document.querySelector("[data-anime-hero]");
  if (!hero) return;

  const tl = createTimeline({ defaults: { ease: springPop } });

  const line = hero.querySelector("[data-anime-hero-line]");
  const label = hero.querySelector("[data-anime-hero-label]");
  const title = hero.querySelector("[data-anime-hero-title]");
  const subtitle = hero.querySelector("[data-anime-hero-subtitle]");
  const cta = hero.querySelectorAll("[data-anime-hero-cta]");
  const stats = hero.querySelectorAll("[data-anime-hero-stat]");

  if (line) {
    tl.add(line, { scaleX: [0, 1], duration: 800, ease: "outExpo" }, 200);
  }
  if (label) {
    tl.add(label, { opacity: [0, 1], x: [-30, 0], duration: 700 }, 400);
  }
  if (title) {
    tl.add(title, { opacity: [0, 1], y: [60, 0], duration: 900 }, 500);
  }
  if (subtitle) {
    tl.add(subtitle, { opacity: [0, 1], y: [40, 0], duration: 800 }, 700);
  }
  if (cta.length) {
    tl.add(cta, {
      opacity: [0, 1],
      y: [30, 0],
      delay: stagger(100),
      duration: 700,
    }, 900);
  }
  if (stats.length) {
    tl.add(stats, {
      opacity: [0, 1],
      scale: [0.5, 1],
      rotate: [-8, 0],
      delay: stagger(120, { from: "center" }),
      duration: 900,
      ease: springBounce,
    }, 1100);
  }

  track(tl);
}

function initNavDock() {
  const dock = document.querySelector("[data-anime-nav-dock]");
  if (!dock) return;

  const items = Array.from(dock.children) as HTMLElement[];
  animate(items, {
    opacity: 0,
    y: 40,
    scale: 0.8,
  });

  track(
    animate(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      delay: stagger(80, { from: "center" }),
      duration: 900,
      ease: springBounce,
    })
  );
}

function initDecorLayers() {
  queryAll<HTMLElement>("[data-anime-decor]").forEach((el, i) => {
    track(
      animate(el, {
        opacity: [0.15, 0.5, 0.15],
        scale: [0.95, 1.08, 0.95],
        rotate: [0, (i % 2 === 0 ? 1 : -1) * 15, 0],
        duration: 4000 + i * 600,
        loop: true,
        ease: "inOutSine",
      })
    );
  });
}

export function initAnimeAnimations() {
  if (typeof window === "undefined") return;

  revertAllAnime();

  initScrollReveals();
  initStaggerGroups();
  initSplitText();
  initFloaters();
  initGlowPulse();
  initSpinners();
  initParallax();
  initWaveText();
  initShimmer();
  initOrbit();
  initSvgDraw();
  initCounters();
  initGlitch();
  initMagneticHover();
  initHeroTimeline();
  initNavDock();
  initDecorLayers();
}

export function revertAllAnime() {
  while (revertibles.length) {
    revertibles.pop()?.revert();
  }
}

export function useAnimeInit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      initAnimeAnimations();
    }, 150);

    return () => {
      clearTimeout(timer);
      revertAllAnime();
    };
  }, []);
}

/** Run a one-off anime.js timeline inside a component */
export function runAnimeHero(
  container: HTMLElement | null
): (() => void) | undefined {
  if (!container) return;

  const orbs = container.querySelectorAll("[data-anime-orb]");
  const cleanups: (() => void)[] = [];

  orbs.forEach((orb, i) => {
    const anim = animate(orb, {
      translateY: [
        { to: -20 - i * 5 },
        { to: 20 + i * 5 },
        { to: -20 - i * 5 },
      ],
      translateX: [
        { to: (i % 2 ? -1 : 1) * 15 },
        { to: (i % 2 ? 1 : -1) * 15 },
        { to: (i % 2 ? -1 : 1) * 15 },
      ],
      scale: [
        { to: 0.9 },
        { to: 1.1 },
        { to: 0.9 },
      ],
      opacity: [
        { to: 0.3 },
        { to: 0.7 },
        { to: 0.3 },
      ],
      duration: 3500 + i * 400,
      loop: true,
      ease: "inOutSine",
    });
    cleanups.push(() => anim.revert());
  });

  const strokeTitle = container.querySelector("[data-anime-stroke-title]");
  if (strokeTitle) {
    const anim = animate(strokeTitle, {
      opacity: [0.08, 0.2, 0.08],
      scale: [0.98, 1.02, 0.98],
      duration: 5000,
      loop: true,
      ease: "inOutSine",
    });
    cleanups.push(() => anim.revert());
  }

  return () => cleanups.forEach((fn) => fn());
}

export function runAnimeSection(
  section: HTMLElement | null,
  selector: string
): (() => void) | undefined {
  if (!section) return;

  const targets = section.querySelectorAll(selector);
  if (!targets.length) return;

  const anims: JSAnimation[] = [];

  targets.forEach((el, i) => {
    const anim = animate(el, {
      rotateY: [
        { to: -5 },
        { to: 5 },
        { to: -5 },
      ],
      duration: 3000 + i * 200,
      loop: true,
      ease: "inOutSine",
    });
    anims.push(anim);
  });

  return () => anims.forEach((a) => a.revert());
}

export { animate, stagger, onScroll, createTimeline, spring, splitText };
