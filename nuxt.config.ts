import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: ['shadcn-nuxt'],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    // Old address of the About the Data page.
    '/sources': { redirect: '/about' },
  },
  runtimeConfig: {
    public: {
      // Set with NUXT_PUBLIC_GOOGLE_MAPS_KEY in .env (see .env.example).
      googleMapsKey: '',
      // Where "Report a correction" sends reports. Set either or both in .env:
      // NUXT_PUBLIC_REPORT_EMAIL (an email address) and NUXT_PUBLIC_REPORT_FORM_URL (e.g. a Google Form).
      reportEmail: '',
      // Public address of the site, used in share links and QR codes. Set NUXT_PUBLIC_SITE_URL in production.
      siteUrl: '',
      reportFormUrl: '',
    },
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · BetterCatarman',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1d4ed8' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
