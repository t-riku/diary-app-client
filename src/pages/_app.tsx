import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // ログイン・ログアウト操作はアプリケーションのどの場所でも共有して使えるように
    <AuthProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
