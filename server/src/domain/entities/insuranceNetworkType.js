class InsuranceNetworkType {
    constructor(id, name, description, createdAt, updatedAt, isActive) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || null;
      this.isActive = isActive;
    }

  }
  
  module.exports = InsuranceNetworkType;