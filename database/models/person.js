const Person = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
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
}

module.exports = Person;