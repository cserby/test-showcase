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
}, function (err) {
    if (err) { throw err; }
});
