// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: '/',
    'node_modules/@ibm/plex/IBM-Plex-Sans/fonts/split': {url:'/@ibm/plex/IBM-Plex-Sans/fonts/split', static:true},
    public: { url: '/', static: true }
    /* ... */
  },
  plugins: [
  ['@snowpack/plugin-sass',
   {
    loadPath: 'node_modules/'
   }]
    /* ... */
  ],
  packageOptions: {
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
