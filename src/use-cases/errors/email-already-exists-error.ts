export class EmailAlreadyExistsError extends Error {
    constructor() {
        super('email is already in use')
    }
}
