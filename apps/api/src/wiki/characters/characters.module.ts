import { Module } from "@nestjs/common"
import { CharactersController } from "./characters.controller"
import { CharactersService } from "./characters.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Character, CharacterSchema } from "./_schemas/character.schema"

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Character.name,
        useFactory: () => CharacterSchema,
      },
    ]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule { }
