"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function initGSAPAnimations() {
  if (typeof window === "undefined") return;

  registerGSAP();

  gsap.utils.toArray<HTMLElement>(".marquee-text").forEach((el) => {
    gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  });

  gsap.utils.toArray<HTMLElement>(".gsap-reveal-chars").forEach((el) => {
    const text = el.textContent ?? "";
    el.innerHTML = "";
    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      el.appendChild(span);
    });

    gsap.fromTo(
      el.querySelectorAll("span"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
    gsap.to(img, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        scrub: true,
      },
    });
  });
}

export function useGSAPInit() {
  useEffect(() => {
    registerGSAP();
    const timer = setTimeout(() => {
      initGSAPAnimations();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

export { gsap, ScrollTrigger };
