const path = require('path');
const fs = require('fs');

const sourcePath = './public/src/';
const outputPath = './public/dist/';

const copyStateLibs = fs.existsSync('./public/src/libs') && fs.lstatSync('./src/libs').isDirectory();
const copyStateFont = fs.existsSync('./public/src/font') && fs.lstatSync('./src/font').isDirectory();

console.log(`CopyWebpackPlugin(libs) : ${copyStateLibs}`);
console.log(`CopyWebpackPlugin(font) : ${copyStateFont}`);

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const siteInfo = require('./site-info');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(templateDir).filter(file => file.substr(-5) === '.html');
  return templateFiles.map(file => new HtmlWebpackPlugin({
    template: `./${file}`,
    filename: `${file}`,
    minify: {
      removeAttributeQuotes: false,
    },
    hash: true,
    inject: 'body',
    chunks: 'all',
  }));
}

module.exports = (env) => {
  // Webpack 플러그인
  const plugins = [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([outputPath]),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
  ];

  // html의 개수에 따라 HtmlWebpackPlugin 생성
  const htmlList = generateHtmlPlugins(sourcePath);

  // HtmlWebpackPlugin 확장 플러그인
  const htmlPlugins = [
    new HtmlBeautifyPlugin({
      config: {
        html: {
          indent_size: 2,
          end_with_newline: true,
          preserve_newlines: true,
          unformatted: ['p', 'i', 'b', 'span'],
        },
      },
      replace: [
        { test: '@@_title', with: siteInfo.title },
        { test: '@@_description', with: siteInfo.description },
        { test: '@@_keywords', with: siteInfo.description },
        { test: '@@_author', with: siteInfo.author },
        { test: '@@_og_locale', with: siteInfo.og.locale },
        { test: '@@_og_url', with: siteInfo.og.url },
        { test: '@@_og_type', with: siteInfo.og.type },
        { test: '@@_og_img_url', with: siteInfo.og.img.url },
        { test: '@@_og_img_type', with: siteInfo.og.img.type },
        { test: '@@_og_img_width', with: siteInfo.og.img.width },
        { test: '@@_og_img_height', with: siteInfo.og.img.height },
        { test: '@@_og_img_alt', with: siteInfo.og.img.alt },
      ],
    }),
  ];

  function copyPlugin() {
    let val = [];
    if (copyStateLibs && !copyStateFont) {
      val = [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './libs/**/*',
            },
          ],
        }),
      ];
    }
    if (!copyStateLibs && copyStateFont) {
      val = [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './font/**/*',
            },
          ],
        }),
      ];
    }
    if (copyStateLibs && copyStateFont) {
      val = [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './libs/**/*',
            },
            {
              from: './font/**/*',
            },
          ],
        }),
      ];
    }
    return val;
  }

  return {
    context: path.resolve(__dirname, sourcePath),
    entry: {
      app: env.NODE_ENV === 'development' ? ['@babel/polyfill', './css/development.scss', './css/style.scss', './js/app.js'] : ['@babel/polyfill', './css/style.scss', './js/app.js'],
    },
    output: {
      filename: './js/[name].js',
      path: path.resolve(__dirname, outputPath),
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
      open: true,
      contentBase: path.resolve(__dirname, outputPath),
      watchContentBase: true,
      inline: true,
      stats: 'errors-only',
    },
    mode: env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: env.NODE_ENV === 'development' ? 'source-map' : false,
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: env.NODE_ENV === 'development' ? '[path][name].[ext]' : '[path][name].[ext]?[hash]',
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    plugins: plugins.concat(copyPlugin()).concat(htmlList).concat(htmlPlugins),
  };
};