class DoctorDTO {
    constructor({ id, specialty, licenseNumber, phoneNumber, experience, education, bio, consultationFee, clinicAddress, isActive }) {
      this.id = id;
      this.specialty = specialty;
      this.licenseNumber = licenseNumber;
      this.phoneNumber = phoneNumber;
      this.experience = experience;
      this.education = education;
      this.bio = bio;
      this.consultationFee = consultationFee;
      this.clinicAddress = clinicAddress;
      this.isActive = isActive;
    }
  
    static fromModel(doctorModel) {
      return new DoctorDTO({
        id: doctorModel.DoctorID,
        specialty: doctorModel.SpecialtyID,
        licenseNumber: doctorModel.LicenseNumber,
        phoneNumber: doctorModel.PhoneNumber,
        experience: doctorModel.YearsOfExperience,
        education: doctorModel.Education,
        bio: doctorModel.Bio,
        consultationFee: doctorModel.ConsultationFee,
        clinicAddress: doctorModel.ClinicAddress,
        isActive: doctorModel.IsActive,
      });
    }
  }
  
  module.exports = DoctorDTO;
  