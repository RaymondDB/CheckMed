class NotificationMessage {
  constructor(message) {
    if (!this.isValidMessage(message)) {
      throw new Error(
        "Mensaje inválido: No puede estar vacío o exceder los 255 caracteres."
      );
    }
    this.message = message;
  }

  isValidMessage(message) {
    return (
      typeof message === "string" &&
      message.trim().length > 0 &&
      message.length <= 255
    );
  }
}

module.exports = NotificationMessage;
