const Person = {
  id: {
    primary: true,
    type: 'uuid',
  },
  first_name: 'name',
  last_name: 'name',
  email_address: {
    type: 'email',
    empty: true,
  },
  phone_number: {
    type: 'string',
    empty: true,
  },
  createdAt: {
    type: 'datetime',
    default: () => new Date,
  },  
  driverTraining: {
    type: 'relationship',
    relationship: 'DRIVERTRAINING',
    direction: 'out',
    properties: {
      received: {
        type: 'date',
        default: () => new Date,
      }
    }
  },
}

module.exports = Person;