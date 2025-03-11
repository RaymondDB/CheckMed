const DoctorRepository = require("../../src/repositories/implementations/UsersDoctorImplementation");
const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

jest.mock("../../src/infrastructure/db/dbconfig", () => ({
  database: "test_db",
  username: "test_user",
  password: "test_pass",
  host: "localhost",
  dialect: "mssql",
}));

const doctorsMock = dbMock.define("users.Doctors", {
  DoctorID: 1,
  SpecialtyID: 2,
  LicenseNumber: "ABC123",
  PhoneNumber: "1234567890",
});

describe("DoctorRepository Tests", () => {
  let doctorRepository;

  beforeEach(() => {
    doctorRepository = new DoctorRepository();
  });

  test("Debe encontrar un doctor por número de licencia", async () => {
    doctorsMock.$queueResult([{ DoctorID: 1, LicenseNumber: "ABC123" }]);

    const result = await doctorRepository.findByLicense("ABC123");
    expect(result.success).toBe(true);
    expect(result.data.LicenseNumber).toBe("ABC123");
  });

  test("Debe devolver error si el doctor no existe", async () => {
    doctorsMock.$queueResult([]);

    const result = await doctorRepository.findByLicense("XYZ999");
    expect(result.success).toBe(false);
  });

  test("Debe guardar un doctor correctamente", async () => {
    doctorsMock.$queueResult([{ DoctorID: 2 }]);

    const newDoctor = {
      DoctorID: 2,
      SpecialtyID: 3,
      LicenseNumber: "DEF456",
      PhoneNumber: "9876543210",
      YearsOfExperience: 10,
    };

    const result = await doctorRepository.save(newDoctor);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
