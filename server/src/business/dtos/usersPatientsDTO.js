class PatientDTO {
  constructor({
    id,
    dateOfBirth,
    gender,
    phoneNumber,
    address,
    emergencyContactName,
    emergencyContactPhone,
    bloodType,
    allergies,
    insuranceProviderId,
    isActive,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.emergencyContactName = emergencyContactName;
    this.emergencyContactPhone = emergencyContactPhone;
    this.bloodType = bloodType;
    this.allergies = allergies;
    this.insuranceProviderId = insuranceProviderId;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromModel(model) {
    return new PatientDTO({
      id: model.PatientID,
      dateOfBirth: model.DateOfBirth,
      gender: model.Gender,
      phoneNumber: model.PhoneNumber,
      address: model.Address,
      emergencyContactName: model.EmergencyContactName,
      emergencyContactPhone: model.EmergencyContactPhone,
      bloodType: model.BloodType,
      allergies: model.Allergies,
      insuranceProviderId: model.InsuranceProviderID,
      isActive: model.IsActive,
      createdAt: model.CreatedAt,
      updatedAt: model.UpdatedAt
    });
  }
}

module.exports = PatientDTO;
