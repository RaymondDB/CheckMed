class StatusName {
  constructor(status) {
    if (status !== 'Scheduled' && status !== 'Completed' && status !== 'Cancelled') {
      throw new Error('Invalid status');
    }
    this.status = status;
  }

  toString() {
    return this.status;
  }
}

module.exports = StatusName;
