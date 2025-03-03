class OperationResult {
    constructor(success, message, data) {
      this.success = success;
      this.message = message;
      this.data = data || null;
    }
  
    static success(message, data) {
      return new OperationResult(true, message, data);
    }
  
    static failure(message) {
      return new OperationResult(false, message);
    }
  }
  
  module.exports = OperationResult;
  