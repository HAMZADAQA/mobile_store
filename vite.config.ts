import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_ENV": JSON.stringify(mode),
    },
    build: {
      minify: isProduction,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          manualChunks: isProduction
            ? undefined
            : (id) => {
                if (id.includes("node_modules")) {
                  return "vendor";
                }
              },
        },
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});
