import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { AbstractServiceSchema } from "~/_common/_abstracts/abstract.service.schema"
import { Character } from "./_schemas/character.schema"
import { Model } from "mongoose"

@Injectable()
export class CharactersService extends AbstractServiceSchema<Character, any> {
  public constructor(@InjectModel(Character.name) protected readonly _model: Model<Character>) {
    super()
  }

}
