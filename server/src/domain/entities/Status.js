const StatusName = require("./StatusName");

class Status {
  constructor(statusID, name) {
    this.statusID = statusID;
    this.name = new StatusName(name);
  }

  getName() {
    return this.name.getValue();
  }

  isValid() {
    return this.statusID && this.name.getValue();
  }
}

module.exports = Status;
