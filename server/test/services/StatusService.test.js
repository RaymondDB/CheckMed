const StatusService = require("../../src/domain/services/systemStatusService");
const StatusRepository = require("../../src/repositories/implementations/systemStatusImplementations");
const OperationResult = require("../../src/helpers/OperationResult");

jest.mock("../../src/repositories/implementations/systemStatusImplementations");

describe("Status Service", () => {
  test("Debe crear un estado correctamente", async () => {
    const statusData = { StatusName: "Pendiente" };

    StatusRepository.save.mockResolvedValue(
      OperationResult.success({ StatusID: 1, ...statusData })
    );

    const result = await StatusService.createStatus(statusData);

    expect(result.success).toBe(true);
    expect(result.data.StatusName).toBe("Pendiente");
  });

  test("Debe fallar al crear un estado sin nombre", async () => {
    const statusData = {};
    const result = await StatusService.createStatus(statusData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El nombre del estado es obligatorio.");
  });

  test("Debe obtener un estado por ID", async () => {
    const statusID = 1;
    StatusRepository.findById.mockResolvedValue(
      OperationResult.success({ StatusID: statusID, StatusName: "Activo" })
    );

    const result = await StatusService.getStatusById(statusID);

    expect(result.success).toBe(true);
    expect(result.data.StatusID).toBe(statusID);
  });

  test("Debe fallar al obtener un estado con un ID inválido", async () => {
    const result = await StatusService.getStatusById("invalidID");

    expect(result.success).toBe(false);
    expect(result.message).toBe("El ID del estado debe ser un número válido.");
  });

  test("Debe actualizar un estado correctamente", async () => {
    const statusID = 1;
    const updatedFields = { StatusName: "En proceso" };

    StatusRepository.findById.mockResolvedValue(
      OperationResult.success({ StatusID: statusID, StatusName: "Pendiente" })
    );
    StatusRepository.update.mockResolvedValue(
      OperationResult.success({ StatusID: statusID, StatusName: "En proceso" })
    );

    const result = await StatusService.updateStatus(statusID, updatedFields);

    expect(result.success).toBe(true);
    expect(result.data.StatusName).toBe("En proceso");
  });

  test("Debe eliminar un estado correctamente", async () => {
    const statusID = 1;

    StatusRepository.findById.mockResolvedValue(
      OperationResult.success({ StatusID: statusID, StatusName: "Activo" })
    );
    StatusRepository.delete.mockResolvedValue(OperationResult.success());

    const result = await StatusService.deleteStatus(statusID);

    expect(result.success).toBe(true);
  });

  test("Debe fallar al eliminar un estado inexistente", async () => {
    const statusID = 999;

    StatusRepository.findById.mockResolvedValue(
      OperationResult.failure("Estado no encontrado.")
    );

    const result = await StatusService.deleteStatus(statusID);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Estado no encontrado.");
  });
});
