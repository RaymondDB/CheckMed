const DoctorRepository = require("../../repositories/implementations/UsersDoctorImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../services/validationService");

class DoctorService {
  async createDoctor(doctorData) {
    console.log("DOCTOR DATA RECIBIDO EN SERVICE:", doctorData);

    if (!doctorData || typeof doctorData !== "object") {
      console.error("Error: doctorData no es un objeto válido:", doctorData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    const {
      DoctorID,
      SpecialtyID,
      LicenseNumber,
      PhoneNumber,
      YearsOfExperience,
      Education,
      Bio,
      ConsultationFee,
      ClinicAddress,
      AvailabilityModelId,
      LicenseExpirationDate,
      IsActive
    } = doctorData;

    console.log("Campos extraídos:");
    console.log("DoctorID:", DoctorID);
    console.log("SpecialtyID:", SpecialtyID);
    console.log("LicenseNumber:", LicenseNumber);
    console.log("PhoneNumber:", PhoneNumber);
    console.log("YearsOfExperience:", YearsOfExperience);
    console.log("Education:", Education);
    console.log("Bio:", Bio);
    console.log("ConsultationFee:", ConsultationFee);
    console.log("ClinicAddress:", ClinicAddress);
    console.log("AvailabilityModelId:", AvailabilityModelId);
    console.log("LicenseExpirationDate:", LicenseExpirationDate);
    console.log("IsActive:", IsActive);

    // Validaciones obligatorias
    if (!SpecialtyID || !LicenseNumber || !PhoneNumber || !YearsOfExperience || !Education) {
      console.error("Error: Faltan campos obligatorios en doctorData.");
      return OperationResult.failure("Todos los campos obligatorios deben completarse.");
    }

    if (!ValidationService.isValidPhoneNumber(PhoneNumber)) {
      console.error("Error: Número de teléfono inválido.");
      return OperationResult.failure("Número de teléfono inválido.");
    }

    console.log("Verificando si el doctor ya está registrado...");
    const existingDoctor = await DoctorRepository.findByLicense(LicenseNumber);
    if (existingDoctor.success && existingDoctor.data) {
      console.error("Error: El doctor ya está registrado con esta licencia.");
      return OperationResult.failure("El doctor ya está registrado con esta licencia.");
    }

    // Crear objeto para guardar en BD
    const doctorToSave = {
      DoctorID,
      SpecialtyID,
      LicenseNumber,
      PhoneNumber,
      YearsOfExperience,
      Education,
      Bio,
      ConsultationFee,
      ClinicAddress,
      AvailabilityModelId,
      LicenseExpirationDate,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: IsActive !== undefined ? IsActive : true,
    };

    console.log("Guardando doctor en BD:", doctorToSave);

    const doctorResult = await DoctorRepository.save(doctorToSave);

    if (doctorResult.success) {
      console.log("Doctor guardado con éxito:", doctorResult.data);
      EventBus.emit("DoctorCreated", doctorResult.data);
    } else {
      console.error("Error al guardar el doctor:", doctorResult.error);
    }

    return doctorResult;
  }

  async getDoctorById(DoctorID) {
    console.log("🔍 Buscando doctor con ID:", DoctorID);

    const doctor = await DoctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    EventBus.emit("DoctorFetched", doctor.data);
    return doctor;
  }

  async updateDoctor(DoctorID, updatedFields) {
    console.log("🛠️ Buscando doctor con ID:", DoctorID);

    const doctor = await DoctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    console.log("✅ Actualizando doctor con ID:", DoctorID, "Campos:", updatedFields);

    updatedFields.UpdatedAt = new Date();

    const updateResult = await DoctorRepository.update(DoctorID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("DoctorUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteDoctor(DoctorID) {
    console.log("🗑 Buscando doctor con ID:", DoctorID);

    const doctor = await DoctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    console.log("🗑 Desactivando doctor con ID:", DoctorID);
    const deleteResult = await DoctorRepository.delete(DoctorID);

    if (deleteResult.success) {
      EventBus.emit("DoctorDeleted", { DoctorID });
    }

    return deleteResult;
  }
}

module.exports = new DoctorService();
