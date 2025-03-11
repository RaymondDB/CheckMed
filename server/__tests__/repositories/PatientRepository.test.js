const PatientRepository = require("../../src/repositories/implementations/UsersPatientsImplementations");
const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  database: "test_db",
  username: "test_user",
  password: "test_pass",
  host: "localhost",
  dialect: "mssql",
}));

const patientsMock = dbMock.define("users.Patients", {
  PatientID: 1,
  DateOfBirth: "1990-01-01",
  Gender: "M",
  PhoneNumber: "1234567890",
});


describe("PatientRepository Tests", () => {
  let patientRepository;

  beforeEach(() => {
    patientRepository = new PatientRepository();
  });

  test("Debe encontrar un paciente por teléfono", async () => {
    patientsMock.$queueResult([{ PatientID: 1, PhoneNumber: "1234567890" }]);

    const result = await patientRepository.findByPhone("1234567890");
    expect(result.success).toBe(true);
    expect(result.data.PhoneNumber).toBe("1234567890");
  });

  test("Debe devolver error si el paciente no existe", async () => {
    patientsMock.$queueResult([]);

    const result = await patientRepository.findByPhone("9999999999");
    expect(result.success).toBe(false);
  });

  test("Debe guardar un paciente correctamente", async () => {
    patientsMock.$queueResult([{ PatientID: 2 }]);

    const newPatient = {
      PatientID: 2,
      DateOfBirth: "2000-05-15",
      Gender: "F",
      PhoneNumber: "5554443333",
      BloodType: "O+",
    };

    const result = await patientRepository.save(newPatient);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
