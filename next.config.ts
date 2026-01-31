import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
