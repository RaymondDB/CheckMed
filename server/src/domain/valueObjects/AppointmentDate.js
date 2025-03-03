class AppointmentDate {
  constructor(date) {
    if (!Date.parse(date)) {
      throw new Error('Invalid date format');
    }
    this.date = new Date(date);
  }

  toString() {
    return this.date.toISOString();
  }
}

module.exports = AppointmentDate;
