class NotificationDTO {
  constructor({ NotificationID, UserID, Message, SentAt }) {
    this.id = NotificationID;
    this.userId = UserID;
    this.message = Message;
    this.sentAt = SentAt;
  }

  static fromModel(notificationModel) {
    return new NotificationDTO({
      NotificationID: notificationModel.NotificationID,
      UserID: notificationModel.UserID,
      Message: notificationModel.Message,
      SentAt: notificationModel.SentAt,
    });
  }
}

module.exports = NotificationDTO;
