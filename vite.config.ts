import { defineConfig } from "vitest/config"; // Importe do Vitest
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita o acesso ao 'vi' globalmente
    environment: "jsdom", // Configura o ambiente de testes como jsdom
    setupFiles: "./src/setupTests.ts", // Caminho correto para o arquivo de setup
  },
});
