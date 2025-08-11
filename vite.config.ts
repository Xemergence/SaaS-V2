import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const plugins = [react()];
  const isDev = mode === "development";
  const isTempoEnabled =
    process.env.VITE_TEMPO === "true" || process.env.TEMPO === "true";

  // Only load Tempo Vite plugin in development when VITE_TEMPO/TEMPO is "true"
  if (isDev && isTempoEnabled) {
    try {
      const tempoModule = await import("tempo-devtools/dist/vite");
      if (tempoModule.tempo && typeof tempoModule.tempo === "function") {
        plugins.push(tempoModule.tempo());
        console.log("Tempo Vite plugin loaded successfully");
      } else {
        console.warn("Tempo plugin not found in expected format");
      }
    } catch (error) {
      console.warn(
        "Failed to load Tempo Vite plugin:",
        error?.message || error,
      );
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      allowedHosts: isDev && isTempoEnabled ? true : undefined,
      hmr: {
        overlay: false,
      },
    },
    build: {
      target: "es2020",
      outDir: "dist",
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: true,
        },
      },
      rollupOptions: {
        // Never externalize tempo packages in production builds
        external: [],
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-vendor";
              }
              if (id.includes("@radix-ui")) {
                return "radix-vendor";
              }
              return "vendor";
            }
            if (id.includes("src/components/dashboard")) {
              return "dashboard";
            }
            if (id.includes("src/components/auth")) {
              return "auth";
            }
          },
        },
      },
    },
    define: {
      // Simplify define to reflect real env vars
      "import.meta.env.VITE_TEMPO": JSON.stringify(
        process.env.VITE_TEMPO || "false",
      ),
      "import.meta.env.TEMPO": JSON.stringify(process.env.TEMPO || "false"),
    },
  };
});
