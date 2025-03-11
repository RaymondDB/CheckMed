const UserDomainService = require("../../domain/services/usersServices");
const UserRepository = require("../../repositories/implementations/UsersImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/usersRules");
const { sequelize } = require("../../infrastructure/db");
const Email = require("../../domain/valueObjects/userEmail")

class UserService {
  constructor({ userRepository, doctorRepository, patientRepository }) {
    this.userRepository = userRepository;
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }

  async createUserWithRole(userData) {
    console.log("USERDATA RECIBIDO EN SERVICE:", userData);

    if (!userData || typeof userData !== "object") {
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validaciones con reglas de dominio
    const validation = UserDomainService.validateRequiredFields(userData);
    if (!validation.success) {
      return OperationResult.failure(validation.message);
    }

    if (!Email.isValid(userData.Email)) {
      return OperationResult.failure("El correo electrónico no es válido.");
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.Email);
    if (existingUser.success && existingUser.data) {
      return OperationResult.failure("El usuario ya está registrado.");
    }

    // Iniciar transacción manual para asegurar atomicidad
    const transaction = await this.userRepository.startTransaction();

    try {
      // Insertar usuario en `users.Users`
      const userToSave = {
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Email: userData.Email,
        Password: userData.Password,
        RoleID: userData.RoleID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        IsActive: userData.IsActive ?? true,
      };

      const userResult = await this.userRepository.save(userToSave, transaction);
      if (!userResult.success) {
        throw new Error("Error al crear el usuario.");
      }

      const userID = userResult.data.id; // Obtener el UserID generado

      // Insertar en `users.Doctors` o `users.Patients` según el RoleID
      if (userData.RoleID === "doctor") {
        const doctorToSave = {
          DoctorID: userID,
          SpecialtyID: userData.SpecialtyID,
          LicenseNumber: userData.LicenseNumber,
          PhoneNumber: userData.PhoneNumber,
          YearsOfExperience: userData.YearsOfExperience,
          Education: userData.Education,
          Bio: userData.Bio,
          ConsultationFee: userData.ConsultationFee,
          ClinicAddress: userData.ClinicAddress,
          AvailabilityModelId: userData.AvailabilityModelId,
          LicenseExpirationDate: userData.LicenseExpirationDate,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
          IsActive: true,
        };

        const doctorResult = await this.doctorRepository.save(doctorToSave, transaction);
        if (!doctorResult.success) {
          throw new Error("Error al crear el doctor.");
        }
      } else if (userData.RoleID === "patient") {
        const patientToSave = {
          PatientID: userID,
          DateOfBirth: userData.DateOfBirth,
          Gender: userData.Gender,
          PhoneNumber: userData.PhoneNumber,
          Address: userData.Address,
          EmergencyContactName: userData.EmergencyContactName,
          EmergencyContactPhone: userData.EmergencyContactPhone,
          BloodType: userData.BloodType,
          Allergies: userData.Allergies,
          InsuranceProviderID: userData.InsuranceProviderID,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
          IsActive: true,
        };

        const patientResult = await this.patientRepository.save(patientToSave, transaction);
        if (!patientResult.success) {
          throw new Error("Error al crear el paciente.");
        }
      } else {
        throw new Error("RoleID inválido. Debe ser 'doctor' o 'patient'.");
      }

      // Confirmar transacción
      await this.userRepository.commitTransaction(transaction);
      EventBus.emit("UserCreatedWithRole", { userID, role: userData.RoleID });

      return OperationResult.success({ userID, role: userData.RoleID });
    } catch (error) {
      // Revertir transacción si algo falla
      await this.userRepository.rollbackTransaction(transaction);
      console.error("Error en la transacción:", error.message);
      return OperationResult.failure(error.message);
    }
  }
}

module.exports = UserService;
