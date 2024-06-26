import { Module } from "@nestjs/common"
import { DlcsController } from "./dlcs.controller";
import { DlcsService } from "./dlcs.service";

@Module({
  controllers: [DlcsController],
  providers: [DlcsService],
})
export class DlcsModule { }
