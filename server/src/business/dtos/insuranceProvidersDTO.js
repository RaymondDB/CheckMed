class InsuranceProvidersDTO {
    constructor({ id, name, contactNumber, email, website, address, city, state, country, zipCode, coverageDetails, logoUrl, 
        isPreferred, networkTypeId, customerSupportContact, acceptedRegions, maxCoverageAmount, createdAt, updatedAt, isActive }) {
      this.id = id;
      this.name = name;
      this.contactNumber = contactNumber;
      this.email = email;
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
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.isActive = isActive;
    }
  
    static fromModel(insuranceProviderModel) {
      return new InsuranceProvidersDTO({
        id: insuranceProviderModel.Id,
        name: insuranceProviderModel.Name,
        contactNumber: insuranceProviderModel.ContactNumber, 
        email: insuranceProviderModel.Email,
        website: insuranceProviderModel.Website,
        address: insuranceProviderModel.Address, 
        city: insuranceProviderModel.City,
        state: insuranceProviderModel.State,
        country: insuranceProviderModel.Country,
        zipCode: insuranceProviderModel.ZipCode,
        coverageDetails: insuranceProviderModel.Co,
        logoUrl: insuranceProviderModel.LogoUrl, 
        isPreferred: insuranceProviderModel.IsPreferred,
        networkTypeId: insuranceProviderModel.NetworkTypeId,
        customerSupportContact: insuranceProviderModel.CustomerSupportContact,
        acceptedRegions: insuranceProviderModel.AcceptedRegions,
        maxCoverageAmount: insuranceProviderModel.MaxCoverageAmount,
        createdAt: insuranceProviderModel.CreatedAt,
        updatedAt: insuranceProviderModel.UpdatedAt,
        isActive: insuranceProviderModel.IsActive
      });
    }
  }
  
  module.exports = InsuranceProvidersDTO;
  