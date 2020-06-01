module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/typescript',
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "transform-class-properties"
  ],
};
