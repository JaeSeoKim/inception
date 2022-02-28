const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const swcConfig = require("./config/swc.config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const { analyzer } = env;

  const isDev = argv.mode === "development";

  const cssLoaderOptions = {
    modules: {
      auto: true,
      localIdentName: "[name]__[local]--[hash]",
    },
  };

  return {
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist/"),
      filename: "[name].[contenthash].bundle.js",
      assetModuleFilename: "images/[name]__[hash][ext][query]",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          include: path.resolve(__dirname, "src"),
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: cssLoaderOptions,
            },
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, "src"),
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: cssLoaderOptions,
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          include: path.resolve(__dirname, "src"),
          oneOf: [
            {
              dependency: { not: ["url"] },
              use: ["@svgr/webpack"],
            },
            {
              type: "asset/resource",
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          include: path.resolve(__dirname, "src"),
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: path.resolve(__dirname, "src"),
          type: "asset/resource",
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "swc-loader",
            options: swcConfig.getBaseSWCOptions({
              isDev: isDev,
              isJSX: false,
              isTypeScript: false,
            }),
          },
        },
        {
          test: /\.jsx$/,
          include: path.resolve(__dirname, "src"),
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "swc-loader",
            options: swcConfig.getBaseSWCOptions({
              isDev: isDev,
              isJSX: true,
              isTypeScript: false,
            }),
          },
        },
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, "src"),
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "swc-loader",
            options: swcConfig.getBaseSWCOptions({
              isDev: isDev,
              isJSX: false,
              isTypeScript: true,
            }),
          },
        },
        {
          test: /\.tsx$/,
          include: path.resolve(__dirname, "src"),
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "swc-loader",
            options: swcConfig.getBaseSWCOptions({
              isDev: isDev,
              isJSX: true,
              isTypeScript: true,
            }),
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      analyzer && new BundleAnalyzerPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ].filter(Boolean),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: {
      static: "dist",
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        reconnect: true,
      },
      hot: true,
    },
  };
};
