import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Vite automatically exposes VITE_* prefixed variables via import.meta.env
  const env = loadEnv(mode, (process as any).cwd(), '');

  // GitHub Pages base path - use repository name
  // For GitHub Pages: https://username.github.io/repo-name/
  // Set base to '/repo-name/' or '/' for root domain
  const getBasePath = () => {
    // If running in GitHub Actions, use repository name
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      return `/${repoName}/`;
    }
    // For local development, use root
    if (mode === 'development') {
      return '/';
    }
    // For production build, default to repo name (update if different)
    return '/eb-rescue-app/';
  };
  
  const base = getBasePath();

  return {
    base, // Set base path for GitHub Pages
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Vite automatically handles VITE_* prefixed env vars via import.meta.env
      // No need to manually define them here
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            genai: ['@google/genai'],
            icons: ['lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    }
  };
});