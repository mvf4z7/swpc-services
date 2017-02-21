
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tokens', function(table) {
    table.increments().primary();
    table.timestamps();
    table.uuid('uuid');
  })
  .then(function () {
   console.log('tokens table was created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('tokens', table)
    .then(function () {
     console.log('tokens table was dropped');
  });
};
