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
      NetworkTypeID,
      Name,
      Description,
      IsActive
    } = insuranceNetworkTypeData;

    console.log("Campos extraídos:");
    console.log("NetworkTypeID:", NetworkTypeID);
    console.log("Name:", Name);
    console.log("Description:", Description);
    console.log("IsActive:", IsActive);


    if (!NetworkTypeID || !Name) {
      console.error("Error: Faltan campos obligatorios en insuranceNetworkTypeData.");
      return OperationResult.failure('EmptyField');
    }


    console.log("Verificando si el tipo de red de seguros ya está registrado...");
    const existingInsuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (existingInsuranceNetworkType.success && existingInsuranceNetworkType.data) {
      console.error("Error: Ya existe un tipo de red de seguros registrado con esa identificación.");
      return OperationResult.failure('InsuranceNetworkTypeAlreadyExisting');
    }

    const insuranceNetworkTypeToSave = {
      NetworkTypeID,
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

  async getInsuranceNetworkTypeById(NetworkTypeID) {
    console.log("🔍 Buscando tipo de red de seguros con ID:", NetworkTypeID);
    
    const insuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (!insuranceNetworkType.success) {
      console.error("Tipo de red de seguros no encontrado.");
      return OperationResult.failure('InsuranceNetworkTypeNotFound');
    }

    EventBus.emit("InsuranceNetworkTypeFetched", insuranceNetworkType.data);
    return insuranceNetworkType;
  }

  async updateInsuranceNetworkType(NetworkTypeID, updatedFields) {
    console.log("🛠️ Buscando tipo de red de seguros con ID:", NetworkTypeID);

    const insuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (!insuranceNetworkType.success) {
      console.error("Tipo de red de seguros no encontrado.");
      return OperationResult.failure('InsuranceNetworkTypeNotFound');
    }

    console.log("✅ Actualizando tipo de red de seguros con ID:", NetworkTypeID, "Campos:", updatedFields);

    updatedFields.UpdatedAt = new Date();

    const updateResult = await InsuranceNetworkTypeRepository.update(NetworkTypeID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("InsuranceNetworkTypeUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteInsuranceNetworkType(NetworkTypeID) {
    console.log("🗑 Buscando tipo de red de seguros con ID:", NetworkTypeID);

    const insuranceNetworkType = await InsuranceNetworkTypeRepository.findById(NetworkTypeID);
    if (!insuranceNetworkType.success) {
      console.error("Tipo de red de seguros no encontrado.");
      return OperationResult.failure('InsuranceNetworkTypeNotFound');
    }

    console.log("🗑 Desactivando tipo de red de seguros con ID:", NetworkTypeID);
    const deleteResult = await InsuranceNetworkTypeRepository.delete(NetworkTypeID);

    if (deleteResult.success) {
      EventBus.emit("InsuranceNetworkTypeDeleted", { NetworkTypeID });
    }

    return deleteResult;
  }
}

module.exports = new InsuranceNetworkTypeService();