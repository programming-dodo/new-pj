// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    aaalbert: 'smart guy',
    public: {
      id: 'someUserId',
    }
  },
})
