const { sequelize } = require("../../infrastructure/db/dbconfig");
const InsuranceProviders = require("../../infrastructure/models/InsuranceProviderModel")
const InsuranceNetworkType = require("../../infrastructure/models/InsuranceNetworkTypeModel")
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");

const today = new Date().toISOString().split("T")[0];

class InsuranceProvidersImplementation {
    
  async findById(InsuranceProviderID) {
    try {
      //console.log("🔍 Buscando proveedor de seguros con ID:", InsuranceProviderID);

      if(!ValidationService.isValidId(InsuranceProviderID)) {
        console.error("El ID es inválido.")
        return OperationResult.failure('InvalidID')
      }

      const insuranceProvider = await InsuranceProviders.findByPk(InsuranceProviderID);

      if (!insuranceProvider) {
        console.error("Proveedor de seguros no encontrado.")
        return OperationResult.failure('InsuranceProviderNotFound');
      } 
      
      console.log("El proveedor de seguros ha sido encontrado correctamente.")
      return OperationResult.success(insuranceProvider);

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

      const insuranceProviderNetworkType = await InsuranceNetworkType.findByPk(InsuranceProviderNetworkTypeID);

      if (!insuranceProviderNetworkType) {
        console.error("El ID otorgado del tipo de red de seguros al que pertenece el proveedor de seguros no ha sido encontrado.")
        return OperationResult.failure('InsuranceProviderNetworkTypeNotFound');
      } 
      
      return OperationResult.success(insuranceProviderNetworkType);

    } catch (error) {
      return OperationResult.failure('InsuranceProviderNetworkTypeSearchError', error);
    }
  }

  

  async findAll() {
    try {
      //console.log("📄 Buscando todos los proveedores de seguros...");

      const insuranceProvider = await InsuranceProviders.findAll();

      return OperationResult.success(insuranceProvider);
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSearchListError', error);
    }
  }



  async save(insuranceProviderData, transaction) {
    try {
      //console.log("💾 Guardando proveedor de seguros en BD:", insuranceProviderData);

      const insuranceProvider = await InsuranceProviders.create({
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
            CreatedAt: today,
            UpdatedAt: today,
            IsActive: insuranceProviderData.IsActive ?? true,
          }, { transaction });

      return OperationResult.success({id: insuranceProvider.InsuranceProviderID}, 'InsuranceProviderSaveCompleted');
    } catch (error) {
      return OperationResult.failure('InsuranceProviderSaveError', error);
    }
  }
  

  
  async update(InsuranceProviderID, updatedFields) {
    try {
      //console.log("✅ Actualizando proveedor de seguros con ID:", InsuranceProviderID, "Campos:", updatedFields);

      const insuranceProvider = await InsuranceProviders.findByPk(InsuranceProviderID);

      if (!insuranceProvider) {
        console.error("Proveedor de seguros no encontrado.")
        return OperationResult.failure('InsuranceProviderNotFound');
      }; 


      await insuranceProvider.update({
            ...updatedFields,
            UpdatedAt: new Date()
      });

      console.log("Proveedor de seguros actualizado correctamente.")
      return OperationResult.success('InsuranceProviderUpdateCompleted', insuranceProvider );
      
    } catch (error) {
      console.log(error)
      console.error("Error al actualizar proveedor de seguros:", error);
      return OperationResult.failure('InsuranceProviderUpdateError', error);
    }
  }



  async delete(InsuranceProviderID) {
    try {
      //console.log("🗑 Desactivando proveedor de seguros con ID:", InsuranceProviderID);

      const insuranceProvider = await InsuranceProviders.findByPk(InsuranceProviderID);

      if (!insuranceProvider) {
        console.error("Proveedor de seguros no encontrado o ya eliminado.")
        return OperationResult.failure('InsuranceProviderotFoundOrDeleted');
      }; 

      await insuranceProvider.update({
        IsActive: false,
        UpdatedAt: new Date()
      });

      console.log("Proveedor de seguros desactivado correctamente.")
      return OperationResult.success('InsuranceProviderDeleteCompleted');

    } catch (error) {
      console.error("Error al eliminar proveedor de seguros:", error);
      return OperationResult.failure('InsuranceProviderDeleteError', error);
    }
  }
}


module.exports = new InsuranceProvidersImplementation();