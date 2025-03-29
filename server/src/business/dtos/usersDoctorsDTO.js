class DoctorDTO {
  constructor({
    id,
    specialtyId,
    licenseNumber,
    phoneNumber,
    yearsOfExperience,
    education,
    bio,
    consultationFee,
    clinicAddress,
    availabilityModelId,
    licenseExpirationDate,
    isActive,
    createdAt,
    updatedAt
  }) {
    this.id = id;
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
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromModel(model) {
    return new DoctorDTO({
      id: model.DoctorID,
      specialtyId: model.SpecialtyID,
      licenseNumber: model.LicenseNumber,
      phoneNumber: model.PhoneNumber,
      yearsOfExperience: model.YearsOfExperience,
      education: model.Education,
      bio: model.Bio,
      consultationFee: model.ConsultationFee,
      clinicAddress: model.ClinicAddress,
      availabilityModelId: model.AvailabilityModelId,
      licenseExpirationDate: model.LicenseExpirationDate,
      isActive: model.IsActive,
      createdAt: model.CreatedAt,
      updatedAt: model.UpdatedAt
    });
  }
}

module.exports = DoctorDTO;
