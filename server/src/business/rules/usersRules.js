module.exports = {
    isValidPassword: (password) => {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    },
  
    isAllowedEmailDomain: (email) => {
      const forbiddenDomains = ["spam.com", "tempmail.com"];
      const domain = email.split("@")[1];
      return !forbiddenDomains.includes(domain);
    }
  };
  