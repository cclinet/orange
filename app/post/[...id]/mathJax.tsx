"use client";

import Script from "next/script";
declare global {
  interface Window {
    MathJax: any;
  }
}

export default function MathJax() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
      onReady={() => {
        window.MathJax.typeset();
      }}
    />
  );
}
