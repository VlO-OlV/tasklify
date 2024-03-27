import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEtityIdException extends HttpException {
    constructor (entity: string) {
        super(`${entity} with such id not found`, HttpStatus.BAD_REQUEST);
    }
}