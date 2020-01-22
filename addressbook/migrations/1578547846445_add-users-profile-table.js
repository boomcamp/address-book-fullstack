/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('user_profiles', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      userid: {
        type: 'integer',
        notNull: true,
        references: '"users"', 
      },
      firstname: {
        type: 'text',
      },
      lastname: {
        type: 'text',
      },
      phone: {
        type: 'text',
      },
      
    });
};
exports.down = (pgm) => {

};
