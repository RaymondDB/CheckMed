class Patient {
  constructor(patientId, dateOfBirth, gender, phoneNumber, address, emergencyContactName, emergencyContactPhone, bloodType, allergies, insuranceProviderId, createdAt, updatedAt, isActive) {
    this.patientId = patientId;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.emergencyContactName = emergencyContactName;
    this.emergencyContactPhone = emergencyContactPhone;
    this.bloodType = bloodType;
    this.allergies = allergies;
    this.insuranceProviderId = insuranceProviderId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
    this.isActive = isActive;
  }

  /*updateAddress(newAddress) {
    this.address = newAddress;
    this.updatedAt = new Date();
  }*/
 
}

module.exports = Patient;