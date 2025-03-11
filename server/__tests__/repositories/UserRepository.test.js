const UserRepository = require("../../src/repositories/implementations/UsersImplementation");
const connectionmock = require("../../src/infrastructure/db/dbconfig")
const SequelizeMock = require("sequelize-mock");

// Simulamos la conexión a la base de datos
const dbMock = new SequelizeMock();

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  database: "test_db",
  username: "test_user",
  password: "test_pass",
  host: "localhost",
  dialect: "mssql",
}));

const usersMock = dbMock.define("users.Users", {
  UserID: 1,
  FirstName: "John",
  LastName: "Doe",
  Email: "johndoe@example.com",
  RoleID: "doctor",
  IsActive: true,
});

describe("UserRepository Tests", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  test("Debe encontrar un usuario por email", async () => {
    usersMock.$queueResult([{ UserID: 1, Email: "johndoe@example.com" }]);

    const result = await userRepository.findByEmail("johndoe@example.com");
    expect(result.success).toBe(true);
    expect(result.data.Email).toBe("johndoe@example.com");
  });

  test("Debe devolver error si el usuario no existe", async () => {
    usersMock.$queueResult([]); // No encontró nada

    const result = await userRepository.findByEmail("notfound@example.com");
    expect(result.success).toBe(false);
  });

  test("Debe guardar un usuario correctamente", async () => {
    usersMock.$queueResult([{ UserID: 2 }]);

    const newUser = {
      FirstName: "Alice",
      LastName: "Smith",
      Email: "alice@example.com",
      Password: "12345",
      RoleID: "patient",
    };

    const result = await userRepository.save(newUser);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
