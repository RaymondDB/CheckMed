const InsuranceProvidersDomainService = require("../../domain/services/insuranceProvidersServices");
const InsuranceProvidersRepository = require("../../repositories/implementations/InsuranceProvidersImplementation");
const EventBus = require("../../domain/listeners/eventBus");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationServicee");

class InsuranceProvidersService {
    constructor({ insuranceProvidersRepository}) {
        this.insuranceProvidersRepository = InsuranceProvidersRepository;
    }

  async createInsuranceProvider(insuranceProviderData) {
    console.log("INSURANCE PROVIDER DATA RECIBIDO EN SERVICE:", insuranceProviderData);

    if (!insuranceProviderData || typeof insuranceProviderData !== "object") {
      console.error("Error: insuranceProviderData no es un objeto válido:", insuranceProviderData);
      return OperationResult.failure('InvalidType');
    }

    const validation = InsuranceProvidersDomainService.validateRequiredFields(insuranceProviderData);
    if (!validation.success) {
      console.error("Error:", validation.data);
      return OperationResult.failure(validation.data);
    }


    if (!ValidationService.isValidPhoneNumber(ContactNumber)) {
        console.error("Error: Número de contacto inválido.");
        return OperationResult.failure('InvalidContactNumber');
      }


    if (!ValidationService.isValidPhoneNumber(CustomerSupportContact)) {
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
    const existingInsuranceProvider = await InsuranceProviderRepository.findById(InsuranceProviderID);
    if (existingInsuranceProvider.success && existingInsuranceProvider.data) {
      console.error("Error: Ya existe un proveedor de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceProviderAlreadyExisting');
    }

    console.log("🔍 Comprobando la existencia del tipo de red de seguros con ID:", NetworkTypeId," al que pertenece el proveedor de seguros con ID:", InsuranceProviderID);
    
    const insuranceProviderNetworkType = await this.insuranceProvidersRepository.findInsuranceProviderNetworkType(NetworkTypeId);
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
    Name: insuranceProviderData.Name,
    ContactNumber: insuranceProviderData.ContactNumber,
    Email: insuranceProviderData.Email,
    Website: insuranceProviderData.WebSite,
    Address: insuranceProviderData.Address,
    City: insuranceProviderData.City,
    State: insuranceProviderData.State,
    ContactNumber: insuranceProviderData.ContactNumber,
    Country: insuranceProviderData.Country,
    IsPreferred: insuranceProviderData.IsPreferred ?? false,
    ZipCode: insuranceProviderData.ZipCode,
    LogoUrl: insuranceProviderData.LogoUrl,
    CustomerSupportContact: insuranceProviderData.CustomerSupportContact,
    AcceptedRegions: insuranceProviderData.AcceptedRegions,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    IsActive: insuranceProviderData.IsActive ??  true,
    };

    console.log("Guardando el proveedor de seguros en BD:", insuranceProviderToSave);

    const insuranceProviderResult = await this.insuranceProvidersRepository.save(insuranceProviderToSave, transaction);
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

    const insuranceProvider = await this.insuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    EventBus.emit("InsuranceProviderFetched", insuranceProvider.data);
    return insuranceProvider;
  }


  async updateInsuranceProvider(InsuranceProviderID, updatedFields) {
    console.log("🛠️ Buscando el proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await this.insuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    if (!ValidationService.isValidPhoneNumber(updatedFields.ContactNumber)) {
      console.error("Error: Número de contacto inválido.");
      return OperationResult.failure('InvalidContactNumber');
    }

    if (!ValidationService.isValidPhoneNumber(updatedFields.CustomerSupportContact)) {
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

    const insuranceProviderNetworkType = await this.insuranceProvidersRepository.findInsuranceProviderNetworkType(updatedFields.NetworkTypeId);
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

    const updateResult = await this.insuranceProvidersRepository.update(InsuranceProviderID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceProviderUpdated", updateResult.data);
    }

    return updateResult;
  }


  async deleteInsuranceProvider(InsuranceProviderID) {
    console.log("🗑 Buscando proveedor de seguros con ID:", InsuranceProviderID);

    const insuranceProvider = await this.insuranceProvidersRepository.findById(InsuranceProviderID);
    if (!insuranceProvider.success) {
      return OperationResult.failure(insuranceProvider.data);//Devuelve el error encontrado
    }

    console.log("🗑 Desactivando proveedor de seguros con ID:", InsuranceProviderID);
    const deleteResult = await this.insuranceProvidersRepository.delete(InsuranceProviderID);

    if (deleteResult.success) {
      EventBus.emit("InsuranceProviderDeleted", { InsuranceProviderID });
    }

    return deleteResult;
  }
}

module.exports = InsuranceProvidersService;