/* eslint-disable require-jsdoc */
const expect = require('expect');

function AdvancedSearchPage(world) {
  const selectors = {
    fields: {
      Author: '#s_szerzo',
      Title: '#s_cim',
      'Price Low': '#s_ar1',
    },
    submit: 'input[value="Keresés"]',
  };

  const actions = {
    fillSearchCriteria(criteria) {
      return Object.entries(criteria).reduce((prev, [criterion, value]) => {
        return prev.then(() => actions.fillSearchCriterion(criterion, value));
      }, Promise.resolve());
    },
    fillSearchCriterion(criterion, value) {
      expect(Object.keys(selectors.fields)).toContain(criterion);
      return world.page
        .waitForSelector(selectors.fields[criterion])
        .then(field => field.type(value));
    },
    submit() {
      return world.page
        .waitForSelector(selectors.submit)
        .then(sbm => sbm.click());
    },
  };

  const checks = {
  };

  return {
    actions,
    checks,
  };
}

module.exports = AdvancedSearchPage;
