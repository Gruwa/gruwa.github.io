'use strict';

const Passport = require('passport').Passport;
const SamlStrategy = require('passport-saml').Strategy;
const utils = require('../utils.js');

class SamlMiddleware {
  constructor() {
    this.passport = new Passport();
    this.passportStrategy = getPassportStrategy();
    this.passport.use(this.passportStrategy);
  }

  authenticate() {
    return this.passport.authenticate(this.passportStrategy.name);
  }
}

function getPassportStrategy() {
  return new SamlStrategy({
    entryPoint: getIdpEntryPoint(),
    issuer: 'CAD:DEV:Unity:SAML2:SP'
  }, function() {});
}

function getIdpEntryPoint() {
  let cadreonConfig;
  try {
    cadreonConfig = utils.getCadreonConfig();
  } catch (e) {
    throw new Error("SamlMiddleware: cadreon.js file was not found, provide cadreon.js config file with correct 'baseURL' property");
  }
  const redirectHost = process.env.PUBLIC_PATH_HOST || 'localhost'; // host where user agent will be redirected to after success login
  const targetResource = `${cadreonConfig.baseURL}token?grant_type=saml%26redirectURL=${redirectHost}:3000`; // validates the response
  return `https://samldev.interpublic.com/sp/startSSO.ping?PartnerIdpId=CAD:DEV:Unity:SAML2:IdP&TargetResource=${targetResource}`;
}

module.exports = SamlMiddleware;
