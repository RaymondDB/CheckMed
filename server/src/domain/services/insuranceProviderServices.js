const InsuranceProviderRepository = require("../../repositories/implementations/InsuranceProviderImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");

class InsuranceProviderService {
  async createInsuranceProvider(insuranceProviderData) {
    console.log("INSURANCE PROVIDER DATA RECIBIDO EN SERVICE:", insuranceProviderData);

    if (!insuranceProviderData || typeof insuranceProviderData !== "object") {
      console.error("Error: insuranceProviderData no es un objeto válido:", insuranceProviderData);
      return OperationResult.failure('InvalidType');
    }

    const {
      InsuranceProviderID,
      Name,
      ContactNumber,
      Email,
      Website,
      Address,
      City,
      State,
      Country,
      ZipCode,
      CoverageDetails,
      LogoUrl,
      IsPreferred,
      NetworkTypeID,
      CustomerSupportContact,
      AcceptedRegions,
      MaxCoverageAmount,
      IsActive
    } = insuranceProviderData;

    console.log("Campos extraídos:");
    console.log("InsuranceProviderID:", InsuranceProviderID);
    console.log("Name:", Name);
    console.log("ContactNumber:", ContactNumber);
    console.log("Email:", Email);
    console.log("Website:", Website);
    console.log("Address:", Address);
    console.log("City:", City);
    console.log("State:", State);
    console.log("Country:", Country);
    console.log("ZipCode:", ZipCode);
    console.log("CoverageDetails:", CoverageDetails);
    console.log("LogoUrl:", LogoUrl);
    console.log("IsPreferred:", IsPreferred);
    console.log("NetworkTypeID:", NetworkTypeID);
    console.log("CustomerSupportContact:", CustomerSupportContact);
    console.log("AcceptedRegions:", AcceptedRegions);
    console.log("MaxCoverageAmount:", MaxCoverageAmount);
    console.log("IsActive:", IsActive);

    if (!InsuranceProviderID || !Name || !Email || !Address || !CoverageDetails || !IsPreferred || !NetworkTypeID) {
      console.error("Error: Faltan campos obligatorios en insuranceProviderData.");
      return OperationResult.failure('EmptyField');
    }

    
    if (!ValidationService.isValidPhoneNumber(ContactNumber)) {
        console.error("Error: Número de contacto inválido.");
        return OperationResult.failure('InvalidContactNumber');
      }


    if (!ValidationService.isValidPhoneNumber(CustomerSupportContact)) {
        console.error("Error: Número de contacto a atención a cliente inválido.");
        return OperationResult.failure('InvalidCustomerSupportContact');
    }

    if (!ValidationService.isValidEmail(Email)) {
      console.error("Error: Email no válido.");
      return OperationResult.failure('InvalidEmail');
  }


    console.log("Verificando si el proveedor de seguros ya está registrado...");
    const existingInsuranceProvider = await InsuranceProviderRepository.findById(InsuranceProviderID);
    if (existingInsuranceProvider.success && existingInsuranceProvider.data) {
      console.error("Error: Ya existe un proveedor de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceProviderAlreadyExisting');
    }

    const insuranceProviderToSave = {
        InsuranceProviderID,
        Name,
        ContactNumber,
        Email,
        Website,
        Address,
        City,
        State,
        Country,
        ZipCode,
        CoverageDetails,
        LogoUrl,
        IsPreferred,
        NetworkTypeID,
        CustomerSupportContact,
        AcceptedRegions,
        MaxCoverageAmount,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: IsActive !== undefined ? IsActive : true,
    };

    console.log("Guardando el proveedor de seguros en BD:", insuranceProviderToSave);

    const insuranceProviderResult = await InsuranceProviderRepository.save(insuranceProviderToSave);

    if (insuranceProviderResult.success) {
      console.log("Proveedor de seguros guardado con éxito:", insuranceProviderResult.data);
      EventBus.emit("InsuranceProviderCreated", insuranceProviderResult.data);
    } else {
      console.error("Error al guardar el proveedor de seguros:", insuranceProviderResult.error);
    }

    return insuranceProviderResult;
  }

  async getInsuranceProviderById(InsuranceProviderID) {
    console.log("🔍 Buscando el proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProviderRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      console.error("Proveedor de seguros no encontrado.");
      return OperationResult.failure('InsuranceProviderNotFound');
    }

    EventBus.emit("InsuranceProviderFetched", insuranceProvider.data);
    return insuranceProvider;
  }

  async updateInsuranceProvider(InsuranceProviderID, updatedFields) {
    console.log("🛠️ Buscando el proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProviderRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      console.error("Proveedor de seguros no encontrado.");
      return OperationResult.failure('InsuranceProviderNotFound');
    }

    console.log("✅ Actualizando proveedor de seguros con ID:", InsuranceProviderID, "Campos:", updatedFields);

    updatedFields.UpdatedAt = new Date();

    const updateResult = await InsuranceProviderRepository.update(InsuranceProviderID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceProviderUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteInsuranceProvider(InsuranceProviderID) {
    console.log("🗑 Buscando proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProviderRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      console.error("Proveedor de seguros no encontrado.");
      return OperationResult.failure('InsuranceProviderNotFound');
    }

    console.log("🗑 Desactivando proveedor de seguros con ID:", InsuranceProviderID);
    const deleteResult = await InsuranceProviderRepository.delete(InsuranceProviderID);

    if (deleteResult.success) {
      EventBus.emit("InsuranceProviderDeleted", { InsuranceProviderID });
    }

    return deleteResult;
  }
}

module.exports = new InsuranceProviderService();