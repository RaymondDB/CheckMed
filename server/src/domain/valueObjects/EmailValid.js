const OperationResult = require ('./OperationResult')

class EmailValid {
    constructor(Email){

        if(!this.isValid(Email)){
            return OperationResult.failure('InvalidEmail')
        }
        this.Email = Email;
    }

    isValid(Email) {
        const regex = '/^\S+@\S+\.\S+$/';
        return OperationResult.success(Email, 'EmailCreated')
    }
}

module.exports = EmailValid;