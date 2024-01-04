class Employee {
  constructor(id, firstName, lastName, branch, joinDate) {
    (this.id = id),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.branch = branch),
      (this.joinDate = joinDate);
  }
}

module.exports = Employee;
