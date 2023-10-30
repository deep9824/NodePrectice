import { BaseError } from './baseError'

export class NotAuthorize extends BaseError {
    statusCode = 401
    constructor(message: string) {
        super(message)
        // Object.setPrototypeOf(this, BaseError.prototype)
    }

    serializeErrors(): { msg: string; field?: string | undefined }[] {
        return [{ msg: this.message }]
    }
}
