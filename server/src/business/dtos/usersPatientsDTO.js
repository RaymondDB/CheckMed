class PatientDTO {
    constructor({ id, dateOfBirth, gender, phoneNumber, address, bloodType, insuranceProvider, isActive, createdAt }) {
      this.id = id;
      this.dateOfBirth = dateOfBirth;
      this.gender = gender;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.bloodType = bloodType;
      this.insuranceProvider = insuranceProvider;
      this.isActive = isActive;
      this.createdAt = createdAt;
    }
  
    static fromModel(patientModel) {
      return new PatientDTO({
        id: patientModel.PatientID,
        dateOfBirth: patientModel.DateOfBirth,
        gender: patientModel.Gender,
        phoneNumber: patientModel.PhoneNumber,
        address: patientModel.Address,
        bloodType: patientModel.BloodType,
        insuranceProvider: patientModel.InsuranceProviderID,
        isActive: patientModel.IsActive,
        createdAt: patientModel.CreatedAt,
      });
    }
  }
  
  module.exports = PatientDTO;
  