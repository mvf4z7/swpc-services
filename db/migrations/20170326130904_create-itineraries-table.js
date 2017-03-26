
exports.up = function(knex, Promise) {
  return knex.schema.createTable('itineraries', function(table) {
    table.increments().primary();
    table.timestamps();
    table.integer('user_id').references('id').inTable('users');
    table.boolean('two_way_trip');
    table.string('origin_airport');
    table.string('destination_airport');
    table.date('outbound_date');
    table.date('return_date');
    table.integer('adult_passenger_count');
  })
  .then(function () {
   console.log('itineraries table was created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('itineraries', table)
    .then(function () {
     console.log('itineraries table was dropped');
  });
};
