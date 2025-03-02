const UserDomainService = require("../../domain/services/usersServices");
const UserRepository = require("../../repositories/implementations/UsersImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/usersRules");
const { sequelize } = require("../../infrastructure/db");


class UserService {
  constructor({ userRepository }) {
    this.UserRepository = UserRepository;
  }

  async createUser(userData) {
    console.log("USERDATA RECIBIDO EN SERVICE:", userData);

    if (!userData || typeof userData !== "object") {
      console.error("Error: userData no es un objeto válido:", userData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de dominio
    const validation = UserDomainService.validateRequiredFields(userData);
    if (!validation.success) {
      console.error("Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!ValidationService.isValidEmail(userData.Email)) { 
      console.error("Error: Email no válido.");
      return OperationResult.failure("El correo electrónico no es válido.");
    }

    console.log("Verificando si el usuario ya está registrado...");
    const existingUser = await this.userRepository.findByEmail(userData.Email); 
    if (existingUser.success && existingUser.data) {
      console.error("Error: El usuario ya está registrado.");
      return OperationResult.failure("El usuario ya está registrado.");
    }

    // Creación del usuario con campos requeridos
    const userToSave = {
      ...userData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: userData.IsActive !== undefined ? userData.IsActive : true,
    };

    console.log("Guardando usuario en BD:", userToSave);
    const userResult = await this.userRepository.save(userToSave);

    if (userResult.success) {
      console.log("Usuario guardado con éxito:", userResult.data);
      EventBus.emit("UserCreated", userResult.data);
    } else {
      console.error("Error al guardar el usuario:", userResult.error);
    }

    return userResult;
  }
}

module.exports = UserService;
