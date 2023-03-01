import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
// import reactJsx from 'vite-react-jsx'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
//   esbuild: {
//     jsxFragment: 'Fragment',
//   },
  build: {
    outDir: 'build',
  },
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    // reactJsx(),
    // reactRefresh(),
    envCompatible(/* options */),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
})