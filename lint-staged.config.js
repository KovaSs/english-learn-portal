module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --quiet --fix', 'git add'],
  '*.{md,yml,json}': ['prettier --write', 'git add'],
};
