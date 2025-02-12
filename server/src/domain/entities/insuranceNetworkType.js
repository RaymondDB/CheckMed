class InsuranceNetworkType {
    constructor(id, name, description, createdAt, updatedAt, isActive) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || null;
      this.isActive = isActive;
    }
  
    updateEmail(newEmail) {
      this.email = new Email(newEmail);
      this.updatedAt = new Date();
    }
  
   /* deactivateInsuranceNetworkTpye() {
      this.isActive = false;
      this.updatedAt = new Date();
    }*/
  }
  
  module.exports = InsuranceNetworkType;