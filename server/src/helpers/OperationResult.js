class OperationResult {
    constructor(success, message, data = null) {
      this.success = success;
      this.message = message;
      this.data = data;
    }
  
    static success(message, data = null) {
      return new OperationResult(true, message, data);
    }
  
    static failure(message, data = null) {
      return new OperationResult(false, message, data);
    }
  }
  
  module.exports = OperationResult;
  