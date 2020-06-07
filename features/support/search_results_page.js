/* eslint-disable require-jsdoc */
const expect = require('expect');

function SearchResultsPage(world) {
  const selectors = {
    xPriceRangeFilter: range => `//div[@id="browse-category-container-price"]//a[contains(text(), "${range}")]`,
    priceTag: 'span.act-price',
    title: '.book-title',
    putInCart: 'div.addToBasket > a.button',
    cartSummary: '#basketBoxSummary',
    confirmationMsg: '#libriMessagePanelContent > .msgOk',
    cartOpen: '#basketBoxOpenIcon',
    cartClear: 'a[behat-role="empty-cart"]',
    cartItemRemove: 'div.removeItem button',
    toCheckout: 'a.top-cash-register',
  };

  function openCart() {
    return world.page
      .waitForSelector(selectors.cartOpen)
      .then(co => co.click());
  }
  const actions = {
    addPriceRangeFilter(priceRange) {
      return world.page
        .waitForXPath(selectors.xPriceRangeFilter(priceRange))
        .then(flt => flt.click());
    },
    putFirstItemInCart() {
      return world.page
        .waitForSelector(selectors.putInCart)
        .then(pic => pic.click());
    },
    clearShoppingCart() {
      return openCart()
        .then(() => world.page.waitForSelector(selectors.cartClear))
        .then(cc => cc.click())
        .then(() => world.page.waitForSelector(selectors.cartClear, { hidden: true }));
    },
    removeItemFromCart() {
      return openCart()
        .then(() => world.page.waitForSelector(selectors.cartItemRemove))
        .then(ri => world.page.evaluate(el => el.click(), ri))
        .then(() => world.page.waitForSelector(selectors.cartItemRemove, { hidden: true }));
    },
    proceedToCheckout() {
      return world.page
        .waitForSelector(selectors.toCheckout)
        .then(tc => world.page.evaluate(el => el.click(), tc));
    },
  };

  const checks = {
    allResultsHavePriceHigherThan(price) {
      return world.page
        .waitForSelector(selectors.priceTag)
        .then(() => world.page.$$(selectors.priceTag))
        .then(priceTags => Promise.all(priceTags.map(priceTag => world.getTextContent(priceTag))))
        .then(priceTagTexts => priceTagTexts.map(txt => parseInt(txt.replace(/\D/g,''), 10)))
        .then(priceTagInts => priceTagInts.map(priceTag => expect(priceTag).toBeGreaterThan(price)));
    },
    haveResultWithTitle(titlePattern) {
      return world.page
        .waitForSelector(selectors.title)
        .then(() => world.page.$$(selectors.title))
        .then(titles => Promise.all(titles.map(title => world.getTextContent(title))))
        .then(titleTxts => expect(titleTxts.find(titleTxt => titleTxt.match(new RegExp(titlePattern, 'i')))).toBeDefined());
    },
    shoppingCartEmpty() {
      return world.page
        .waitForSelector(selectors.cartSummary)
        .then(cs => world.getTextContent(cs))
        .then(csTxt => expect(csTxt).toMatch(new RegExp('üres')));
    },
    confirmationOnItemPlacedIntoCart() {
      return world.page
        .waitForSelector(selectors.confirmationMsg)
        .then(cm => {
          return world.getTextContent(cm)
            .then(cmTxt => expect(cmTxt).toMatch(new RegExp('a kosárba került')))
            .then(() => cm.click());
        });
    },
    numberOfItemsInCart(numItems) {
      return world.page
        .waitForSelector(selectors.cartSummary)
        .then(cs => world.getTextContent(cs))
        .then(csTxt => expect(csTxt).toMatch(new RegExp(`${numItems} tétel`)));
    },
  };

  return {
    actions,
    checks,
  };
}

module.exports = SearchResultsPage;
