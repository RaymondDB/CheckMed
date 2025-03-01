requi

class InsuranceProvider {
    constructor(id, name, contactNumber, email, website, adress, city, state, country, zipCode, converageDetails, logoUrl, 
        isPrefered, networkTypeId, customerSupportContact, acceptedRegions, maxCoverageAmount, createdAt, updatedAt, isActive) {
      this.id = id;
      this.name = name;
      this.contactNumber = contactNumber;
      this.email = new EmailValid(email);
      this.website = website;
      this.adress = adress;     
      this.city = city;
      this.state = state;
      this.country = country;
      this.zipCode = zipCode;
      this.converageDetails = converageDetails;
      this.logoUrl = logoUrl;
      this.isPrefered = isPrefered;
      this.networkTypeId = networkTypeId;
      this.customerSupportContact = customerSupportContact;
      this.acceptedRegions = acceptedRegions;
      this.maxCoverageAmount = maxCoverageAmount;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || null;
      this.isActive = isActive;
    }
  
    updateEmail(newEmail) {
      this.email = new Email(newEmail);
      this.updatedAt = new Date();
    }
  
   deactivateInsuranceProvider() {
      this.isActive = false;
      this.updatedAt = new Date();
    }
  }
  
  module.exports = InsuranceProvider;