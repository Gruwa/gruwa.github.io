const _ = require('lodash');
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
let cadreonConfig = null;

// Extract all argumnets like --name=value
const parseArgv = (argv) => _.chain(argv)
  .filter(arg => _.startsWith(arg, '--'))
  .map(param => {
    const [key, value] = param.split('=');
    return [_.camelCase(key), value]
  })
  .fromPairs()
  .value()

function isInsideCoreRepoDir() {
  // unity core repo could have these names only:
  // "unity-core" - as git submodule
  // "unity-ui-core" - as standalone git repo
  return /(unity-core|unity-ui-core)/.test(path.basename(process.env.PWD));
}

/**
 * Find list files mathes glob and split it to pairs of [filename, dirname]
 * @example
 * _findFilesPairs('some/path/ ** /*.txt'); // without spaces around **
 * @returns { [string, string][] }
 */
const _findFilesPairs = globStr => glob.sync(globStr).map(pth => [path.basename(pth), path.dirname(pth)]);

/**
 * Takes list of glob expressions, search all files matched expression
 * and if files exist in several dir then takes the last one
 * @example
 * findFarthestFiles(['some/path/ ** /*.txt', 'some/other/path/ ** /*.txt']);  // without spaces around **
 * @returns { string[] }
 */
const findFarthestFiles = globs => _.chain(globs)
  .map(globStr => _.fromPairs(_findFilesPairs(globStr)))
  .reduce((result, curr) => _.merge(result, curr), {})
  .map((dirname, filename) => path.join(dirname, filename))
  .value();

function readCadreonConfig() {
  const distDir = 'dist';
  const fileName = 'cadreon.js';
  const fileEncoding = 'utf8';
  const filePath = path.resolve(process.cwd(), distDir, process.env.APP_DIST_DIR, fileName);
  return fs.readFileSync(filePath, fileEncoding);
}

function parseCadreonConfig(rawConfig) {
  const vmSandbox = {window: {}};
  vm.runInNewContext(rawConfig, vmSandbox);

  return vmSandbox.window.cadreon;
}

function getCadreonConfig() {
  if (!cadreonConfig) {
    cadreonConfig = parseCadreonConfig(readCadreonConfig());
  }

  return cadreonConfig;
}

module.exports = {
  parseArgv,
  isInsideCoreRepoDir,
  findFarthestFiles,
  getCadreonConfig
};
