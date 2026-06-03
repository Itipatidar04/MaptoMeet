import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  //this is granting permission to other hosts to access. it accepts permissions from any hostname.
  server: {
    allowedHosts: true,
  },
});
