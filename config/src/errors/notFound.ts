import { BaseError } from './baseError'

export class NotFound extends BaseError {
    statusCode: number = 404
    constructor(message: string) {
        super(message)
        // Object.setPrototypeOf(this, BaseError.prototype)
    }

    serializeErrors(): { msg: string; field?: string | undefined }[] {
        return [{ msg: this.message }]
    }
}
