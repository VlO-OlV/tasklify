import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidBodyException extends HttpException {
    constructor () {
        super('Validation failed', HttpStatus.BAD_REQUEST);
    }
}