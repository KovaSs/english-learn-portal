const pkgColors = require('colors/safe');
const { VARIABLES } = require('./variables');

function verbose() {
  console.info(pkgColors.magenta('\nBuild VARIABLES:\n'));

  Object.entries(VARIABLES).forEach((it) => {
    console.info(pkgColors.green(`${it[0]} = ${verboseValue(it[1])}`));
  });

  console.info('\n');
}

function verboseValue(value) {
  if (typeof value === 'boolean') {
    return value ? pkgColors.blue(value) : pkgColors.gray(value);
  }

  return pkgColors.white(value);
}

module.exports = verbose;
