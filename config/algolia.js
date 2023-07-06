const algoliasearch = require('algoliasearch');

const client = algoliasearch('VRAPD4WP8Z', '135b292d566049f1fd5b1fa24807894a');
const index = client.initIndex('easyQuiz');

module.exports = {
  index
};