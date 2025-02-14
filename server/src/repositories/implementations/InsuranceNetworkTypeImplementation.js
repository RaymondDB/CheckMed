const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IInsuranceNetworkTypeRepository = require("../interfaces/IInsuranceNetworkTypeRepository");

class InsuranceNetworkTypeImp extends IInsuranceNetworkTypeRepository {
    
    async save(insuranceNetworkTypeData) {
      return await InsuranceNetworkType.create(insuranceNetworkTypeData);
    }
  

    async findById(id) {
      return await InsuranceNetworkType.findByPk(id);
    }
  

    async findAll() {
      return await InsuranceNetworkType.findAll();
    }

    async update(id, insuranceNetworkTypeData) {
      const insuranceNetworkType = await InsuranceNetworkType.findByPk(id);
      if (!insuranceNetworkType) return null;
  
      return await insuranceNetworkType.update(insuranceNetworkTypeData);
    }
  

    async delete(id) {
      return await InsuranceNetworkType.destroy({ where: { id } });    
    }
}

  module.exports = InsuranceNetworkType;