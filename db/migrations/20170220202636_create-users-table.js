
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.timestamps();
    table.string('email');
    table.string('password');
    table.enu('type', ['standard', 'admin']);
    table.uuid('uuid');
  })
  .then(function () {
   console.log('users table was created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users', table)
    .then(function () {
     console.log('users table was dropped');
  });
};
