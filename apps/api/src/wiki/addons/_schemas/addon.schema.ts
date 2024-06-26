import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { AbstractSchema } from "~/_common/_abstracts/abstract.schema"
import { RarityEnum, RarityList } from "../_enums/rarity.enum"
import { ItemParentsPart, ItemParentsPartSchema } from "./_parts/item-parents.part.schema"
import { HydratedDocument } from "mongoose"

export type AddonDocument = HydratedDocument<Addon>

@Schema({
  versionKey: false,
  collection: 'wiki.addons',
})
export class Addon extends AbstractSchema {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public name: string

  @Prop({ type: String })
  public description: string

  @Prop({
    type: String,
    enum: RarityList,
    default: RarityEnum.COMMON,
  })
  public ratity: RarityEnum

  @Prop({
    default: [],
    type: [ItemParentsPartSchema],
  })
  public itemParents: ItemParentsPart[]
}

export const AddonSchema = SchemaFactory.createForClass(Addon)
