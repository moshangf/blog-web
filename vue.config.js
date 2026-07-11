const Components = require("unplugin-vue-components/webpack");
const webpack = require('webpack');

module.exports = (async function () {
  const { UndrawUiResolver } = await import("undraw-ui/es/resolvers/index.js");

  return {
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
  };
})();
