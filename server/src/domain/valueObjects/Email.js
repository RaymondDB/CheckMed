class EmailValid {
    constructor(Email){

        if(!this.isValid(correo)){
            throw new Error('Formato de correo es invalido')
        }
        this.correo = correo;

    }

    isValid(Email) {
        const regex = '/^\S+@\S+\.\S+$/';
        return regex.test(Email);
    }
}

module.exports = EmailValid;

