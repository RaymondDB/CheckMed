const UserService = require("../../src/business/services/UserService");
const OperationResult = require("../../src/helpers/OperationResult");

// Mockeamos el repositorio para que no haga consultas reales a la base de datos
const mockUserRepository = {
  findByEmail: jest.fn(),
  save: jest.fn(),
};

describe("UserService Tests", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService({ userRepository: mockUserRepository });
  });

  test("Debe devolver error si el usuario ya existe", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(
      OperationResult.success({ Email: "existing@example.com" })
    );

    const newUser = { Email: "existing@example.com" };
    const result = await userService.createUserWithRole(newUser);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El usuario ya está registrado.");
  });

  test("Debe guardar un usuario correctamente si no existe", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(OperationResult.failure("No encontrado"));
    mockUserRepository.save.mockResolvedValue(OperationResult.success({ id: 1 }));

    const newUser = { Email: "newuser@example.com", RoleID: "doctor" };
    const result = await userService.createUserWithRole(newUser);

    expect(result.success).toBe(true);
    expect(result.data.userID).toBeDefined();
  });

  test("Debe devolver error si falta el email", async () => {
    const result = await userService.createUserWithRole({ RoleID: "doctor" });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Formato de datos incorrecto.");
  });
});
