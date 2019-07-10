const Neode = require('neode');
const volunteerSchema = require('./volunteer/volunteer.model');

const instance = new Neode.fromEnv().with({
  Volunteer: volunteerSchema
});

module.exports = instance;
