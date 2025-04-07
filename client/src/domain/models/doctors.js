export class Doctor {
    constructor(dto) {
      this.id = dto.DoctorID;
      this.SpecialtyID = dto.SpecialtyID;
      this.LicenseNumber = dto.LicenseNumber;
      this.PhoneNumber = dto.PhoneNumber;
      this.YearsOfExperience = dto.YearsOfExperience;
      this.Education = dto.Education;
      this.Bio = dto.Bio;
      this.ConsultationFee = dto.ConsultationFee;
      this.ClinicAddress = dto.ClinicAddress;
      this.AvailabilityModeId = dto.AvailabilityModeId;
      this.LicenseExpirationDate = dto.LicenseExpirationDate;
      this.IsActive = dto.IsActive;
    }
  
    toDTO() {
      return {
        SpecialtyID: this.SpecialtyID,
        LicenseNumber: this.LicenseNumber,
        PhoneNumber: this.PhoneNumber,
        YearsOfExperience: this.YearsOfExperience,
        Education: this.Education,
        Bio: this.Bio,
        ConsultationFee: this.ConsultationFee,
        ClinicAddress: this.ClinicAddress,
        AvailabilityModeId: this.AvailabilityModeId,
        LicenseExpirationDate: this.LicenseExpirationDate,
        IsActive: this.IsActive,
      };
    }
  
    static fromDTO(dto) {
      return new Doctor(dto);
    }
  }
  