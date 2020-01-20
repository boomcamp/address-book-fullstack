/* eslint-disable camelcase */



exports.shorthands = undefined;
exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        userid: {
          type: 'integer',
          notNull: true,
          references: '"users"', // this is how we associate a profile with a specific user.
        },
        contactid: {
          type: 'integer',
          notNull: true,
          onDelete: "cascade",
        },
        groupname:{
            type:'text',
            notNull:true
        }
       
      });
};
exports.down = (pgm) => {

};

