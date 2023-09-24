const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.ts'), // Update the entry file path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // Allow resolving TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Use ts-loader for TypeScript files
        exclude: /node_modules/,
      },
    ],
  },
};
