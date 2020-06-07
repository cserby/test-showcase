# Overview

This is a showcase project for demonstrating my experience in multiple fields of testing web applications.

It contains three parts:

1) Automated UI tests
1) Automated API tests
1) Automated backend performance tests

# Project requirements

The project was created based on these imaginary input from a customer:

> 1) Write an automated test for an e-commerce site:
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
>    * Run tests in a continuous integration tool and optionally in the > cloud
>
> 2) Write an automated test for a REST API service
>
>    * Implement REST API tests for some of the “location” services by your choice. The idea of this test is to implement tests for creating data, modifying existing data, or deleting data. For example, you can create your own map with pins on it.
>    * You may pick any REST API provider which offers such service (as long it’s free to use).
>    * Implement test cases of sending location information to the map. Test sending proper information, invalid information, incorrect format, and other possible edge cases.
>    * Test for at least three different HTTP response codes in your tests. For example, 200 OK, 401 Unauthorized or 304 Not Modified.
>    * Add an HTML report of test results
>    * Report any bugs you find by writing a bug ticket
>
> 3) Pick a random web application and create a load test with a tool of your choice but using an HTTP/S protocol. The load test needs to simulate 1000 users who will visit the homepage in a period of 15s. Measure web application response time before and during the test run.
>    * Explain the test in details
>    * Did the load test have an impact on web application response time?
>    * What is the optimal application response time for modern-day web > applications?
>    * Analyze few HTTP/S responses
>

# Solutions
## Automated UI Tests
### Overview

These tests describe and verify some of the functionalities of the E-Commerce site of one of Hungary's largest book stores: [Libri](https://libri.hu).

