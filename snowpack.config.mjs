// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
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
