import { Strategy } from 'passport-saml';
import * as passport from 'passport';
import * as express from 'express';

export function init(app: express.Application) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  const options = {
    entryPoint: 'https://sts.blue.com/adfs/ls',
    issuer: '',
    callbackUrl: '',
    authnConnect: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
    identifierFormat: null,
    signatureAlgorithm: 'shal',
    acceptedClockSkewMs: -1,
    cert: 'MIIC1DCCAbygAwIBAgIQW1PhcUbARqhFQyXfOnmDzTANBgkqhkiG9w0BAQsFADAmMSQwIgYDVQQDExtBREZTIFNpZ25pbmcgLSBzdHMuYmx1ZS5jb20wHhcNMTgwNTEwMTEwMjM5WhcNMTkwNTEwMTEwMjM5WjAmMSQwIgYDVQQDExtBREZTIFNpZ25pbmcgLSBzdHMuYmx1ZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1CN/bZupZeHF4H/GUdoVKurtVsD2OYKC3cifZBTCDSLoQJcJWcbnbRb6PPIj457rgbl7fh1uM9w/2BhH+7zWoku3AI6joLuavAO050zPLi2bG4CoYJUp4sdOE8/Mp4lrkZCE6Pg0+jdTHlN6XbLvS/wl5Hs4WZxHeNNr+rMBMM9KPvgJNsw+a1uq/t1GIIFrfCYIhldsrIpuY0sb7QBvCb2t0pkl9+8ncyeUplclSp1jA4Sf699wbz6IpM8IFf3rs2Is5knWfo2MxNZO4asByunDbMklqVRSE+BLaspg7kyKq8wvXJwUCXsCJwIOIXStzeyvmUmsP/SnPWQq8h3LjAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIS4h0aKLLGhgvzESX9FGigCoBSncZFZQ5UyNL08xHsRD65mUFrQyi3Ym00jvxFQWq72kLNnh+TMQWceqpMnq756x1hbGOEJZ0ITaAvrbguc1s3ul2Oyr/wUO4y0ort4U6MeFzjVr/nEV72Qn3+muHRIt7Oh7gHUq1+y9ji1xJr312mqR/cq4bSGM19VAkuYK0kIn9OKF8dz6bXtfsOvW68ZfmzIxLhVL+DNhczTNCh2SdMkOUYSoo+A/RebiMXz0duVoQDL6gcFDeCZb4oijOGx+60aiIyBeLs0oT8vRsJz9zWCHm6DyYbxQKEpyAgnVs0hwJ6udLiKEj/XT2wxp5s='
  };

}
