import { Document, Types } from "mongoose"
import { MetadataPart, MetadataPartSchema } from "../_schemas/_parts/metadata.part.schema"
import { Prop } from "@nestjs/mongoose"

export class AbstractSchema extends Document {
  public readonly _id?: Types.ObjectId | any

  @Prop({ type: MetadataPartSchema, default: {} })
  public metadata?: MetadataPart
}
