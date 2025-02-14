const { Notification } = require("../infrastructure/db/models");
const NotificationsRepository = require("../interfaces/NotificationsRepository");

class NotificationsRepositoryImpl extends NotificationsRepository {
  async save(notificationData) {
    return await Notification.create(notificationData);
  }

  async findById(id) {
    return await Notification.findByPk(id);
  }

  async findAll() {
    return await Notification.findAll();
  }

  async update(id, notificationData) {
    const notification = await Notification.findByPk(id);
    if (!notification) return null;

    return await notification.update(notificationData);
  }

  async delete(id) {
    return await Notification.destroy({ where: { NotificationID: id } });
  }
}

module.exports = new NotificationsRepositoryImpl();
