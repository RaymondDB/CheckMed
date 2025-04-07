export class Patient {
    constructor(dto) {
      this.id = dto.PatientID;
      this.date = dto.DateOfBirth;
      this.gender = dto.Gender;
      this.phone = dto.PhoneNumber;
      this.address = dto.Address;
      this.ecName = dto.EmergencyContactName;
      this.ecPhone = dto.EmergencyContactPhone;
      this.blood = dto.BloodType;
      this.allergies = dto.Allergies;
      this.insurance = dto.InsuranceProviderID;
      this.active = dto.IsActive;
    }
  
    toDTO() {
      return {
        DateOfBirth: this.date,
        Gender: this.gender,
        PhoneNumber: this.phone,
        Address: this.address,
        EmergencyContactName: this.ecName,
        EmergencyContactPhone: this.ecPhone,
        BloodType: this.blood,
        Allergies: this.allergies,
        InsuranceProviderID: this.insurance,
        IsActive: this.active,
      };
    }
  
    static fromDTO(dto) {
      return new Patient(dto);
    }
  }
  