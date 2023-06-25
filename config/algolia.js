const algoliasearch = require('algoliasearch');

const client = algoliasearch('VRAPD4WP8Z', 'c0eb070af85df0b558de57a0d4226a22');
const index = client.initIndex('easyQuiz');

module.exports = {
  index
};