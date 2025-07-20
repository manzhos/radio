
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins:[react(),VitePWA({
    registerType:'autoUpdate',
    manifest:{
      name:'Radio MAN',short_name:'MANradio',start_url:'/',
      display:'standalone',background_color:'#111',theme_color:'#111',
      icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},
             {src:'/icon-512.png',sizes:'512x512',type:'image/png'}]
    }})],
  server:{proxy:{'/random':'http://localhost:3000','/music':'http://localhost:3000'}}
});
