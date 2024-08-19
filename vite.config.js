import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {

  const base = mode === 'production' ? '/trouve_ton_artisan/' : '/';

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/datas.json',
            dest: 'assets'
          }
        ]
      })
    ],
    base: base,
  };
});
