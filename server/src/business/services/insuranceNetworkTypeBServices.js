const InsuranceNetworkTypeDomainService = require("../../domain/services/insuranceNetworkTypeServices");
const InsuranceNetworkTypeRepository = require("../../repositories/implementations/InsuranceNetworkTypeImplementation");
const EventBus = require("../../domain/listeners/eventBus");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationServicee");

class InsuranceNetworkTypeService {
    constructor({ insuranceNetworkTypeRepository }){
        this.insuranceNetworkTypeRepository = InsuranceNetworkTypeRepository;
      }
    
    async createInsuranceNetworkType(insuranceNetworkTypeData) {
    console.log("INSURANCE NETWORK TYPE DATA RECIBIDO EN SERVICE:", insuranceNetworkTypeData);

    if (!insuranceNetworkTypeData || typeof insuranceNetworkTypeData !== "object") {
      console.error("Error: insuranceNetworkTypeData no es un objeto válido:", insuranceNetworkTypeData);
      return OperationResult.failure('InvalidType');
    }

    const validation = InsuranceNetworkTypeDomainService.validateRequiredFields(insuranceNetworkTypeData);
    if (!validation.success) {
      console.error("Error:", validation.data);
      return OperationResult.failure(validation.data);
    }

    if(!ValidationService.isValidFieldLenght(Name, 50) ||
    !ValidationService.isValidFieldLenght(Description, 255)
      ){
      console.error("Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
    } 

    console.log("Verificando si el tipo de red de seguros ya está registrado...");
    const existingInsuranceNetworkType = await this.insuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (existingInsuranceNetworkType.success && existingInsuranceNetworkType.data) {
      console.error("Error: Ya existe un tipo de red de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceNetworkTypeAlreadyExisting');
    }

    const transaction = await this.insuranceNetworkTypeRepository.startTransaction();

    const insuranceNetworkTypeToSave = {
    ...insuranceNetworkTypeData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: insuranceNetworkTypeData.IsActive !== undefined ? insuranceNetworkTypeData.IsActive : true,
    };

    console.log("Guardando tipo de red de seguros en BD:", insuranceNetworkTypeToSave);
    const insuranceNetworkTypeResult = await this.insuranceNetworkTypeRepository.save(insuranceNetworkTypeToSave, transaction);

    if (insuranceNetworkTypeResult.success) {
      console.log("Tipo de red de seguros guardada con éxito:", insuranceNetworkTypeResult.data);
      EventBus.emit("InsuranceNetworkTypeCreated", insuranceNetworkTypeResult.data);
    } else {
      console.error("Error al guardar el tipo de red de seguros:", insuranceNetworkTypeResult.error);
    }

    return insuranceNetworkTypeResult;
  }


  async getInsuranceNetworkTypeById(NetworkTypeID) {
    console.log("🔍 Buscando tipo de red de seguros con ID:", NetworkTypeID);
    
    const insuranceNetworkType = await this.insuranceNetworkTypeRepository.findById(NetworkTypeID)
    if (!insuranceNetworkType.success) {
      return OperationResult.failure(insuranceNetworkType.data);//Devuelve el error encontrado
    }

    EventBus.emit("InsuranceNetworkTypeFetched", insuranceNetworkType.data);
    return insuranceNetworkType;
  }



  async updateInsuranceNetworkType(NetworkTypeID, updatedFields) {
    console.log("🛠️ Buscando tipo de red de seguros con ID:", NetworkTypeID);

    const insuranceNetworkType = await this.insuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (!insuranceNetworkType.success) {
      return OperationResult.failure(insuranceNetworkType.data);//Devuelve el error encontrado
    }

    if(!ValidationService.isValidFieldLenght(updatedFields.Name, 50) ||
    !ValidationService.isValidFieldLenght(updatedFields.Description, 255)
      ){
      console.error("Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
    }

    updatedFields.UpdatedAt = new Date();

    const updateResult = await this.insuranceNetworkTypeRepository.update(NetworkTypeID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceNetworkTypeUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteInsuranceNetworkType(NetworkTypeID) {
    console.log("🗑 Buscando tipo de red de seguros con ID:", NetworkTypeID);

    const insuranceNetworkType = await this.insuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (!insuranceNetworkType.success) {
      return OperationResult.failure(insuranceNetworkType.data);//Devuelve el error encontrado
    }

    console.log("🗑 Desactivando tipo de red de seguros con ID:", NetworkTypeID);
    const deleteResult = await this.insuranceNetworkTypeRepository.delete(NetworkTypeID);

    if (deleteResult.success) {
      EventBus.emit("InsuranceNetworkTypeDeleted", { NetworkTypeID });
    }

    return deleteResult;
  }
}

module.exports = InsuranceNetworkTypeService;   
