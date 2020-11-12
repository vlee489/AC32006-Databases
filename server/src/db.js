const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const { Products } = require('./models/products');

const knex = Knex(knexConfig.development);
Model.knex(knex);

async function main() {
  
    // Read all rows from the db.
    items = await Products.query();
  
    console.log(items);

    await Products.query().insert({
        Name: 'Worst Shelf',
        Catergory: 1,
        Price: 1,
        Description: "The worst of the worst",
        Weight: 0.1,
        Colour: 'Green',
        Dimensions: "10x5x1"
    });


    items = await Products.query();
    console.log(items);
  }
  
  main()
    .then(() => knex.destroy())
    .catch(err => {
      console.error(err);
      return knex.destroy();
    });