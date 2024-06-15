import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ItemParentsPart, ItemParentsPartSchema } from "./_parts/item-parents.part.schema"

@Schema({
  versionKey: false,
  collection: 'wiki.addons',
})
export class Addon extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public name: string

  @Prop({ type: String })
  public description: string

  @Prop({ type: String })
  public ratity: string

  @Prop({
    default: [],
    type: [ItemParentsPartSchema],
  })
  public itemParents: ItemParentsPart[]
}

export const AddonSchema = SchemaFactory.createForClass(Addon)
