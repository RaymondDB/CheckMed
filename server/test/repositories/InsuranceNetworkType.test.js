const InsuranceNetworkTypeRepository = require("../../server/src/repositories/implementations/InsuranceNetworkTypeImplementation");
const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  database: "test_db",
  username: "test_user",
  password: "test_pass",
  host: "localhost",
  dialect: "mssql",
}));

const insuranceNetworkTypeMock = dbMock.define("Insurance.NetworkType", {
  NetworkTypeId: 1,
  Name: "ZXHL",
  IsActive: true,
});

describe("InsuranceNetworkType Tests", () => {
  let InsuranceNetworkTypeRepository;

  beforeEach(() => {
    InsuranceNetworkTypeRepository = new InsuranceNetworkTypeRepository();
  });

  test("Debe encontrar una red de proveedor de seguros por id", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 1}]);

    const result = await InsuranceNetworkTypeRepository.findById(1);
    expect(result.success).toBe(true);
    expect(result.data.NetworkTypeId).toBe(1);
  });

  test("Debe devolver error si la red de proveedor de seguros no existe", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await doctorRepository.findById(999);
    expect(result.success).toBe(false);
  });

  test("Debe guardar la red de proveedor de seguros correctamente", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 2 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: 2,
      Name: "ZXHL",
    };

    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});