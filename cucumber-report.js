require('cucumber-html-reporter').generate({
  theme: 'bootstrap',
  jsonFile: 'report/cucumber-report.json',
  output: 'report/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
  },
});
