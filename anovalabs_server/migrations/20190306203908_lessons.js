
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('lesson', function(table) {
      table.increments();
      table.string('title').comment('title of lesson');
      table.string('summary').comment('summary of what the lesson will be about');
      table.string('link').comment('google slides link');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    	})
    // .then(() => updateTimestampTrigger(knex, 'lesson'))
    .catch(function(error) {
      console.error(error);
    });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('lesson');
};
