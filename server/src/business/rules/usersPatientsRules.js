module.exports = {
    isAdult: (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    },
  
    isValidBloodType: (bloodType) => {
      const validTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
      return validTypes.includes(bloodType);
    },
  
    isEmergencyPhoneDifferent: (phone, emergencyPhone) => {
      return phone !== emergencyPhone;
    }
  };
  