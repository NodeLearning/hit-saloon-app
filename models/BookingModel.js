class Booking {
  constructor(
    id,
    firstName,
    lastName,
    contactNumber,
    email,
    service,
    subService,
    subServiceType,
    date,
    timeSlot
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNumber = contactNumber;
    this.email = email;
    this.service = service;
    this.subService = subService;
    this.subServiceType = subServiceType;
    this.date = date;
    this.timeSlot = timeSlot;
  }
}

module.exports = Booking;
