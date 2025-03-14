const RoleRepository = require("../../src/repositories/implementations/systemRolesImplementations");
const SequelizeMock = require("sequelize-mock");
const { QueryTypes } = require("sequelize");

const dbMock = new SequelizeMock();
const roleModel = dbMock.define("Roles", {
  RoleID: 1,
  RoleName: "Admin",
  CreatedAt: new Date(),
  UpdatedAt: new Date(),
  IsActive: true,
});

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  sequelize: dbMock,
}));

describe("Role Repository", () => {
  test("Debe guardar un rol correctamente", async () => {
    const newRole = {
      RoleName: "Manager",
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
    };

    const result = await RoleRepository.save(newRole);
    expect(result.success).toBe(true);
    expect(result.data.RoleName).toBe("Manager");
  });

  test("Debe buscar un rol por ID", async () => {
    const roleID = 1;
    const result = await RoleRepository.findById(roleID);

    expect(result.success).toBe(true);
    expect(result.data.RoleID).toBe(roleID);
  });

  test("Debe actualizar un rol correctamente", async () => {
    const roleID = 1;
    const updatedFields = { RoleName: "Supervisor" };

    const result = await RoleRepository.update(roleID, updatedFields);
    expect(result.success).toBe(true);
  });

  test("Debe eliminar un rol correctamente", async () => {
    const roleID = 1;
    const result = await RoleRepository.delete(roleID);

    expect(result.success).toBe(true);
  });
});
