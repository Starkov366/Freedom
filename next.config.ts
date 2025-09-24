import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     reactStrictMode: true,
     experimental: {
          appDir: true // включаем app router
     }
     // srcDir: "src", // если используешь src/app, можно раскомментировать
};

export default nextConfig;
