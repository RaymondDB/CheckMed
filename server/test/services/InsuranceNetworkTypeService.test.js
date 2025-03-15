const InsuranceNetworkTypeService = require("../../src/business/services/insuranceNetworkTypeBServices");
const OperationResult = require("../../src/domain/valueObjects/OperationResult");

const mockInsuranceNetworkTypeRepository = {
  findById: jest.fn(),
  save: jest.fn(),
};

describe("InsuranceNetworkTypeService Tests", () => {
  let insuranceNetworkTypeService;

  beforeEach(() => {
    insuranceNetworkTypeService = new InsuranceNetworkTypeService({ insuranceNetworkTypeRepository: mockInsuranceNetworkTypeRepository });
  });

  test("Debe devolver error si la red de seguros ya existe", async () => {
    mockInsuranceNetworkTypeRepository.findById.mockResolvedValue(
      OperationResult.success({ NetworkTypeId: 1 })
    );

    const newInsuranceNetworkType = { NetworkTypeId: 1 };
    const result = await insuranceNetworkTypeService.createInsuranceNetworkType(newInsuranceNetworkType);

    expect(result.success).toBe(false);
    expect(result.message).toBe("La red de seguros ya está registrada.");
  });

  test("Debe guardar una red de seguros correctamente si no existe", async () => {
    mockInsuranceNetworkTypeRepository.findById.mockResolvedValue(OperationResult.failure("No encontrado"));
    mockInsuranceNetworkTypeRepository.save.mockResolvedValue(OperationResult.success({ id: 1 }));

    const newInsuranceNetworkType = { Name: "NZXT"};
    const result = await insuranceNetworkTypeService.createInsuranceNetworkType(newInsuranceNetworkType);

    expect(result.success).toBe(true);
    expect(result.data.NetworkTypeId).toBeDefined();
  });

  test("Debe devolver error si falta el nombre", async () => {
    const result = await insuranceNetworkTypeService.createInsuranceNetworkType({ NetworkTypeId: 1 });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Formato de datos incorrecto.");
  });
});