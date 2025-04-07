export class Notification {
  constructor({ NotificationID, UserID, Message, SentAt }) {
    this.NotificationID = NotificationID;
    this.UserID = UserID;
    this.Message = Message;
    this.SentAt = SentAt;
  }
}
