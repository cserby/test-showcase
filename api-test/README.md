# Automated API Test Showcase
## Input requirements

The project was created based on this imaginary input from a customer:

> Write an automated test for a REST API service
>
>    * Implement REST API tests for some of the “location” services by your choice. The idea of this test is to implement tests for creating data, modifying existing data, or deleting data. For example, you can create your own map with pins on it.
>    * You may pick any REST API provider which offers such service (as long it’s free to use).
>    * Implement test cases of sending location information to the map. Test sending proper information, invalid information, incorrect format, and other possible edge cases.
>    * Test for at least three different HTTP response codes in your tests. For example, 200 OK, 401 Unauthorized or 304 Not Modified.
>    * Add an HTML report of test results
>    * Report any bugs you find by writing a bug ticket

## Overview

These tests describe and verify some of the functionalities of the [REST API of Mapbox](https://docs.mapbox.com/api/).

The tests are built in [Postman](https://www.postman.com/), an easy-to-use API testing tool, that's relatively easy to master for non-technical people, like Business Representatives.

The output of the tests is a similarly clean, easy-to-digest HTML report, describing each step that was taken, with clear error messages in case of a test failure. On the other hand, under the surface, the report contains request/response headers, and bodies, that provide indispensable information for developers in understanding and fixing failures.

## How to run

### Prerequisites

The project is based on [Node.js](https://nodejs.org/), and uses its [npm](https://www.npmjs.com/) package manager.

To run the code, one needs to have `npm` installed on his/her computer.

For authentication, one needs to obtain a user name and an API key for Mapbox.

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
MAPBOX_USER_NAME=<username> MAPBOX_API_KEY=<apiKey> npm run-script api-test
```

### Report generation

After the run finished, the HTML report is generated automatically, and can be found in the `/newman/` folder.

## CI integration

Make sure to have the `MAPBOX_USER_NAME` and the `MAPBOX_API_KEY` environment variables defined on the CI server.

### GitLab CI
An example configuration for GitLab CI can be found in [../.gitlab-ci.yaml](), in the `test/api-test` job.

### GitHub Actions
The [../.github/workflows/api-test.yaml]() file describes the GitHub Actions Workflow that runs these API tests.

## Developer's guide

Use Postman UI to add new test cases to the [collection](../api-test/Mapbox.postman_collection.json).

Inside the collection each folder describes the requests pertaining to the same test case. Folders need to be run in order, using the Postman Runner.

Once done in Postman, export the Collection, and overwrite the [../api-test/Mapbox.postman_collection.json]() file with the new contents.

## Issues found

The automated API tests fail on reading the attributes of a `Feature` right after they were updated. The assertions are set up to expect the updated values to be returned, however it seems that updates are done in an eventually consistent manner.

No information on how to report issues for the Mapbox Maps API was found on the [Mapbox site](https://mapbox.com), so an example issue report showcasing the necessary information elements was written up in [../api-test/ISSUE.md]().
