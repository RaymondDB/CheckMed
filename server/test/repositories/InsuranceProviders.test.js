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

  test("Debe devolver error, pues el ID es negativo", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.findById(-1);
    expect(result.success).toBe(false);
  });

  test("Debe devolver error, pues el ID es de tipo de dato invalido", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.findById("c");
    expect(result.success).toBe(false);
  });



  test("Debe devolver error si el proveedor de seguros a borrar no existe", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.delete(999);
    expect(result.success).toBe(false);
  });

  test("Debe devolver error, pues el ID es negativo", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.delete(-1);
    expect(result.success).toBe(false);
  });

  test("Debe devolver error, pues el ID es de tipo de dato invalido", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.delete("c");
    expect(result.success).toBe(false);
  });

  test("Debe borrar el proveedor de seguros", async () => {
    insuranceProvidersMock.$queueResult([]);

    const result = await InsuranceProvidersRepository.delete(1);
    expect(result.success).toBe(true);
  });

 

  test("Debe actualizar el proveedor de seguros correctamente", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 1,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });

  test("No debe actualizar el proveedor de seguros, pues falta informacion importante", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "",
        ContactNumber: "",
        Email: "",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues el id no puede ser negativo", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: -5 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues el tipo de dato del id otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: "a" }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues el numero de contacto otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "contactnumber",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues el email otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor no existe", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 999,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor no puede ser negativa", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: -1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor tiene id invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 1 }]);

    const newInsuranceProvider = {
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: "y",
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.update(InsuranceProviderID, newInsuranceProvider);
    expect(result.success).toBe(false);
  });



  test("Debe guardar el proveedor de seguros correctamente", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

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

  test("No debe guardar el proveedor de seguros, pues falta informacion importante", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 2,
        Name: "",
        ContactNumber: "",
        Email: "",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues el id no puede ser negativo", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: -5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: -5,
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
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues el tipo de dato del id otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: "a" }]);

    const newInsuranceProvider = {
        InsuranceProviderID: "a",
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
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues el numero de contacto otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 5,
        Name: "Yellow Cover",
        ContactNumber: "contactnumber",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues el email otorgado es invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 5,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor no existe", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 5,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: 999,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor no puede ser negativa", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 5,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: -1,
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });

  test("No debe guardar el proveedor de seguros, pues la red de seguros otorgada por id a la que pertenece el proveedor tiene id invalido", async () => {
    insuranceProvidersMock.$queueResult([{ InsuranceProviderID: 5 }]);

    const newInsuranceProvider = {
        InsuranceProviderID: 5,
        Name: "Yellow Cover",
        ContactNumber: "8094018274",
        Email: "YLLCV@gmail.com",
        Adress: "C/ Santo Capra #9",
        CoverageDetails: "A todo riesgo",
        NetworkTypeId: "y",
        IsPreferred: true,
        IsActive: true,
    };

    const result = await InsuranceProvidersRepository.save(newInsuranceProvider);
    expect(result.success).toBe(false);
  });
});