const copy = require("rollup-plugin-copy");

module.exports = {
  rollup(config, options) {
    const { localDev, name } = options;
    const outputDirectory = (() => {
      if (localDev) {
        return `example/${name}`;
      }

      return `dist`;
    })();

    const external = config.external;
    config.external = id => external(id) || id.endsWith(".png");

    /* 
      the below copy function is causing "Error: EBUSY: resource busy or 
      locked, copyfile" when trying to copy assets from src to dist during 
      build process so comment out and copy files manually after build 
    */
    config.plugins = [
      ...config.plugins,
      copy({
        targets: [
          {
            src: "src/assets/*",
            dest: `${outputDirectory}/assets`,
            createPath: true,
          },
        ],
      }),
    ];

    if (localDev) {
      config.output.file = config.output.file.replace("dist", outputDirectory);
    }

    return config;
  },
};
