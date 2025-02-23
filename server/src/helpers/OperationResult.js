class OperationResult {
    constructor(success, data = null, message = "", error = null) {
      this.success = success;
      this.data = data;
      this.message = message;
      this.error = error;
    }
  
    static success(data, message = "Operación exitosa") {
      return new OperationResult(true, data, message);
    }
  
    static failure(message, error = null) {
      return new OperationResult(false, null, message, error);
    }
  }
  
  module.exports = OperationResult;
  