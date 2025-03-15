const InsuranceProvidersService = require("../../src/business/services/insuranceProvidersBServices");
const OperationResult = require("../../src/domain/valueObjects/OperationResult");

const mockInsuranceProvidersRepository = {
  findById: jest.fn(),
  save: jest.fn(),
};

describe("InsuranceProvidersService Tests", () => {
  let insuranceProvidersService;

  beforeEach(() => {
    insuranceProvidersService = new InsuranceProvidersService({ insuranceProvidersRepository: mockInsuranceProvidersRepository });
  });

  test("Debe devolver error si el proveedor de seguros ya existe", async () => {
    mockInsuranceProvidersRepository.findById.mockResolvedValue(
      OperationResult.success({ InsuranceProviderID: 1 })
    );

    const newInsuranceProvider = { InsuranceProviderID: 1 };
    const result = await insuranceProvidersService.createInsuranceProvider(newInsuranceProvider);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El proveedor de seguros ya está registrado.");
  });

  test("Debe guardar un proveedor de seguros si no existe", async () => {
    mockInsuranceProvidersRepository.findById.mockResolvedValue(OperationResult.failure("No encontrado"));
    mockInsuranceProvidersRepository.save.mockResolvedValue(OperationResult.success({ id: 1 }));

    const newInsuranceProvider = { Name: "HHML", Email: "HHML@gmail.com", Adress: "C/ olivio c. #3", CoverageDetails: "All Danger", NetworkTypeId: 1};
    const result = await insuranceProvidersService.createInsuranceProvider(newInsuranceProvider);

    expect(result.success).toBe(true);
    expect(result.data.InsuranceProviderID).toBeDefined();
  });

  test("Debe devolver error si falta el nombre", async () => {
    const result = await insuranceProvidersService.createInsuranceProvider({ InsuranceProviderID: 1 });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Formato de datos incorrecto.");
  });
});