/*
This connects to the database using the creds in the 
knexfile.js file and then exports as a module tied into
Objection's Models
*/
const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

const db = Knex(knexConfig.development);

module.exports = Model.knex(db);