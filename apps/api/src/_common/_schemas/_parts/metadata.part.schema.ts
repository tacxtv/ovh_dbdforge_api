import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ _id: false })
export class MetadataPart extends Document {
  @Prop({ type: Date })
  public createdAt: Date

  @Prop({ type: String })
  public createdBy: string

  @Prop({ type: Date })
  public lastUpdatedAt: Date

  @Prop({ type: String })
  public lastUpdatedBy: string
}

export const MetadataPartSchema = SchemaFactory.createForClass(MetadataPart)
