import { DynamicModule, Module } from "@nestjs/common"
import { AddonsModule } from "./addons/addons.module"
import { CharactersModule } from "./characters/characters.module"
import { DlcsModule } from "./dlcs/dlcs.module"
import { ItemsModule } from "./items/items.module"
import { MapsModule } from "./maps/maps.module"
import { OfferingsModule } from "./offerings/offerings.module"
import { PerksModule } from "./perks/perks.module"
import { RouterModule } from "@nestjs/core"
import { WikiController } from "./wiki.controller"
import { WikiService } from "./wiki.service"

@Module({
  imports: [
    AddonsModule,
    CharactersModule,
    DlcsModule,
    ItemsModule,
    MapsModule,
    OfferingsModule,
    PerksModule,
  ],
  controllers: [WikiController],
  providers: [WikiService],
})
export class WikiModule {
  public static register(): DynamicModule {
    return {
      module: this,
      imports: [
        RouterModule.register([
          {
            path: 'wiki',
            children: [...Reflect.getMetadata('imports', this)],
          },
        ])
      ],
    }
  }
}