The tests are built [BDD style](https://en.wikipedia.org/wiki/Behavior-driven_development), the test scenarios are defined in the so-called `feature files` using the Gherkin language, which makes them easy to understand (and hopefully review) by non-technical people, like Business Representatives.

The output of the tests is a similarly clean, easy-to-digest HTML report, describing each step that was taken, with clear error messages and screenshots in case of a test failure. On the other hand, under the surface, the report contains debug log output (down to the API call level) also, that provides  indispensable information for developers in understanding and fixing failures.

### How to run

#### Prerequisites

The project is based on [Node.js](https://nodejs.org/), and uses its [npm](https://www.npmjs.com/) package manager.

To run the code, one needs to have `npm` installed on his/her computer.

#### Checking out

Check out the latest version of this repository, using `git clone` and `git pull --rebase`.

#### Installing dependencies

Once checked out, and `npm` installed, the necessary dependencies can be installed by issuing:
```
npm install
```

#### Execution

Execute the tests by running:
```
LIBRI_USER_EMAIL=<email> LIBRI_USER_PASSWORD=<password> npm run-script ui-test
```


#### Report generation

After the run finished, the HTML report is generated, and output to `report/cucumber-report.html`.

### CI integration

An example configuration for GitLab CI can be found in [.gitlab-ci.yaml](.gitlab-ci.yml) in the `test/ui-test` job.

Make sure to have the `LIBRI_USER_EMAIL` and the `LIBRI_USER_PASSWORD` environment variables defined on the CI server.

### Developer's guide

The test framework in use is `cucumber-js`. Browser automation is perfomed using `puppeteer`. Assertion library in use is `jest-expect`.

New tests need to be added as `.feature` files to `features/`.

The Gherkin steps are glued to their respective JS implementation in [features/step_definitions/steps.js](features/step_definitions/steps.js).

Pre/post hooks are defined in [features/hooks.js](features/hooks.js).

In Cucumber-JS, all steps have access to a shared `World` instance. This can be used to pass state around, and also to implement utility functions. The code for `World` is in [features/world.js](features/world.js).

The test automation code is following the [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html), the Page Objects are defined in [features/support/](features/support/), alongside with some helper libraries, notably one for Logging: [features/support/logging.js](features/support/logging.js).

## Automated API Tests
### Overview

These tests describe and verify some of the functionalities of the [REST API of Mapbox](https://docs.mapbox.com/api/).

The tests are built in [Postman](https://www.postman.com/), an easy-to-use API testing tool, that's relatively easy to master for non-technical people, like Business Representatives.

The output of the tests is a similarly clean, easy-to-digest HTML report, describing each step that was taken, with clear error messages in case of a test failure. On the other hand, under the surface, the report contains request/response headers, and bodies, that provide indispensable information for developers in understanding and fixing failures.

### How to run

#### Prerequisites

The project is based on [Node.js](https://nodejs.org/), and uses its [npm](https://www.npmjs.com/) package manager.

To run the code, one needs to have `npm` installed on his/her computer.

For authentication, one needs to obtain a user name and an API key for Mapbox.

#### Checking out

Check out the latest version of this repository, using `git clone` and `git pull --rebase`.

#### Installing dependencies

Once checked out, and `npm` installed, the necessary dependencies can be installed by issuing:
```
npm install
```

#### Execution

Execute the tests by running:
```
MAPBOX_USER_NAME=<username> MAPBOX_API_KEY=<apiKey> npm run-script api-test
```

#### Report generation

After the run finished, the HTML report is generated automatically, and can be found in the `newman/` folder.

### CI integration

An example configuration for GitLab CI can be found in [.gitlab-ci.yaml](.gitlab-ci.yml), in the `test/api-test` job.

Make sure to have the `MAPBOX_USER_NAME` and the `MAPBOX_API_KEY` environment variables defined on the CI server.

### Developer's guide

Use Postman UI to add new test cases to the [collection](api-test/Mapbox.postman_collection.json).

Inside the collection each folder describes the requests pertaining to the same test case. Folders need to be run in order, using the Postman Runner.

The necessary environment variables are stored in the [api-test/Mapbox.postman_environment.json]() file.

Once done in Postman, export the Collection, and overwrite the [api-test/Mapbox.postman_collection.json]() file with the new contents.

## Automated Load Test
### Overview

This test performs load testing towards [Artillery's Documentation](https://artillery.io/docs), measuring response time statistics, responses per seconds and counts response codes.

The tests are built on [Artillery](https://artillery.io/), an easy-to-use load testing tool, that's relatively easy to master for non-technical people, like Business Representatives.

The test is set up to simulate ~1000 users arriving in a 15 seconds time-frame (at 67 users/second arrival rate) and requesting the `/doc` path on the web server.

In order to understand the distribution of response times, one needs to check several statistics, like mean and median of response times alongside percentiles and outliers. The trend of response time (if it has any) during test run can also convey useful information on the non-functional characteristics of the software under test.

As todays web applications perform many (possibly in the order of hundreds) requests to display a single page, it is of paramount importance that these requests are handled with as minimal response delay as possible, as delay for these many requests add up soon, and make the user experience suffer.

The output of the tests is a similarly clean, easy-to-digest HTML report, showing the measurement results as graphs, alongside raw data to be used for further investigation.

### How to run

#### Prerequisites

The project is based on [Node.js](https://nodejs.org/), and uses its [npm](https://www.npmjs.com/) package manager.

To run the code, one needs to have `npm` installed on his/her computer.

#### Checking out

Check out the latest version of this repository, using `git clone` and `git pull --rebase`.

#### Installing dependencies

Once checked out, and `npm` installed, the necessary dependencies can be installed by issuing:
```
npm install
```

#### Execution

Execute the tests by running:
```
npm run-script load-test
```

#### Report generation

After the run finished, the HTML report is generated automatically, and can be found in the `report/` folder.

### CI integration

An example configuration for GitLab CI can be found in [.gitlab-ci.yaml](.gitlab-ci.yml), in the `test/load-test` job.

### Developer's guide

Define the load test's parameters in [load-test/artillery.yaml](). The semantics of this file is described in detail in the [Artillery Script Reference](https://artillery.io/docs/script-reference/).
