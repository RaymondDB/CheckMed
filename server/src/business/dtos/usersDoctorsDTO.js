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
    AvailabilityModeId,
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
    this.AvailabilityModeId = AvailabilityModeId;
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
      AvailabilityModeId: model.AvailabilityModeId,
      licenseExpirationDate: model.LicenseExpirationDate,
      isActive: model.IsActive,
      createdAt: model.CreatedAt,
      updatedAt: model.UpdatedAt
    });
  }
}

module.exports = DoctorDTO;
