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

    test("Debe encontrar un doctor por ID", async () => {
      doctorsMock.$queueResult([{ DoctorID: 5, LicenseNumber: "XYZ123" }]);
    
      const result = await doctorRepository.findById(5);
      expect(result.success).toBe(true);
      expect(result.data.DoctorID).toBe(5);
    });
    
    test("Debe devolver error si el doctor por ID no existe", async () => {
      doctorsMock.$queueResult([]);
    
      const result = await doctorRepository.findById(999);
      expect(result.success).toBe(false);
    });
    
    test("Debe obtener todos los doctores", async () => {
      doctorsMock.$queueResult([
        { DoctorID: 1 },
        { DoctorID: 2 },
        { DoctorID: 3 },
      ]);
    
      const result = await doctorRepository.findAll();
      expect(result.success).toBe(true);
      expect(result.data.length).toBe(3);
    });
    
    test("Debe filtrar doctores por SpecialtyID", async () => {
      doctorsMock.$queueResult([
        { DoctorID: 1, SpecialtyID: 2 },
        { DoctorID: 2, SpecialtyID: 2 },
      ]);
    
      const result = await doctorRepository.findBySpecialty(2);
      expect(result.success).toBe(true);
      expect(result.data.every((doc) => doc.SpecialtyID === 2)).toBe(true);
    });
    
    test("Debe devolver lista vacía si no hay doctores por SpecialtyID", async () => {
      doctorsMock.$queueResult([]);
    
      const result = await doctorRepository.findBySpecialty(999);
      expect(result.success).toBe(false);
    });
    
    test("Debe devolver error si ocurre una excepción en findByLicense", async () => {
      doctorsMock.$queueFailure(new Error("DB error"));
    
      const result = await doctorRepository.findByLicense("ABC123");
      expect(result.success).toBe(false);
      expect(result.message).toContain("DB error");
    });
    
    test("Debe devolver error si ocurre una excepción en save", async () => {
      doctorsMock.$queueFailure(new Error("Save failed"));
    
      const result = await doctorRepository.save({
        DoctorID: 10,
        SpecialtyID: 1,
        LicenseNumber: "ERR999",
        PhoneNumber: "0000000000",
      });
    
      expect(result.success).toBe(false);
      expect(result.message).toContain("Save failed");
    });
    
    test("Debe actualizar un doctor existente", async () => {
      doctorsMock.$queueResult([{ DoctorID: 1 }]);
    
      const updateData = {
        DoctorID: 1,
        PhoneNumber: "1111111111",
      };
    
      const result = await doctorRepository.update(updateData);
      expect(result.success).toBe(true);
    });
    
    test("Debe devolver error al actualizar un doctor inexistente", async () => {
      doctorsMock.$queueResult([]);
    
      const updateData = {
        DoctorID: 999,
        PhoneNumber: "0000000000",
      };
    
      const result = await doctorRepository.update(updateData);
      expect(result.success).toBe(false);
    });
    
    test("Debe eliminar un doctor por ID", async () => {
      doctorsMock.$queueResult([{ DoctorID: 3 }]);
    
      const result = await doctorRepository.deleteById(3);
      expect(result.success).toBe(true);
    });
    
    test("Debe devolver error si no encuentra doctor para eliminar", async () => {
      doctorsMock.$queueResult([]);
    
      const result = await doctorRepository.deleteById(777);
      expect(result.success).toBe(false);
    });
    
    test("No debe guardar un doctor si falta LicenseNumber", async () => {
      const incompleteDoctor = {
        DoctorID: 4,
        SpecialtyID: 3,
        PhoneNumber: "1234567890",
      };
    
      const result = await doctorRepository.save(incompleteDoctor);
      expect(result.success).toBe(false);
      expect(result.message).toMatch(/LicenseNumber/);
    });
    
    test("No debe guardar un doctor si falta SpecialtyID", async () => {
      const incompleteDoctor = {
        DoctorID: 5,
        LicenseNumber: "NO_SP123",
        PhoneNumber: "1234567890",
      };
    
      const result = await doctorRepository.save(incompleteDoctor);
      expect(result.success).toBe(false);
      expect(result.message).toMatch(/SpecialtyID/);
    });
    
    test("Debe retornar false si intenta buscar con LicenseNumber nulo", async () => {
      const result = await doctorRepository.findByLicense(null);
      expect(result.success).toBe(false);
      expect(result.message).toMatch(/LicenseNumber/);
    });
    
    test("Debe retornar false si intenta actualizar con DoctorID faltante", async () => {
      const updateData = {
        PhoneNumber: "1111111111",
      };
    
      const result = await doctorRepository.update(updateData);
      expect(result.success).toBe(false);
      expect(result.message).toMatch(/DoctorID/);
    });
    

    const result = await doctorRepository.save(newDoctor);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
