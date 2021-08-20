import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [reactRefresh()],
  env: 'node',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1337/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/users': {
        target: 'http://localhost:1337/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/uploads': {
        target: 'http://localhost:1337/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
}

export default config
