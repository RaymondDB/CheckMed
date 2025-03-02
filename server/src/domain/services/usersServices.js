const UserRepository = require("../../repositories/implementations/UsersImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("./validationService");

class UserService {
  async createUser(userData) {
    console.log("USERDATA RECIBIDO EN SERVICE:", userData); // Verifica si el objeto completo llega correctamente

    if (!userData || typeof userData !== "object") {
        console.error("Error: userData no es un objeto válido:", userData);
        return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Extraer campos del objeto
    const { UserID, FirstName, LastName, Email, Password, RoleID, IsActive } = userData;

    // Verificar que los datos fueron extraídos correctamente
    console.log("Campos extraídos:");
    console.log("UserID:", UserID);
    console.log("FirstName:", FirstName);
    console.log("LastName:", LastName);
    console.log("Email:", Email);
    console.log("Password:", Password);
    console.log("RoleID:", RoleID);
    console.log("IsActive:", IsActive);

    // Validación de campos obligatorios
    if (!FirstName || !LastName || !Email || !Password || !RoleID) {
        console.error("Error: Faltan campos obligatorios en userData.");
        return OperationResult.failure("Todos los campos son obligatorios.");
    }

    if (!ValidationService.isValidEmail(Email)) {
        console.error("Error: Email no válido.");
        return OperationResult.failure("El correo electrónico no es válido.");
    }

    console.log("Verificando si el usuario ya está registrado...");
    const existingUser = await UserRepository.findByEmail(Email);
    if (existingUser.success && existingUser.data) {
        console.error("Error: El usuario ya está registrado.");
        return OperationResult.failure("El usuario ya está registrado.");
    }

    // Creación del usuario con campos requeridos en la base de datos
    const userToSave = {
        UserID, // Deja que la BD lo maneje si es autoincremental
        FirstName,
        LastName,
        Email,
        Password,
        RoleID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        IsActive: IsActive !== undefined ? IsActive : true, // Si no se pasa, por defecto está activo
    };

    console.log("Guardando usuario en BD:", userToSave);

    const userResult = await UserRepository.save(userToSave);

    if (userResult.success) {
        console.log("Usuario guardado con éxito:", userResult.data);
        EventBus.emit("UserCreated", userResult.data);
    } else {
        console.error("Error al guardar el usuario:", userResult.error);
    }

    return userResult;
}


  async getUserById(UserID) {
    const user = await UserRepository.findById(UserID);
    if (!user.success) {
      return OperationResult.failure("Usuario no encontrado.");
    }

    EventBus.emit("UserFetched", user.data);
    return user;
  }

  async updateUser(UserID, updatedFields) {
    const user = await UserRepository.findById(UserID);
    if (!user.success) {
      return OperationResult.failure("Usuario no encontrado.");
    }

    if (updatedFields.Email && !ValidationService.isValidEmail(updatedFields.Email)) {
      return OperationResult.failure("El correo electrónico no es válido.");
    }

    updatedFields.UpdatedAt = new Date(); // Asegurar que la fecha de actualización se actualiza

    const updateResult = await UserRepository.update(UserID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("UserUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteUser(UserID) {
    const user = await UserRepository.findById(UserID);
    if (!user.success) {
      return OperationResult.failure("Usuario no encontrado.");
    }

    const deleteResult = await UserRepository.delete(UserID, { IsActive: false});

    if (deleteResult.success) {
      EventBus.emit("UserDeleted", { UserID });
    }

    return deleteResult;
  }
}


//Clase para validar los campos al momento de crear un usuario en la capa de negocio
class UserDomainService {
  static validateRequiredFields(userData) {
    const requiredFields = ["FirstName", "LastName", "Email", "Password", "RoleID"];
    for (const field of requiredFields) {
      if (!userData[field]) {
        return { success: false, message: `El campo ${field} es obligatorio.` };
      }
    }
    return { success: true };
  }
}

module.exports = UserDomainService;

module.exports = new UserService();

