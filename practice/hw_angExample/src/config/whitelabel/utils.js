const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');

const child_process = require('child_process');
const {isInsideCoreRepoDir} = require('../utils');

const ENV_NAME = 'UNITY_WHITELABEL';
const COMMAND_LINE_OPTION = '--env.whitelabel';

const whitelabelDir = path.resolve(__dirname, '../../../tmp/whitelabel');

function _getWhitelabelDir() {
  // By default take active whitelabel from file config
  let name = require('./whitelabel.json').dir;

  // environment variable override active whitelabel
  if (process.env[ENV_NAME]) {
    name = process.env[ENV_NAME];
  }

  // command line variable override active whitelabel
  // npm run dev -- --env.whitelabel=um
  process.argv.forEach(arg => {
    if (_.startsWith(arg, COMMAND_LINE_OPTION)) {
      [,name] = arg.split('=');
    }
  });

  name = name || 'default';

  let relativePath; // points to dir where config.yaml located
  let absolutePath;

  const defaultWhitelabelDir = '../config/whitelabel/default';

  if (name === 'default') {
    relativePath = defaultWhitelabelDir;
    absolutePath = path.resolve(__dirname, 'default');

  } else {
    relativePath = '../../tmp/whitelabel/configs/' + name;
    absolutePath = path.resolve(whitelabelDir, 'configs', name);

    if (!fs.existsSync(absolutePath)) {
      console.warn(`WARNING: Could not find folder for whitelabel '${name}'. Using 'default'`);
      name = 'default';
      relativePath = defaultWhitelabelDir;
      absolutePath = path.resolve(__dirname, 'default');
    } else {
      console.log(`* Using "${name}" whitelabel config`);
    }
  }

  return {
    name,
    relativePath,
    absolutePath
  };
}

function getWhitelabelConfig() {
  const wlDir = _getWhitelabelDir();
  const rawYaml = fs.readFileSync(wlDir.absolutePath  + '/config.yaml')
    .toString()
    .replace(/__whitelabel_dir__/g, wlDir.relativePath);
  const config = yaml.safeLoad(rawYaml);
  _.merge(config, wlDir);
  return config;
}

const defaultVars = '@import \'../../../src/config/whitelabel/default/variables-default\';';
const variablesFile = path.resolve(whitelabelDir, 'current/variables.scss');
const stylesFile = path.resolve(whitelabelDir, 'current/styles.scss');
const i18nFile = path.resolve(whitelabelDir, 'current/i18n.json');

function extractCurrentWhitelabel(conf) {
  fs.writeFileSync(variablesFile, `// Do not touch! Generated file.\n\n${defaultVars}\n\n${conf.variables}`);
  fs.writeFileSync(stylesFile, `// Do not touch! Generated file.\n\n${conf.styles}`);
  fs.writeFileSync(i18nFile, JSON.stringify(conf.i18n));
}

function makeWhitelabelStubs() {
  if (!fs.existsSync(variablesFile)) {
    fs.writeFileSync(variablesFile, '');
  }

  if (!fs.existsSync(stylesFile)) {
    fs.writeFileSync(stylesFile, '');
  }

  if (!fs.existsSync(i18nFile)) {
    fs.writeFileSync(i18nFile, '{}');
  }
}

// TODO: Move from config to package.json or gulp
// Need to call inside config as --env.whitelabel parameter is applied only for last npm command
// e.g. in package.json
//   start: 'npm run whitelabel && npm run dev'
//   npm start -- --env.whitelabel=ABC
// ABC is applied only 'npm run dev' cmd
function _generateWhitelabelAndSvg(env) {
  console.log('* Generate Whitelabel and svg *');

  if (isInsideCoreRepoDir()) {
    child_process.execSync(`${env} npm run svg`, { stdio: 'inherit' });
    child_process.execSync(`${env} npm run whitelabel`, { stdio: 'inherit' });

  } else { // if in application dir
    child_process.execSync(`${env} npm run svg`, { stdio: 'inherit' });
    child_process.execSync(`${env} npm run svg`, { cwd: 'unity-core', stdio: 'inherit' });
    child_process.execSync(`${env} npm run whitelabel`, { cwd: 'unity-core', stdio: 'inherit' });
  }
}
function generateWhitelabelAndSvg() {
  const wlName = getWhitelabelConfig().name;
  _generateWhitelabelAndSvg(`${ENV_NAME}=${wlName}`);
}
function generateWhitelabelAndSvgStubs() {
  _generateWhitelabelAndSvg('MAKE_STUBS=true');
}

module.exports = {
  getWhitelabelConfig,
  extractCurrentWhitelabel,
  makeWhitelabelStubs,
  generateWhitelabelAndSvg,
  generateWhitelabelAndSvgStubs
};
