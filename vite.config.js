import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/index.html',
        contact: '/contact.html',
        projecten: '/projecten-tarieven.html',
        404: '/404.html',
        // Blog pages
        blog: '/blog/index.html',
        // Add all other blog pages here
      }
    }
  },
  publicDir: 'public',
  base: '/'
})