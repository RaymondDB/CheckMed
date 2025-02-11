class Doctor {
  constructor(doctorId, specialtyId, licenseNumber, phoneNumber, yearsOfExperience, education, bio, consultationFee, clinicAddress, availabilityModelId, licenseExpirationDate, createdAt, updatedAt, isActive) {
    this.doctorId = doctorId;
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
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
    this.isActive = isActive;
  }

  /*updateSpecialty(newSpecialtyId) {
    this.specialtyId = newSpecialtyId;
    this.updatedAt = new Date();
  }*/
}

module.exports = Doctor;
