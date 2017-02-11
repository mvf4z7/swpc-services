
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('email');
    table.string('password');
    table.timestamps();
  })
  .then(function () {
   console.log('users table is created!');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users', table)
    .then(function () {
     console.log('users table was dropped!');
    });
};
