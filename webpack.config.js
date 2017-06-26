module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "channels-web-client-lib.js",
    path: __dirname + "/bin/"
  },
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
}
