class InsuranceProvider {
    constructor(id, name, contactNumber, email, website, address, city, state, country, zipCode, coverageDetails, logoUrl, 
        isPreferred, networkTypeId, customerSupportContact, acceptedRegions, maxCoverageAmount, createdAt, updatedAt, isActive) {
      this.id = id;
      this.name = name;
      this.contactNumber = contactNumber;
      this.email = new EmailValid(email);
      this.website = website;
      this.address = address;     
      this.city = city;
      this.state = state;
      this.country = country;
      this.zipCode = zipCode;
      this.coverageDetails = coverageDetails;
      this.logoUrl = logoUrl;
      this.isPreferred = isPreferred;
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

  }
  
  module.exports = InsuranceProvider;