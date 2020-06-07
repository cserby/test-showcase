/* eslint-disable require-jsdoc */
const expect = require('expect');

function AcceptCookiesModal(world) {
  const selectors = {
    modal: '#CybotCookiebotDialog',
    accept: '#CybotCookiebotDialogBodyButtonAccept',
  };

  const actions = {
    accept() {
      return world.page
        .waitForSelector(selectors.accept)
        .then(acc => acc.click())
        .then(() => world.page.waitForSelector(selectors.modal, { hidden: true }));
    },
  };

  const checks = {};

  return {
    actions,
    checks,
  };
}

module.exports = AcceptCookiesModal;
