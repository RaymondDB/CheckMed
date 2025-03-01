const Config = require('../../infrastructure/Config/appsetting.json')

class OperationResult {
    constructor(success, message = '', data = null, error = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    static success(data = null, key = 'OperationCompleted') {
        return new OperationResult(true, 'Success', key, data);
    }

    static failure(key = 'OperationFailed', error = null) {
        return new OperationResult(false, 'Errors', key, error);
    }
}

module.exports = OperationResult;