const DoctorDomainService = require("../../domain/services/usersDoctorServices");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/usersDoctorsRules");

class DoctorService {
  constructor({ doctorRepository }) {
    this.doctorRepository = doctorRepository;
  }

  async createDoctor(doctorData) {
    console.log("DOCTOR DATA RECIBIDO EN SERVICE:", doctorData);

    if (!doctorData || typeof doctorData !== "object") {
      console.error("Error: doctorData no es un objeto válido:", doctorData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de dominio
    const validation = DoctorDomainService.validateRequiredFields(doctorData);
    if (!validation.success) {
      console.error("Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!DoctorDomainService.isLicenseValid(doctorData.LicenseExpirationDate)) {
      console.error("Error: La licencia ha expirado.");
      return OperationResult.failure("La licencia del doctor ha expirado.");
    }

    console.log("Verificando si el doctor ya está registrado...");
    const existingDoctor = await this.doctorRepository.findByLicense(doctorData.LicenseNumber);
    if (existingDoctor.success && existingDoctor.data) {
      console.error("Error: El doctor ya está registrado con esta licencia.");
      return OperationResult.failure("El doctor ya está registrado con esta licencia.");
    }

    // Creación del doctor con campos requeridos
    const doctorToSave = {
      ...doctorData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: doctorData.IsActive !== undefined ? doctorData.IsActive : true,
    };

    console.log("Guardando doctor en BD:", doctorToSave);
    const doctorResult = await this.doctorRepository.save(doctorToSave);

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

    const doctor = await this.doctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    EventBus.emit("DoctorFetched", doctor.data);
    return doctor;
  }

  async updateDoctor(DoctorID, updatedFields) {
    console.log("🛠️ Buscando doctor con ID:", DoctorID);

    const doctor = await this.doctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    updatedFields.UpdatedAt = new Date();

    const updateResult = await this.doctorRepository.update(DoctorID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("DoctorUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteDoctor(DoctorID) {
    console.log("🗑 Buscando doctor con ID:", DoctorID);

    const doctor = await this.doctorRepository.findById(DoctorID);
    if (!doctor.success) {
      console.error("Doctor no encontrado.");
      return OperationResult.failure("Doctor no encontrado.");
    }

    console.log("🗑 Desactivando doctor con ID:", DoctorID);
    const deleteResult = await this.doctorRepository.delete(DoctorID);

    if (deleteResult.success) {
      EventBus.emit("DoctorDeleted", { DoctorID });
    }

    return deleteResult;
  }
}

module.exports = DoctorService;
