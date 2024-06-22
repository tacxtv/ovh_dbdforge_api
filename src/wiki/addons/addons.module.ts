import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AddonsController } from "./addons.controller"
import { AddonsService } from "./addons.service"
import { Addon, AddonSchema } from "./_schemas/addon.schema"

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Addon.name,
        useFactory: () => AddonSchema,
      },
    ]),
  ],
  controllers: [AddonsController],
  providers: [AddonsService],
})
export class AddonsModule { }
