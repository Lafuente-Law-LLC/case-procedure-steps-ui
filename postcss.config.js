//const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    require("postcss-preset-env")({}),
    require("autoprefixer"),

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
