const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IInsuranceProviderRepository = require("../interfaces/IInsuranceProviderRepository");

class InsuranceProviderRepositoryImpl extends IInsuranceProviderRepository{
    
    async save(insuranceProviderData) {
      return await InsuranceProvider.create(insuranceProviderData);
    }
  
    
    async findById(id) {
      return await InsuranceProvider.findByPk(id);
    }
  

    async findByEmail(email) {
      return await InsuranceProvider.findOne({ where: { email } });
    }

    async findAll() {
      return await InsuranceProvider.findAll();
    }

    async update(id, insuranceProviderData) {
      const insuranceProvider = await InsuranceProvider.findByPk(id);
      if (!insuranceProvider) return null;
  
      return await insuranceProvider.update(insuranceProviderData);
    }
  

    async delete(id) {
      return await InsuranceProvider.destroy({ where: { id } });    }
  }
  
  module.exports = InsuranceProviderRepositoryImpl;