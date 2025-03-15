const InsuranceProvidersRepository = require("../../src/repositories/implementations/InsuranceProvidersImplementation");
const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  database: "test_db",
  username: "test_user",
  password: "test_pass",
  host: "localhost",
  dialect: "mssql",
}));

const insuranceProvidersMock = dbMock.define("Insurance.InsuranceProviders", {
  InsuranceProviderID: 1,
  Name: "HHML",
  ContactNumber: "8094771245",
  Email: "HHML@gmail.com",
  Adress: "C/ olivio c. #3",
  CoverageDetails: "All Danger",
  NetworkTypeId: 1,
  IsPreferred: true,
  IsActive: true,
});

describe("InsuranceProviders Tests", () => {
  let InsuranceProvidersRepository;

  beforeEach(() => {
    InsuranceProvidersRepository = new InsuranceProvidersRepository();
  });

  test("Debe encontrar un proveedor de seguros por id", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1}]);

    const result = await InsuranceProvidersRepository.findById(1);
    expect(result.success).toBe(true);
    expect(result.data.InsuranceProviderID).toBe(1);
  });

  test("Debe devolver error si el proveedor de seguros no existe", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.findById(999);
    expect(result.success).toBe(false);
  });

  test("Debe guardar el proveedor de seguros correctamente", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 2 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 2,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});