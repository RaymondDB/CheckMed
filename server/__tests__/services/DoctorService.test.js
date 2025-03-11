const DoctorService = require("../../src/business/services/DoctorService");
const OperationResult = require("../../src/helpers/OperationResult");

// Mockeamos el repositorio para que no haga consultas reales a la base de datos
const mockDoctorRepository = {
  findByLicense: jest.fn(),
  save: jest.fn(),
};

describe("DoctorService Tests", () => {
  let doctorService;

  beforeEach(() => {
    doctorService = new DoctorService({ doctorRepository: mockDoctorRepository });
  });

  test("Debe devolver error si el doctor ya existe", async () => {
    mockDoctorRepository.findByLicense.mockResolvedValue(
      OperationResult.success({ LicenseNumber: "ABC123" })
    );

    const newDoctor = { LicenseNumber: "ABC123" };
    const result = await doctorService.createDoctor(newDoctor);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El doctor ya está registrado con esta licencia.");
  });

  test("Debe guardar un doctor correctamente si no existe", async () => {
    mockDoctorRepository.findByLicense.mockResolvedValue(OperationResult.failure("No encontrado"));
    mockDoctorRepository.save.mockResolvedValue(OperationResult.success({ id: 2 }));

    const newDoctor = { LicenseNumber: "DEF456", SpecialtyID: 3, PhoneNumber: "9876543210" };
    const result = await doctorService.createDoctor(newDoctor);

    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });

  test("Debe devolver error si falta el número de licencia", async () => {
    const result = await doctorService.createDoctor({ SpecialtyID: 3 });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Todos los campos obligatorios deben completarse.");
  });
});
