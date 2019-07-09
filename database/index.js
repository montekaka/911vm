// const Neode = require('neode');
// const PersonSchema = require('./models/person');
// const DriverTrainingCourseSchema = require('./models/driver_training_course');

// const instance = new Neode.fromEnv();
// // Schema Objects
// instance.model('Person', PersonSchema);
// instance.model('DriverTrainingCourse', DriverTrainingCourseSchema);

const person = require('./controllers/person');

module.exports = {
  person: person
}
