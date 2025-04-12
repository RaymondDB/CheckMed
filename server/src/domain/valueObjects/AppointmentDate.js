class AppointmentDate {
  constructor(dateString) {
    if (!this.isValidDate(dateString)) {
      throw new Error('Invalid appointment date format. Expected YYYY-MM-DD.');
    }
    this.value = dateString;
    this.date = new Date(dateString);
  }

  isValidDate(dateString) {
    // Check if date string is valid format (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Check if date is valid
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  toString() {
    return this.value;
  }

  equals(otherDate) {
    if (!(otherDate instanceof AppointmentDate)) {
      return false;
    }
    return this.value === otherDate.value;
  }

  toISOString() {
    return this.date.toISOString();
  }

  isInFuture() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.date >= today;
  }
}

module.exports = AppointmentDate;