const personQuery = (items) => {
  return items.map((item) => {
    return {'query': 'CREATE (p: Person {first_name: {first_name}, last_name: {last_name}, email_address: {email_address}, phone_number: {phone_number}}) RETURN p', 'params': item }
  });
}

const driverTrainingQuery = (items) => {
  let querys = [];
  items.forEach((item) => {
    // console.log(item)
    let name = item['Name'];
    let first_name = name.split(' ')[0];
    let last_name = name.split(' ')[1];
    
    let courses = [];
    Object.keys(item).forEach((course) => {
      if(course !== 'Name' && item[course] !== 'n/a' && item[course] !== '') {
        courses.push(course);
      }
    });
    
    courses.forEach((course) => {
      let query = {'query': 'CREATE (c:DriverTrainingCourse {name: {course}, date: {date}, first_name: {first_name}, last_name: {last_name}}) RETURN c', params: {course: course, first_name: first_name, last_name: last_name, date: item[course]}};
      let relation = {'query': 'MATCH (p: Person {first_name: {first_name}, last_name: {last_name}}), (c:DriverTrainingCourse {name: {course}, date: {date}, first_name: {first_name}, last_name: {last_name}}) CREATE (p)-[:DRIVERTRAINING]->(c)', params: {course: course, first_name: first_name, last_name: last_name, date: item[course]}};
      querys.push(query, relation);
    })
  });

  return querys;
}


const queries = {
  volunteers: personQuery,
  driver_training: driverTrainingQuery
}

module.exports = queries;
