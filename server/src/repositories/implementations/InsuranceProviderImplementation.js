const { sequelize } = require("../../infrastructure/db/dbconfig");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const { QueryTypes } = require("sequelize");
const moment = require("moment");



class InsuranceProviderImplementation {
    
  async findById(InsuranceProviderID) {
    try {
      //console.log("🔍 Buscando proveedor de seguros con ID:", InsuranceProviderID);

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.InsuranceProviders WHERE InsuranceProviderID = :InsuranceProviderID`,
        { 
          replacements: { InsuranceProviderID }, 
          type: QueryTypes.SELECT 
        }
      );

      if (insuranceProvider.length === 0) return OperationResult.failure('InsuranceProviderNotFound');
      
      return OperationResult.success(insuranceProvider[0]);
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSearchError', error);
    }
  }

  async findAll() {
    try {
      //console.log("📄 Buscando todos los proveedores de seguros...");

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.InsuranceProviders`, 
        { type: QueryTypes.SELECT }
      );

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
        `INSERT INTO insurance.InsuranceProviders (InsuranceProviderID, Name, ContactNumber, Email, Website, Adress,
        City, State, Country, Zipcode, CoverageDetails, LogoUrl, IsPreferred, NetworkTypeId, 
        CustomerSupportContact, AcceptedRegions, MaxCoverageAmount, CreatedAt, UpdatedAt, IsActive)
         VALUES (:InsuranceProviderID, :Name, :ContactNumber, :Email, 
          :Website, :Adress, :City, :State, :Country, 
         :Zipcode, :CoverageDetails, :LogoUrl, :IsPreferred, :NetworkTypeId, :CustomerSupportContact,
         :AcceptedRegions, :MaxCoverageAmount, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            InsuranceProviderID: insuranceProviderData.InsuranceProviderID,
            Name: insuranceProviderData.Name,
            ContactNumber: insuranceProviderData.ContactNumber,
            Email: insuranceProviderData.Email,
            Website: insuranceProviderData.Website,
            Adress: insuranceProviderData.Adress,
            City: insuranceProviderData.City,
            State: insuranceProviderData.State,
            Country: insuranceProviderData.Country,
            Zipcode: insuranceProviderData.Zipcode,
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

      return OperationResult.success(result, 'InsuranceProviderSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSaveError', error);
    }
  }

  async update(InsuranceProviderID, updatedFields) {
    try {
      //console.log("🛠️ Buscando proveedor de seguros con ID:", InsuranceProviderID);

      const insuranceProvider = await sequelize.query(
        `SELECT * FROM insurance.Providers WHERE InsuranceProviderID = :InsuranceProviderID`,
        { replacements: { InsuranceProviderID }, type: QueryTypes.SELECT }
      );

      if (!insuranceProvider.length) {
        return OperationResult.failure('InsuranceProviderNotFound');
      }

      //console.log("✅ Actualizando proveedor de seguros con ID:", InsuranceProviderID, "Campos:", updatedFields);

      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `UPDATE insurance.InsuranceProviders
         SET InsuranceProviderID = :InsuranceProviderID, Name = :Name, ContactNumber = :ContactNumber, 
         Email = :Email, Website = :Website, Adress = :Adress, City = :City, State = :State, 
         Country = :Country, Zipcode = :Zipcode, CoverageDetails = :CoverageDetails, LogoUrl = :LogoUrl,
         IsPreferred = :IsPreferred, NetworkTypeId = :NetworkTypeId, CustomerSupportContact = :CustomerSupportContact,
         AcceptedRegions = :AcceptedRegions, MaxCoverageAmount = :MaxCoverageAmount, CreatedAt = :CreatedAt,
        UpdatedAt = :UpdatedAt
        WHERE InsuranceProviderID = :InsuranceProviderID`,
        {
          replacements: {
            InsuranceProviderID: parseInt(InsuranceProviderID),
            SpecialtyID: updatedFields.SpecialtyID,
            Name: updatedFields.Name,
            ContactNumber: updatedFields.ContactNumber,
            Email: updatedFields.Email,
            Website: updatedFields.Website,
            Adress: updatedFields.Adress,
            City: updatedFields.City,
            State: updatedFields.State,
            Country: updatedFields.Country,
            Zipcode: updatedFields.Zipcode,
            CoverageDetails: updatedFields.CoverageDetails,
            LogoUrl: updatedFields.LogoUrl,
            IsPreferred: updatedFields.IsPreferred,
            NetworkTypeId: updatedFields.NetworkTypeId,
            CustomerSupportContact: updatedFields.CustomerSupportContact,
            AcceptedRegions: updatedFields.AcceptedRegions,
            MaxCoverageAmount: updatedFields.MaxCoverageAmount,
            CreatedAt: formattedDate,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      return OperationResult.success('InsuranceProviderUpdateCompleted', result );
    } catch (error) {
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
        return OperationResult.failure('InsuranceProviderotFoundOrDeleted');
      }

      return OperationResult.success('InsuranceProviderDeleteCompleted');
    } catch (error) {
      //console.error("❌ Error al eliminar proveedor de seguros:", error);
      return OperationResult.failure('InsuranceProviderDeleteError', error);
    }
  }
}


module.exports = new InsuranceProviderImplementation();