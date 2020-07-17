const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './client/index.ts'
  ],

  mode: "development",

  watch: true,

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".ts"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {loader: "ts-loader"}
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|ttf)$/,
        use: ['file-loader'],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'client/static' }
    ])
  ]

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};
