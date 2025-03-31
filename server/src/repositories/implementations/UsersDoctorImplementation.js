const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const Doctor = require("../../infrastructure/models/UsersDoctorModel");

const today = new Date().toISOString().split("T")[0];

class DoctorsImplementation {
  async findById(DoctorID) {
    try {
      const doctor = await Doctor.findByPk(DoctorID);
      if (!doctor) return OperationResult.failure("Doctor no encontrado.");
      return OperationResult.success(doctor);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del doctor.", error);
    }
  }

  async findByLicense(licenseNumber) {
    try {
      const doctor = await Doctor.findOne({ where: { LicenseNumber: licenseNumber } });

      if (!doctor) return OperationResult.failure("Doctor no encontrado.");

      return OperationResult.success(doctor);
    } catch (error) {
      return OperationResult.failure("Error al buscar el doctor.", error);
    }
  }

  async getAllDoctors() {
    try {
      const doctors = await Doctor.findAll();

      return OperationResult.success(doctors);
    } catch (error) {
      return OperationResult.failure("Error al obtener la lista de doctores.", error);
    }
  }

  async save(doctorData, transaction) {
    try {
      const doctor = await Doctor.create({
        SpecialtyID: doctorData.SpecialtyID,
        LicenseNumber: doctorData.LicenseNumber,
        PhoneNumber: doctorData.PhoneNumber,
        YearsOfExperience: doctorData.YearsOfExperience,
        Education: doctorData.Education,
        Bio: doctorData.Bio,
        ConsultationFee: doctorData.ConsultationFee,
        ClinicAddress: doctorData.ClinicAddress,
        AvailabilityModeId: doctorData.AvailabilityModeId,
        LicenseExpirationDate: doctorData.LicenseExpirationDate,
        CreatedAt: today,
        UpdatedAt: today,
        IsActive: doctorData.IsActive ?? true,
      }, { transaction });

      return OperationResult.success({ id: doctor.DoctorID });
    } catch (error) {
      return OperationResult.failure("Error al guardar el doctor.", error);
    }
  }

  async update(DoctorID, updatedFields) {
    try {
      const doctor = await Doctor.findByPk(DoctorID);

      if (!doctor) return OperationResult.failure("Doctor no encontrado.");

      await doctor.update({
        ...updatedFields,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Doctor actualizado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al actualizar el doctor.", error);
    }
  }

  async delete(DoctorID) {
    try {
      const doctor = await Doctor.findByPk(DoctorID);

      if (!doctor) return OperationResult.failure("Doctor no encontrado.");

      await doctor.update({
        IsActive: false,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Doctor desactivado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el doctor.", error);
    }
  }
}

module.exports = new DoctorsImplementation();
