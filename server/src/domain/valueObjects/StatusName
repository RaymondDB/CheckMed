class StatusName {
    constructor(name) {
      if (!name) {
        throw new Error("Status name is required");
      }
      this.name = name;
    }
  
    getValue() {
      return this.name;
    }
  
    equals(other) {
      return other instanceof StatusName && this.name === other.getValue();
    }
  }
  
  module.exports = StatusName;
  