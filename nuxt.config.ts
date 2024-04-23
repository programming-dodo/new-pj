// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  // pinia: {
  //   storesDirs: ['./stores/**'],
  // },
  runtimeConfig: {
    aaalbert: 'smart guy',
    public: {
      id: 'someUserId',
      // Other public values...
    }
  },
})
