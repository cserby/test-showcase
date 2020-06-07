/* eslint-disable require-jsdoc */
const expect = require('expect');
const { URL } = require('url');

function Browser(world) {
  const urls = {
    root: '/',
    "Create Account": '/registration/',
    "Search Results": '/talalati_lista/',
    "Advanced Search": '/reszletes_kereso/',
    "Checkout Summary": '/megrendeles/kosar/',
  };

  const actions = {
    goto(pageName) {
      return this.gotoWithUrlParams(pageName, undefined);
    },

    gotoWithUrlParams(pageName, urlParams) {
      const urlParamsHash = urlParams ? urlParams.rowsHash() : {};
      const queryParamsString = Object.keys(urlParamsHash)
        .map(key => `${key}=${urlParamsHash[key]}`)
        .join('&');
      return world.page.goto(
        `${world.parameters.host + urls[pageName]}${
          queryParamsString ? `?${queryParamsString}` : ''
        }`,
        {
          waitUntil: 'networkidle0',
          timeout: 14500,
        }
      );
    },
  };

  const checks = {
    landOnPage(pageName) {
      expect(Object.keys(urls)).toContain(pageName);
      return world.page
        .waitForNavigation()
        .then(() => world.page.url())
        .then((url) => expect(new URL(url).pathname).toBe(urls[pageName]));
    },
  };

  return {
    actions,
    checks,
  };
}

module.exports = Browser;
