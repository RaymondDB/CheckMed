const PatientRepository = require("../../repositories/implementations/UsersPatientsImplementations");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../services/validationService");

class PatientService {
  async createPatient(patientData) {
    console.log("PATIENT DATA RECIBIDO EN SERVICE:", patientData);

    if (!patientData || typeof patientData !== "object") {
        console.error("Error: patientData no es un objeto válido:", patientData);
        return OperationResult.failure("Formato de datos incorrecto.");
    }

    const { 
        PatientID, 
        DateOfBirth, 
        Gender, 
        PhoneNumber, 
        Address, 
        EmergencyContactName, 
        EmergencyContactPhone, 
        BloodType, 
        Allergies, 
        InsuranceProviderID, 
        IsActive 
    } = patientData;

    console.log("Campos extraídos:");
    console.log("PatientID:", PatientID);
    console.log("DateOfBirth:", DateOfBirth);
    console.log("Gender:", Gender);
    console.log("PhoneNumber:", PhoneNumber);
    console.log("Address:", Address);
    console.log("EmergencyContactName:", EmergencyContactName);
    console.log("EmergencyContactPhone:", EmergencyContactPhone);
    console.log("BloodType:", BloodType);
    console.log("Allergies:", Allergies);
    console.log("InsuranceProviderID:", InsuranceProviderID);
    console.log(" IsActive:", IsActive);

    // Validación de campos obligatorios
    if (!DateOfBirth || !Gender || !PhoneNumber || !Address || !EmergencyContactName || !EmergencyContactPhone) {
        console.error("Error: Faltan campos obligatorios en patientData.");
        return OperationResult.failure("Todos los campos obligatorios deben completarse.");
    }

    const patientToSave = {
        PatientID, // Autoincremental
        DateOfBirth,
        Gender,
        PhoneNumber,
        Address,
        EmergencyContactName,
        EmergencyContactPhone,
        BloodType,
        Allergies,
        InsuranceProviderID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        IsActive: IsActive !== undefined ? IsActive : true,
    };

    console.log("Guardando paciente en BD:", patientToSave);

    const patientResult = await PatientRepository.save(patientToSave);

    if (patientResult.success) {
        console.log("Paciente guardado con éxito:", patientResult.data);
        EventBus.emit("PatientCreated", patientResult.data);
    } else {
        console.error("Error al guardar el paciente:", patientResult.error);
    }

    return patientResult;
 }


  async getPatientById(PatientID) {
    const patient = await PatientRepository.findById(PatientID);
    if (!patient.success) {
      return OperationResult.failure("Paciente no encontrado.");
    }

    EventBus.emit("PatientFetched", patient.data);
    return patient;
  }

  async updatePatient(PatientID, updatedFields) {
    const patient = await PatientRepository.findById(PatientID);
    if (!patient.success) {
      return OperationResult.failure("Paciente no encontrado.");
    }

    if (updatedFields.Email && !ValidationService.isValidEmail(updatedFields.Email)) {
      return OperationResult.failure("El correo electrónico no es válido.");
    }

    updatedFields.UpdatedAt = new Date();

    const updateResult = await PatientRepository.update(PatientID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("PatientUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deletePatient(PatientID) {
    const patient = await PatientRepository.findById(PatientID);
    if (!patient.success) {
      return OperationResult.failure("Paciente no encontrado.");
    }

    const deleteResult = await PatientRepository.delete(PatientID, { IsActive: false });

    if (deleteResult.success) {
      EventBus.emit("PatientDeleted", { PatientID });
    }

    return deleteResult;
  }
}

module.exports = new PatientService();
