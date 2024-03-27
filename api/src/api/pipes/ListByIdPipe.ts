import { Injectable, PipeTransform } from "@nestjs/common";
import { ListRepository } from "../database/repositories/ListRepository";
import { InvalidEtityIdException } from "src/utils/exceptions/InvalidEntityIdException";

@Injectable()
export class ListByIdPipe implements PipeTransform {
    constructor (
        private listRepository: ListRepository,
    ) {}

    async transform(listId: string) {
        const list = await this.listRepository.findById(listId);
        if (!list) {
            throw new InvalidEtityIdException('List');
        }
        return listId;
    }
}