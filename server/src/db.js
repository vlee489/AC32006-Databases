const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
module.exports = Knex(knexConfig.development);