const User = require('./User');

class Patient extends User {
  constructor(id, firstName, lastName, email, password, roleId, dateOfBirth, gender, phoneNumber, address, emergencyContactName, emergencyContactPhone, bloodType, allergies, insuranceProviderId, createdAt, updatedAt, isActive) {
    super(id, firstName, lastName, email, password, roleId, createdAt, updatedAt, isActive);
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.emergencyContactName = emergencyContactName;
    this.emergencyContactPhone = emergencyContactPhone;
    this.bloodType = bloodType;
    this.allergies = allergies;
    this.insuranceProviderId = insuranceProviderId;
  }
  
}

module.exports = Patient;
