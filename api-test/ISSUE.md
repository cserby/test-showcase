# Issue report - Updating the coordinate attribute of a Feature doesn't show on subsequent read

|                             |                                       |
| ---                         | ---                                   |
| __ID__                      | 345                                   |
| __Faulty product__          | Mapbox Maps / Datasets API            |
| __Version__                 | As deployed at 2:27 PM 29th June 2020 |
| __Faulty use case__         | Update Feature                        |
| __Test automation version__ | [c72c7c](https://github.com/cserby/test-showcase/commit/c72c7c668d0ab72f79ed986d169359e78537dcbe) |
| __Reproducibility__         | 100% reproducible                     |
| __Probability__             | Medium                                |
| __Impact__                  | Low                                   |


## Detailed description / Reproduction steps

The `Happy path` test case defined in the automated test suite in [api-test/Mapbox.postman_collection.json]() reproduces this error. The test steps are:
 * Create a new `Dataset`
 * Create a new `Feature` inside the `Dataset`
 * Update the `.geometry.coordinates[1]` attribute of the `Feature`. This request returns a successful response code.
 * Read the attributes of the `Feature`: this request would be expected to return the updated value, but instead it returns the original one, as seen in the [report](https://github.com/cserby/test-showcase/suites/853361362/artifacts/9747538)

 Retrying the read request returns the updated values eventually, so the update action has the desired effect.

## Impact

User experience may suffer in applications that implement the `Update Feature` use case, as the effect of an update action doesn't show on next read. The user would need to forcefully refresh, or wait for the next automatic refresh to see the effects of his/her actions.




