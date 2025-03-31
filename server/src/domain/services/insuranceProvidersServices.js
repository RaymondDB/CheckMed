const InsuranceProvidersRepository = require("../../repositories/implementations/InsuranceProvidersImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");

class InsuranceProvidersService {
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
      NetworkTypeId,
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
    console.log("NetworkTypeId:", NetworkTypeId);
    console.log("CustomerSupportContact:", CustomerSupportContact);
    console.log("AcceptedRegions:", AcceptedRegions);
    console.log("MaxCoverageAmount:", MaxCoverageAmount);
    console.log("IsActive:", IsActive);

    if (!InsuranceProviderID || !Name || !Email || !Address || !CoverageDetails || !IsPreferred || !NetworkTypeId) {
      console.error("Error: Faltan campos obligatorios en insuranceProviderData.");
      return OperationResult.failure('EmptyField');
    }

    if(!ValidationService.isValidId(InsuranceProviderID)){
      console.log("Error: El ID es invalido.");
      return OperationResult.failure('InvalidID');
    }

    
    if (!ValidationService.isValidPhoneNumber(ContactNumber)) {
        console.error("Error: Número de contacto inválido.");
        return OperationResult.failure('InvalidContactNumber');
      }


    if (!ValidationService.isValidPhoneNumber(CustomerSupportContact)) {
      console.error("Error: Número de atencion a cliente inválido.");
        return OperationResult.failure('InvalidCustomerSupportContact');
    }

    if (!ValidationService.isValidEmail(Email)) {
      console.error("Error: Email no válido.");
      return OperationResult.failure('InvalidEmail');
    }

    if (!ValidationService.isValidMaxCoverageAmount(MaxCoverageAmount)) {
      console.error("Error: Covertura máxima inválida ");
      return OperationResult.failure('InvalidMaxCoverageAmount');
    }

