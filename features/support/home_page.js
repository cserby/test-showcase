/* eslint-disable require-jsdoc */
const expect = require('expect');

function HomePage(world) {
  const selectors = {
    xRegisztracio: '//a[contains(text(), "Regisztráció")]',
    xBelepes: '//a[contains(text(), "Belépés")]',
    xKilepes: '//a[contains(text(), "Kilépés")]',
    signInFields: {
      Email: 'input[name="member_email"]',
      Password: 'input[name="passwd"]',
    },
    submitSignIn: 'input[value="Belépés"]',
    errorMsg: '#libriMessagePanelContent',
    search: '#topsearch_input',
    searchSubmit: 'button[title="Keresés"]',
    searchSuggestionWithTitle: title => `div[id="search_hint"] li[data-name="${title}"]`,
    advancedSearch: 'a.search_detail',
  };

  const actions = {
    initiateSignup() {
      return world.page
        .waitForXPath(selectors.xRegisztracio)
        .then(reg => reg.click());
    },
    initiateSignin() {
      return world.page
        .waitForXPath(selectors.xBelepes)
        .then(reg => reg.click());
    },
    fillSignInDetails(details) {
      details.Email = details.Email || world.parameters.user_email;
      details.Password = details.Password || world.parameters.user_password;
      return Object.entries(details).reduce((prev, [detail, value]) => {
        return prev.then(() => actions.fillSignInDetail(detail, value));
      }, Promise.resolve());
    },
    fillSignInDetail(detail, value) {
      expect(Object.keys(selectors.signInFields)).toContain(detail);
      return world.page
        .waitForSelector(selectors.signInFields[detail])
        .then(field => field.type(value));
    },
    submitSignIn() {
      return world.page
        .waitForSelector(selectors.submitSignIn)
        .then(sbm => sbm.click());
    },
    typeSearchTerm(term) {
      return world.page
        .waitForSelector(selectors.search)
        .then(src => src.type(term));
    },
    submitSearch() {
      return world.page
        .waitForSelector(selectors.searchSubmit)
        .then(sbm => sbm.click());
    },
    initiateAdvancedSearch() {
      return world.page
        .waitForSelector(selectors.advancedSearch)
        .then(adv => adv.click());
    },
  };

  const checks = {
    getError(msgPattern) {
      return world.page
        .waitForSelector(selectors.errorMsg, { visible: true })
        .then(errMsg => world.getTextContent(errMsg))
        .then(errMsgTxt => expect(errMsgTxt).toMatch(new RegExp(msgPattern)));
    },
    canLogout() {
      return world.page
        .waitForXPath(selectors.xKilepes);
    },
    getSearchSuggestionForTitle(title) {
      return world.page
        .waitForSelector(selectors.searchSuggestionWithTitle(title));
    },
  };

  return {
    actions,
    checks,
  };
}

module.exports = HomePage;
