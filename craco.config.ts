import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { CracoWebpackConfig } from "@craco/types";

module.exports = function () {
  return {
    babel: {
      plugins: [["module:@preact/signals-react-transform"]],
    },
    // webpack: {
    //   plugins: [
    //     new BundleAnalyzerPlugin({
    //       analyzerMode: "static",
    //       generateStatsFile: true,
    //       reportFilename: "./reports/report.html",
    //       statsFilename: "./reports/stats.json",
    //     }),
    //   ],
    //   configure: (webpackConfig) => {
    //     return {
    //       ...webpackConfig,
    //       optimization: {
    //         ...webpackConfig.optimization,
    //         splitChunks: {
    //           chunks: "all",
    //           cacheGroups: {
    //             vendors: {
    //               name: "vendors",
    //               enforce: true,
    //               test: /[\\/]node_modules[\\/]/,
    //             },
    //             svgGroup: {
    //               name: "icons",
    //               enforce: true,
    //               test: /\.svg$/,
    //               // test: (module: any) => {
    //               //   if (typeof module === "string") return false;
    //               //   return module.resource && module.resource.endsWith(".svg");
    //               // },
    //             },
    //           },
    //         },
    //       },
    //     };
    //   },
    // } as CracoWebpackConfig,
  };
};
