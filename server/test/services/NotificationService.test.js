const NotificationService = require("../../src/business/services/systemNotificationsBServices");
const NotificationRepository = require("../../src/repositories/implementations/systemNotificationsImplementations");
const OperationResult = require("../../src/helpers/OperationResult");

jest.mock(
  "../../src/repositories/implementations/systemNotificationsImplementations"
);

describe("Notification Service", () => {
  test("Debe crear una notificación válida", async () => {
    const mockData = {
      UserID: 2,
      Message: "Nueva notificación",
    };

    NotificationRepository.save.mockResolvedValue(
      OperationResult.success(mockData)
    );

    const result = await NotificationService.createNotification(mockData);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData);
  });

  test("Debe retornar error si el UserID es inválido", async () => {
    const mockData = { Message: "Mensaje sin UserID" };

    const result = await NotificationService.createNotification(mockData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("El UserID es obligatorio.");
  });
});
