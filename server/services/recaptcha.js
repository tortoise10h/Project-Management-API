const { Recaptcha } = require('recaptcha-v2');
const util = require('util');

const { getReCaptchaConfig } = require('../../common').config;

const { skip, v2 } = getReCaptchaConfig();

module.exports = async (data) => {
  try {
    if (skip) {
      return true;
    }
    const recaptcha = new Recaptcha(
      v2.sitekey,
      v2.secretKey,
      {
        ...data,
        secret: v2.secretKey,
      },
    );

    const verify = util.promisify(recaptcha.verify);
    const success = await verify();
    return success;
  } catch (error) {
    throw error;
  }
};
