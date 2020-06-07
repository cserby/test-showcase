const { Given, When, Then } = require('cucumber');

//Given
Given('I am logged on with my credentials', { timeout: 15000 }, function() {
  return this.browser.actions.goto("root")
    .then(() => this.acceptCookiesModal.actions.accept())
    .then(() => this.homePage.actions.initiateSignin())
    .then(() => this.homePage.actions.fillSignInDetails({}))
    .then(() => this.homePage.actions.submitSignIn())
    .then(() => this.browser.checks.landOnPage("root"))
    .then(() => this.homePage.checks.canLogout());
});
Given('I searched for {string}', function(searchTerm) {
  return this.homePage.actions.typeSearchTerm(searchTerm)
    .then(() => this.homePage.actions.submitSearch())
    .then(() => this.browser.checks.landOnPage("Search Results"));
});
Given('I cleared my shopping cart', function() {
  return this.searchResultsPage.checks.shoppingCartEmpty().then(
    Promise.resolve(), () => this.searchResultsPage.actions.clearShoppingCart());
});

//When
When('I navigate to the {string} page', { timeout: 15000 }, function(pageName) {
  return this.browser.actions.goto(pageName);
});
When('I accept the cookies', function() {
  return this.acceptCookiesModal.actions.accept();
});
When('I initiate the Signup process', function() {
  return this.homePage.actions.initiateSignup();
});
When('I fill my account details as:', function(accountDetailsTable) {
  return this.createAccountPage.actions.fillAccountDetails(accountDetailsTable.rowsHash());
});
When('I accept the terms and conditions', function() {
  return this.createAccountPage.actions.acceptTerms();
});
When('I submit the Create Account form', function() {
  return this.createAccountPage.actions.submit();
});
When('I initiate the Sign in process', function() {
  return this.homePage.actions.initiateSignin();
});
When('I provide my Sign in credentials', function() {
  return this.homePage.actions.fillSignInDetails({});
});
When('I provide my Sign in credentials as:', function(signInDetailsTable) {
  return this.homePage.actions.fillSignInDetails(signInDetailsTable.rowsHash());
});
When('I submit my Sign in credentials', function() {
  return this.homePage.actions.submitSignIn();
});
When('I put {string} in the search field', function(searchTerm) {
  return this.homePage.actions.typeSearchTerm(searchTerm);
});
When('I submit my search', function() {
  return this.homePage.actions.submitSearch();
});
When('I restrict the search results by price to {string}', function(priceRange) {
  return this.searchResultsPage.actions.addPriceRangeFilter(priceRange);
});
When('I initiate advanced search', function() {
  return this.homePage.actions.initiateAdvancedSearch();
});
When('I fill my advanced search criteria as:', function(searchCriteriaTable) {
  return this.advancedSearchPage.actions.fillSearchCriteria(searchCriteriaTable.rowsHash());
});
When('I submit my advanced search', function() {
  return this.advancedSearchPage.actions.submit();
});
When('I put the first item in my cart', function() {
  return this.searchResultsPage.actions.putFirstItemInCart();
});
When('I remove the item from my cart', function() {
  return this.searchResultsPage.actions.removeItemFromCart();
});
When('I proceed to checkout', function() {
  return this.searchResultsPage.actions.proceedToCheckout();
});

//Then
Then('I land on the {string} page', function(pageName) {
  return this.browser.checks.landOnPage(pageName);
});
Then('Signup fails with an email validation error saying: {string}', function(msgPattern) {
  return this.createAccountPage.checks.getEmailValidationError(msgPattern);
});
Then('Sign in fails with a message saying: {string}', function(msgPattern) {
  return this.homePage.checks.getError(msgPattern);
});
Then('I have the option to log out', function() {
  return this.homePage.checks.canLogout();
});
Then('I get a book with title {string} as a search suggestion', function(title) {
  return this.homePage.checks.getSearchSuggestionForTitle(title);
});
Then('All books in my search results have prices higher than {int}', function(price) {
  return this.searchResultsPage.checks.allResultsHavePriceHigherThan(price);
});
Then('I get a search result with title {string}', function(titlePattern) {
  return this.searchResultsPage.checks.haveResultWithTitle(titlePattern);
});
Then('My shopping cart is empty', function() {
  return this.searchResultsPage.checks.shoppingCartEmpty();
});
Then('I get a confirmation about my item being placed into the cart', function() {
  return this.searchResultsPage.checks.confirmationOnItemPlacedIntoCart();
});
Then('I have 1 item in my cart', function() {
  return this.searchResultsPage.checks.numberOfItemsInCart(1);
});
Then('I have {int} items in my cart', function(numItems) {
  return this.searchResultsPage.checks.numberOfItemsInCart(numItems);
});
