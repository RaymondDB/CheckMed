class AppointmentDate {
    constructor(date) {
      if (!(date instanceof Date)) {
        throw new Error("Invalid date format");
      }
      this.date = date;
    }
  
    getDate() {
      return this.date;
    }
  
    equals(other) {
      return other instanceof AppointmentDate && this.date.getTime() === other.getDate().getTime();
    }
  }
  
  module.exports = AppointmentDate;
  