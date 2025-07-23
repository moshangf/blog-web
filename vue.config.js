const { defineConfig } = require("@vue/cli-service");
const Components = require("unplugin-vue-components/webpack");
const { UndrawUiResolver } = require("undraw-ui/es/resolvers/index.js");
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [UndrawUiResolver],
      }),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        'process.env': {
          ...require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed
        }
      })
    ],
    resolve: {
      mainFiles: ["index.js"],
    }
  },
});
