const newman = require('newman');

newman.run({
    collection: require('./Mapbox.postman_collection.json'),
    reporters: [ 'cli', 'htmlextra' ],
    reporter: {
      htmlextra: {
        title: 'Newman API Test Report',
      },
    },
    environment: {
      values: [
        {
          key: "user_name",
          value: process.env.MAPBOX_USER_NAME,
        },
        {
          key: "access_token",
          value: process.env.MAPBOX_API_KEY,
        },
      ],
    },
}, function (error, summary) {
    if (error) { throw error; }
    if (summary.error) { console.log(`Error: ${summary.error}`); process.exit(1); }
    if (summary.run.failures.length >= 0) { console.log(`Test failures: ${JSON.stringify(summary.run.failures)}`); process.exit(1); }
});
