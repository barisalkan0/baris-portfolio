import { existsSync } from 'node:fs'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Resume buttons only appear once public/Baris_Alkan_CV.pdf exists, so the live site never links to a 404.
process.env.VITE_HAS_CV = existsSync('public/Baris_Alkan_CV.pdf') ? 'true' : ''

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
