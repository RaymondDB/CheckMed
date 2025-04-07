export class InsuranceNetworkType {
    constructor({ NetworkTypeId , Name, Description, IsActive }) {
      this.NetworkTypeId = NetworkTypeId;
      this.Name = Name;
      this.Description = Description;
      this.IsActive = IsActive;
    }
  
    static fromDTO(dto) {
      return new InsuranceNetworkType({
        NetworkTypeId: dto.NetworkTypeId,
        Name: dto.Name,
        Description: dto.Description,
        IsActive: dto.IsActive,
      });
    }
    
    toDTO() {
      return {
        NetworkTypeId: this.NetworkTypeId,
        Name: this.Name, 
        Description:  this.Description,
        IsActive: this.IsActive,
      };
    }
  }