    console.log("Verificando si el proveedor de seguros ya está registrado...");
    const existingInsuranceProvider = await InsuranceProvidersRepository.findById(InsuranceProviderID);
    if (existingInsuranceProvider.success && existingInsuranceProvider.data) {
      console.error("Error: Ya existe un proveedor de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceProviderAlreadyExisting');
    }

    console.log("🔍 Comprobando la existencia del tipo de red de seguros con ID:", NetworkTypeId," al que pertenece el proveedor de seguros con ID:", InsuranceProviderID);
    
    const insuranceProviderNetworkType = await InsuranceProvidersRepository.findInsuranceProviderNetworkType(NetworkTypeId);
    if(!insuranceProviderNetworkType.success){
      return OperationResult.failure(insuranceProviderNetworkType.data);//Devuelve el error encontrado
    }

    if(!ValidationService.isValidFieldLenght(Name, 100) ||
    !ValidationService.isValidFieldLenght(ContactNumber, 15) ||
    !ValidationService.isValidFieldLenght(Email, 100) ||
    !ValidationService.isValidFieldLenght(Website, 255) ||
    !ValidationService.isValidFieldLenght(Address, 255) ||
    !ValidationService.isValidFieldLenght(City, 100) ||
    !ValidationService.isValidFieldLenght(State, 100) ||
    !ValidationService.isValidFieldLenght(ContactNumber, 15) ||
    !ValidationService.isValidFieldLenght(Country, 100) ||
    !ValidationService.isValidFieldLenght(ZipCode, 10) ||
    !ValidationService.isValidFieldLenght(LogoUrl, 255) ||
    !ValidationService.isValidFieldLenght(CustomerSupportContact, 15) ||
    !ValidationService.isValidFieldLenght(AcceptedRegions, 255)
    ) {   
      console.error("Error: Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
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
        NetworkTypeId,
        CustomerSupportContact,
        AcceptedRegions,
        MaxCoverageAmount,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      IsActive: IsActive !== undefined ? IsActive : true,
    };

    console.log("Guardando el proveedor de seguros en BD:", insuranceProviderToSave);

    const insuranceProviderResult = await InsuranceProvidersRepository.save(insuranceProviderToSave);
    if (insuranceProviderResult.success) {
      console.log("Proveedor de seguros guardado con éxito:", insuranceProviderResult.data);
      EventBus.emit("InsuranceProviderCreated", insuranceProviderResult.data);
    } else {
      console.error("Error al guardar el proveedor de seguros:", insuranceProviderResult.error);
    }

    return insuranceProviderResult;
  }


  async getAllInsuranceProviders() {
    try {
      console.log("🔍 Buscando todos los proveedores de seguros.");
      const result = await InsuranceProvidersRepository.findAll();

      if (!result.success || !result.data) {
        console.error("No se encontraron los proveedores de seguros.")
        return OperationResult.failure('InsuranceProvidersSearchListNotFound');
      }

      console.log("Se han encontrado los proveedores de seguros.")
      return OperationResult.success(result.data);
    } catch (error) {
        console.error("Error al obtener la lista de proveedores de seguros:", error);
        return OperationResult.failure('InsuranceProvidersSearchListError', error);
      }
  }


  async getInsuranceProviderById(InsuranceProviderID) {
    console.log("🔍 Buscando el proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    EventBus.emit("InsuranceProviderFetched", insuranceProvider.data);
    return insuranceProvider;
  }


  async updateInsuranceProvider(InsuranceProviderID, updatedFields) {
    console.log("🛠️ Buscando el proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    if (!updatedFields.Name || !updatedFields.Email || !updatedFields.Address || 
      !updatedFields.CoverageDetails || !updatedFields.IsPreferred || !updatedFields.NetworkTypeId) {
      console.error("Error: Faltan campos obligatorios en insuranceProviderData.");
      return OperationResult.failure('EmptyField');
    }


    if (!ValidationService.isValidPhoneNumber(updatedFields.ContactNumber)) {
      console.error("Error: Número de contacto inválido.");
      return OperationResult.failure('InvalidContactNumber');
    }


    if (!ValidationService.isValidPhoneNumber(updatedFields.CustomerSupportContact)) {
       console.error("Error: Número de atencion a cliente inválido.");     
        return OperationResult.failure('InvalidCustomerSupportContact');
    }

    if (!ValidationService.isValidEmail(updatedFields.Email)) {
      console.error("Error: Email no válido.");
      return OperationResult.failure('InvalidEmail');
    }

    if (!ValidationService.isValidMaxCoverageAmount(updatedFields.MaxCoverageAmount)) {
      console.error("Error: Covertura máxima inválida ");
      return OperationResult.failure('InvalidMaxCoverageAmount');
    }

    console.log("🔍 Comprobando la existencia del tipo de red de seguros con ID:", updatedFields.NetworkTypeId," al que pertenecerá el proveedor de seguros.");
    
    const insuranceProviderNetworkType = await InsuranceProvidersRepository.findInsuranceProviderNetworkType(updatedFields.NetworkTypeId);
    if(!insuranceProviderNetworkType.success){
      return OperationResult.failure(insuranceProviderNetworkType.data);//Devuelve el error encontrado
    }


    if(!ValidationService.isValidFieldLenght(updatedFields.Name, 100) ||
    !ValidationService.isValidFieldLenght(updatedFields.ContactNumber, 15) ||
    !ValidationService.isValidFieldLenght(updatedFields.Email, 100) ||
    !ValidationService.isValidFieldLenght(updatedFields.WebSite, 255) ||
    !ValidationService.isValidFieldLenght(updatedFields.Address, 255) ||
    !ValidationService.isValidFieldLenght(updatedFields.City, 100) ||
    !ValidationService.isValidFieldLenght(updatedFields.State, 100) ||
    !ValidationService.isValidFieldLenght(updatedFields.ContactNumber, 15) ||
    !ValidationService.isValidFieldLenght(updatedFields.Country, 100) ||
    !ValidationService.isValidFieldLenght(updatedFields.ZipCode, 10) ||
    !ValidationService.isValidFieldLenght(updatedFields.LogoUrl, 255) ||
    !ValidationService.isValidFieldLenght(updatedFields.CustomerSupportContact, 15) ||
    !ValidationService.isValidFieldLenght(updatedFields.AcceptedRegions, 255)
    ) {   
      console.error("Error: Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
    }

    updatedFields.UpdatedAt = new Date();

    console.log("✅ Actualizando proveedor de seguros con ID:", InsuranceProviderID, "Campos:", updatedFields);

    const updateResult = await InsuranceProvidersRepository.update(InsuranceProviderID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceProviderUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteInsuranceProvider(InsuranceProviderID) {
    console.log("🗑 Buscando proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await InsuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    console.log("🗑 Desactivando proveedor de seguros con ID:", InsuranceProviderID);
    const deleteResult = await InsuranceProvidersRepository.delete(InsuranceProviderID);

    if (deleteResult.success) {
      EventBus.emit("InsuranceProviderDeleted", { InsuranceProviderID });
    }

    return deleteResult;
  }
}

class InsuranceProvidersDomainService {
  static validateRequiredFields(insuranceProvidersData) {
    const requiredFields = [
      "InsuranceProviderID",
      "Name",
      "Email",
      "Address",
      "CoverageDetails",
      "IsPreferred",
      "NetworkTypeId"
    ];

    for (const field of requiredFields) {
      if (!insuranceProvidersData[field]) {
        return OperationResult.failure(`El campo ${field} es obligatorio.`);
      }
    }

    return OperationResult.success();
  }
}

module.exports = InsuranceProvidersDomainService

module.exports  = new InsuranceProvidersService();