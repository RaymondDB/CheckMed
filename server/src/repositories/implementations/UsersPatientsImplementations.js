const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

class PatientsImplementation {
  async findById(PatientID) {
    try {
      console.log("🔍 Buscando paciente con ID:", PatientID);

      const patient = await sequelize.query(
        `SELECT * FROM users.Patients WHERE PatientID = :PatientID`,
        {
          replacements: { PatientID },
          type: QueryTypes.SELECT,
        }
      );

      if (patient.length === 0) return OperationResult.failure("Paciente no encontrado.");

      return OperationResult.success(patient[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de paciente.", error);
    }
  }

  async findByEmail(Email) {
    try {
      console.log("🔍 Buscando paciente con Email:", Email);

      const patient = await sequelize.query(
        `SELECT * FROM users.Patients WHERE Email = :Email`,
        {
          replacements: { Email },
          type: QueryTypes.SELECT,
        }
      );

      if (patient.length === 0) return OperationResult.failure("Paciente no encontrado.");

      return OperationResult.success(patient[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de paciente.", error);
    }
  }

  async save(patientData) {
    try {
        console.log("💾 Guardando paciente en BD:", patientData);

        const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

        const result = await sequelize.query(
            `INSERT INTO users.Patients 
             (DateOfBirth, Gender, PhoneNumber, Address, EmergencyContactName, EmergencyContactPhone, BloodType, Allergies, InsuranceProviderID, CreatedAt, UpdatedAt, IsActive) 
             VALUES (:DateOfBirth, :Gender, :PhoneNumber, :Address, :EmergencyContactName, :EmergencyContactPhone, :BloodType, :Allergies, :InsuranceProviderID, :CreatedAt, :UpdatedAt, :IsActive)`,
            {
                replacements: {
                    DateOfBirth: patientData.DateOfBirth,
                    Gender: patientData.Gender,
                    PhoneNumber: patientData.PhoneNumber,
                    Address: patientData.Address,
                    EmergencyContactName: patientData.EmergencyContactName,
                    EmergencyContactPhone: patientData.EmergencyContactPhone,
                    BloodType: patientData.BloodType,
                    Allergies: patientData.Allergies,
                    InsuranceProviderID: patientData.InsuranceProviderID,
                    CreatedAt: formattedDate,
                    UpdatedAt: formattedDate,
                    IsActive: patientData.IsActive !== undefined ? patientData.IsActive : true,
                },
                type: QueryTypes.INSERT,
            }
        );

        return OperationResult.success({ message: "Paciente guardado correctamente", result });
    } catch (error) {
        console.error("❌ Error al guardar el paciente:", error);
        return OperationResult.failure("Error al guardar el paciente.", error);
    }
  }


  async update(PatientID, updatedFields) {
    try {
      console.log("🛠️ Buscando paciente con ID:", PatientID);

      const patient = await sequelize.query(
        `SELECT * FROM users.Patients WHERE PatientID = :PatientID`,
        { replacements: { PatientID }, type: QueryTypes.SELECT }
      );

      if (!patient.length) {
        return { success: false, message: "Paciente no encontrado." };
      }

      console.log("✅ Actualizando paciente con ID:", PatientID, "Campos:", updatedFields);

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

      const result = await sequelize.query(
        `UPDATE users.Patients
         SET FirstName = :FirstName, LastName = :LastName, Email = :Email, 
             Password = :Password, UpdatedAt = :UpdatedAt
         WHERE PatientID = :PatientID`,
        {
          replacements: {
            PatientID: parseInt(PatientID),
            FirstName: updatedFields.FirstName,
            LastName: updatedFields.LastName,
            Email: updatedFields.Email,
            Password: updatedFields.Password,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      return { success: true, message: "Paciente actualizado correctamente", result };
    } catch (error) {
      return { success: false, message: "Error al actualizar el paciente.", error };
    }
  }

  async delete(PatientID) {
    try {
      console.log("🗑 Desactivando paciente con ID:", PatientID);

      const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

      const [result] = await sequelize.query(
        `UPDATE users.Patients 
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE PatientID = :PatientID`,
        {
          replacements: { PatientID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );

      if (result === 0) {
        return OperationResult.failure("Paciente no encontrado o ya desactivado.");
      }

      return OperationResult.success("Paciente desactivado correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar paciente:", error);
      return OperationResult.failure("Error al eliminar el paciente.", error);
    }
  }
}

module.exports = new PatientsImplementation();
