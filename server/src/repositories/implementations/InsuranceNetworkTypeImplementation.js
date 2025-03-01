const { sequelize } = require("../../infrastructure/db/dbconfig");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const { QueryTypes } = require("sequelize");
const moment = require("moment");


class InsuranceNetworkTypeImplementation {

  async findById(InsuranceNetworkTypeID) {
    try {

      //console.log("🔍 Buscando tipo de red de seguros con ID:", InsuranceNetworkTypeID");
      
      const insuranceNetworkType = await sequelize.query(
        `SELECT * FROM insurance.NetworkType WHERE InsuranceNetworkTypeID = :InsuranceNetworkTypeID`, 
        { 
          replacements: { InsuranceNetworkTypeID }, 
          type: QueryTypes.SELECT 
        }
      );


      if (insuranceNetworkType.length === 0) return OperationResult.failure('InsuranceNetworkTypeNotFound');
      
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
        `INSERT INTO insurance.NetworkType (Name, Description, CreatedAt, UpdatedAt, IsActive)
         VALUES (:Name, :Description, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            Name: insuranceNetworkTypeData.Name,
            Description: insuranceNetworkTypeData.Description,
            CreatedAt: formattedDate, 
            UpdatedAt: formattedDate,
            IsActive: insuranceNetworkTypeData.IsActive !== undefined ? insuranceNetworkTypeData.IsActive : true
          },
          type: QueryTypes.INSERT,
        }
      );
  
      return OperationResult.success(result, 'InsuranceNetworkTypeSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceNetworkTypeSaveError', error);
    }
  }
  

  async update(InsuranceNetworkTypeID, updatedFields) {
    try {
      //console.log("🛠️ Buscando tipo de red de seguros con ID:", InsuranceNetworkTypeID);

      const insuranceNetworkType = await sequelize.query(
        `SELECT * FROM insurance.NetworkType WHERE NetworkTypeID = :NetworkTypeID`,
        { replacements: { InsuranceNetworkTypeID }, type: QueryTypes.SELECT }
      );

      if (!insuranceNetworkType.length) {
        return OperationResult.failure('InsuranceNetworkTypeNotFound');
      }

      //console.log("✅ Actualizando tipo de red de seguros con ID:", InsuranceNetworkTypeID, "Campos:", updatedFields);

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");


      const result = await sequelize.query(
        `UPDATE insurance.NetworkType
         SET Name = :Name, Description = :Description, UpdatedAt = :UpdatedAt
         WHERE NetworkTypeID = :NetworkTypeID`,
        {
          replacements: {
            NetworkTypeID: parseInt(NetworkTypeID),
            Name: updatedFields.Name,
            Description: updatedFields.Description,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      return { success: true, message: "Tipo de red de seguros actualizado correctamente", result };
    } catch (error) {
      return { success: false, message: "Error al actualizar el tipo de red de seguros.", error };
    }
  }



  async delete(InsuranceNetworkTypeID) {
    try {
      //console.log("🗑 Desactivando tipo de red de seguros con ID:", InsuranceNetworkTypeID);

      const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

      const [result] = await sequelize.query(
        `UPDATE insurance.NetworkType 
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE NetworkTypeID = :NetworkTypeID`,
        {
          replacements: { InsuranceNetworkTypeID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );

      if (result === 0) {
        return OperationResult.failure('InsuranceNetworkTypeNotFoundOrDeleted');
      }

      return OperationResult.success('InsuranceNetworkTypeDeleteCompleted');
    } catch (error) {
      console.error("❌ Error al eliminar el tipo de red de seguros:", error);
      return OperationResult.failure('InsuranceNetworkTypeDeleteError', error);
    }
  }

}
module.exports = new InsuranceNetworkTypeImplementation();