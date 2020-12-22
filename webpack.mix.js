let mix = require("laravel-mix");
require("laravel-mix-tailwind");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");

mix.disableNotifications();

mix.js("src/js/app.js", "dist/js");

mix
  .postCss("src/css/tailwind.css", "dist/css")
  .options({ processCssUrls: false })
  .tailwind();

mix.webpackConfig({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/images", 
          to: "dist/images",
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        }),
      ],
    }),
  ],
});
