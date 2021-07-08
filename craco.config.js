const WebpackBar = require('webpackbar');

process.env.BROWSER = 'none';

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true })
    ],
  },
};
