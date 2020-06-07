/* eslint-disable new-cap */
const { After, Before, AfterAll, Status } = require('cucumber');

const scope = require('./support/scope');
const Browser = require('./support/browser');
const HomePage = require('./support/home_page');
const CreateAccountPage = require('./support/create_account_page');
const AcceptCookiesModal = require('./support/accept_cookies_modal');
const SearchResultsPage = require('./support/search_results_page');
const AdvancedSearchPage = require('./support/advanced_search_page');

Before(async function () {
  const world = this;

  // start a browser at first access, store it in the scope object, so that it is shared
  // throughout the whole test run
  // in theory this could/should go into BeforeAll, but that doesn't have World, so it
  // would not be possible to pass parameters to the browser instance (like headless)
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({
      headless: 'boolean' === typeof world.parameters.headless ? world.parameters.headless : true,
      slowMo: world.parameters.slowMo || 0,
      ignoreHTTPSErrors: true,
      // '--disable-features=site-per-process' is mandatory in order to be able to interact with
      // Stripe iframe contents
      args: (world.parameters.chromiumArgs || []).concat(['--disable-features=site-per-process']),
    });
  }


  const page = await scope.browser.createIncognitoBrowserContext().then(ic => ic.newPage());
  await page.setViewport({ width: 1280, height: 1024 });
  await page.setRequestInterception(true);
  await page.setDefaultTimeout(4800);
  page.setMaxListeners(50);
  world.logging.setupDefaultEventLogging(page);
  page.on('request', request => {
    if (request.url().match(new RegExp('cdn.segment.com|facebook.net|google-analytics.com|googleadservices.com'))) {
      request.abort();
    } else {
      // request may already be handled by a previous hook on the chain, in which case it will throw
      request
        .continue()
        .catch(exc => world.logging.debug(`Exception during request interception: ${exc}`));
    }
  });
  world.page = page;

  world.browser = new Browser(world);
  world.homePage = new HomePage(world);
  world.createAccountPage = new CreateAccountPage(world);
  world.acceptCookiesModal = new AcceptCookiesModal(world);
  world.searchResultsPage = new SearchResultsPage(world);
  world.advancedSearchPage = new AdvancedSearchPage(world);
});

After(async function(testCase) {
  const world = this;

  if (testCase.result.status !== Status.PASSED || world.parameters.iLoveScreenshots) {
    await world.page
      .screenshot({
        type: 'png',
        fullPage: true,
        encoding: 'binary',
      })
      .then(screenshot => world.attach(screenshot, 'image/png'));
  }

  // delete any cookies (shouldn't be necessary in Incognito) and close the page
  if (scope.browser && world.page) {
    const cookies = await world.page.cookies();
    if (cookies && cookies.length > 0) {
      await world.page.deleteCookie(...cookies);
    }
    await world.page.close();
    world.page = undefined;
  }
});

AfterAll(async () => {
  // Close the browser
  if (scope.browser) {
    await scope.browser.close();
  }
});
