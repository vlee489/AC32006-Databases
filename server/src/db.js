const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const db = Knex(knexConfig.development);
module.exports = Model.knex(db);