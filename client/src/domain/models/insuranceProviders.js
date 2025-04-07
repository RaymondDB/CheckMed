export class InsuranceProviders {
    constructor({ InsuranceProviderID, Name, ContactNumber, Email, Website, Address, City, State, Country, ZipCode, CoverageDetails, LogoUrl, 
      IsPreferred, NetworkTypeId, CustomerSupportContact, AcceptedRegions, MaxCoverageAmount, IsActive } ) {
        this.InsuranceProviderID = InsuranceProviderID;
        this.Name = Name;
        this.ContactNumber = ContactNumber;
        this.Email = Email;
        this.Website = Website;
        this.Address = Address;
        this.City = City;
        this.State = State;
        this.Country = Country;
        this.ZipCode = ZipCode;
        this.CoverageDetails = CoverageDetails;
        this.LogoUrl = LogoUrl;
        this.IsPreferred = IsPreferred;
        this.NetworkTypeId = NetworkTypeId;
        this.CustomerSupportContact = CustomerSupportContact;
        this.AcceptedRegions = AcceptedRegions;
        this.MaxCoverageAmount = MaxCoverageAmount;
        this.IsActive = IsActive;
    }

    static fromDTO(dto) {
      return new InsuranceProviders({
        InsuranceProviderID: dto.InsuranceProviderID,
        Name: dto.Name,
        ContactNumber: dto.ContactNumber,
        Email: dto.Email,
        Website: dto.Website,
        Address: dto.Address,
        City: dto.City,
        State: dto.State,
        Country: dto.Country,
        ZipCode: dto.ZipCode,
        CoverageDetails: dto.CoverageDetails,
        LogoUrl: dto.LogoUrl,
        IsPreferred: dto.IsPreferred,
        NetworkTypeId: dto.NetworkTypeId,
        CustomerSupportContact: dto.CustomerSupportContact,
        AcceptedRegions: dto.AcceptedRegions,
        MaxCoverageAmount: dto.MaxCoverageAmount,
        IsActive: dto.IsActive,
      });
    }
  
    toDTO() {
      return {
        InsuranceProviderID: this.InsuranceProviderID,
        Name: this.Name,
        ContactNumber: this.ContactNumber,
        Email: this.Email, 
        Website: this.Website, 
        Address: this.Address, 
        City: this.City, 
        State: this.State, 
        Country: this.Country, 
        ZipCode: this.ZipCode, 
        CoverageDetails: this.CoverageDetails, 
        LogoUrl: this.LogoUrl, 
        IsPreferred: this.IsPreferred, 
        NetworkTypeId: this.NetworkTypeId, 
        CustomerSupportContact: this.CustomerSupportContact, 
        AcceptedRegions: this.AcceptedRegions, 
        MaxCoverageAmount: this.MaxCoverageAmount, 
        IsActive: this.IsActive,
      };
    }
  }
