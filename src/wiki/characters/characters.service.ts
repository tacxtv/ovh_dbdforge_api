import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class CharactersService extends AbstractServiceSchema<Addon, AddonDto> {
  public constructor(@InjectModel(Addon.name) protected readonly _model: Model<Addon>) {
    super()
  }

}
