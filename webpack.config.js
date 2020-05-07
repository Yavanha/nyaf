const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const tsconfig = require('./tsconfig.json');

// Main entry point
const indexConfig = {
  template: './src/index.html',
  inject: 'body',
  baseHref: './'
};

const webpackConfig = {
  mode: 'development',
  // How source maps are generated : style of source mapping
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  // Development server configuration
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  // Where webpack looks to start building the bundle
  entry: {
    'app': './src/main.ts' // Demo app entry point
  },
  // How the different types of modules within a project will be treated
  module: {
    rules: [
      { test: /\.ts|\.tsx$/, loader: 'ts-loader' },
      // All files with a '.scss' extension will be handled by sass-loader
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
        // })
      },
      // CSS loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    modules: [
      path.resolve('./src'),
      path.resolve('./src/packages'),
      path.resolve('./node_modules')
    ],
    alias: Object.keys(tsconfig.compilerOptions.paths).reduce((aliases, aliasName) => {
      aliases[aliasName] = path.resolve(__dirname, `src/${tsconfig.compilerOptions.paths[aliasName][0]}`);
      return aliases;
    }, {})
  },
  // How and where webpack should output bundles, assets and anything else
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  // What bundle information gets displayed
  stats: {
    warnings: false
  },
  // Target a specific environment (cf. doc)
  target: 'web',
  // Configure whether to polyfill or mock certain Node.js globals and modules
  node: {
    __dirname: false
  },
  // Customize the webpack build process with additionals plugins
  plugins: [
    new HtmlWebpackPlugin(indexConfig),
		new CopyWebpackPlugin([
			{
				from: './node_modules/metro4/build/css/metro-all.min.css',
				flatten: true,
				to: './assets/css/'
			},
			{
				from: './node_modules/metro4/build/mif/metro.*',
				flatten: true,
				to: './assets/mif/'
			},
			{
				from: './src/link.css',
				flatten: true,
				to: './assets/css/'
			}
		])
  ]
};

// Export the config
module.exports = webpackConfig;
