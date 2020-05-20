module.exports = {
  // change to .tsx if necessary
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    // path: path.join(process.cwd(), 'dist') // default
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [{
      test: /\.(t|j)sx?$/,
      use: {
        loader: 'ts-loader',
      },
      exclude: /node_modules/,
    }, {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "source-map-loader"
    }]
  },
  // prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  // addition - add source-map support
  devtool: "source-map",
  devServer: {
    port: 4004,
    publicPath: '/dist/',
  }
};
