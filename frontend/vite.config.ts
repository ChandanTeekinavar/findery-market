import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@emotion/babel-plugin'],
        babelrc: false,
        configFile: false,
      }
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'router-vendor': ['react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@emotion/cache',
      '@mui/material/styles',
      '@mui/material',
      '@mui/icons-material'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      '@emotion/core': '@emotion/react'
    }
  }
})
