const fileHeader = {
    jpg: 'ffd8ff', 
}

export default class Validation {
    static validateImage(file = Buffer) {
        const header = file.toString('hex', 0, 3)
        if (header == fileHeader.jpg) {
                return true
            }
        return false
    }

    // character: A-z, 0-9, -
    // number of char: 4 - 64
    static validateUserName(name = String) {
        return /^[A-z0-9-]{4,64}$/.test(name)
    }

    static validateEmail(mail = String) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    }
}
