import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Noto_Serif_SC } from "@next/font/google";

const notoSerif = Noto_Serif_SC({
  weight: ["200"],
  subsets: ["chinese-simplified", "latin"],
  variable: "--font-noto-serif",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSerif.variable} font-noto-serif font-thin`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
