const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IInsuranceProviderRepository = require("../interfaces/IInsuranceProviderRepository");
const OperationResult = require("../../domain/valueObjects/OperationResult");

class InsuranceProviderRepositoryImpl extends IInsuranceProviderRepository{
    
  async save(insuranceProviderData) {
    try{

      if(!insuranceProviderData){
        OperationResult.failure('EmptyField')
      }

      const saveData = await InsuranceProvider.create(insuranceProviderData)
      return OperationResult.success(saveData);
    }
    catch (error){
     return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
     }
  }

  
  async findById(id) {
    try{

      if(!id){
        OperationResult.failure('EmptyID')
      }
      if(id <= 0){
        OperationResult.failure('InvalidID')
      }

      const findById = await InsuranceProvider.findByPk(id)
      if(!findById){
        OperationResult.failure('NoRecords')
      }

       return OperationResult.success(findById);
      }
     catch (error){
      return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
  }


    async findByEmail(email) {
      try {

        if(!email){
          OperationResult.failure('EmptyField')
        }

        if (!insuranceProviderData || Object.keys(insuranceProviderData).length === 0){
            return OperationResult.failure('EmptyUpdateFields');
        }

        const findByEmail = await InsuranceProvider.findOne({ where: { email } });;

          return OperationResult.success(findByEmail, 'UpdateCompleted');
      } catch (error) {
          return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
    }


    async findAll() {
      try {
        const result = await InsuranceProvider.findAll();

        if (!result || result.length === 0) {
            return OperationResult.failure('NoRecords');
        }

        return OperationResult.success(result);
      } catch (error) {
          return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
    }

    async update(id, insuranceProviderData) {
      try {

        const insuranceProvider = await InsuranceProviderRepositoryImpl.FindById(id);
        if (!insuranceProvider) {
            return null;
        }

        if (!insuranceProviderData || Object.keys(insuranceProviderData).length === 0){
            return OperationResult.failure('EmptyUpdateFields');
        }

        const updatedRecord = await InsuranceProvider.update(insuranceProviderData);

          return OperationResult.success(updatedRecord, 'UpdateCompleted');
      } catch (error) {
          return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
    }
    
    async delete(id) {
      try {
        const insuranceProvider = await InsuranceProviderRepositoryImpl.FindById(id);
        if (!insuranceProvider) {
            return null;
        }

        const deleteRecord =  await InsuranceProvider.destroy({ where: { id } });

        return OperationResult.success(deleteRecord,'DeleteCompleted')
      } catch (error) {
        return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }    
    }
  }
  
  module.exports = InsuranceProviderRepositoryImpl;