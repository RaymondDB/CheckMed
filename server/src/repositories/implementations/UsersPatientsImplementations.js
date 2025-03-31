const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const Patient = require("../../infrastructure/models/UsersPatientModel");

const today = new Date().toISOString().split("T")[0];

class PatientsImplementation {
  async findById(PatientID) {
    try {
      const patient = await Patient.findByPk(PatientID);

      if (!patient) return OperationResult.failure("Paciente no encontrado.");

      return OperationResult.success(patient);
    } catch (error) { 
      return OperationResult.failure("Error en la búsqueda de paciente.", error);
    }
  }

  async findByEmail(Email) {
    try {
      const patient = await Patient.findOne({ where: { Email } });

      if (!patient) return OperationResult.failure("Paciente no encontrado.");

      return OperationResult.success(patient);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de paciente.", error);
    }
  }

  async getAllPatients() {
    try {
      const patients = await Patient.findAll();

      if (!patients) return OperationResult.failure("Usuario no encontrado.");

      console.log(patients)
      return OperationResult.success(patients);
    } catch (error) {
      return OperationResult.failure("Error al obtener todos los usuarios.", error);
    }
  }
  

  async save(patientData, transaction) {
    try {
      const patient = await Patient.create({
        DateOfBirth: patientData.DateOfBirth,
        Gender: patientData.Gender,
        PhoneNumber: patientData.PhoneNumber,
        Address: patientData.Address,
        EmergencyContactName: patientData.EmergencyContactName,
        EmergencyContactPhone: patientData.EmergencyContactPhone,
        BloodType: patientData.BloodType,
        Allergies: patientData.Allergies,
        InsuranceProviderID: patientData.InsuranceProviderID,
        CreatedAt: today,
        UpdatedAt: today,
        IsActive: patientData.IsActive !== undefined ? patientData.IsActive : true,
      }, { transaction });

      return OperationResult.success({ id: patient.PatientID });
    } catch (error) {
      return OperationResult.failure("Error al guardar el paciente.", error);
    }
  }

  async update(PatientID, updatedFields) {
    try {
      const patient = await Patient.findByPk(PatientID);
      if (!patient) return OperationResult.failure("Paciente no encontrado.");

      await patient.update({
        ...updatedFields,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Paciente actualizado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al actualizar el paciente.", error);
    }
  }

  async delete(PatientID) {
    try {
      const patient = await Patient.findByPk(PatientID);
      if (!patient) return OperationResult.failure("Paciente no encontrado.");

      await patient.update({
        IsActive: false,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Paciente desactivado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el paciente.", error);
    }
  }
}

module.exports = new PatientsImplementation();
