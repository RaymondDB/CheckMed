class InsuranceNetworkTypeDTO {
    constructor({ id, name, description, createdAt, isActive }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdAt = createdAt;
      this.isActive = isActive;
    }
  
    static fromModel(insuranceNetworkTypeModel) {
      return new InsuranceNetworkTypeDTO({
        id: insuranceNetworkTypeModel.NetworkTypeID,
        name: insuranceNetworkTypeModel.Name,
        description: insuranceNetworkTypeModel.Description,
        createdAt: insuranceNetworkTypeModel.CreatedAt,
        isActive: insuranceNetworkTypeModel.IsActive,
      });
    }
  }
  
  module.exports = InsuranceNetworkTypeDTO;