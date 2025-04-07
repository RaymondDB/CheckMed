const InsuranceNetworkTypeRepository = require("../../repositories/implementations/InsuranceNetworkTypeImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../domain/valueObjects/OperationResult");
const ValidationService = require("../../domain/services/validationService");


class InsuranceNetworkTypeService {
  async createInsuranceNetworkType(insuranceNetworkTypeData) {
    console.log("INSURANCE NETWORK TYPE DATA RECIBIDO EN SERVICE:", insuranceNetworkTypeData);

    if (!insuranceNetworkTypeData || typeof insuranceNetworkTypeData !== "object") {
      console.error("Error: insuranceNetworkTypeData no es un objeto válido:", insuranceNetworkTypeData);
      return OperationResult.failure('InvalidType');
    }

    const {
      NetworkTypeId,
      Name,
      Description,
      IsActive,
    } = insuranceNetworkTypeData;

    console.log("Campos extraídos:");
    console.log("NetworkTypeID:", NetworkTypeId);
    console.log("Name:", Name);
    console.log("Description:", Description);
    console.log("IsActive:", IsActive);


    if (!NetworkTypeId || !Name) {
      console.error("Error: Faltan campos obligatorios en insuranceNetworkTypeData.");
      return OperationResult.failure('EmptyField');
    }

    if(!ValidationService.isValidId(NetworkTypeId)){
      console.log("Error: El ID es invalido.");
      return OperationResult.failure('InvalidID');
    }
    
    if(!ValidationService.isValidFieldLenght(Name, 50) ||
    !ValidationService.isValidFieldLenght(Description, 255)
      ){
      console.error("Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
    } 

    console.log("Verificando si el tipo de red de seguros ya está registrado...");
    const existingInsuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeId);
    if (existingInsuranceNetworkType.success && existingInsuranceNetworkType.data) {
      console.error("Error: Ya existe un tipo de red de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceNetworkTypeAlreadyExisting');
    }

    const insuranceNetworkTypeToSave = {
      NetworkTypeId,
      Name,
      Description,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: IsActive !== undefined ? IsActive : true,
    };

    console.log("Guardando tipo de red de seguros en BD:", insuranceNetworkTypeToSave);

    const insuranceNetworkTypeResult = await InsuranceNetworkTypeRepository.save(insuranceNetworkTypeToSave);

    if (insuranceNetworkTypeResult.success) {
      console.log("Tipo de red de seguros guardada con éxito:", insuranceNetworkTypeResult.data);
      EventBus.emit("InsuranceNetworkTypeCreated", insuranceNetworkTypeResult.data);
    } else {
      console.error("Error al guardar el tipo de red de seguros:", insuranceNetworkTypeResult.error);
    }

    return insuranceNetworkTypeResult;
  }

  async getAllInsuranceNetworkTypes() {
    try {
      console.log("🔍 Buscando todos los tipos de redes de seguros.");
      const result = await InsuranceNetworkTypeRepository.findAll();

      if (!result.success || !result.data) {
        console.error("No se encontraron los tipos de redes de seguros.")
        return OperationResult.failure('InsuranceNetworkTypeSearchListNotFound');
      }
      
      console.log("Se han encontrado las redes de seguros.")
      return OperationResult.success(result.data);
    } catch (error) {
        console.error("Error al obtener la lista de tipos de redes de seguros:", error);
        return OperationResult.failure('InsuranceNetworkTypeSearchListError', error);
      }
  }

  async getInsuranceNetworkTypeById(NetworkTypeId) {
    console.log("🔍 Buscando tipo de red de seguros con ID:", NetworkTypeId);
    
    const insuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeId);
    if (!insuranceNetworkType.success) {
      return OperationResult.failure(insuranceNetworkType.data);//Devuelve el error encontrado
    }


    EventBus.emit("InsuranceNetworkTypeFetched", insuranceNetworkType.data);
    return insuranceNetworkType;
  }

  async updateInsuranceNetworkType(NetworkTypeId, updatedFields) {
    console.log("🛠️ Buscando tipo de red de seguros con ID:", NetworkTypeId);


    if (!updatedFields.Name) {
      console.error("Error: Faltan campos obligatorios en insuranceNetworkTypeData.");
      return OperationResult.failure('EmptyField');
    }


    if(!ValidationService.isValidFieldLenght(updatedFields.Name, 50) ||
    !ValidationService.isValidFieldLenght(updatedFields.Description, 255)
      ){
      console.error("Hay campos especificados que exceden del límite de caracteres posible.")
      return OperationResult.failure('TooLongFields')
    }

    updatedFields.UpdatedAt = new Date();
    
    console.log("✅ Actualizando tipo de red de seguros con ID:", NetworkTypeId, "Campos:", updatedFields);

    const updateResult = await InsuranceNetworkTypeRepository.update(NetworkTypeId, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceNetworkTypeUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteInsuranceNetworkType(NetworkTypeId) {
    console.log("🗑 Buscando tipo de red de seguros con ID:", NetworkTypeId);

    const insuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeId);
    if (!insuranceNetworkType.success) {
      return OperationResult.failure(insuranceNetworkType.data);//Devuelve el error encontrado
    }

    console.log("🗑 Desactivando tipo de red de seguros con ID:", NetworkTypeId);
    const deleteResult = await InsuranceNetworkTypeRepository.delete(NetworkTypeId);

    if (deleteResult.success) {
      EventBus.emit("InsuranceNetworkTypeDeleted", { NetworkTypeId });
    }

    return deleteResult;
  }
}

class InsuranceNetworkTypeDomainService {
  static validateRequiredFields(insuranceNetworkTypeData) {
    const requiredFields = [
      "NetworkTypeID",
      "Name"
    ];

    for (const field of requiredFields) {
      if (!insuranceNetworkTypeData[field]) {
        return OperationResult.failure(`El campo ${field} es obligatorio.`);
      }
    }

    return OperationResult.success();
  }
}

module.exports = InsuranceNetworkTypeDomainService

module.exports  = new InsuranceNetworkTypeService();