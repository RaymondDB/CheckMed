const { sequelize } = require("../../infrastructure/db/dbconfig");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");
const { QueryTypes } = require("sequelize");
const moment = require("moment");


class InsuranceNetworkTypeImplementation {

  async findById(InsuranceNetworkTypeID) {
    try {
      //console.log("🔍 Buscando tipo de red de seguros con ID:", InsuranceNetworkTypeID");
      
      if(!ValidationService.isValidId(InsuranceNetworkTypeID)) {
        console.error("El ID es inválido.")
        return OperationResult.failure('InvalidID')
      }

      const insuranceNetworkType = await sequelize.query(
        `SELECT * FROM insurance.NetworkType WHERE NetworkTypeID = :InsuranceNetworkTypeID`, 
        { 
          replacements: { InsuranceNetworkTypeID }, 
          type: QueryTypes.SELECT 
        }
      );


      if (insuranceNetworkType.length === 0) {
        console.error("Tipo de red de seguros no encontrado.")
        return OperationResult.failure('InsuranceNetworkTypeNotFound');
      } 
      
      console.log("Tipo de red de seguros ha sido encontrado correctamente.")
      return OperationResult.success(insuranceNetworkType[0]);
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSearchError', error);
    }
  }




  async findAll() {
    try {
      //console.log("📄 Buscando todos los tipos de redes de seguros...");

      const insuranceNetworkType = await sequelize.query(
        `SELECT * FROM insurance.NetworkType`, 
        { type: QueryTypes.SELECT }
      );

      return OperationResult.success(insuranceNetworkType);
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSearchListError', error);
    }
  }
    



  async save(insuranceNetworkTypeData) {
    try {
      //console.log("💾 Guardando tipo de red de seguros en BD:", insuranceNetworkTypeData);
  
      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `SET IDENTITY_INSERT insurance.NetworkType ON;
        INSERT INTO insurance.NetworkType (NetworkTypeId, Name, Description, CreatedAt, UpdatedAt, IsActive)
         VALUES (:NetworkTypeId, :Name, :Description, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            NetworkTypeId: insuranceNetworkTypeData.NetworkTypeID,
            Name: insuranceNetworkTypeData.Name,
            Description: insuranceNetworkTypeData.Description,
            CreatedAt: formattedDate, 
            UpdatedAt: formattedDate,
            IsActive: insuranceNetworkTypeData.IsActive !== undefined ? insuranceNetworkTypeData.IsActive : true
          },
          type: QueryTypes.INSERT,
        }
      );
      
      console.log("Tipo de red de seguros guardado correctamente.")
      return OperationResult.success(result, 'InsuranceNetworkTypeSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSaveError', error);
    }
  }
  


  async update(InsuranceNetworkTypeID, updatedFields) {
    try {
      //console.log("✅ Actualizando tipo de red de seguros con ID:", InsuranceNetworkTypeID, "Campos:", updatedFields);

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

      const result = await sequelize.query(
        `UPDATE insurance.NetworkType
         SET Name = :Name, Description = :Description, UpdatedAt = :UpdatedAt, IsActive = :IsActive
         WHERE NetworkTypeId = :InsuranceNetworkTypeID`,
        {
          replacements: {
            InsuranceNetworkTypeID: parseInt(InsuranceNetworkTypeID),
            Name: updatedFields.Name,
            Description: updatedFields.Description,
            IsActive: updatedFields.IsActive,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      console.log("Tipo de red de seguros actualizado correctamente.")
      return OperationResult.success('InsuranceNetworkTypeUdateCompleted', result );
    } catch (error) {
      console.error("Ha ocurrido un error al intentar actualizar los campos:", error)
      return OperationResult.failure('InsuranceNetworkTypeUpdateError', error);
    }
  }



  async delete(InsuranceNetworkTypeID) {
    try {
      //console.log("🗑 Desactivando tipo de red de seguros con ID:", InsuranceNetworkTypeID);

      const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      
      const [result] = await sequelize.query(
        `UPDATE insurance.NetworkType
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE NetworkTypeId= :InsuranceNetworkTypeID`,
        {
          replacements: { InsuranceNetworkTypeID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );

      if (result === 0) {
        console.error("Tipo de red de seguros no encontrado o ya eliminado.")
        return OperationResult.failure('InsuranceNetworkTypeNotFoundOrDeleted');
      }

      console.log("Tipo de red de seguros desactivado correctamente.")
      return OperationResult.success('InsuranceNetworkTypeDeleteCompleted');
    } catch (error) {
      console.error("❌ Error al eliminar el tipo de red de seguros:", error);
      return OperationResult.failure('InsuranceNetworkTypeDeleteError', error);
    }
  }

}
module.exports = new InsuranceNetworkTypeImplementation();