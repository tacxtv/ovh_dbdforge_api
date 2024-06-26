import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { AbstractSchema } from "~/_common/_abstracts/abstract.schema"
import { RoleEnum, RoleList } from "../_enums/role.enum"

export type CharacterDocument = HydratedDocument<Character>

@Schema({
  versionKey: false,
  collection: 'wiki.characters',
})
export class Character extends AbstractSchema {
  @Prop({
    type: Number,
    enum: RoleList,
    required: true,
  })
  public role: RoleEnum

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public name: string

  @Prop({ type: String })
  public biography?: string

  @Prop({ type: String })
  public story?: string

  @Prop({ type: String })
  public gender?: string

  @Prop({ type: String })
  public difficulty?: string

  @Prop({ type: String })
  public height?: string

  @Prop({ type: String })
  public dlc?: string[]

  @Prop({ type: String })
  public perks?: string[]

  @Prop({ type: String })
  public tunables: object

  @Prop({ type: String })
  public powerItem?: object
}

export const CharacterSchema = SchemaFactory.createForClass(Character)
