const PatientDomainService = require("../../domain/services/usersPatientServices");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/usersPatientsRules");

class PatientService {
  constructor({ patientRepository }) {
    this.patientRepository = patientRepository;
  }

  async createPatient(patientData) {
    console.log("PATIENT DATA RECIBIDO EN SERVICE:", patientData);

    if (!patientData || typeof patientData !== "object") {
      console.error("Error: patientData no es un objeto válido:", patientData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de dominio
    const validation = PatientDomainService.validateRequiredFields(patientData); //FALTA POR CREAR 
    if (!validation.success) {
      console.error("Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!PatientDomainService.isAdult(patientData.DateOfBirth)) { //FALTA POR CREAR
      console.error("Error: El paciente debe ser mayor de 18 años.");
      return OperationResult.failure("El paciente debe ser mayor de 18 años.");
    }

    console.log("Verificando si el paciente ya está registrado...");
    const existingPatient = await this.patientRepository.findByPhone(patientData.PhoneNumber); //FALTA POR CREAR
    if (existingPatient.success && existingPatient.data) {
      console.error("Error: El paciente ya está registrado con este número de teléfono.");
      return OperationResult.failure("El paciente ya está registrado con este número de teléfono.");
    }

    // Creación del paciente con campos requeridos
    const patientToSave = {
      ...patientData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: patientData.IsActive !== undefined ? patientData.IsActive : true,
    };

    console.log("Guardando paciente en BD:", patientToSave);
    const patientResult = await this.patientRepository.save(patientToSave);

    if (patientResult.success) {
      console.log("Paciente guardado con éxito:", patientResult.data);
      EventBus.emit("PatientCreated", patientResult.data);
    } else {
      console.error("Error al guardar el paciente:", patientResult.error);
    }

    return patientResult;
  }

  async getPatientById(PatientID) {
    console.log("🔍 Buscando paciente con ID:", PatientID);

    const patient = await this.patientRepository.findById(PatientID);
    if (!patient.success) {
      console.error("Paciente no encontrado.");
      return OperationResult.failure("Paciente no encontrado.");
    }

    EventBus.emit("PatientFetched", patient.data);
    return patient;
  }

  async updatePatient(PatientID, updatedFields) {
    console.log("🛠️ Buscando paciente con ID:", PatientID);

    const patient = await this.patientRepository.findById(PatientID);
    if (!patient.success) {
      console.error("Paciente no encontrado.");
      return OperationResult.failure("Paciente no encontrado.");
    }

    updatedFields.UpdatedAt = new Date();

    const updateResult = await this.patientRepository.update(PatientID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("PatientUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deletePatient(PatientID) {
    console.log("🗑 Buscando paciente con ID:", PatientID);

    const patient = await this.patientRepository.findById(PatientID);
    if (!patient.success) {
      console.error("Paciente no encontrado.");
      return OperationResult.failure("Paciente no encontrado.");
    }

    console.log("🗑 Desactivando paciente con ID:", PatientID);
    const deleteResult = await this.patientRepository.delete(PatientID);

    if (deleteResult.success) {
      EventBus.emit("PatientDeleted", { PatientID });
    }

    return deleteResult;
  }
}

module.exports = PatientService;
