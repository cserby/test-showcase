# Automated Load Test Showcase
## Input requirements

The project was created based on this imaginary input from a customer:

> Pick a random web application and create a load test with a tool of your choice but using an HTTP/S protocol. The load test needs to simulate 1000 users who will visit the homepage in a period of 15s. Measure web application response time before and during the test run.
>    * Explain the test in details
>    * Did the load test have an impact on web application response time?
>    * What is the optimal application response time for modern-day web applications?
>    * Analyze few HTTP/S responses

## Overview

This test performs load testing towards [Artillery's Documentation](https://artillery.io/docs), measuring response time statistics, responses per seconds and counts response codes.

The tests are built on [Artillery](https://artillery.io/), an easy-to-use load testing tool, that's relatively easy to master for non-technical people, like Business Representatives.

The test is set up to simulate ~1000 users arriving in a 15 seconds time-frame (at 67 users/second arrival rate) and requesting the `/doc` path on the web server.

In order to understand the distribution of response times, one needs to check several statistics, like mean and median of response times alongside percentiles and outliers. The trend of response time (if it has any) during test run can also convey useful information on the non-functional characteristics of the software under test.

As todays web applications perform many (possibly in the order of hundreds) requests to display a single page, it is of paramount importance that these requests are handled with as minimal response delay as possible, as delay for these many requests add up soon, and make the user experience suffer.

The output of the tests is a similarly clean, easy-to-digest HTML report, showing the measurement results as graphs, alongside raw data to be used for further investigation.

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
npm run-script load-test
```

### Report generation

After the run finished, the HTML report is generated automatically, and can be found in the `/report/` folder.

In order to be able to see changes in the non-functional characteristics during the 15 seconds test, Artillery
is set up to emit statistics with a high frequency. This uncovered an issue with the HTML report generation
funcitonality provided by Artillery, reported in [Artillery issue #851](https://github.com/artilleryio/artillery/issues/851).

## CI integration

### GitLab CI
An example configuration for GitLab CI can be found in [/.gitlab-ci.yaml](), in the `test/load-test` job.

### GitHub Actions
The [/.github/workflows/api-test.yaml]() file describes the GitHub Actions Workflow that runs this load test.

## Developer's guide

Define the load test's parameters in [/load-test/artillery.yaml](). The semantics of this file is described in detail in the [Artillery Script Reference](https://artillery.io/docs/script-reference/).
