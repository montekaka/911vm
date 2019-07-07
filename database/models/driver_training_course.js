const DriverTrainingCourse = {
    id: {
      primary: true,
      type: 'uuid',
      required: true,
    },
    date: {
      type: 'date',
      default: () => new Date,
    },
    name: 'string',
    first_name: 'name',
    last_name: 'name',
  }
  
  module.exports = DriverTrainingCourse;