const getAll = (instance) => {
  return instance.all('Person');
}

module.exports = {
  getAll: getAll
}