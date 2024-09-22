const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const WebpackBar = require("webpackbar");
const path = require("path");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: {
      main: path.resolve(process.cwd(), "src/index.tsx")
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: `[name].js`,
      libraryTarget: "this",
      publicPath: "http://localhost:3000/dist"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: isDevelopment
                ? [require.resolve("react-refresh/babel")]
                : []
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          loader: "file-loader"
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment ? "style-loader" : MiniCSSExtractPlugin.loader,
            "css-loader"
          ]
        },
        {
          test: /\.scss$/i,
          use: [
            isDevelopment ? "style-loader" : MiniCSSExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/i,
          loader: "file-loader"
        },
        {
          test: [],
          loader: require.resolve("url-loader"),
          options: {
            limit: 150000,
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    optimization: {
      minimize: !isDevelopment
    },
    plugins: [
      new DependencyExtractionWebpackPlugin(),
      new ForkTsCheckerPlugin({
        async: false
      }),
      isDevelopment &&
        new ReactRefreshWebpackPlugin({
          overlay: false
        }),
      !isDevelopment &&
        new MiniCSSExtractPlugin({
          filename: "[name].css"
        }),
      new BundleAnalyzerPlugin({
        analyzerMode: isDevelopment ? "server" : "static",
        openAnalyzer: false
      }),
      new WebpackBar()
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devtool: isDevelopment ? "source-map" : false,
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
      allowedHosts: "all",
      host: "localhost",
      port: 3000,
      client: {
        overlay: false
      }
    }
  };
};
