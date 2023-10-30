import { BaseError } from './baseError'

export class BadRequest extends BaseError {
    statusCode = 400
    constructor(message: string) {
        super(message)
        // Object.setPrototypeOf(this, BaseError.prototype)
    }

    serializeErrors(): { msg: string; field?: string | undefined }[] {
        return [{ msg: this.message }]
    }
}
