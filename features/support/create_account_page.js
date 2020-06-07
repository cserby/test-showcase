/* eslint-disable require-jsdoc */
const expect = require('expect');

function CreateAccountPage(world) {
  const selectors = {
    fields: {
      Name: '#reg_name',
      Email: '#reg_email',
      Password: '#reg_passwd',
      "Password Again": '#reg_passwd2',
    },
    acceptTerms: '#acceptTerms',
    submit: '#registerSubmit',
    emailValidationError: 'label[for="reg_email"] > span.errormsg',
  };

  const actions = {
    fillAccountDetails(details) {
      details.Email = details.Email || world.parameters.user_email;
      return Object.entries(details).reduce((prev, [detail, value]) => {
        return prev.then(() => actions.fillAccountDetail(detail, value));
      }, Promise.resolve());
    },
    fillAccountDetail(detail, value) {
      expect(Object.keys(selectors.fields)).toContain(detail);
      return world.page
        .waitForSelector(selectors.fields[detail])
        .then(field => field.type(value));
    },
    acceptTerms() {
      return world.page
        .waitForSelector(selectors.acceptTerms)
        .then(at => world.page.evaluate(el => el.click(), at));
    },
    submit() {
      return world.page
        .waitForSelector(selectors.submit)
        .then(sbm => sbm.click());
    },
  };

  const checks = {
    getEmailValidationError(saying) {
      return world.page
        .waitForSelector(selectors.emailValidationError)
        .then(err => world.getTextContent(err))
        .then(errMsg => expect(errMsg).toMatch(new RegExp(saying)));
    },
  };

  return {
    actions,
    checks,
  };
}

module.exports = CreateAccountPage;
