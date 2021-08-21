import reactRefresh from '@vitejs/plugin-react-refresh'

const { resolve } = require('path')
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [reactRefresh()],
  env: 'node',
  build: {
    rollupOptions: {
      external: [
        'react', // ignore react stuff
        'react-dom',
        'react-DOM',
      ],
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: ' https://menogram-server.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/users': {
        target: ' https://menogram-server.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/uploads': {
        target: 'https://menogram-server.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/auth': {
        target: 'https://menogram-server.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
}

export default config
