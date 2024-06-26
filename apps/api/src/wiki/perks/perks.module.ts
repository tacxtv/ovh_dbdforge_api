import { Module } from "@nestjs/common"
import { PerksController } from "./perks.controller"
import { PerksService } from "./perks.service"

@Module({
  controllers: [PerksController],
  providers: [PerksService],
})
export class PerksModule { }
