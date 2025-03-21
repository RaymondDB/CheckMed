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

    const result = await InsuranceNetworkTypeRepository.findById(999);
    expect(result.success).toBe(false);
  });

  test("Debe devolver error si al buscar por id, el id otorgado es un tipo de dato invalido", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await InsuranceNetworkTypeRepository.findById("a");
    expect(result.success).toBe(false);
  });

  test("Debe devolver error si al buscar por id, el id otorgado es negativo", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await InsuranceNetworkTypeRepository.findById(-1);
    expect(result.success).toBe(false);
  });



  test("Debe devolver error si la red de proveedor de seguros a borrar no existe", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await InsuranceNetworkTypeRepository.delete(999);
    expect(result.success).toBe(false);
  });

  test("Debe devolver error si al buscar por id, el id otorgado es un tipo de dato invalido", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await InsuranceNetworkTypeRepository.delete("z");
    expect(result.success).toBe(false);
  });

  test("Debe devolver error si el id otorgado es negativo", async () => {
    insuranceNetworkTypeMock.$queueResult([]);

    const result = await InsuranceNetworkTypeRepository.delete(-1);
    expect(result.success).toBe(false);
  });

  test("Debe borrar la red del proveedor de seguros", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 1}]);

    const result = await InsuranceNetworkTypeRepository.delete(1);
    expect(result.success).toBe(true);
  });



  test("No debe actualizar la informacion de la red de proveedor de seguros, pues el id es invalido", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: "a" }]);

    const newInsuranceNetworkType = {
      Name: "HMLT",
      IsActive: True
    };

    const result = await InsuranceNetworkTypeRepository.update(NetworkTypeId, newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar la informacion de la red de proveedor de seguros, pues falta informacion importante", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 1 }]);

    const newInsuranceNetworkType = {
      Name: "",
      IsActive: True
    };

    const result = await InsuranceNetworkTypeRepository.update(NetworkTypeId, newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar la informacion de la red de proveedor de seguros, pues el id no puede ser negativo", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: -1 }]);

    const newInsuranceNetworkType = {
      Name: "HMLT",
      IsActive: True
    };

    const result = await InsuranceNetworkTypeRepository.update(NetworkTypeId, newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe actualizar la informacion de la red de proveedor de seguros, pues hay un campo que se excede de su limite de caracteres", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: -1 }]);

    const newInsuranceNetworkType = {
      Name: "HMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLTHMLT",
      IsActive: True
    };

    const result = await InsuranceNetworkTypeRepository.update(NetworkTypeId, newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });



  test("No debe guardar a la red del proveedor de seguros, pues falta informacion obligatoria", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 32 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: 32,
      Name: "",
    };

    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe guardar a la red del proveedor de seguros, pues el id no puede ser negativo", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: -1 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: -1,
      Name: "ZHLDF",
    };
    
    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe guardar a la red del proveedor de seguros, pues el id es de tipo de dato invalido", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: -1 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: "e",
      Name: "LMHP",
    };

    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("No debe guardar a la red del proveedor de seguros, pues hay un campo que se excede de su limite de caracteres", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 34 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: 34,
      Name: "LMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHPLMHP",
    };

    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(false);
  });

  test("Debe guardar la red de proveedor de seguros correctamente", async () => {
    insuranceNetworkTypeMock.$queueResult([{ NetworkTypeId: 25 }]);

    const newInsuranceNetworkType = {
      NetworkTypeId: 25,
      Name: "ZXHL",
    };

    const result = await InsuranceNetworkTypeRepository.save(newInsuranceNetworkType);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});