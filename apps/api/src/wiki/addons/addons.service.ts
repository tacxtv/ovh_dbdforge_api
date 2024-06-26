import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Addon } from "./_schemas/addon.schema"
import { AbstractServiceSchema } from "~/_common/_abstracts/abstract.service.schema"
import { AddonDto } from "./_dtos/addon.dto"

@Injectable()
// @ServiceFinder<Addon, AddonDto>
export class AddonsService extends AbstractServiceSchema<Addon, AddonDto>/*  implements ServiceMethodsInterface<Addon, AddonDto> */ {
  public constructor(@InjectModel(Addon.name) protected readonly _model: Model<Addon>) {
    super()
  }

}

// @Injectable()
// export class AddonsService /* extends ServiceFinder(class { }, []) */ {
//   public constructor(@InjectModel(Addon.name) public readonly _model: Model<Addon>) {
//     // super()
//   }

//   public async find(filters, projection, options) {
//     return { filters, projection, options }
//   }
// }

// // find!: (filters?: FilterQuery<Addon>, projection?: ProjectionType<Addon>, options?: QueryOptions<Addon>) => Promise<Addon[]>
