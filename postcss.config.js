const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    require("postcss-preset-env")({}),
    require("autoprefixer"),
    purgecss({
      content: [
        "./src/css/main.scss",
        "./src/**/*.html",
        "./src/**/*.tsx",
        "./src/**/*.js",
      ], 
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    cssnano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
