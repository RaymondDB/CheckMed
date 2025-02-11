const User = require('./User');

class Doctor extends User {
  constructor(id, firstName, lastName, email, password, roleId, specialtyId, licenseNumber, phoneNumber, yearsOfExperience, education, bio, consultationFee, clinicAddress, availabilityModelId, licenseExpirationDate, createdAt, updatedAt, isActive) {
    super(id, firstName, lastName, email, password, roleId, createdAt, updatedAt, isActive);
    this.specialtyId = specialtyId;
    this.licenseNumber = licenseNumber;
    this.phoneNumber = phoneNumber;
    this.yearsOfExperience = yearsOfExperience;
    this.education = education;
    this.bio = bio;
    this.consultationFee = consultationFee;
    this.clinicAddress = clinicAddress;
    this.availabilityModelId = availabilityModelId;
    this.licenseExpirationDate = licenseExpirationDate;
  }

}

module.exports = Doctor;