module.exports = {
    isLicenseValid: (expirationDate) => {
      return new Date(expirationDate) > new Date();
    },
  
    isValidExperience: (years) => {
      return years >= 1;
    },
  
    isValidConsultationFee: (fee) => {
      return fee === null || fee > 0;
    }
  };
  