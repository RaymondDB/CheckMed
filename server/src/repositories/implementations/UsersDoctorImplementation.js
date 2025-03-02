const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

class DoctorsImplementation {
  async findById(DoctorID) {
    try {
      console.log("🔍 Buscando doctor con ID:", DoctorID);

      const doctor = await sequelize.query(
        `SELECT * FROM users.Doctors WHERE DoctorID = :DoctorID`,
        { 
          replacements: { DoctorID }, 
          type: QueryTypes.SELECT 
        }
      );

      if (doctor.length === 0) return OperationResult.failure("Doctor no encontrado.");
      
      return OperationResult.success(doctor[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del doctor.", error);
    }
  }

  

  async findAll() {
    try {
      console.log("📄 Buscando todos los doctores...");

      const doctors = await sequelize.query(
        `SELECT * FROM users.Doctors`, 
        { type: QueryTypes.SELECT }
      );

      return OperationResult.success(doctors);
    } catch (error) {
      return OperationResult.failure("Error al obtener la lista de doctores.", error);
    }
  }

  async findByLicense(licenseNumber) {
    try {
      const result = await sequelize.query(
        "SELECT * FROM users.Doctors WHERE LicenseNumber = :licenseNumber",
        {
          replacements: { licenseNumber },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        return OperationResult.failure("Doctor no encontrado.");
      }

      return OperationResult.success(result[0]);
    } catch (error) {
      console.error("Error en findByLicense:", error);
      return OperationResult.failure("Error al buscar el doctor.");
    }
  }




  async save(doctorData) {
    try {
      console.log("💾 Guardando doctor en BD:", doctorData);

      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `INSERT INTO users.Doctors (SpecialtyID, LicenseNumber, PhoneNumber, YearsOfExperience, 
          Education, Bio, ConsultationFee, ClinicAddress, AvailabilityModelId, 
          LicenseExpirationDate, CreatedAt, UpdatedAt, IsActive)
         VALUES (:SpecialtyID, :LicenseNumber, :PhoneNumber, :YearsOfExperience, 
         :Education, :Bio, :ConsultationFee, :ClinicAddress, :AvailabilityModelId, 
         :LicenseExpirationDate, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            SpecialtyID: doctorData.SpecialtyID,
            LicenseNumber: doctorData.LicenseNumber,
            PhoneNumber: doctorData.PhoneNumber,
            YearsOfExperience: doctorData.YearsOfExperience,
            Education: doctorData.Education,
            Bio: doctorData.Bio,
            ConsultationFee: doctorData.ConsultationFee,
            ClinicAddress: doctorData.ClinicAddress,
            AvailabilityModelId: doctorData.AvailabilityModelId,
            LicenseExpirationDate: doctorData.LicenseExpirationDate,
            CreatedAt: formattedDate,
            UpdatedAt: formattedDate,
            IsActive: doctorData.IsActive !== undefined ? doctorData.IsActive : true,
          },
          type: QueryTypes.INSERT,
        }
      );

      return OperationResult.success({ message: "Doctor guardado correctamente", result });
    } catch (error) {
      return OperationResult.failure("Error al guardar el doctor.", error);
    }
  }

  async update(DoctorID, updatedFields) {
    try {
      console.log("🛠️ Buscando doctor con ID:", DoctorID);

      const doctor = await sequelize.query(
        `SELECT * FROM users.Doctors WHERE DoctorID = :DoctorID`,
        { replacements: { DoctorID }, type: QueryTypes.SELECT }
      );

      if (!doctor.length) {
        return OperationResult.failure("Doctor no encontrado.");
      }

      console.log("✅ Actualizando doctor con ID:", DoctorID, "Campos:", updatedFields);

      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `UPDATE users.Doctors
         SET SpecialtyID = :SpecialtyID, LicenseNumber = :LicenseNumber, PhoneNumber = :PhoneNumber,
             YearsOfExperience = :YearsOfExperience, Education = :Education, Bio = :Bio,
             ConsultationFee = :ConsultationFee, ClinicAddress = :ClinicAddress,
             AvailabilityModelId = :AvailabilityModelId, LicenseExpirationDate = :LicenseExpirationDate,
             UpdatedAt = :UpdatedAt
         WHERE DoctorID = :DoctorID`,
        {
          replacements: {
            DoctorID: parseInt(DoctorID),
            SpecialtyID: updatedFields.SpecialtyID,
            LicenseNumber: updatedFields.LicenseNumber,
            PhoneNumber: updatedFields.PhoneNumber,
            YearsOfExperience: updatedFields.YearsOfExperience,
            Education: updatedFields.Education,
            Bio: updatedFields.Bio,
            ConsultationFee: updatedFields.ConsultationFee,
            ClinicAddress: updatedFields.ClinicAddress,
            AvailabilityModelId: updatedFields.AvailabilityModelId,
            LicenseExpirationDate: updatedFields.LicenseExpirationDate,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      return OperationResult.success({ message: "Doctor actualizado correctamente", result });
    } catch (error) {
      return OperationResult.failure("Error al actualizar el doctor.", error);
    }
  }

  async delete(DoctorID) {
    try {
      console.log("🗑 Desactivando doctor con ID:", DoctorID);

      const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const [result] = await sequelize.query(
        `UPDATE users.Doctors 
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE DoctorID = :DoctorID`,
        {
          replacements: { DoctorID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );

      if (result === 0) {
        return OperationResult.failure("Doctor no encontrado o ya desactivado.");
      }

      return OperationResult.success("Doctor desactivado correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar doctor:", error);
      return OperationResult.failure("Error al eliminar el doctor.", error);
    }
  }
}

module.exports = new DoctorsImplementation();
