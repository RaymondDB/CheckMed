const { sequelize } = require("../../infrastructure/db/dbconfig");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");
const { QueryTypes } = require("sequelize");
const moment = require("moment");



class InsuranceProvidersImplementation {
    
  async findById(InsuranceProviderID) {
    try {
      //console.log("🔍 Buscando proveedor de seguros con ID:", InsuranceProviderID);

      if(!ValidationService.isValidId(InsuranceProviderID)) {
        console.error("El ID es inválido.")
        return OperationResult.failure('InvalidID')
      }

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.InsuranceProviders WHERE InsuranceProviderID = :InsuranceProviderID`,
        { 
          replacements: { InsuranceProviderID }, 
          type: QueryTypes.SELECT 
        }
      );


      if (insuranceProvider.length === 0) {
        console.error("Proveedor de seguros no encontrado.")
        return OperationResult.failure('InsuranceProviderNotFound');
      } 
      
      return OperationResult.success(insuranceProvider[0]);
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSearchError', error);
    }
  }

  async findInsuranceProviderNetworkType(InsuranceProviderNetworkTypeID) {
    try {
      //console.log("🔍 Comprobando la existencia del tipo de red de seguros con ID:", InsuranceProviderNetworkTypeID," al que pertenece el proveedor de seguros con ID:", InsuranceProviderID);

      if(!ValidationService.isValidId(InsuranceProviderNetworkTypeID)) {
        console.error("El ID otorgado del tipo de red de seguros al que pertenece el proveedor de seguros es inválido.")
        return OperationResult.failure('InvalidNetworkTypeID')
      }

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.NetworkType WHERE NetworkTypeId = :InsuranceProviderNetworkTypeID`,
        { 
          replacements: { InsuranceProviderNetworkTypeID }, 
          type: QueryTypes.SELECT 
        }
      );


      if (insuranceProvider.length === 0) {
        console.error("El ID otorgado del tipo de red de seguros al que pertenece el proveedor de seguros no ha sido encontrado.")
        return OperationResult.failure('InsuranceProviderNetworkTypeNotFound');
      } 
      
      return OperationResult.success(insuranceProvider[0]);
    } catch (error) {
      return OperationResult.failure('InsuranceProviderNetworkTypeSearchError', error);
    }
  }

  

  async findAll() {
    try {
      //console.log("📄 Buscando todos los proveedores de seguros...");

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.InsuranceProviders`, 
        { type: QueryTypes.SELECT }
      );

      console.log("Proveedor de seguros ha sido encontrado correctamente.")
      return OperationResult.success(insuranceProvider);
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSearchListError', error);
    }
  }

  async save(insuranceProviderData) {
    try {
      //console.log("💾 Guardando proveedor de seguros en BD:", insuranceProviderData);

      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `SET IDENTITY_INSERT insurance.InsuranceProviders ON;
        INSERT INTO insurance.InsuranceProviders (InsuranceProviderID, Name, ContactNumber, Email, Website, Address,
        City, State, Country, ZipCode, CoverageDetails, LogoUrl, IsPreferred, NetworkTypeId, 
        CustomerSupportContact, AcceptedRegions, MaxCoverageAmount, CreatedAt, UpdatedAt, IsActive)
         VALUES (:InsuranceProviderID, :Name, :ContactNumber, :Email, 
          :Website, :Address, :City, :State, :Country, 
         :ZipCode, :CoverageDetails, :LogoUrl, :IsPreferred, :NetworkTypeId, :CustomerSupportContact,
         :AcceptedRegions, :MaxCoverageAmount, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            InsuranceProviderID: insuranceProviderData.InsuranceProviderID,
            Name: insuranceProviderData.Name,
            ContactNumber: insuranceProviderData.ContactNumber,
            Email: insuranceProviderData.Email,
            Website: insuranceProviderData.Website,
            Address: insuranceProviderData.Address,
            City: insuranceProviderData.City,
            State: insuranceProviderData.State,
            Country: insuranceProviderData.Country,
            ZipCode: insuranceProviderData.ZipCode,
            CoverageDetails: insuranceProviderData.CoverageDetails,
            LogoUrl: insuranceProviderData.LogoUrl,
            IsPreferred: insuranceProviderData.IsPreferred,
            NetworkTypeId: insuranceProviderData.NetworkTypeId,
            CustomerSupportContact: insuranceProviderData.CustomerSupportContact,
            AcceptedRegions: insuranceProviderData.AcceptedRegions,
            MaxCoverageAmount: insuranceProviderData.MaxCoverageAmount,
            CreatedAt: formattedDate,
            UpdatedAt: formattedDate,
            IsActive: insuranceProviderData.IsActive !== undefined ? insuranceProviderData.IsActive : true,
          },
          type: QueryTypes.INSERT,
        }
      );

      console.log("Proveedor de seguros guardado correctamente.")
      return OperationResult.success(result, 'InsuranceProviderSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSaveError', error);
    }
  }

  async update(InsuranceProviderID, updatedFields) {
    try {
      //console.log("✅ Actualizando proveedor de seguros con ID:", InsuranceProviderID, "Campos:", updatedFields);

      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `UPDATE insurance.InsuranceProviders
         SET Name = :Name, ContactNumber = :ContactNumber, 
         Email = :Email, Website = :Website, Address = :Address, City = :City, State = :State, 
         Country = :Country, ZipCode = :ZipCode, CoverageDetails = :CoverageDetails, LogoUrl = :LogoUrl,
         IsPreferred = :IsPreferred, NetworkTypeId = :NetworkTypeId, CustomerSupportContact = :CustomerSupportContact,
         AcceptedRegions = :AcceptedRegions, MaxCoverageAmount = :MaxCoverageAmount, IsActive = :IsActive,
         UpdatedAt = :UpdatedAt   
        WHERE InsuranceProviderID = :InsuranceProviderID`,
        {
          replacements: {
            InsuranceProviderID: parseInt(InsuranceProviderID),
            Name: updatedFields.Name,
            ContactNumber: updatedFields.ContactNumber,
            Email: updatedFields.Email,
            Website: updatedFields.Website,
            Address: updatedFields.Address,
            City: updatedFields.City,
            State: updatedFields.State,
            Country: updatedFields.Country,
            ZipCode: updatedFields.ZipCode,
            CoverageDetails: updatedFields.CoverageDetails,
            LogoUrl: updatedFields.LogoUrl,
            IsPreferred: updatedFields.IsPreferred,
            NetworkTypeId: updatedFields.NetworkTypeId,
            CustomerSupportContact: updatedFields.CustomerSupportContact,
            AcceptedRegions: updatedFields.AcceptedRegions,
            MaxCoverageAmount: updatedFields.MaxCoverageAmount,
            IsActive: updatedFields.IsActive,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      console.log("Proveedor de seguros actualizado correctamente.")
      return OperationResult.success('InsuranceProviderUpdateCompleted', result );
    } catch (error) {
      console.log(error)
      return OperationResult.failure('InsuranceProviderUpdateError', error);
    }
  }

  async delete(InsuranceProviderID) {
    try {
      //console.log("🗑 Desactivando proveedor de seguros con ID:", InsuranceProviderID);

      const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const [result] = await sequelize.query(
        `UPDATE insurance.InsuranceProviders 
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE InsuranceProviderID= :InsuranceProviderID`,
        {
          replacements: { InsuranceProviderID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );


      if (result === 0) {
        console.error("Proveedor de seguros no encontrado o ya eliminado.")
        return OperationResult.failure('InsuranceProviderotFoundOrDeleted');
      } 

      console.log("Proveedor de seguros desactivado correctamente.")
      return OperationResult.success('InsuranceProviderDeleteCompleted');
    } catch (error) {
      //console.error("❌ Error al eliminar proveedor de seguros:", error);
      return OperationResult.failure('InsuranceProviderDeleteError', error);
    }
  }
}


module.exports = new InsuranceProvidersImplementation();