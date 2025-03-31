const { sequelize } = require("../../infrastructure/db/dbconfig");
const InsuranceNetworkType = require("../../infrastructure/models/InsuranceNetworkTypeModel")
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");

const today = new Date().toISOString().split("T")[0];

class InsuranceNetworkTypeImplementation {

  async findById(InsuranceNetworkTypeID) {
    try {
      //console.log("🔍 Buscando tipo de red de seguros con ID:", InsuranceNetworkTypeID");
      
      if(!ValidationService.isValidId(InsuranceNetworkTypeID)) {
        console.error("El ID es inválido.")
        return OperationResult.failure('InvalidID')
      }

      const insuranceNetworkType = await InsuranceNetworkType.findByPk(InsuranceNetworkTypeID);

      if (!insuranceNetworkType) {
        console.error("Tipo de red de seguros no encontrado.")
        return OperationResult.failure('InsuranceNetworkTypeNotFound');
      } 
      
      console.log("Tipo de red de seguros ha sido encontrado correctamente.")
      return OperationResult.success(insuranceNetworkType);

    } catch (error) {
      console.log(error)
      return OperationResult.failure('InsuranceNetworkTypeSearchError', error);
    }
  }




  async findAll() {
    try {
      //console.log("📄 Buscando todos los tipos de redes de seguros...");

      const insuranceNetworkTypes = await InsuranceNetworkType.findAll();

      return OperationResult.success(insuranceNetworkTypes);
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSearchListError', error);
    }
  }
    



  async save(insuranceNetworkTypeData, transaction) {
    try {
      //console.log("💾 Guardando tipo de red de seguros en BD:", insuranceNetworkTypeData);

        const insuranceNetworkType = await InsuranceNetworkType.create({
          NetworkTypeId: insuranceNetworkTypeData.NetworkTypeID,
          Name: insuranceNetworkTypeData.Name,
          Description: insuranceNetworkTypeData.Description,
          CreatedAt: today,
          UpdatedAt: today,
          IsActive: insuranceNetworkTypeData.IsActive ?? true,
         }, { transaction }); 
      
      return OperationResult.success({id: insuranceNetworkType.NetworkTypeId}, 'InsuranceNetworkTypeSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSaveError', error);
    }
  }



  async update(InsuranceNetworkTypeID, updatedFields) {
    try {
      //console.log("✅ Actualizando tipo de red de seguros con ID:", InsuranceNetworkTypeID, "Campos:", updatedFields);

      const insuranceNetworkType = await InsuranceNetworkType.findByPk(InsuranceNetworkTypeID);

      if (!insuranceNetworkType) {
        console.error("Tipo de red de seguros no encontrado.")
        return OperationResult.failure('InsuranceNetworkTypeNotFound');
      };


      await insuranceNetworkType.update({
            ...updatedFields,
            UpdatedAt: new Date()
      });

      console.log("Tipo de red de seguros actualizado correctamente.")
      return OperationResult.success('InsuranceNetworkTypeUdateCompleted');
      
    } catch (error) {
      console.error("Ha ocurrido un error al intentar actualizar los campos:", error)
      return OperationResult.failure('InsuranceNetworkTypeUpdateError', error);
    }
  }



  async delete(InsuranceNetworkTypeID) {
    try {
      //console.log("🗑 Desactivando tipo de red de seguros con ID:", InsuranceNetworkTypeID);

      const insuranceNetworkType = await InsuranceNetworkType.findByPk(InsuranceNetworkTypeID);

      if (!insuranceNetworkType) {
        console.error("Tipo de red de seguros no encontrado o ya eliminado.")
        return OperationResult.failure('InsuranceNetworkTypeNotFoundOrDeleted');
      }; 

      await insuranceNetworkType.update({
        IsActive: false,
        UpdatedAt: new Date()
      });

      console.log("Tipo de red de seguros desactivado correctamente.")
      return OperationResult.success('InsuranceNetworkTypeDeleteCompleted');

    } catch (error) {
      console.error("Error al eliminar el tipo de red de seguros:", error);
      return OperationResult.failure('InsuranceNetworkTypeDeleteError', error);
    }
  }

}
module.exports = new InsuranceNetworkTypeImplementation();