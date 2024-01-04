class Booking {
  constructor({
    firstName,
    lastName,
    contactNumber,
    email,
    branch,
    service,
    subService,
    subServiceType,
    date,
    timeSlot,
    createdAt,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNumber = contactNumber;
    this.email = email;
    this.branch = branch;
    this.service = service;
    this.subService = subService;
    this.subServiceType = subServiceType;
    this.date = date;
    this.timeSlot = timeSlot;
    this.createdAt = createdAt;
  }

  // Method to convert Booking instance to a plain object
  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      contactNumber: this.contactNumber,
      email: this.email,
      branch: this.branch,
      service: this.service,
      subService: this.subService,
      subServiceType: this.subServiceType,
      date: this.date,
      timeSlot: this.timeSlot,
      createdAt: this.createdAt,
    };
  }
}
module.exports = Booking;
