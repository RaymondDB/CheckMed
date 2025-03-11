const PatientService = require("../../src/business/services/PatientService");
const OperationResult = require("../../src/helpers/OperationResult");

// Mockeamos el repositorio para que no haga consultas reales a la base de datos
const mockPatientRepository = {
  findByPhone: jest.fn(),
  save: jest.fn(),
};

describe("PatientService Tests", () => {
  let patientService;

  beforeEach(() => {
    patientService = new PatientService({ patientRepository: mockPatientRepository });
  });

  test("Debe devolver error si el paciente ya existe", async () => {
    mockPatientRepository.findByPhone.mockResolvedValue(
      OperationResult.success({ PhoneNumber: "1234567890" })
    );

    const newPatient = { PhoneNumber: "1234567890" };
    const result = await patientService.createPatient(newPatient);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El paciente ya está registrado con este número de teléfono.");
  });

  test("Debe guardar un paciente correctamente si no existe", async () => {
    mockPatientRepository.findByPhone.mockResolvedValue(OperationResult.failure("No encontrado"));
    mockPatientRepository.save.mockResolvedValue(OperationResult.success({ id: 3 }));

    const newPatient = { PhoneNumber: "5554443333", DateOfBirth: "2000-05-15", Gender: "F" };
    const result = await patientService.createPatient(newPatient);

    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });

  test("Debe devolver error si falta el número de teléfono", async () => {
    const result = await patientService.createPatient({ DateOfBirth: "2000-05-15" });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Todos los campos obligatorios deben completarse.");
  });
});
