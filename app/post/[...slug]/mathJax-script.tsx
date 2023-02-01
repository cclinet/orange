"use client";

import Script from "next/script";
declare global {
  interface Window {
    MathJax: any;
  }
}

export default function MathJaxScript() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-chtml.min.js"
        onReady={() => {
          window.MathJax.typeset();
        }}
      />
    </>
  );
}
