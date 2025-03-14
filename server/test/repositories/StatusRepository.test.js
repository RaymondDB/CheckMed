const StatusRepository = require("../../src/repositories/implementations/systemStatusImplementations");
const SequelizeMock = require("sequelize-mock");
const { QueryTypes } = require("sequelize");

const dbMock = new SequelizeMock();
const statusModel = dbMock.define("Status", {
  StatusID: 1,
  StatusName: "Activo",
  CreatedAt: new Date(),
  UpdatedAt: new Date(),
});

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  sequelize: dbMock,
}));

describe("Status Repository", () => {
  test("Debe guardar un estado correctamente", async () => {
    const newStatus = {
      StatusName: "Inactivo",
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };

    const result = await StatusRepository.save(newStatus);
    expect(result.success).toBe(true);
    expect(result.data.StatusName).toBe("Inactivo");
  });

  test("Debe buscar un estado por ID", async () => {
    const statusID = 1;
    const result = await StatusRepository.findById(statusID);

    expect(result.success).toBe(true);
    expect(result.data.StatusID).toBe(statusID);
  });

  test("Debe actualizar un estado correctamente", async () => {
    const statusID = 1;
    const updatedFields = { StatusName: "Suspendido" };

    const result = await StatusRepository.update(statusID, updatedFields);
    expect(result.success).toBe(true);
  });

  test("Debe eliminar un estado correctamente", async () => {
    const statusID = 1;
    const result = await StatusRepository.delete(statusID);

    expect(result.success).toBe(true);
  });
});
