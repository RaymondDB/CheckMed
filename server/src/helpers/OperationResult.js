class OperationResult {
  constructor(success, data = null, error = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
  
  static success(data) {
    return new OperationResult(true, data);
  }
  
  static fail(error) {
    return new OperationResult(false, null, error);
  }
}

export default OperationResult;