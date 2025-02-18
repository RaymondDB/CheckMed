const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IInsuranceNetworkTypeRepository = require("../interfaces/IInsuranceNetworkTypeRepository");
const OperationResult = require("../../domain/valueObjects/OperationResult");

class InsuranceNetworkTypeImp extends IInsuranceNetworkTypeRepository {
    
    async save(insuranceNetworkTypeData) {
      try{
        if(!insuranceNetworkTypeData){
          OperationResult.failure('EmptyField')
        }

        const saveData = await InsuranceNetworkType.create(insuranceNetworkTypeData)
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

        const findById = await InsuranceNetworkType.findByPk(id)
        if(!findById){
          OperationResult.failure('NoRecords')
        }

         return OperationResult.success(findById);
        }
       catch (error){
        return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
        }
    }
  

    async findAll() {
      try {
          const result = await InsuranceNetworkType.findAll();

          if (!result || result.length === 0) {
              return OperationResult.failure('NoRecords');
          }

          return OperationResult.success(result);
      } catch (error) {
          return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
    }


    async update(id, insuranceNetworkTypeData) {
      try {

        const insuranceNetworkType = await InsuranceNetworkTypeImp.FindById(id);
        if (!insuranceNetworkType) {
            return null;
        }

        if (!insuranceNetworkTypeData || Object.keys(insuranceNetworkTypeData).length === 0){
            return OperationResult.failure('EmptyUpdateFields');
        }

        const updatedRecord = await insuranceNetworkType.update(insuranceNetworkTypeData);

          return OperationResult.success(updatedRecord, 'UpdateCompleted');
      } catch (error) {
          return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }
    }


    async delete(id) {
      try {
        const insuranceNetworkType = await InsuranceNetworkTypeImp.FindById(id);
        if (!insuranceNetworkType) {
            return null;
        }

        const deleteRecord =  await InsuranceNetworkType.destroy({ where: { id } });

        return OperationResult.success(deleteRecord,'DeleteCompleted')
      } catch (error) {
        return OperationResult.failure(`Ha ocurrido un error: ${error.message}`);
      }    
    }
}
module.exports = InsuranceNetworkTypeImp;