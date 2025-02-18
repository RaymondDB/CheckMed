const Config = require('../../infrastructure/Config')

class OperationResult {
    constructor(success, message = '', data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data = null, key = 'OperationCompleted') {
        return new OperationResult(true, Config.getMessage('Success', key), data);
    }

    static failure(key = 'OperationFailed') {
        return new OperationResult(false, Config.getMessage('Errors', key));
    }
}

module.exports = OperationResult;