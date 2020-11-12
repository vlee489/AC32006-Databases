const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

const knex = Knex(knexConfig.development);
module.exports = Model.knex(knex);