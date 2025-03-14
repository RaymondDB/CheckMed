const RoleService = require("../../src/domain/services/systemRolesService");
const RoleRepository = require("../../src/repositories/implementations/systemRolesImplementations");
const OperationResult = require("../../src/helpers/OperationResult");

jest.mock("../../src/repositories/implementations/systemRolesImplementations");

describe("Role Service", () => {
  test("Debe crear un rol correctamente", async () => {
    const roleData = { RoleName: "Gerente", IsActive: true };

    RoleRepository.save.mockResolvedValue(
      OperationResult.success({ RoleID: 1, ...roleData })
    );

    const result = await RoleService.createRole(roleData);

    expect(result.success).toBe(true);
    expect(result.data.RoleName).toBe("Gerente");
  });

  test("Debe fallar al crear un rol sin nombre", async () => {
    const roleData = { IsActive: true };
    const result = await RoleService.createRole(roleData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El nombre del rol es obligatorio.");
  });

  test("Debe obtener un rol por ID", async () => {
    const roleID = 1;
    RoleRepository.findById.mockResolvedValue(
      OperationResult.success({ RoleID: roleID, RoleName: "Admin" })
    );

    const result = await RoleService.getRoleById(roleID);

    expect(result.success).toBe(true);
    expect(result.data.RoleID).toBe(roleID);
  });

  test("Debe fallar al obtener un rol con un ID inválido", async () => {
    const result = await RoleService.getRoleById("invalidID");

    expect(result.success).toBe(false);
    expect(result.message).toBe("El ID del rol debe ser un número válido.");
  });

  test("Debe actualizar un rol correctamente", async () => {
    const roleID = 1;
    const updatedFields = { RoleName: "Supervisor" };

    RoleRepository.findById.mockResolvedValue(
      OperationResult.success({ RoleID: roleID, RoleName: "Admin" })
    );
    RoleRepository.update.mockResolvedValue(
      OperationResult.success({ RoleID: roleID, RoleName: "Supervisor" })
    );

    const result = await RoleService.updateRole(roleID, updatedFields);

    expect(result.success).toBe(true);
    expect(result.data.RoleName).toBe("Supervisor");
  });

  test("Debe eliminar un rol correctamente", async () => {
    const roleID = 1;

    RoleRepository.findById.mockResolvedValue(
      OperationResult.success({ RoleID: roleID, RoleName: "Admin" })
    );
    RoleRepository.delete.mockResolvedValue(OperationResult.success());

    const result = await RoleService.deleteRole(roleID);

    expect(result.success).toBe(true);
  });

  test("Debe fallar al eliminar un rol inexistente", async () => {
    const roleID = 999;

    RoleRepository.findById.mockResolvedValue(
      OperationResult.failure("Rol no encontrado.")
    );

    const result = await RoleService.deleteRole(roleID);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Rol no encontrado.");
  });
});
