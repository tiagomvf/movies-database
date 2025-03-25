import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `` // Add global SCSS (optional)
      }
    }
  }
});
