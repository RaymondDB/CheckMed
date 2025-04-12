class StatusName {
  constructor(name) {
    if (!this.isValidName(name)) {
      throw new Error('Invalid status name. Name must be a non-empty string.');
    }
    this.value = name.trim();
  }

  isValidName(name) {
    return typeof name === 'string' && name.trim().length > 0;
  }

  toString() {
    return this.value;
  }

  equals(otherName) {
    if (!(otherName instanceof StatusName)) {
      return false;
    }
    return this.value.toLowerCase() === otherName.value.toLowerCase();
  }
}

module.exports = StatusName;