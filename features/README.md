# Automated UI Test Showcase
## Input requirements

The project was created based on this imaginary input from a customer:

> Write an automated test for an e-commerce site:
>    * Pick one of your favorite e-commerce websites
>    * You need to implement the following tests:
>      * Login
>      * Searching products by three criteria
>      * Adding products to the cart
>      * Removing products from the cart
>      * Checkout process
>      * If possible, implement a sign-up / registration test
>    * Add an HTML report of test results
>    * Report any bugs you find by writing a bug ticket
>    * Please prepare a document with the test flows and test cases. The documents have to be clear both to the developer and to someone who is not familiar with the technology.
>    * Run tests in a continuous integration tool and optionally in the cloud

## Overview

These tests describe and verify some of the functionalities of the E-Commerce site of one of Hungary's largest book stores: [Libri](https://libri.hu).

An example [test plan document](TEST_PLAN.md) is included in order to showcase the structure of such a document, notably the test case definitions.

The tests are built [BDD style](https://en.wikipedia.org/wiki/Behavior-driven_development), the test scenarios are defined in the so-called `feature files` using the Gherkin language, which makes them easy to understand (and hopefully review) by non-technical people, like Business Representatives.

The output of the tests is a similarly clean, easy-to-digest HTML report, describing each step that was taken, with clear error messages and screenshots in case of a test failure. On the other hand, under the surface, the report contains debug log output (down to the API call level) also, that provides  indispensable information for developers in understanding and fixing failures.

## How to run

### Prerequisites

The project is based on [Node.js](https://nodejs.org/), and uses its [npm](https://www.npmjs.com/) package manager.

To run the code, one needs to have `npm` installed on his/her computer.

### Checking out

Check out the latest version of this repository, using `git clone` and `git pull --rebase`.

### Installing dependencies

Once checked out, and `npm` installed, the necessary dependencies can be installed by issuing:
```
npm install
```

### Execution

Execute the tests by running:
```
LIBRI_USER_EMAIL=<email> LIBRI_USER_PASSWORD=<password> npm run-script ui-test
```


### Report generation

After the run finished, the HTML report is generated, and output to `/report/cucumber-report.html`.

## CI integration

Make sure to have the `LIBRI_USER_EMAIL` and the `LIBRI_USER_PASSWORD` environment variables defined on the CI server.

### GitLab CI
An example configuration for GitLab CI can be found in [../.gitlab-ci.yaml]() in the `test/ui-test` job.

### GitHub Actions
The [../.github/workflows/ui-test.yaml]() file describes the GitHub Actions Workflow that runs these UI tests.

## Developer's guide

The test framework in use is `cucumber-js`. Browser automation is perfomed using `puppeteer`. Assertion library in use is `jest-expect`.

New tests need to be added as `.feature` files to `/features/`.

The Gherkin steps are glued to their respective JS implementation in [../features/step_definitions/steps.js]().

Pre/post hooks are defined in [../features/hooks.js]().

In Cucumber-JS, all steps have access to a shared `World` instance. This can be used to pass state around, and also to implement utility functions. The code for `World` is in [../features/world.js]().

The test automation code is following the [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html), the Page Objects are defined in [../features/support/](), alongside with some helper libraries, notably one for Logging: [../features/support/logging.js]().
