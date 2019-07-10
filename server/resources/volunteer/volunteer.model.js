// const instance = new Neode.fromEnv();
// const uuidv1 = require('uuid/v1');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
  },
  firstName: {
    type: 'name',
    required: true,
  },
  lastName: {
    type: 'name',
    required: true,   
  },
  emailAddress: {
    type: 'email',
    required: true,
  },
  phoneNumber: {
    type: 'string',
    empty: true,
  },
  class: {
    type: 'string',
    empty: true
  },
  startDate: {
    type: 'date',
    empty: true,
  },
  endDate: {
    type: 'date',
    empty: true,
  },
  createdAt: {
    type: 'datetime',
    default: () => new Date,
  }
}

module.exports = schema;