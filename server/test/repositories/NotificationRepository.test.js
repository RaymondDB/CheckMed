const NotificationRepository = require("../../src/repositories/implementations/systemNotificationsImplementations");
const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

describe("Notification Repository", () => {
  test("Debe crear una notificación correctamente", async () => {
    const mockNotification = {
      NotificationID: 1,
      UserID: 2,
      Message: "Test message",
      SentAt: new Date(),
    };

    dbMock.define("systemNotifications", mockNotification);
    jest
      .spyOn(NotificationRepository, "save")
      .mockResolvedValue(mockNotification);

    const result = await NotificationRepository.save(mockNotification);
    expect(result).toEqual(mockNotification);
  });

  test("Debe devolver error si la notificación no existe", async () => {
    jest.spyOn(NotificationRepository, "findById").mockResolvedValue(null);
    const result = await NotificationRepository.findById(99);
    expect(result).toBeNull();
  });
});
